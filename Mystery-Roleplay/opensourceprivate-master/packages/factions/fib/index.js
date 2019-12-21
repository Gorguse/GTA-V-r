let duty = mp.colshapes.newSphere(720.8220825195312, -969.219482421875, 30.395336151123047, 2, 0);
let clothes = mp.colshapes.newSphere(708.6118774414062, -959.5208129882812, 30.395339965820312, 2, 0);
let equip = mp.colshapes.newSphere(705.0650024414062, -961.6991577148438, 30.395343780517578, 2, 0);
let chief = mp.colshapes.newSphere(707.3721923828125, -966.9055786132812, 30.412853240966797, 2, 0);
let pc = mp.colshapes.newSphere(711.4363403320312, -969.4055786132812, 30.395336151123047, 2, 0);
let vehicle = mp.colshapes.newSphere(695.3265991210938, -973.0942993164062, 23.95747947692871,4, 0);
let heli = mp.colshapes.newSphere(705.2907104492188, -957.1031494140625, 30.867544174194336,4, 0);
let parkin = mp.colshapes.newSphere(156,-681,33, 3, 0);

mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (player.data.faction == "FIB") {
            if(pc.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fib:createOfficeComputer",[player.data.factionrang]);
                player.data.mainmenu = true;
            } else if(vehicle.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fib:createVeichleMenu",[player.data.factionrang]);
                player.data.mainmenu = true;
            } else if(heli.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fib:createHeliMenu",[player.data.factionrang]);
                player.data.mainmenu = true;
            }else if(duty.isPointWithin(player.position) && player.data.mainmenu == false) {
                mp.events.call("server:faction:duty", player);
            }else if(equip.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fib:openWeapon",[1]);
                player.data.mainmenu = true;
            }else if(chief.isPointWithin(player.position) && player.data.mainmenu == false && player.data.factionrang > 6) {
                player.call("client:fib:createChiefMenu",[player.data.factionrang]);
                player.data.mainmenu = true;
            }else if(parkin.isPointWithin(player.position) && player.data.mainmenu == false) {
                mp.events.call("server:fib:parkin",(player));
            }else if(clothes.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fib:clothes");
                player.data.mainmenu = true;
            }
        }      
    }
  });

