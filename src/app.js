require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs'); // 👈 ADICIONE ESTA LINHA

const { port } = require('./config/environment');
const fakeRoutes = require('./routes/fakeRoutes');
const errorHandler = require('./middlewares/errorHandler');

class App {
  constructor() {
    this.app = express();
    this.port = port;
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeSwagger();
    this.ensureDatabaseExists();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes() {
    this.app.use('/api', fakeRoutes);
  }

  initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  initializeSwagger() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Fake API Service',
          version: '1.0.0',
          description: 'Fake API com criptografia AES-256-GCM para testes',
        },
        servers: [
          {
            url: `http://localhost:${this.port}`,
            description: 'Development server',
          },
        ],
      },
      apis: ['./src/routes/*.js'],
    };

    const specs = swaggerJsdoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  ensureDatabaseExists() {
    const dbDir = path.join(__dirname, '..', 'database');
    const contactsPath = path.join(dbDir, 'contacts.json');
    
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    if (!fs.existsSync(contactsPath)) {
      fs.writeFileSync(contactsPath, JSON.stringify([]));
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`✅ Fake API Service rodando na porta ${this.port}`);
      console.log(`📚 Documentação disponível em: http://localhost:${this.port}/api-docs`);
    });
  }
}

const server = new App();
server.start();

module.exports = server;