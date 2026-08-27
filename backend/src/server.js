import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

// Connect to MongoDB Database
connectDB();

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server is running in ${config.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
