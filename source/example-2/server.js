// Core
import net from 'net';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import zlib from 'zlib';

import { validateFilter, filterData, createCSV } from './instruments';

const server = net.createServer();
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const filePath = path.resolve(__dirname, '../data/users.json');

server.on('connection', socket => {
  socket.on('data', async (object) => {
    try {
      const { filter, meta } = validateFilter(JSON.parse(object.toString()));
      const source = await readFile(filePath, {
        encoding: 'utf8'
      });

      const data = filterData(JSON.parse(source), filter);
      const { format, archive } = meta;

      if (format === 'json') {
        await writeFile('users.json', JSON.stringify(data));
      } else if (format === 'csv') {
        await writeFile('users.csv', createCSV(data));
      }

      const rs = fs.createReadStream(`users.${format}`);

      if (archive) {
        read.pipe(zlib.createGunzip()).pipe(socket);
      } else {
        rs.pipe(socket);
      }
    } catch (error) {
      throw error
    }
  });

  socket.on('end', () => {
    console.log('Client is disconnected!');
  });
});

export default server;
