function getUsers() {
    let data = localStorage.getItem('mailUsers');
    return data ? JSON.parse(data) : {};
}

function saveUsers(users) {
    localStorage.setItem('mailUsers', JSON.stringify(users));
}

function signUp() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let users = getUsers();
    if (users[user]) { alert('User exists'); return; }
    users[user] = btoa(pass);
    saveUsers(users);
    alert('Signed up. Sign in now.');
}

function signIn() {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let users = getUsers();
    if (users[user] === btoa(pass)) {
        localStorage.setItem('currentUser', user);
        document.getElementById('authForm').style.display = 'none';
        document.getElementById('mailbox').style.display = 'block';
        loadInbox();
    } else alert('Invalid login.');
}

function sendMail() {
    let sender = localStorage.getItem('currentUser');
    let recipient = document.getElementById('to').value;
    let body = document.getElementById('msgBody').value;
    let mailKey = 'mail_' + recipient;
    let inbox = JSON.parse(localStorage.getItem(mailKey) || '[]');
    inbox.push({from: sender, body: body, time: new Date().toISOString()});
    localStorage.setItem(mailKey, JSON.stringify(inbox));
    alert('Sent.');
    document.getElementById('to').value = '';
    document.getElementById('msgBody').value = '';
}

function loadInbox() {
    let user = localStorage.getItem('currentUser');
    let inbox = JSON.parse(localStorage.getItem('mail_' + user) || '[]');
    let html = '<ul>';
    inbox.forEach(m => {
        html += `<li><strong>${m.from}</strong>: ${m.body} <em>${m.time}</em></li>`;
    });
    html += '</ul>';
    document.getElementById('inbox').innerHTML = html;
}

function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}
