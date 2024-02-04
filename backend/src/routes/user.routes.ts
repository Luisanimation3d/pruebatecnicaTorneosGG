import {Router} from "express";
import multer from "multer";
import {getUsers, getUser, inactiveUser, createUser, updateUser, getImage, uploadImage} from "../controllers/user.controller";
import {extractUserMiddleware} from "../middlewares/extractUser.middlewares";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/uploads/users');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_')}`);
    }
})

const upload = multer({storage});

router.get('/', getUsers);
router.get('/single', extractUserMiddleware, getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', inactiveUser);
router.post('/upload', upload.single('image'), uploadImage);
router.get('/image/:image', getImage);

export default router;