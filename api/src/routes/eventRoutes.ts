import { Router } from 'express';

import {
  getEventById,
  getAllEvents,
  createEvent,
  createManyEvents,
  deleteEventById,
  deleteNHLEvents,
  deleteNBAEvents,
  deleteAllEvents,
} from '../controllers/eventController.js';

const router = Router();

router.get('/single/:id', getEventById);
router.get('/', getAllEvents);
router.post('/single', createEvent);
router.post('/batch', createManyEvents);
router.delete('/single/:id', deleteEventById);
router.delete('/batch/nhl', deleteNHLEvents);
router.delete('/batch/nba', deleteNBAEvents);
router.delete('/batch', deleteAllEvents);

export default router;
