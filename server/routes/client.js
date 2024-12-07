import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addClient, getClients, getClient, updateClient, deleteClient } from '../controllers/clientController.js'

const router = express.Router()

router.get('/', authMiddleware, getClients)
router.post('/add', authMiddleware, addClient)
router.get('/:id', authMiddleware, getClient)
router.put('/:id', authMiddleware, updateClient)
router.delete('/:id', authMiddleware, deleteClient)

export default router
