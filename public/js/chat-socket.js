logout();

socketIOListen('connUsers', (data) => {
    saveObject(USERS_ID, data.data.users);
    renderUsersConn(getUser(), data.data.users);
});

socketIOListen('privateMessage', (data) => {
    console.log(`Getted Message ${JSON.stringify(data)}`);
    addChat(data.id, data.messageData.user, data.messageData.user, data.messageData.message);
    if(getActualChat().name === data.name)
        refreshChats(getActualChat().id, getActualChat().name);

    let alerts = addAlert(buildMessageAlert(data));
    renderAlerts(alerts);
});

function enter(){
    let name = document.getElementById('name').value;
    if(name === "")
        alert('Please, enter your name.');
    else{
        console.log('enter');
        socketIOSendMessage('conn', {name}, (res) => {
            let {ok, msg, data} = res;
            if(! ok)
                alert(msg);
            else{
                loginChat(name, msg, data);
            }
        });
    }
}

function enterChat(id, name){
    console.log(`Chat with ID: ${id} -- NAME: ${name}`);
    saveActualChat(id, name);
    refreshChats(id, name)
}

function sendMessage(){
    let {id,name} = getActualChat();
    let message = document.getElementById('message').value;
    if(! validateMessage(message))
        alert("Message empty");
    else{
        console.log(`Send Message: ${message}`);
        document.getElementById('message').value = '';
        socketIOSendMessage('privateMessage', buildMessageToSend(id,getUser(), message), (res) => {
            let {messageData} = res;
            console.log(`Getted Message sended: ${JSON.stringify(res)}`);
            addChat(res.id, name, messageData.user, messageData.message);
            refreshChats(id, name);
        });
    }
}

function refreshChats(id, name){
    let chat = getChat(id, name);
    console.log(`CHATS: ${JSON.stringify(chat)}`);
    renderChats(chat, getUser());
}

function loginChat(name, msg, data){
    console.log(msg);
    saveUser(name);
    saveObject(USERS_ID, data.users);
    cleanChats();
    dismissSession();
    displayChat();
    renderUsersConn(getUser(), data.users);
    renderAlerts(getAlerts());
}

function logout(){
    console.log("Logout");
    removeUser();
    cleanChats();
    cleanUsers();
    cleanActualChat();
    cleanAlerts();
    dismissChat();
    displaySession();
}

function validateMessage(message){
    if(message === '')
        return false;
    return true;
}

function buildMessageToSend(userID, me, message){
    let messageData = {user: me, message};
    return {userID,name: me,messageData};
}

function buildMessageAlert(data){
    return `You got a message from ${data.messageData.user}`;
}

function removeAlertMessage(index){
    let alerts = removeAlert(index);
    renderAlerts(alerts);
}