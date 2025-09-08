const express = require('express');
const router = express.Router();
const fakeController = require('../controllers/fakeController');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', fakeController.healthCheck);

/**
 * @swagger
 * /fake-endpoint:
 *   get:
 *     summary: Get encrypted user data
 *     tags: [Fake API]
 *     responses:
 *       200:
 *         description: Encrypted data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     encrypted:
 *                       type: object
 *                       properties:
 *                         iv:
 *                           type: string
 *                         authTag:
 *                           type: string
 *                         encrypted:
 *                           type: string
 *                         algorithm:
 *                           type: string
 */
router.get('/fake-endpoint', fakeController.getEncryptedData);

/**
 * @swagger
 * /clear:
 *   delete:
 *     summary: Clear all user data
 *     tags: [Fake API]
 *     responses:
 *       200:
 *         description: Data cleared successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/clear', fakeController.clearData);

module.exports = router;