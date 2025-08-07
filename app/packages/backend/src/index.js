const http = require('http');
const url = require('url');

const SERVER_PORT = Number(process.env.PORT || 3001);

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...getCorsHeaders(),
    ...extraHeaders,
  });
  res.end(body);
}

async function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve(undefined);
        return;
      }
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not Found' });
}

function methodNotAllowed(res) {
  sendJson(res, 405, { error: 'Method Not Allowed' });
}

async function handleIdentify(req, res) {
  try {
    const body = (await readRequestBody(req)) || {};
    const { imageUrl } = body;

    const result = {
      name: "Jack Daniel's Old No. 7 Tennessee Whiskey",
      maker: 'Jack Daniel’s',
      abv: '40%',
      msrp: '$26.99',
      sourceImageUrl: imageUrl || null,
      confidence: 0.93,
    };

    sendJson(res, 200, { ok: true, data: result });
  } catch (err) {
    sendJson(res, 400, { ok: false, error: err.message || 'Bad Request' });
  }
}

async function handleCheckIn(req, res) {
  try {
    const body = (await readRequestBody(req)) || {};
    const { id, name } = body;
    sendJson(res, 200, { ok: true, action: 'checkin', id: id || null, name: name || null });
  } catch (err) {
    sendJson(res, 400, { ok: false, error: err.message || 'Bad Request' });
  }
}

async function handleCheckOut(req, res) {
  try {
    const body = (await readRequestBody(req)) || {};
    const { id, name } = body;
    sendJson(res, 200, { ok: true, action: 'checkout', id: id || null, name: name || null });
  } catch (err) {
    sendJson(res, 400, { ok: false, error: err.message || 'Bad Request' });
  }
}

function handleHealth(res) {
  sendJson(res, 200, { status: 'ok' });
}

function handleOptions(res) {
  res.writeHead(204, { ...getCorsHeaders() });
  res.end();
}

const server = http.createServer(async (req, res) => {
  if (!req || !req.url || !req.method) {
    sendJson(res, 400, { error: 'Bad Request' });
    return;
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    handleOptions(res);
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname || '/';

  try {
    if (pathname === '/health') {
      if (req.method !== 'GET') return methodNotAllowed(res);
      return handleHealth(res);
    }

    if (pathname === '/') {
      if (req.method !== 'GET') return methodNotAllowed(res);
      return sendJson(res, 200, {
        message: 'HAL-9001 backend is running',
        endpoints: {
          health: 'GET /health',
          identify: 'POST /api/identify { imageUrl?: string }',
          checkin: 'POST /api/checkin { id?: string, name?: string }',
          checkout: 'POST /api/checkout { id?: string, name?: string }'
        }
      });
    }

    if (pathname === '/api/identify') {
      if (req.method !== 'POST') return methodNotAllowed(res);
      return handleIdentify(req, res);
    }

    if (pathname === '/api/checkin') {
      if (req.method !== 'POST') return methodNotAllowed(res);
      return handleCheckIn(req, res);
    }

    if (pathname === '/api/checkout') {
      if (req.method !== 'POST') return methodNotAllowed(res);
      return handleCheckOut(req, res);
    }

    return notFound(res);
  } catch (err) {
    sendJson(res, 500, { error: 'Internal Server Error' });
  }
});

server.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[hal-9001] backend listening on http://localhost:${SERVER_PORT}`);
});
