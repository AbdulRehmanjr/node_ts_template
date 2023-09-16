import winston from 'winston';

// Define the logger configuration
const logger = winston.createLogger({
  level: 'info', // Set the minimum log level to capture
  format: winston.format.json(), // Log entries as JSON objects
  transports: [
    new winston.transports.File({ filename: '/project/error.log', level: 'error' }), // Log errors to error.log
    new winston.transports.File({ filename: '/project/combined.log' }), // Log all levels to combined.log
  ],
});
logger.add(new winston.transports.Console({
    format: winston.format.simple(), // Log entries in a human-readable format to the console
  }));

export default logger;
