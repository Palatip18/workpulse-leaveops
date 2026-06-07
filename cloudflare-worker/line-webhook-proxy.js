export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/') {
      return json({
        ok: true,
        mode: 'WORKPULSE_LINE_PROXY_HEALTH',
        status: 'READY',
        env_status: {
          LINE_CHANNEL_SECRET_EXISTS: !!env.LINE_CHANNEL_SECRET,
          GAS_WEBAPP_URL_EXISTS: !!env.GAS_WEBAPP_URL,
          GAS_WEBAPP_URL_LOOKS_OK: String(env.GAS_WEBAPP_URL || '').includes('/exec?wp_secret=')
        },
        checked_at: new Date().toISOString()
      }, 200);
    }

    if (request.method === 'GET' && url.pathname.includes('test-gas')) {
      const testPayload = {
        destination: 'cloudflare-worker-test',
        events: [
          {
            type: 'message',
            replyToken: 'worker-test-reply-token',
            source: {
              type: 'user',
              userId: 'LINE_EMP001'
            },
            timestamp: Date.now(),
            message: {
              type: 'text',
              id: 'worker-test-message-id',
              text: 'เช็กสิทธิวันลา'
            }
          }
        ]
      };

      try {
        const gasResp = await fetch(env.GAS_WEBAPP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WorkPulse-Proxy': 'cloudflare-worker-test'
          },
          body: JSON.stringify(testPayload),
          redirect: 'follow'
        });

        const gasText = await gasResp.text();

        return json({
          ok: gasResp.ok,
          mode: 'TEST_WORKER_TO_GAS',
          gas_status: gasResp.status,
          gas_status_text: gasResp.statusText,
          gas_body_preview: gasText.slice(0, 1000),
          tested_at: new Date().toISOString()
        }, 200);

      } catch (err) {
        return json({
          ok: false,
          mode: 'TEST_WORKER_TO_GAS',
          error: err.message,
          tested_at: new Date().toISOString()
        }, 500);
      }
    }

    if (request.method !== 'POST') {
      return json({
        ok: false,
        error: 'Method not allowed'
      }, 405);
    }

    const rawBody = await request.text();

    let parsedBody = null;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (err) {
      parsedBody = null;
    }

    const signature = request.headers.get('x-line-signature') || '';
    const verified = await verifyLineSignature(rawBody, signature, env.LINE_CHANNEL_SECRET);

    if (!verified) {
      return json({
        ok: false,
        mode: 'WORKPULSE_LINE_PROXY',
        status: 'REJECTED',
        error: 'Invalid LINE signature'
      }, 401);
    }

    const eventCount = parsedBody && Array.isArray(parsedBody.events)
      ? parsedBody.events.length
      : 0;

    ctx.waitUntil(
      fetch(env.GAS_WEBAPP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WorkPulse-Proxy': 'cloudflare-worker'
        },
        body: rawBody,
        redirect: 'follow'
      })
      .then(async resp => {
        const text = await resp.text();
        console.log('Forward to GAS done. status=' + resp.status + ' body=' + text.slice(0, 500));
      })
      .catch(err => {
        console.log('Forward to GAS failed: ' + err.message);
      })
    );

    return json({
      ok: true,
      mode: 'WORKPULSE_LINE_PROXY_ACK',
      status: 'ACCEPTED',
      events: eventCount,
      handled_at: new Date().toISOString()
    }, 200);
  }
};

function json(obj, status) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!signature || !channelSecret) return false;

  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(channelSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const digest = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(rawBody)
  );

  const expected = btoa(String.fromCharCode(...new Uint8Array(digest)));

  return timingSafeEqual(expected, signature);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
