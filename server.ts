import { createServer } from "node:http";
import next from "next";
import { PrismaClient } from '@prisma/client'
import * as path from 'path';
import * as fs from 'fs';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {

  const httpServer = createServer((req, res) => {
    // Handle static files manually (optional)
    const staticFilePath = path.join(__dirname, 'public', req.url || '');
    if (fs.existsSync(staticFilePath) && fs.lstatSync(staticFilePath).isFile()) {
      fs.createReadStream(staticFilePath).pipe(res);
    } else {
      // If the file doesn't exist, fallback to Next.js request handler
      handler(req, res);
    }
  });
  
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});