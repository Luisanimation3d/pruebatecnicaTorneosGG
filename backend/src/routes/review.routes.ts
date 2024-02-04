import {Router} from "express";

import {getReviews, deleteReview, createReview, getReview, updateReview} from "../controllers/review.controller";
import {extractUserMiddleware} from "../middlewares/extractUser.middlewares";

const router = Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', extractUserMiddleware, createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;