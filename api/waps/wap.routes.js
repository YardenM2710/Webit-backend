const express = require('express')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
  getWaps,
  getWapById,
  addWap,
  updateWap,
  removeWap,
  addCmp,
} = require('./wap.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getWaps)
router.get('/:id', getWapById)
router.post('/', addWap)
router.put('/:id', updateWap)
router.delete('/:id', removeWap)

// requireAuth, requireAdmin,

module.exports = router
