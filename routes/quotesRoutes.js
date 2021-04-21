const QuotesController = require('../controllers/QuotesController')
const { Router } = require('express')
const router = Router()

router.get('/', QuotesController.index)

module.exports = router
