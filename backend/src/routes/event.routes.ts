import {Router} from "express";
import multer from "multer";
import {getEvents, getEvent, getEventsByUser, createEvent, inactiveEvent, updateEvent, uploadImage, getImage} from "../controllers/event.controller";
import {extractUserMiddleware} from "../middlewares/extractUser.middlewares";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/uploads/events');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_')}`);
    }
})

const upload = multer({storage});

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', extractUserMiddleware, createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', inactiveEvent);
router.post('/upload', upload.single('image'), uploadImage);
router.get('/image/:image', getImage);
router.get('/user/:id', extractUserMiddleware,getEventsByUser);

export default router;