mp.events.add("server:fib:clothes", (player,name) => {
    if (name == "Undercover") {                
        gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Undercover' WHERE id = ?", [player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Faction Clothes: "+err);
            gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[player.data.charId], function(err5,res5) {
                if (err5) console.log("Error in Select Character: "+err5);                
                res5.forEach(function(modelData) {
                    player.setProp(0,modelData.hat,modelData.hattext); //Hut
					player.setProp(1,modelData.eye,modelData.eyetext); //Brille
					player.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
					player.setClothes(3,modelData.torso,0,0); //Torso
					player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
					player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
					player.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
					player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
					player.setClothes(9,modelData.body,modelData.bodytext,0); //Body
					player.setClothes(7,modelData.accessoire,modelData.accessoiretext,2); // Accesior
					player.setClothes(10,0,1,2); // Decal
					player.setClothes(9,0,0,2); // Weste
					player.data.body = 0;
					player.data.bodytext = 0;
					player.data.decal = 0;
					player.data.decaltext = 1;
					player.data.hat = modelData.hat;
					player.data.hattext = modelData.hattext;
					player.data.eye = modelData.eye;
					player.data.eyetext = modelData.eyetext;
					player.data.mask = modelData.mask;
					player.data.masktext = modelData.masktext;
					player.data.torso = modelData.torso;
					player.data.jacket = modelData.jacket;
					player.data.jackettext = modelData.jackettext;
					player.data.leg = modelData.leg;
					player.data.legtext = modelData.legtext;
					player.data.shoe = modelData.shoe;
					player.data.shoetext = modelData.shoetext;
					player.data.shirt = modelData.shirt;
					player.data.shirttext = modelData.shirttext;
					player.data.accessoire = modelData.accessoire;
					player.data.accessoiretext = modelData.accessoiretext;
					player.data.decal = 0;
					player.data.decaltext = 0;
                });                        
           });                    
        });
    } else {
        if (name == "Sondereinsatz-Uniform") {
            gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Sondereinsatz-Uniform' WHERE id = ?", [player.data.charId], function(err3,res3) {
                if (err3) console.log("Error in Update Faction Clothes: "+err3);
                if (player.data.gender == 0) {
                    player.setProp(0, 117, 0) //Hut
                    player.data.hat = 117;
                    player.data.hattext = 0;
                    player.setClothes(1,126,0,2); // Maske
                    player.data.mask = 126;
                    player.data.masktext = 0;
                    player.setClothes(3,17,0,2); // Torso
                    player.data.torso = 17;
                    player.setClothes(8,122,0,2); // Shirt
                    player.data.shirt = 122;
                    player.data.shirttext = 0;
                    player.setClothes(9,1,1,2); // Weste
                    player.data.body = 1;
                    player.data.bodytext = 1;
                    player.setClothes(11,53,0,2); // Jacke
                    player.data.jacket = 53;
                    player.data.jackettext = 0;
                    player.setClothes(4,33,0,2); // Hose
                    player.data.leg = 33;
                    player.data.legtext = 0;
                    player.setClothes(6,25,0,2); // Schuh
                    player.data.shoe = 25;
                    player.data.shoetext = 0;
                    player.setClothes(10,0,1,2); // Decal
                    player.data.decal = 0;
                    player.data.decaltext = 1;
                    player.setClothes(7,125,0,2); // Accesior
                    player.data.accessoire = 125;
                    player.data.accessoiretext = 0;
                } else {
                    player.setProp(0, 38, 0) //Hut
                    player.data.hat = 38;
                    player.data.hattext = 0;
                    player.setClothes(1,126,0,2); // Maske
                    player.data.mask = 126;
                    player.data.masktext = 0;
                    player.setClothes(3,18,0,2); // Torso
                    player.data.torso = 18;
                    player.setClothes(8,35,0,2); // Shirt
                    player.data.shirt = 35;
                    player.data.shirttext = 0;
                    player.setClothes(11,302,0,2); // Jacke
                    player.data.jacket = 302;
                    player.data.jackettext = 0;
                    player.setClothes(4,32,0,2); // Hose
                    player.data.leg = 32;
                    player.data.legtext = 0;
                    player.setClothes(6,25,0,2); // Schuhe
                    player.data.shoe = 25;
                    player.data.shoetext = 0;
                    player.setClothes(10,0,1,2); // Decal
                    player.data.decal = 0;
                    player.data.decaltext = 1;
                    player.setClothes(9,1,1,2); // Weste
                    player.data.body = 1;
                    player.data.bodytext = 1;
                    player.setClothes(7,95,0,2); // Accesior
                    player.data.accessoire = 95;
                    player.data.accessoiretext = 0;
                }                
            });
        } else {
            if (name == "Zivil") {
                gm.mysql.handle.query("UPDATE characters SET factioncloth = 'Zivil' WHERE id = ?", [player.data.charId], function(err4,res4) {
                    if (err4) console.log("Error in Update Faction Clothes: "+err4);
                    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[player.data.charId], function(err5,res5) {
                        if (err5) console.log("Error in Select Character: "+err5);                        
                        res5.forEach(function(modelData) {
                            player.setProp(0,modelData.hat,modelData.hattext); //Hut
                            player.setProp(1,modelData.eye,modelData.eyetext); //Brille                            
                            player.setClothes(3,modelData.torso,0,0); //Torso
                            player.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                            player.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                            player.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                            player.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                            player.setClothes(9,modelData.body,modelData.bodytext,0); //Body                                                     
                            player.data.hat = modelData.hat;
                            player.data.hattext = modelData.hattext;
                            player.data.eye = modelData.eye;
                            player.data.eyetext = modelData.eyetext;
                            player.data.torso = modelData.torso;
                            player.data.jacket = modelData.jacket;
                            player.data.jackettext = modelData.jackettext;
                            player.data.leg = modelData.leg;
                            player.data.legtext = modelData.legtext;
                            player.data.shoe = modelData.shoe;
                            player.data.shoetext = modelData.shoetext;
                            player.data.shirt = modelData.shirt;
                            player.data.shirttext = modelData.shirttext;
                            if (player.data.gender == 0) {
                                player.setClothes(7,125,0,2); // Accesior                              
                                player.setClothes(10,0,1,2); // Decal
                                player.setClothes(9,0,0,2); // Weste
                                player.setClothes(1,121,0,2); // Maske
                                player.data.accessoire = 125;
                                player.data.accessoiretext = 0; 
                                player.data.mask = 121;
                                player.data.masktext = 0;
                                player.data.body = 0;
                                player.data.bodytext = 0;
                                player.data.decal = 0;
                                player.data.decaltext = 1;
                            } else {    
                                player.setClothes(7,95,0,2); // Accesior                              
                                player.setClothes(10,0,1,2); // Decal
                                player.setClothes(9,0,0,2); // Weste
                                player.setClothes(1,121,0,2); // Maske
                                player.data.accessoire = 95;
                                player.data.accessoiretext = 0; 
                                player.data.mask = 121;
                                player.data.masktext = 0;
                                player.data.body = 0;
                                player.data.bodytext = 0;
                                player.data.decal = 0;
                                player.data.decaltext = 1;
                            }

                        });                          
                   });                                   
               });                
            }
        }
    }
});
mp.events.add("server:fib:mainMenu", (player,slot) => {
    getNearestPlayer(player, 2);   
        if(slot == "Dienstausweis zeigen")
	{
        // Dienstausweis zeigen
        if (currentTarget !== null) {
            player.notify("Du hast deinen Dienstausweis gezeigt.");
            player.playAnimation('mp_common', 'givetake2_a', 1, 49);
            gm.mysql.handle.query("SELECT rankname FROM payChecks WHERE factionrang = ? AND faction = ?",[player.data.factionrang,player.data.faction], function(err,res) {
                if (err) console.log(err);
                currentTarget.call("client:dokumente:showfib",[player.data.firstname,player.data.lastname,res[0].rankname,player.data.factiondn]);
                setTimeout(_ => {
                    if (mp.players.exists(player)) player.stopAnimation();
                }, 2500);
            });            
        } else {
            player.notify("~r~Keiner in deiner Nähe!");
        }
        
	}
	else if(slot == "Festnehmen")
	{
        currentTarget.playAnimation("mp_arresting", "idle", 1,49);
        currentTarget.setVariable("arresting",true);
		currentTarget.notify("Dir wurden Handstellen angelegt!");
		player.notify("Bürger festgenommen");
	}
	else if(slot == "Freilassen")
	{
		currentTarget.notify("Die Handschellen wurden dir abgenommen!");
        player.notify("Bürger freigelassen");
        currentTarget.stopAnimation();
        currentTarget.setVariable("arresting",false);
	}
	else if(slot == "Durchsuchen")
	{
        if(mp.players.exists(player)) {
            if (mp.players.exists(currentTarget)) {
                gm.mysql.handle.query("SELECT u.*, i.itemName FROM user_items u LEFT JOIN items i ON i.id = u.itemId WHERE u.charId = ?",[currentTarget.data.charId], function(err, res) {
                if (err) console.log("Error in Police Search Query: "+err);
                if (res.length > 0) {
                if(mp.players.exists(player)) player.call("client:fib:searchInvMenu",[JSON.stringify(res)]);
                } else {
                if(mp.players.exists(player)) player.notify("~g~Die Person trägt nichts bei sich.");
                }
            });
            }
        }
    }
    else if(slot == "Waffen Durchsuchen")
	{
        if(mp.players.exists(player)) {
            if (mp.players.exists(currentTarget)) {
                getNearestPlayer(player, 2);  
                if (currentTarget !== null) {
                    gm.mysql.handle.query("SELECT * FROM user_weapons WHERE charId = ?", [currentTarget.data.charId], function(err, res) {
                        if (err) console.log("Error in Select Bank Konten: "+err);
                        if (res.length > 0) {
                            var i = 1;
                            res.forEach(function(weapon) {
                                var taser = weapon.taser;
                                var pistol = weapon.pistol;
                                var fivepistol = weapon.fivepistol;
                                var schwerepistol = weapon.schwerepistol;
                                var appistol = weapon.appistol;
                                var smg = weapon.smg;
                                var pdw = weapon.pdw;
                                var karabiner = weapon.karabiner;
                                var pump = weapon.pump;
                                var taschenlampe = weapon.taschenlampe;
                                var schlagstock = weapon.schlagstock;
                                var messer = weapon.messer;
                                var bat = weapon.bat;
                                if (parseInt(i) == parseInt(res.length)) {
                                    if(mp.players.exists(player)) player.call("client:fib:weaponssee", [taser,pistol,fivepistol,schwerepistol,appistol,smg,pdw,karabiner,pump,taschenlampe,schlagstock,messer,bat,currentTarget]);
                                }
                                i++;
                            });
                        } else {
                            player.notify("~r~Die Person besitzt keine Waffen");
                        }        
                    });
                } 
            }
        }
    }    
	else if(slot == "Bußgeld ausstellen")
	{
		//Bußgeld ausstellen
	}
	else if(slot == "Mitarbeiterverwaltung")
	{
		player.call("client:fib:closeMainMenu");
		player.call("client:fib:openMemberMenu");
    }
    else if (slot == "Dispatches") {
        if(mp.players.exists(player)) {
            gm.mysql.handle.query("SELECT * FROM faction_dispatches WHERE faction = 'LSPD' AND active = 'Y' OR faction = 'AtmRob' AND active = 'Y' OR faction = 'ShopRob' AND active = 'Y'", [], function(err, res) {
              if (err) console.log("ERROR in Select Dispatches: "+err);
                  if (res.length > 0) {
                      var i = 1;
                      let DisList = [];
                      res.forEach(function(dis) {
                          let obj = {"id": String(dis.id),"posx":dis.posx,"posy":dis.posy,"disid": String(dis.dispatchid)};
                          DisList.push(obj);
        
                          if (parseInt(i) == parseInt(res.length)) {
                              if(mp.players.exists(player)) player.call("client:fib:dispatchvewer", [JSON.stringify(DisList)]);
                          }
                          i++;
                      });
                  } else {
                      if(mp.players.exists(player)) player.call("client:fib:dispatchvewer", ["none"]);
                  }
              });
          }
    }
    else if (slot == "Fahrzeug Beschlagnahmen") {
        if(mp.players.exists(player)) {
            var vehicles = getVehicleFromPosition(player.position, 3);
            if (vehicles.length > 0) {
                if (mp.vehicles.exists(vehicles[0])) {
                var veh = vehicles[0];
                var id = veh.getVariable("vehId");
                    gm.mysql.handle.query("UPDATE vehicles SET parked = '1' , impounded = '1' WHERE id = ?", [id], function (err, res) {
                        if (err) console.log(err);
                        player.notify("~g~Du hast das Fahrzeug beschlagnahmt!");
                        if (mp.vehicles.exists(veh)) {
                        veh.destroy();
                        }
                    });
                }
            }
        }
    }
	
});

