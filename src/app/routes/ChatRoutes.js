const router = require('express').Router();
const ChatController = require('../controller/ChatController').buildClass();

router.get('/', (req, res) => {
    ChatController.renderChat(req, res);
})

module.exports = router;