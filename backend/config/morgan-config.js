const morgan = require('morgan');
const logger = require('./logger-cofing');


const stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

const morganFormat = 'combined';

const morganLogger = morgan(morganFormat, { stream });

module.exports = morganLogger;