mp.events.add("server:fib:weaponbesch",(player,waffe,target) => {
    if (waffe == "Taser") {
        gm.mysql.handle.query("UPDATE user_weapons SET taser = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x3656C8C1);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Pistole") {
        gm.mysql.handle.query("UPDATE user_weapons SET pistol = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x1B06D571);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "50. Kaliber") {
        gm.mysql.handle.query("UPDATE user_weapons SET fivepistol = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x99AEEB3B);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Schwere Pistole") {
        gm.mysql.handle.query("UPDATE user_weapons SET schwerepistol = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0xD205520E);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "AP Pistole") {
        gm.mysql.handle.query("UPDATE user_weapons SET appistol = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x22D8FE39);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "SMG") {
        gm.mysql.handle.query("UPDATE user_weapons SET smg = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x2BE6766B);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "PDW") {
        gm.mysql.handle.query("UPDATE user_weapons SET pdw = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x0A3D4D34);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Karabiner") {
        gm.mysql.handle.query("UPDATE user_weapons SET karabiner = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x83BF0278);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Pump Schrotflinte") {
        gm.mysql.handle.query("UPDATE user_weapons SET pump = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x1D073A89);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Taschenlampe") {
        gm.mysql.handle.query("UPDATE user_weapons SET taschenlampe = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x8BB05FD7);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Schlagstock") {
        gm.mysql.handle.query("UPDATE user_weapons SET schlagstock = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x678B81B1);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Messer") {
        gm.mysql.handle.query("UPDATE user_weapons SET messer = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x99B507EA);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
    if (waffe == "Baseballschläger") {
        gm.mysql.handle.query("UPDATE user_weapons SET bat = '0' WHERE charId = ?",[target.data.charId],function(err,res) {
            if (err) console.log("Error in Update user weapons: "+err);
            target.removeWeapon(0x958A4A8F);
            player.notify("~g~Beschlagnahmt: "+waffe);
            target.notify("~r~Beschlagnahmt: "+waffe);
        });
    }
});

mp.events.add("server:fib:removeItem", (player, invItemId) => {
    if(mp.players.exists(player)) {
      gm.mysql.handle.query("SELECT u.amount, i.itemcount, c.id FROM user_items u LEFT JOIN items i ON i.id = u.itemId LEFT JOIN characters c ON c.id = u.charId WHERE u.id = ?",[invItemId], function(err, res) {
        if (err) console.log("Error in get police remove query 1: "+err);
        if (res.length > 0) {
          res.forEach(function(item) {  
            gm.mysql.handle.query("DELETE FROM user_items WHERE id = ?", [invItemId], function(err3, res3) {
                if (err3) {
                  console.log("Error in police remove query 3: "+err3);
                  if(mp.players.exists(player)) player.notify("~r~Der Gegenstand konnte nicht beschlagnahmt werden.");
                } else {
                  if(mp.players.exists(player)) player.notify("~g~Der Gegenstand wurde beschlagnahmt.");
                }
              });
            });
        }
      });
    }
  });

mp.events.add("server:fib:mark", (player, id) => {
    gm.mysql.handle.query("SELECT posx,posy FROM faction_dispatches WHERE id = ?", [id], function(err,res) {
      if(err) console.log("Error in Select Dispatch: "+err);
      player.call("client:fib:markdispatch", [res[0].posx, res[0].posy])
    });
  });
  
  mp.events.add("server:fib:deletedispatch", (player, id) => {
    gm.mysql.handle.query("UPDATE faction_dispatches SET active = 'N' WHERE id = ?", [id], function (err,res) {
      if(err) console.log("Error in Update Dispatch: "+err);
    });
  });
mp.events.add("server:fib:memberMenu", (player,slot) => {
    getNearestPlayer(player, 2);    
    if(slot == 0)
    {
        if(currentTarget.data.faction == "Civillian")
        {
           // Person Einstellen     
        }else {
            player.notifyWithPicture("Federal Investigation Bureau", "Einstellung", "Hat bereits eine Anstellung!","CHAR_CALL911");
        }
    }
    else if (slot == 1)
    {
        if(currentTarget.data.faction == "FIB")
        {
            //Befördern
        }
    }
    else if(slot == 2)
    {
        if(currentTarget.data.faction == "FIB")
        {
            //Dienstnummer zuweisen
        }
    }
    else if(slot == 3)
    {
        if(currentTarget.data.faction == "FIB")
        {
            //Mitarbeiter entlassen
            player.notify("Ist Member");
            player.call("client:fib:closeMemberMenu");
            player.call("client:fib:askedForDismiss");
        }
    }
});
mp.events.add("server:fib:entlassen", (player,itemText) => {
    getNearestPlayer(player, 2);   
    if(currentTarget !== null) {        
        currentTarget.notifyWithPicture("Federal Investigation Bureau", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
        currentTarget.call("client:faction:delmarkers");
        player.notifyWithPicture("Federal Investigation Bureau", "Mitarbeiterverwaltung","Du hast "+currentTarget.data.firstname + " "+ currentTarget.data.lastname + " entlassen.","CHAR_CALL911");
        currentTarget.data.faction = "Civillian";
        currentTarget.data.factionDuty = 0;
        currentTarget.data.factionrang = 0;
        gm.mysql.handle.query("UPDATE characters SET faction = ?, duty = ?, factionrang = ?, factioncloth = 'Zivil' WHERE id = ?", [currentTarget.data.faction, currentTarget.data.factionDuty,currentTarget.data.factionrang,currentTarget.data.charId], function(err12, ress12) {
            if(err12) console.log("Error in FIB Dismiss Member");
        });
        gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[currentTarget.data.charId], function(err5,res5) {
            if (err5) console.log("Error in Select Character: "+err5);
            
            res5.forEach(function(modelData) {
                currentTarget.setProp(0,modelData.hat,modelData.hattext); //Hut
                    currentTarget.data.faction = 'Civillian';
                    currentTarget.data.factionDuty = 0;
                    currentTarget.data.factionrang = 0;
                    currentTarget.setProp(1,modelData.eye,modelData.eyetext); //Brille
                    currentTarget.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                    currentTarget.setClothes(3,modelData.torso,0,0); //Torso
                    currentTarget.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                    currentTarget.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                    currentTarget.setClothes(11,modelData.jacket,currentTarget.data.jackettext,0);//Jacke
                    currentTarget.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                    currentTarget.setClothes(9,modelData.body,modelData.bodytext,0); //Body
                    currentTarget.setClothes(7,modelData.accessoire,modelData.accessoiretext,2); // Accesior
                    currentTarget.setClothes(10,0,1,2); // Decal
                    currentTarget.setClothes(9,0,0,2); // Weste
                    currentTarget.data.body = 0;
                    currentTarget.data.bodytext = 0;
                    currentTarget.data.decal = 0;
                    currentTarget.data.decaltext = 1;
                    currentTarget.data.hat = modelData.hat;
                    currentTarget.data.hattext = modelData.hattext;
                    currentTarget.data.eye = modelData.eye;
                    currentTarget.data.eyetext = modelData.eyetext;
                    currentTarget.data.mask = modelData.mask;
                    currentTarget.data.masktext = modelData.masktext;
                    currentTarget.data.torso = modelData.torso;
                    currentTarget.data.jacket = modelData.jacket;
                    currentTarget.data.jackettext = modelData.jackettext;
                    currentTarget.data.leg = modelData.leg;
                    currentTarget.data.legtext = modelData.legtext;
                    currentTarget.data.shoe = modelData.shoe;
                    currentTarget.data.shoetext = modelData.shoetext;
                    currentTarget.data.shirt = modelData.shirt;
                    currentTarget.data.shirttext = modelData.shirttext;
                    currentTarget.data.accessoire = modelData.accessoire;
                    currentTarget.data.accessoiretext = modelData.accessoiretext;
                    currentTarget.data.decal = 0;
                    currentTarget.data.decaltext = 0;
                    currentTarget.call("client:faction:delmarkers");
                    currentTarget.removeWeapon(0x8BB05FD7);
                    currentTarget.removeWeapon(0x678B81B1);
                    currentTarget.removeWeapon(0x3656C8C1);
                    currentTarget.removeWeapon(0x99AEEB3B);
                    currentTarget.removeWeapon(0x22D8FE39);
                    currentTarget.removeWeapon(0x2BE6766B);
                    currentTarget.removeWeapon(0x83BF0278);  
                    gm.mysql.handle.query("UPDATE faction_weapons SET taser = '0',pistol = '0',appistol = '0',smg = '0',karabiner = '0',taschenlampe = '0',schlagstock = '0' WHERE charId = ?",[currentTarget.data.charId],function(err2,res2) {
                        if (err2) console.log("error in update faction weapons: "+err2);
                    });
            });                          
        });
    }   
});
mp.events.add("server:fib:officeComputer", (player, itemText) => {
    if(itemText == "Aktive Mitarbeiter")
    {
        gm.mysql.handle.query("SELECT firstname,lastname,factionrang,onlineId FROM characters WHERE faction = 'FIB' AND duty = '1' AND isOnline = '1'",[],function(err,res) {
            if(err) console.log("Error in Select Active FIB Members: "+err);
            if (res.length > 0) {
                var PlayerList = [];
                var i = 1;
                res.forEach(function(players) {
                    let obj = { "firstname": String(players.firstname), "lastname": String(players.lastname),"factionrang": String(players.factionrang), "onlineid": String(players.onlineId)};
                    PlayerList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if (mp.players.exists(player)) player.call("client:fib:activeMemberList", [JSON.stringify(PlayerList)]);
                    }
                    i++;
                });
            } else {
                //Keine Spieler Online
            }
        });    
    } 
    else if(itemText == "Halterabfrage")
    {
    }
    else if (itemText == "Ausnahmezustand")
    {
        gm.mysql.handle.query("SELECT ausnahme FROM faction WHERE name = 'FIB'",[],function(err1,res1) {
            if (err1) console.log("Error in Select ausnahmezustand: "+err1);
            if (res1[0].ausnahme == 0) {
                gm.mysql.handle.query("UPDATE faction SET ausnahme = '1' WHERE name = 'FIB'",[],function(err,res) {
                    if (err) console.log("Error in Update ausnahmezustand: "+err);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.data.faction == "FIB" && playerToSearch.data.factionDuty == 1) {                
                                playerToSearch.notifyWithPicture("Federal Investigation Bureau", "Ausnahmezustand", "Der Ausnahmezustand wurde aktiviert!","CHAR_CALL911");
                            }                      
                        }
                    );
                });
            } else {
                gm.mysql.handle.query("UPDATE faction SET ausnahme = '0' WHERE name = 'FIB'",[],function(err,res) {
                    if (err) console.log("Error in Update ausnahmezustand: "+err);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.data.faction == "FIB" && playerToSearch.data.factionDuty == 1) {                
                                playerToSearch.notifyWithPicture("Federal Investigation Bureau", "Ausnahmezustand", "Der Ausnahmezustand wurde deaktiviert!","CHAR_CALL911");
                            }                      
                        }
                    );
                });
            }            
        });   
    }
});

mp.events.add("inputValueShop", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "dienstnummerfib") { 
        getNearestPlayer(player, 2);  
          if (currentTarget !== null) {
              if (currentTarget.data.faction == "FIB") {
                gm.mysql.handle.query("SELECT factiondn FROM characters WHERE faction = 'FIB' AND factiondn = ?",[output],function(err,res) {
                    if (err) console.log("Error in Select Dienstnummer: "+err);
                    if (res.length > 0) {
                        player.notify("~r~Die Dienstnummer ist schon vergeben");
                    } else {
                        gm.mysql.handle.query("UPDATE characters SET factiondn = ? WHERE id = ?",[output,currentTarget.data.charId],function(err1,res1) {
                            if (err1) console.log("Error in Update Dienstnummer: "+err1);
                            player.notify("~g~Du hast die Dienstnummer "+output+" gegeben");
                            currentTarget.notify("~g~Du hast die Dienstnummer "+output+" bekommen");
                            currentTarget.data.factiondn = output;
                        });
                    }            
                });
              }  else {
                  player.notify("~r~Die Person ist nicht im FIB");
              }          
          } else {
              player.notify("~r~Keiner in deiner Nähe");
          }          
      }
    }
});

mp.events.add("inputValueText", (player, trigger, output, text) => {
    if(mp.players.exists(player)) {
      if(trigger === "fibHalter") {  
        var str = output.toUpperCase();
          if (str !== "MR") {
            gm.mysql.handle.query("SELECT model FROM vehicles WHERE numberPlate = ?", [str], function(err,res) {
                if (err) console.log("Error in Select Vehicles on halter: "+err);
                if (res.length > 0) {
                    gm.mysql.handle.query("SELECT firstname,lastname FROM characters WHERE id = ?", [res[0].charId], function (err1,res1) {
                        if (err1) console.log("Error in Select Halter: "+err1);
                        if (res.length > 0) {
                            player.notify("Der Halter vom Kennzeichen "+output+" ist: "+res1[0].firstname+" "+res1[0].lastname+" Fahrzeug: "+res[0].model);
                        }
                    });
                } else {
                    player.notify("~r~Halterabfrage fehlgeschlagen");
                }
            });   
          }  else {
              player.notify("~r~Das Fahrzeug ist nicht angemeldet");
          }      
      }
    }
});

mp.events.add("server:fib:befördern", (player,rank) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player,2);
        if (currentTarget !== null) {
            if (currentTarget.data.faction == "FIB") {
                gm.mysql.handle.query("UPDATE characters SET factionrang = ? WHERE id = ?", [rank,currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update Character Factionrank: "+err);
                    player.notify("~g~Die Person wurde auf "+rank+" gesetzt");
                    currentTarget.notify("Du wurdest auf Rang "+rank+" gesetzt");
                    currentTarget.data.factionrang = rank;                    
                });
            } else {
                player.notify("~r~Die Person ist nicht im FIB");
            }
        } else {
            player.notify("~r~Keiner in deiner Nähe");
        }
    }
});

