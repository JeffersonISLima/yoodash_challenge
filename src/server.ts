import { buildApp } from './app.js';

const PORT = Number(process.env.PORT ?? 3000);

void (async () => {
  const app = await buildApp();
  try {
    await app.listen({ host: '0.0.0.0', port: PORT });
    app.log.info(`HTTP server listening on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
