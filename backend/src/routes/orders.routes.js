const { Router } = require('express');
const auth = require('../middlewares/auth');
const { list, create, updateStatus, remove } = require('../controllers/orders.controller');

const router = Router();

router.use(auth);

router.get('/',             list);
router.post('/',            create);
router.patch('/:id/status', updateStatus);
router.delete('/:id',       remove);

module.exports = router;