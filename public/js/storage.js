function addUserConnected(id, name){
    let users = getObject(USERS_ID);
    users.push({id, name});
    return saveObject(USERS_ID,users);
}

function addChat(id, name, ownerMessage, message){
    let chats = getObject(CHATS_ID);
    let chatsFiltered = chats.filter((chat) => chat.name === name);
    if(chatsFiltered.length === 0){
        let newChat = buildEmpyChat(id, name);
        newChat.chats.push(buildMessage(ownerMessage, message));
        chats = removeChat(name);
        chats.push(newChat);
    } else{
        let newChat = chatsFiltered[0];
        newChat.chats.push(buildMessage(ownerMessage, message));
        chats = removeChat(name);
        chats.push(newChat);
    }   
    chats = saveObject(CHATS_ID, chats);
    return chats;
}

function removeUserConnected(name){
    let users = getObject(USERS_ID);
    users.map((user, key) => {
        if(user.name === name)
            users.splice(key, 1);
    });
    return saveObject(USERS_ID,users);
}

function removeChat(name){
    let chats = getObject(CHATS_ID);
    chats.map((chat , key) => {
        if(chat.name === name)
            chats.splice(key, 1);
    });
    return saveObject(CHATS_ID, chats);
}

function getChat(id, name){
    let chats = getObject(CHATS_ID);
    let filteredChats = chats.filter((chat) => chat.name === name);
    if(filteredChats.length === 0){
        let newChat = buildEmpyChat(id, name); 
        chats.push(newChat);
        chats = saveObject(CHATS_ID, chats);
        return newChat;
    }
    return filteredChats[0];
}

function cleanChats(){
    saveObject(CHATS_ID, []);
}

function cleanUsers(){
    saveObject(USERS_ID, []);
}

function cleanAlerts(){
    saveObject(ALERTS_ID, []);
}

function buildEmpyChat(id, name){
    return {id, name, chats: []};
}

function buildMessage(owner, message){
    return {owner, message};
}

function saveActualChat(id, name){
    let data = {id, name};
    saveObject(ACTUAL_CHAT_ID, data);
    return data;
}

function addAlert(msg){
    let alerts = getAlerts();
    let alert = {date: buildAlertDate(), msg};
    alerts.push(alert);
    return saveObject(ALERTS_ID, alerts);
}

function removeAlert(index){
    let alerts = getAlerts();
    alerts.splice(index, 1);
    return saveObject(ALERTS_ID, alerts);
}

function getAlerts(){
    return getObject(ALERTS_ID);
}

function getActualChat(){
    return getObject(ACTUAL_CHAT_ID);
}

function cleanActualChat(){
    saveObject(ACTUAL_CHAT_ID, {});
}

function saveObject(id, data){
    sessionStorage.setItem(id, JSON.stringify(data));
    return data;
}

function getObject(id){
    return JSON.parse(sessionStorage.getItem(id));
}

function removeObject(){
    sessionStorage.removeItem(id);
}

function saveUser(name){
    sessionStorage.setItem(USER_ID, name);
}

function getUser(){
    return sessionStorage.getItem(USER_ID);
}

function removeUser(){
    sessionStorage.removeItem(USER_ID);
}

function buildAlertDate(){
    let date = new Date();
    let dateBuilded = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return dateBuilded;
}