mp.events.add("server:fib:weapons",(player,weapon) => {
    if (weapon == "Schutzweste") {
        player.armour = 100;
        player.data.armor = 100;
    }
    if (weapon == "Fallschirm") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET fallschirm = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0xFBAB5776, 0);
            player.notify("~g~Du hast dir einen Fallschirm genommen");
        });
    }
    if (weapon == "Taschenlampe") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET taschenlampe = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x8BB05FD7, 0);
            player.notify("~g~Du hast dir eine Taschenlampe genommen");
        });
    }
    if (weapon == "Schlagstock") {
        gm.mysql.handle.query("UPDATE faction_weapons SET schlagstock = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x678B81B1, 0);
            player.notify("~g~Du hast dir einen Schlagstock genommen");
        });
    }
    if (weapon == "Tazer") {
        gm.mysql.handle.query("UPDATE faction_weapons SET taser = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x3656C8C1, 0);
            player.notify("~g~Du hast dir einen Taser genommen");
        });
    }
    if (weapon == "Pistole Kaliber .50") {
        gm.mysql.handle.query("UPDATE faction_weapons SET pistol = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x99AEEB3B, 0);
            player.notify("~g~Du hast dir eine Pistole genommen");
        });
    }
    if (weapon == "AP-Pistole") {
        gm.mysql.handle.query("UPDATE faction_weapons SET appistol = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x22D8FE39, 150);
            player.notify("~g~Du hast dir eine AP Pistole genommen");
        });
    }
    if (weapon == "SMG") {
        gm.mysql.handle.query("UPDATE faction_weapons SET smg = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x2BE6766B, 200);
            player.notify("~g~Du hast dir eine SMG genommen");
        });
    }
    if (weapon == "Karabiner") {
        gm.mysql.handle.query("UPDATE faction_weapons SET karabiner = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x83BF0278, 200);
            player.notify("~g~Du hast dir eine Karabiner genommen");
        });
    }
    if (weapon == "Spezial Karabiner MK2") {
        gm.mysql.handle.query("UPDATE faction_weapons SET specialkarabiner = '1' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.giveWeapon(0x969C3D67, 200);
            player.notify("~g~Du hast dir eine Spezial Karabiner genommen");
        });
    }    
});

