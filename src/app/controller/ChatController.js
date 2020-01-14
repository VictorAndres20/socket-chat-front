class ChatController{
    constructor(){}

    renderChat(req, res) {
        res.render('chat',{
            title: 'Chat'
        })
    }
}

const buildClass = () => {
    return new ChatController();
}

module.exports = {buildClass};