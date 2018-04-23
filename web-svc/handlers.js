let users = [];

function login(credentials) {
    console.log('credentials ->');
    console.dir(credentials);
    let found = false;
    users.find(function(item){
        console.log('item ->');
        console.dir(item);
        if(item.username === credentials.username && item.password === credentials.password) {
            console.log('found');
            found = true;
        }
    });
    return found;
}

function register(user) {
    return users.push(user) > 0;
}


module.exports = { login, register };