mp.events.add("server:fib:weaponsdelete",(player,weapon) => {
    if (weapon == "Schutzweste") {
        player.armour = 0;
        player.data.armor = 0;
    }
    if (weapon == "Fallschirm") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET fallschirm = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0xFBAB5776, 0);
            player.notify("~g~Du hast den Fallschirm weggelegt");
        });
    }
    if (weapon == "Taschenlampe") { 
        gm.mysql.handle.query("UPDATE faction_weapons SET taschenlampe = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x8BB05FD7);
            player.notify("~g~Du hast die Taschenlampe abgegeben");
        });
    }
    if (weapon == "Schlagstock") {
        gm.mysql.handle.query("UPDATE faction_weapons SET schlagstock = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x678B81B1);
            player.notify("~g~Du hast den Schlagstock abgegeben");
        });
    }
    if (weapon == "Tazer") {
        gm.mysql.handle.query("UPDATE faction_weapons SET taser = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x3656C8C1);
            player.notify("~g~Du hast den Taser abgegeben");
        });
    }
    if (weapon == "Pistole Kaliber .50") {
        gm.mysql.handle.query("UPDATE faction_weapons SET pistol = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x99AEEB3B);
            player.notify("~g~Du hast die Pistole abgegeben");
        });
    }
    if (weapon == "AP-Pistole") {
        gm.mysql.handle.query("UPDATE faction_weapons SET appistol = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x22D8FE39);
            player.notify("~g~Du hast die AP Pistole abgegeben");
        });
    }
    if (weapon == "SMG") {
        gm.mysql.handle.query("UPDATE faction_weapons SET smg = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x2BE6766B);
            player.notify("~g~Du hast die SMG abgegeben");
        });
    }
    if (weapon == "Karabiner") {
        gm.mysql.handle.query("UPDATE faction_weapons SET karabiner = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x83BF0278);
            player.notify("~g~Du hast die Karabiner abgegeben");
        });
    }
    if (weapon == "Spezial Karabiner MK2") {
        gm.mysql.handle.query("UPDATE faction_weapons SET specialkarabiner = '0' WHERE charId = ?",[player.data.charId], function (err,res) {
            if (err) console.log("Error in Update faction Weapons: "+err);
            player.removeWeapon(0x969C3D67);
            player.notify("~g~Du hast die Spezial Karabiner abgegeben");
        });
    }  
});

