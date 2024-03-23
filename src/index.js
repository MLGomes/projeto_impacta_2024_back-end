const app = require('./app');
const Loaders = require('./Loaders/index');

Loaders.start();

app.listen(3333, () => console.log('Server ONLINE!'));