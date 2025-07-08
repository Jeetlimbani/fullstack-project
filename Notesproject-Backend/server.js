import app from './app.js';
import config from './config/index.js';
import prisma from './models/prisma.js'; 

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database or start server:', error);
    process.exit(1);
  }
};

startServer();
