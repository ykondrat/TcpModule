// Core
import net from 'net';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { validateFilter, filterData } from './instruments';

const server = net.createServer();
const readFile = promisify(fs.readFile);
const filePath = path.resolve(__dirname, '../data/users.json');

server.on('connection', socket => {
  socket.on('data', async (object) => {
    try {
      const filter = validateFilter(JSON.parse(object.toString()));
      const source = await readFile(filePath, {
        encoding: 'utf8'
      });

      const data = filterData(JSON.parse(source), filter);

      socket.write(JSON.stringify(data));
    } catch (error) {
      throw error
    }
  });

  socket.on('end', () => {
    console.log('Client is disconnected!');
  });
});

export default server;
