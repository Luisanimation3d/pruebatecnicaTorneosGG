import {Router} from "express";
import {getBookings, getBooking, createBooking, inactiveBooking, updateBooking} from "../controllers/booking.controller";
import {extractUserMiddleware} from "../middlewares/extractUser.middlewares";

const router = Router();

router.get('/', extractUserMiddleware, getBookings);
router.get('/:id', getBooking);
router.post('/', extractUserMiddleware, createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', inactiveBooking);

export default router;