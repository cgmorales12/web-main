import { createServer } from 'http';
import { parse } from 'url';

const patients = [];
const histories = [];
const appointments = [];

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  if (req.method === 'GET' && pathname === '/api/pacientes') {
    sendJson(res, 200, patients);
  } else if (req.method === 'POST' && pathname === '/api/pacientes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const paciente = JSON.parse(body);
        paciente.id = patients.length + 1;
        patients.push(paciente);
        sendJson(res, 201, paciente);
      } catch (err) {
        sendJson(res, 400, { message: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'GET' && pathname === '/api/historias') {
    sendJson(res, 200, histories);
  } else if (req.method === 'GET' && pathname === '/api/citas') {
    sendJson(res, 200, appointments);
  } else {
    sendJson(res, 404, { message: 'Not found' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
