var currentTarget = null;

mp.events.add("server:bank:konten", (player,atmid) => {
    if(mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT kontonummer,id,beschreibung FROM bank_konten WHERE ownerId = ?", [player.data.charId], function(err, res) {
            if (err) console.log("Error in Select Bank Konten: "+err);
            if (res.length > 0) {
                var i = 1;
                let BankList = [];
                res.forEach(function(bank) {
                    let obj = {"nummer": String(bank.kontonummer), "id": String(bank.id), "name": String(bank.beschreibung)};
                    BankList.push(obj);
    
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:bank:openMenu", [JSON.stringify(BankList),atmid]);
                    }
                    i++;
                });
            } else {
                if(mp.players.exists(player)) player.notify("~r~Du hast kein Bank Konto!");
            }        
        });
    }    
});

mp.events.add("server:bank:abheben", (player, id,atmid) => {
    if (mp.players.exists(player)) player.setVariable("bankid",id);
    if (mp.players.exists(player)) player.setVariable("atmid",atmid);
  });

mp.events.add("server:bank:kontostand", (player, id) => {
    if(mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT amount FROM bank_konten WHERE id = ? AND ownerId = ?",[id, player.data.charId], function(err, res) {
            if (err) console.log("Error in Select Bank konten: "+err);
            if (res.length > 0) {
                player.notify("Aktueller Kontostand: "+res[0].amount);
            } else {
                player.notify("~r~Dieses Konto gehört dir nicht!");
            }
        });
    }    
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "moneyeinzahlen") {      
          var id = player.getVariable("bankid");  
          var atmid = player.getVariable("atmid");
        gm.mysql.handle.query("SELECT money FROM characters WHERE id = ?", [player.data.charId], function(err,res) {
            if(err) console.log("Error in Select Characters: "+err);
            gm.mysql.handle.query("SELECT money FROM atms WHERE id = ?",[atmid],function(err4,res4) {
                if (err4) console.log("Error in Select ATM: "+err4);
                res.forEach(function(bar) {
                    if ((output*1) > (bar.money*1)) {
                        player.notify("~r~Du hast nicht genug Bargeld dabei!");
                    } else {                       
                        gm.mysql.handle.query("SELECT amount FROM bank_konten WHERE id = ? AND ownerId = ?", [id, player.data.charId], function (err3,res3) {
                            if (err3) console.log("Error in Select bank Konten: "+err3);
                            res3.forEach(function(bank) {
                                var newAm = parseFloat(parseFloat(bank.amount) + parseFloat(output));
                                var newMoney = parseFloat( parseFloat(bar.money*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE id = ?", [newAm, id], function(err1,res1) {
                                    if(err) console.log("Error in Update Bank Konten: "+err);                            
                                    gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newMoney, player.data.charId], function(err2,res2) {
                                        if(err2) console.log("Error in update Charactersmoney: "+err2);                                        
                                        var newAtmAM = parseFloat(parseFloat(res4[0].money) + parseFloat(output));
                                        gm.mysql.handle.query("UPDATE atms SET money = ? WHERE id = ?",[newAtmAM,atmid],function(err5,res5) {
                                            if (err5) console.log("Error in Select ATM: "+err5);   
                                            player.data.money = newMoney;           
                                            player.notify("~g~Du hast "+output+"$ eingezahlt");     
                                            player.call("changeValue", ['money', player.data.money]);   
                                            ////mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat "+output+"$ eingezahlt.");                        
                                        });
                                    });
                                });
                            });
                        });                         
                    }
                });
            });
        });
      }
    }
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "moneyabheben") {      
          var id = player.getVariable("bankid");  
          var atmid = player.getVariable("atmid");
            gm.mysql.handle.query("SELECT amount FROM bank_konten WHERE id = ?", [id], function(err,res) {
                if(err) console.log("Error in Select Characters: "+err);
                gm.mysql.handle.query("SELECT money FROM atms WHERE id = ?",[atmid],function(err4,res4) {
                    if (err4) console.log("Error in Select ATM: "+err4);
                res.forEach(function(bank) {
                    if ((output*1) > (bank.amount*1)) {
                        player.notify("~r~Du hast nicht genügend Geld auf dem Konto!");
                    } else {
                        if (output*1 > (res4[0].money*1)) {
                            player.notify("~r~Der ATM hat nicht genügend Geld");
                        } else {                        
                            gm.mysql.handle.query("SELECT money FROM characters WHERE id = ?", [player.data.charId], function (err3,res3) {
                                if (err3) console.log("Error in Select bank Konten: "+err3);
                                res3.forEach(function(bar) {
                                    var newAm = parseFloat(parseFloat(bar.money) + parseFloat(output)).toFixed(2);
                                    var newBank = parseFloat( parseFloat(bank.amount*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2);
                                    gm.mysql.handle.query("UPDATE bank_konten SET amount = ? WHERE id = ?", [newBank, id], function(err1,res1) {
                                        if(err) console.log("Error in Update Bank Konten: "+err);                            
                                        gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.charId], function(err2,res2) {
                                            if(err2) console.log("Error in update Charactersmoney: "+err2);
                                            var newAtmAM = parseFloat( parseFloat(res4[0].money*1).toFixed(2) - parseFloat(output*1).toFixed(2) ).toFixed(2); 
                                            gm.mysql.handle.query("UPDATE atms SET money = ? WHERE id = ?",[newAtmAM,atmid],function(err5,res5) {
                                                if (err5) console.log("Error in Select ATM: "+err5);   
                                                player.data.money = newAm;    
                                                player.notify("~g~Du hast "+output+"$ abgehoben");     
                                                player.call("changeValue", ['money', player.data.money]);   
                                                mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat "+output+"$ abgehoben.");                                      
                                            });
                                        });
                                    });
                                });
                            }); 
                        }
                    }
                });
            });
        });
      }
    }
});


