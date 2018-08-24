const app = require('./app');
const debug = require('debug')('hackerbay-microservice');
const port = process.env.port || 3000;

const server = app.listen(port, () => {
    debug(`Express server listening on port ${port}`);
});
