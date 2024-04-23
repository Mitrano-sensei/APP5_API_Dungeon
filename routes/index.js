var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/players', require('./player'));
router.use('/dungeons', require('./dungeon'));

module.exports = router;