mp.events.add("inputValueShop", (player, trigger, output) => {
    if(trigger === "giveMoneyToTarget"){
        getNearestPlayer(player, 2);
        if (currentTarget !== null) {
            if (parseFloat(player.data.money) > parseFloat(output)) {
                var playerMoney = parseFloat(player.data.money);
                var targetMoney = parseFloat(currentTarget.data.money);
                player.playAnimation('mp_common', 'givetake2_a', 1, 49);
                setTimeout(_ => {
                  if (mp.players.exists(player)) player.stopAnimation();
                }, 2500);
                var playerMoney = parseFloat(playerMoney - output).toFixed(2);
                var targetMoney = parseFloat(parseFloat(targetMoney) + parseFloat(output)).toFixed(2);
                currentTarget.data.money = targetMoney;
                player.data.money = playerMoney;
                gm.mysql.handle.query("UPDATE `characters` SET money = ? WHERE id = ?",[playerMoney,player.data.charId], function(errPlayer, resPlayer) {
                  if (errPlayer) console.log("Error in Player give Money for Player: "+errPlayer);
                  gm.mysql.handle.query("UPDATE `characters` SET money = ? WHERE id = ?",[targetMoney,currentTarget.data.charId], function(errPlayer, resPlayer) {
                    if (errPlayer) console.log("Error in Player give Money for Target: "+errPlayer);
                    player.call("updateHudMoney",[player.data.money]);       
                    player.call("changeValue", ['money', player.data.money]); 
                    currentTarget.call("updateHudMoney",[currentTarget.data.money]);       
                    currentTarget.call("changeValue", ['money', currentTarget.data.money]); 
                    player.notify("~g~Du hast "+output+"$ weitergegeben!");
                    currentTarget.notify("~g~Du hast "+output+"$ bekommen!");
                    //mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat "+currentTarget.data.firstname+" "+currentTarget.data.lastname+" "+output+"$ gegeben!");  
                  });
                });               
                
            } else {
                player.notify("Du hast nicht genug Bargeld dabei!");
            }
        }
    }
});