mp.events.add("server:fib:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT firstname,lastname,factionrang,id FROM characters WHERE faction = 'FIB'",[],function(err,res) {
        if (err) console.log("Error in Select FIB Characters: "+err);
        if (res.length > 0) {
            var FIBList = [];
            var i = 1;
            res.forEach(function(fib) {
                let obj = { "firstname": String(fib.firstname), "lastname": String(fib.lastname),"factionrang": String(fib.factionrang), "id": String(fib.id)};
                FIBList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:fib:Memberlist", [JSON.stringify(FIBList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine FIB Beamten");
        }
     });
});

mp.events.add("server:fib:mitarbeiter",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[id],function(err,res) {
        if (err) console.log("Error in Select Kündigen Char: "+err);
        res.forEach(function(fib) {
            if (fib.isOnline == 1) {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.id == fib.onlineId) {                
                                playerToSearch.data.faction = 'Civillian';
                                playerToSearch.data.factionDuty = 0;
                                playerToSearch.data.factionrang = 0;
                                playerToSearch.setProp(1,fib.eye,fib.eyetext); //Brille
                                playerToSearch.setClothes(1,fib.mask,fib.masktext,0); //Masken
                                playerToSearch.setClothes(3,fib.torso,0,0); //Torso
                                playerToSearch.setClothes(4,fib.leg,fib.legtext,0); //Hose
                                playerToSearch.setClothes(6,fib.shoe,fib.shoetext,0); //Schuhe
                                playerToSearch.setClothes(11,fib.jacket,playerToSearch.data.jackettext,0);//Jacke
                                playerToSearch.setClothes(8,fib.shirt,fib.shirttext,0); //Shirt
                                playerToSearch.setClothes(9,fib.body,fib.bodytext,0); //Body
                                playerToSearch.setClothes(7,fib.accessoire,fib.accessoiretext,2); // Accesior
                                playerToSearch.setClothes(10,0,1,2); // Decal
                                playerToSearch.setClothes(9,0,0,2); // Weste
                                playerToSearch.data.body = 0;
                                playerToSearch.data.bodytext = 0;
                                playerToSearch.data.decal = 0;
                                playerToSearch.data.decaltext = 1;
                                playerToSearch.data.hat = fib.hat;
                                playerToSearch.data.hattext = fib.hattext;
                                playerToSearch.data.eye = fib.eye;
                                playerToSearch.data.eyetext = fib.eyetext;
                                playerToSearch.data.mask = fib.mask;
                                playerToSearch.data.masktext = fib.masktext;
                                playerToSearch.data.torso = fib.torso;
                                playerToSearch.data.jacket = fib.jacket;
                                playerToSearch.data.jackettext = fib.jackettext;
                                playerToSearch.data.leg = fib.leg;
                                playerToSearch.data.legtext = fib.legtext;
                                playerToSearch.data.shoe = fib.shoe;
                                playerToSearch.data.shoetext = fib.shoetext;
                                playerToSearch.data.shirt = fib.shirt;
                                playerToSearch.data.shirttext = fib.shirttext;
                                playerToSearch.data.accessoire = fib.accessoire;
                                playerToSearch.data.accessoiretext = fib.accessoiretext;
                                playerToSearch.data.decal = 0;
                                playerToSearch.data.decaltext = 0;
                                playerToSearch.call("client:faction:delmarkers");
                                playerToSearch.removeWeapon(0x8BB05FD7);
                                playerToSearch.removeWeapon(0x678B81B1);
                                playerToSearch.removeWeapon(0x3656C8C1);
                                playerToSearch.removeWeapon(0x99AEEB3B);
                                playerToSearch.removeWeapon(0x22D8FE39);
                                playerToSearch.removeWeapon(0x2BE6766B);
                                playerToSearch.removeWeapon(0x83BF0278);    
                                gm.mysql.handle.query("UPDATE faction_weapons SET taser = '0',pistol = '0',appistol = '0',smg = '0',karabiner = '0',taschenlampe = '0',schlagstock = '0' WHERE charId = ?",[playerToSearch.data.charId],function(err2,res2) {
                                    if (err2) console.log("error in update faction weapons: "+err2);
                                });
                            }                      
                        }                        
                    );
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            } else {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    player.notify("~g~Der Bürger wurde entlassen");
                });
            }
        });
    });
});

