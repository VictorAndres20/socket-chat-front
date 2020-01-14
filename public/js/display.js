main();

function main(){
    displaySession();
}

function displaySession(){
    display('session');
}

function displayChat(){
    display('chat');
}

function displaySendMessage(){
    display('chatSendMessage');
}

function dismissSession(){
    hide('session');
}

function dismissChat(){
    hide('chat');
}

function dismissSendMessage(){
    hide('chatSendMessage');
}

function renderUsersConn(name, users){
    let content = `<div class="row"><div style="margin-top: 20px;" class="col-sm-12 text-center"><h6>Users online <span class="badge badge-success">${users.length - 1}</span></h6></div></div><hr/>`;
    users.map((user) => {
        if(user.name !== name){
            content += `<h5><a onclick="enterChat('${user.clientID}','${user.name}')" class="badge badge-light"><i class="fas fa-user" aria-hidden="true"></i> ${user.name}</a></h5><hr/>`;
        }
    });
    document.getElementById('usersConnected').innerHTML = content;
}

function renderChats(chatObj, me){
    let {name,chats} = chatObj;
    let content = "";
    chats.map((chat) => {
        let {owner, message} = chat; 
        if(owner === me)
            content += `<div class="row"><div class="col-sm-12 text-right"><h4><span class="badge badge-pill badge-primary">You: ${message}</span></h4></div></div>`;
        else
            content += `<div class="row"><div class="col-sm-12 text-left"><h4><span class="badge badge-pill badge-dark">${owner}: ${message}</span></h4></div></div>`;
    });
    document.getElementById('chatUser').innerHTML = `Chatting with ${name}`;
    document.getElementById('chatScreen').innerHTML = content;
    displaySendMessage();
}

function renderAlerts(alerts){
    let content = `<h5>Notifications</h5><span class="badge badge-primary">${alerts.length}</span><hr/>`;
    alerts.map((alert, key) => {
        content += buildMessageDiv(alert, key);
    });
    document.getElementById('alertsSection').innerHTML = content;
}

function buildMessageDiv(alert, index){
    return `<div class="alert alert-success fade show" style="font-size: 12px;">
                <strong>${alert.date}: </strong> <span>${alert.msg}</span>
                <button style="margin-left: 6px;" type="button" class="close" onclick="removeAlertMessage(${index})" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
}