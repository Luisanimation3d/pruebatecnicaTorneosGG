import {Router} from "express";

import {getReviews, deleteReview, createReview, getReview, updateReview} from "../controllers/review.controller";

const router = Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;