mp.events.add("server:fib:spawnHeli",(player,type) => {
    const one = new mp.Vector3(702.692138671875, -950.4788208007812, 30.867542266845703);
    const onehead = 31;     
    if (getVehicleFromPosition(one, 3).length > 0) {    
        player.notify("~r~Alle Garagenplätze sind Belegt");    
        return;    
    } else {
        var veh = mp.vehicles.new(parseFloat(type), one, {
            heading: onehead,
            numberPlate: "FIB",
            locked: true,
            engine: false,
            dimension: 0
        });  
        player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
        veh.setColorRGB(0,0,0,0,0,0);
        veh.setVariable("faction", "FIB");
        veh.setVariable("fuel",100);
        veh.setVariable("fuelart","Diesel");
        veh.setVariable("isDead","false");
        veh.setVariable("tanken","false");
        veh.setVariable('Kilometer',0);
    }                        
});


mp.events.add("server:fib:spawnVehicle",(player,type) => {    
    if (type == 1) {
        const one = new mp.Vector3(685.109375, -970.7112426757812, 23.17285919189453);
        const onehead = 272;     
        if (getVehicleFromPosition(one, 3).length > 0) {    
        } else {
            var veh = mp.vehicles.new(mp.joaat("chargerfib"), one, {
                heading: onehead,
                numberPlate: "FIB",
                locked: true,
                engine: false,
                dimension: 0
            });
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
            veh.setColorRGB(0,0,0,0,0,0);
            veh.setVariable("faction", "FIB");
            veh.setVariable("fuel",100);
            veh.setVariable("fuelart","Diesel");
            veh.setVariable("isDead","false");
            veh.setVariable("tanken","false");
            veh.setVariable('Kilometer',0);
            veh.numberPlateType = 1;
            veh.numberPlate = "FIB";
            veh.setMod(55, 2);
            veh.setMod(18, 0);
            veh.setMod(12, 2);
            return;
        } 
    } 
    if (type == 2) {
        const one = new mp.Vector3(685.109375, -970.7112426757812, 23.17285919189453);
        const onehead = 272;    
        if (getVehicleFromPosition(one, 3).length > 0) {    
        } else {
            var veh = mp.vehicles.new(mp.joaat("chargerfib2"), one, {
                heading: onehead,
                numberPlate: "FIB",
                locked: true,
                engine: false,
                dimension: 0
            });
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
            veh.setColorRGB(0,0,0,0,0,0);
            veh.setVariable("faction", "FIB");
            veh.setVariable("fuel",100);
            veh.setVariable("fuelart","Diesel");
            veh.setVariable("isDead","false");
            veh.setVariable("tanken","false");
            veh.setVariable('Kilometer',0);
            veh.numberPlateType = 1;
            veh.numberPlate = "FIB";
            veh.setMod(55, 2);
            veh.setMod(18, 0);
            veh.setMod(12, 2);
            return;
        } 
    }
        const one = new mp.Vector3(685.109375, -970.7112426757812, 23.17285919189453);
    const onehead = 272;
    const two = new mp.Vector3(685.6901245117188, -966.330810546875, 23.202333450317383);
    const twohead = 273;
    const three = new mp.Vector3(689.8076171875, -958.3905639648438, 23.501157760620117);
    const threehead = 181;
    const four = new mp.Vector3(689.8076171875, -958.3905639648438, 23.501157760620117);
    const fourhead = 181;      
    if (getVehicleFromPosition(one, 3).length > 0) {    
        if (getVehicleFromPosition(two, 3).length > 0) {   
            if (getVehicleFromPosition(three, 3).length > 0) {     
                if (getVehicleFromPosition(four, 3).length > 0) {
                    player.notify("~r~Alle Garagenplätze sind Belegt");    
                    return; 
                }  else {
                var veh = mp.vehicles.new(parseFloat(type), four, {
                    heading: fourhead,
                    numberPlate: "FIB",
                    locked: true,
                    engine: false,
                    dimension: 0
                });
                veh.setColorRGB(0,0,0,0,0,0);
                player.notify("~g~Dein Fahrzeug steht auf Stellplatz 4");                
                veh.setVariable("faction", "FIB");
                veh.setVariable("fuel",100);
                veh.setVariable("fuelart","Diesel");
                veh.setVariable("isDead","false");
                veh.setVariable('Kilometer',0);
                veh.setVariable("tanken","false");
                veh.numberPlateType = 1;
                veh.numberPlate = "FIB";
                veh.setMod(55, 2);
                veh.setMod(18, 0);
                veh.setMod(12, 2);
                }                   
            } else {
                var veh = mp.vehicles.new(parseFloat(type), three, {
                    heading: threehead,
                    numberPlate: "FIB",
                    locked: true,
                    engine: false,
                    dimension: 0
                });  
                player.notify("~g~Dein Fahrzeug steht auf Stellplatz 3");
                veh.setColorRGB(0,0,0,0,0,0);
                veh.setVariable("faction", "FIB");
                veh.setVariable("fuel",100);
                veh.setVariable("fuelart","Diesel");
                veh.setVariable("isDead","false");
                veh.setVariable('Kilometer',0);
                veh.setVariable("tanken","false");
                veh.numberPlateType = 1;
                veh.numberPlate = "FIB";
                veh.setMod(55, 2);
                veh.setMod(18, 0);
                veh.setMod(12, 2);
            }                
        } else {
            var veh = mp.vehicles.new(parseFloat(type), two, {
                heading: twohead,
                numberPlate: "FIB",
                locked: true,
                engine: false,
                dimension: 0
            });    
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 2");
            veh.setColorRGB(0,0,0,0,0,0);
            veh.setVariable("faction", "FIB");
            veh.setVariable("fuel",100);
            veh.setVariable("fuelart","Diesel");
            veh.setVariable("isDead","false");
            veh.setVariable('Kilometer',0);
            veh.setVariable("tanken","false");
            veh.numberPlateType = 1;
            veh.numberPlate = "FIB";
            veh.setMod(55, 2);
            veh.setMod(18, 0);
            veh.setMod(12, 2);
        }  
    } else {
        var veh = mp.vehicles.new(parseFloat(type), one, {
            heading: onehead,
            numberPlate: "FIB",
            locked: true,
            engine: false,
            dimension: 0
        });  
        player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
        veh.setColorRGB(0,0,0,0,0,0);
        veh.setVariable("faction", "FIB");
        veh.setVariable("fuel",100);
        veh.setVariable("fuelart","Diesel");
        veh.setVariable("isDead","false");
        veh.setVariable("tanken","false");
        veh.setVariable('Kilometer',0);
        veh.numberPlateType = 1;
        veh.numberPlate = "FIB";
        veh.setMod(55, 2);
        veh.setMod(18, 0);
        veh.setMod(12, 2);
    }                          
});