mp.events.add("server:bank:ausrauben",(player,atmid) => {     
    if (mp.players.exists(player)) {
        gm.mysql.handle.query("SELECT COUNT(id) AS counter FROM characters WHERE isOnline = '1' AND faction = 'LSPD' AND duty = '1'", function (err, res) {
            if (err) console.log("Error in Count Duty Officers: "+err);
            if (res[0].counter >= 4) {               
                player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);      
                player.call('progress:start', [120, "Raube ATM aus"]);
                player.call("client:bank:showDispatch");  
                setTimeout(_ => {
                    if (mp.players.exists(player)) {
                        player.stopAnimation();
                        gm.mysql.handle.query("SELECT * FROM atms WHERE id = ?",[atmid],function(err3,res3) {
                            if (err3) console.log("Error in Select ATM Rob: "+err3);
                            let distance = mp.Vector3.Distance2D(player.position, new mp.Vector3(parseFloat(res3[0].posX), parseFloat(res3[0].posY), parseFloat(res3[0].posZ)));
                            if (distance <= 2) {
                                var robMoney = "" + Math.floor(Math.random() * 2000);
                                gm.mysql.handle.query("SELECT money FROM characters WHERE id = ?",[player.data.charId],function(err3,res3) {
                                    if(err3) console.log("Errorin Select Money"+err3);
                                    var newAm = parseFloat(parseFloat(res3[0].money) + parseFloat(robMoney));
                                gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newAm,player.data.charId], function(err,res) {
                                    if (err) console.log("Error in Update money: "+err);
                                        player.notify("~g~Du hast ausgeraubt: "+newRobMoney);                             
                                        gm.mysql.handle.query("UPDATE atms SET usable = '1' WHERE id = ?",[atmid],function(err1,res1) {
                                            if (err1) console.log("Error in Update Rob ATM: "+err1);
                                            player.data.money = newAm;
                                            //mp.events.call("sqlLog", player, player.data.firstname+" "+player.data.lastname+" hat ATM: "+player.position+"ausgeraubt.");  
                                        });
                                    });
                                });                                
                            } else {
                                player.notify("~r~Du hast dich zu weit entfernt!");
                            }                                              
                        }); 
                    }                                            
                }, 120000);
            } else {
                player.notify("~r~Es sind nicht genügend Cops im Dienst");
            }
        });     
    }    
});

mp.events.add("server:bank:playerrob", (player) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player, 2);
        if (mp.players.exists(currentTarget)) {
            if (currentTarget !== null) {
                gm.mysql.handle.query("UPDATE characters SET money = '0' WHERE id = ?", [currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update characters Money: "+err);
                    gm.mysql.handle.query("SELECT money FROM characters WHERE id = ?",[player.data.charId],function(err3,res3) {
                        if(err3) console.log("Errorin Select Money"+err3);
                        var newAm = parseFloat(parseFloat(res3[0].money) + parseFloat(currentTarget.data.money)).toFixed(2);
                        gm.mysql.handle.query("UPDATE characters SET money = ? WHERE id = ?", [newAm, player.data.charId], function(err1,res1) {
                            if (err1) console.log("Error in Update Characters Money2: "+err1);
                            player.call("updateHudMoney",[newAm]);                        
                            player.call("changeValue",["money",newAm]);
                            currentTarget.call("updateHudMoney",[0]);
                            currentTarget.call("changeValue",["money",0]);
                            player.notify("~g~Du hast "+currentTarget.data.money+" ausgeraubt");
                            currentTarget.notify("~r~Du wurdest um "+currentTarget.data.money+" ausgeraubt");
                            player.data.money = newAm;
                            currentTarget.data.money = 0;
                        });
                    });                    
                });
            } else {
                player.notify("Keiner in deiner Nähe!");
            }
        }        
    }    
});

mp.events.add("server:playermenu:removephone",(player) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player, 2);
        if (mp.players.exists(currentTarget)) {
            if (currentTarget !== null) {
                var handy = currentTarget.getVariable("phone");
                if (handy == 1) {
                    gm.mysql.handle.query("UPDATE characters SET phone = '0', phoneOff = '1' WHERE id = ?",[currentTarget.data.charId],function(err,res) {
                        if (err) console.log("Error in update phone: "+err);
                        gm.mysql.handle.query("INSERT INTO user_items SET charId = ?, itemId = '11', amount = '1'",[player.data.charId],function(err1,res1) {
                            if (err1) console.log("Error in Inser items on Handy: "+err1);
                            currentTarget.setVariable("phone", 0);
                            currentTarget.notify("~r~Dir wurde dein Handy abgenommen!");
                            player.notify("~g~Du hast das Handy abgenommen");
                        });
                    });                    
                }
            } else {
                player.notify("~r~Keiner in deiner Nähe");
            }
        }
    }
});

mp.events.add("server:bank:repair",(player,atmid) => {
    if (player.data.faction == "LSPD") {
        player.playAnimation('oddjobs@taxi@gyn@', 'idle_b_ped', 1, 33);      
                player.call('progress:start', [120, "Repariere ATM"]);
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                    gm.mysql.handle.query("UPDATE atms SET money = '0', usable = '0' WHERE id = ?",[atmid],function(err1,res1) {
                        if (err1) console.log("Error in Update Rob ATM: "+err1);
                    });                       
                }, 120000);
    } else {
        player.notify("~r~Der ATM ist Kaputt");
    }

});

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range, (_player) => {
        if(player != _player) {
            let _dist = _player.dist(player.position);
            if(_dist < dist) {
                currentTarget = _player;
                dist = _dist;
            }
        }
    });
}

