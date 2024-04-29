import express from 'express';
import player from './player/index';
import dungeon from './dungeon/index';
import score from './score/index';

const router = express.Router();
/* GET home page. */

router.use('/players', player);
router.use('/dungeons', dungeon);
router.use('/scores', score);

export default router;