mp.events.add("server:fib:einstellen",(player) => {
    getNearestPlayer(player, 2);    
    if (currentTarget.data.faction == "Civillian") {
        gm.mysql.handle.query("UPDATE characters SET faction = 'FIB', factionrang = '1' WHERE id = ?",[currentTarget.data.charId], function (err,res) {
            if (err) console.log("Error in Update Faction user: "+err);
            player.notify("~g~Der Bürger wurde eingestellt");
            currentTarget.notify("Sie wurden beim FIB eingestellt!");
            currentTarget.data.faction = "FIB";
            currentTarget.data.factionDuty = 0;
            currentTarget.data.factionrang = 1;
            currentTarget.data.factiondn = 0;
            gm.mysql.handle.query('SELECT * FROM faction WHERE name = ?', [currentTarget.data.faction], function (error, results, fields) {
                for(let i = 0; i < results.length; i++) {
                    if(currentTarget.data.faction == results[i].name)
                    {
                    currentTarget.call("LoadFactionDutyMarkers",[results[i].dutyX,results[i].dutyY,results[i].dutyZ]);
                    currentTarget.call("LoadFactionClothesMarkers",[results[i].clothesX,results[i].clothesY,results[i].clothesZ]);
                    currentTarget.call("LoadFactionEquipMarkers", [results[i].equipX,results[i].equipY,results[i].equipZ]);
                    currentTarget.call("LoadFactionPCMarkers", [results[i].pcX,results[i].pcY,results[i].pcZ]);
                    currentTarget.call("LoadFactionChiefMarkers", [results[i].chiefX,results[i].chiefY,results[i].chiefZ]);
                    currentTarget.call("LoadFactionGaragenMarkers",[results[i].vehicleX,results[i].vehicleY,results[i].vehicleZ]);
                    currentTarget.call("LoadFactionParkingMarkers",[results[i].parkX,results[i].parkY,results[i].parkZ]);
                    }	
                }
            });	            
        });
    } else {    
        player.notify("~r~Der Bürger ist schon in einer Fraktion");
    }    
});

mp.events.add("server:fib:parkin",(player,x,y,z) => {
    const pos = new mp.Vector3(player.position);
    const veh = getVehicleFromPosition(pos, 2)[0];
    veh.destroy();
  });

function getVehicleFromPosition(position, range) {
    const returnVehicles = [];

    mp.vehicles.forEachInRange(position, range,
        (vehicle) => {
            returnVehicles.push(vehicle);
        }
    );
    return returnVehicles;
}

var currentTarget = null;

function getNearestPlayer(player, range) {
    let dist = range;
    mp.players.forEachInRange(player.position, range,
        (_player) => {
            if (player != _player) {
                let _dist = _player.dist(player.position);
                if (_dist < dist) {
                    currentTarget = _player;
                    dist = _dist;
                }
            }
        }
    );
};