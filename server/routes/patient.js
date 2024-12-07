import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addPatient, getPatients, getPatient, updatePatient, deletePatient } from '../controllers/patientController.js'

const router = express.Router()

router.get('/', authMiddleware, getPatients)
router.post('/add', authMiddleware, addPatient)
router.get('/:id', authMiddleware, getPatient)
router.put('/:id', authMiddleware, updatePatient)
router.delete('/:id', authMiddleware, deletePatient)



export default router