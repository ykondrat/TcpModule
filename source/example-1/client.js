const net = require('net');

const client = new net.Socket();

client.connect(8080, () => {
  client.write(JSON.stringify(
    {
      name: {
        first: 'M',
      },
    }
  ));
});

client.on('data', data => {
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Connection closed!');
});
