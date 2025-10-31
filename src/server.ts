import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);

async function main() {
  const app = await buildApp();
  try {
    await app.listen({ host: '0.0.0.0', port });
    app.log.info(`HTTP server listening on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
