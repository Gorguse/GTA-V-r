var loginBrowser = mp.browsers.new("package://login/index.html");
mp.gui.cursor.show(true, true);

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);  
});

mp.events.add("createDataToServer", (first, last, bday) => {
    mp.events.callRemote("sendCreateDataToServer", first, last, bday);  
});



mp.events.add("client:login:banned", (state,day) => {
    loginBrowser.execute("Banned('" + state + "','" + "Dein Account ist noch bis zum " + day+ " gesperrt!" + "');");
    mp.events.call("loginHandler", "banned");
});
mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            mp.gui.cursor.show(false, false);
            mp.events.callRemote("getDoors", mp.players.local);
            mp.game.controls.disableControlAction(2, 243, true);
            break;
        }
        case "destroy":
        {
            loginBrowser.destroy();
            mp.events.callRemote("getDoors", mp.players.local);
            mp.game.controls.disableControlAction(2, 243, true);
            break;
        }
        case "banned":
        {
            mp.events.callRemote("server:login:banned");
            mp.gui.cursor.show(false, false);
            mp.events.callRemote("getDoors", mp.players.local);
            mp.game.controls.disableControlAction(2, 243, true);
            break;
        }
        case "registered":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Registration successful");
            mp.gui.cursor.show(false, false);
            mp.events.callRemote("getDoors", mp.players.local);
            mp.game.controls.disableControlAction(2, 243, true);
            break;
        }
        case "incorrectinfo":
        {
            loginBrowser.execute(`$(".incorrect-info").show(); $("#loginBtn").show();`);
            break;
        }
        case "takeninfo":
        {
            loginBrowser.execute(`$(".taken-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "tooshort":
        {
            loginBrowser.execute(`$(".short-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "logged":
        {
            loginBrowser.execute(`$(".logged").show(); $("#loginBtn").show();`);
            break;
        }
        default:
        {
            break;
        }
    }
});