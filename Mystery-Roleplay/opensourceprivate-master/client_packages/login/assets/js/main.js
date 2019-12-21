function sendAccountInfo(state){
    if(state === 0){    //Login State
        let loginName = document.getElementById("loginName");
        let loginPass = document.getElementById("loginPass");  
        mp.trigger("loginDataToServer", loginName.value, loginPass.value, state);
    } else {    //Register State
        let loginName = document.getElementById("loginName");
        let loginPass = document.getElementById("loginPass");   
        mp.trigger("loginDataToServer", loginName.value, loginPass.value, state);
    }
}
