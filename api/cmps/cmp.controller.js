const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const cmpService = require('./cmp.service')
const toyService = require('../toys/toy-service')

async function getCmps(req, res) {
  try {
    console.log('REQ QUERYYY', req.query)
    const cmps = await cmpService.query(req.query)
    res.send(cmps)
  } catch (err) {
    logger.error('Cannot get cmps', err)
    res.status(500).send({ err: 'Failed to get cmps' })
  }
}

async function deleteCmp(req, res) {
  try {
    await cmpService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete cmp', err)
    res.status(500).send({ err: 'Failed to delete cmp' })
  }
}

async function addCmp(req, res) {
  //   console.log('REVIEWW,', req.body)
  //   console.log(req.session.user)
  try {
    var cmp = req.body
    cmp.byUserId = req.session.user._id
    cmp = await cmpService.add(cmp)
    console.log(cmp, 'cmp added successfully')

    // prepare the updated cmp for sending out
    // cmp.aboutToy = await toyService.getById(cmp.aboutToyId)
    // Give the user credit for adding a cmp
    // var user = await userService.getById(cmp.byUserId)
    // user = await userService.update(user)
    // cmp.byUser = user
    // const fullUser = await userService.getById(user._id)

    // console.log('CTRL SessionId:', req.sessionID)
    // socketService.broadcast({
    //   type: 'cmp-added',
    //   data: cmp,
    //   userId: cmp.byUserId,
    // })
    // socketService.emitToUser({
    //   type: 'cmp-about-you',
    //   data: cmp,
    //   userId: cmp.aboutUserId,
    // })
    // socketService.emitTo({
    //   type: 'user-updated',
    //   data: fullUser,
    //   label: fullUser._id,
    // })

    res.send(cmp)
  } catch (err) {
    console.log(err)
    logger.error('Failed to add cmp', err)
    res.status(500).send({ err: 'Failed to add cmp' })
  }
}

module.exports = {
  getCmps,
  deleteCmp,
  addCmp,
}
