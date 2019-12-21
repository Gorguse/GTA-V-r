let pc = mp.colshapes.newSphere(417,-1108,32, 1, 0);
let vehicle = mp.colshapes.newSphere(472,-1114,31, 1, 0);

mp.events.add("PushE", (player) => {
    if (mp.players.exists(player)) {
        if (player.data.faction == "Fahrschule") {
            if(pc.isPointWithin(player.position) && player.data.mainmenu == false) {
                player.call("client:fs:createOfficeComputer",[player.data.factionrang]);  
                player.data.mainmenu = true;
            }  
            if(vehicle.isPointWithin(player.position) && player.data.mainmenu == false) {
              player.call("client:fs:createVeichleMenu",[player.data.factionrang]);
              player.data.mainmenu = true;
          }
        }         
    }
  });

mp.events.add("server:fs:mainMenu", (player,slot,name) => {
    getNearestPlayer(player, 2);   
    if (name == "Mitarbeiterverwaltung")
    {
        player.call("client:fs:openMemberMenu");
    } else if (name == "PKW Führerschein austellen") {
        if (currentTarget !== null) {
            gm.mysql.handle.query("UPDATE licenses SET pkw = '1' WHERE charId = ?",[currentTarget.data.charId],function(err,res) {
                if (err) console.log("Error in Update licensen: "+err);
                currentTarget.data.pkw = 1;
                player.notify("~g~Der PKW Führerschein wurde ausgestellt!");
                currentTarget.notify("~g~Du hast einen PKW Führerschein erhalten");
            });
        }
    } else if (name == "LKW Führerschein austellen") {
        if (currentTarget !== null) {
            gm.mysql.handle.query("UPDATE licenses SET lkw = '1' WHERE charId = ?",[currentTarget.data.charId],function(err,res) {
                if (err) console.log("Error in Update licensen: "+err);
                currentTarget.data.lkw = 1;
                player.notify("~g~Der LKW Führerschein wurde ausgestellt!");
                currentTarget.notify("~g~Du hast einen LKW Führerschein erhalten");
            });
        }
    } else if (name == "Motorrad Führerschein austellen") {
        if (currentTarget !== null) {
            gm.mysql.handle.query("UPDATE licenses SET bike = '1' WHERE charId = ?",[currentTarget.data.charId],function(err,res) {
                if (err) console.log("Error in Update licensen: "+err);
                currentTarget.data.bike = 1;
                player.notify("~g~Der Motorrad Führerschein wurde ausgestellt!");
                currentTarget.notify("~g~Du hast einen Motorrad Führerschein erhalten");
            });
        }
    }
});
mp.events.add("server:fs:entlassen", (player,itemText) => {
    getNearestPlayer(player, 2);   
    if(currentTarget !== null) {    
        if (currentTarget.data.faction == "Fahrschule") {
            currentTarget.notifyWithPicture("Fahrschule Los Santos", "Entlassung", "Deine Anstellung wurde beendet","CHAR_CALL911");
        currentTarget.call("client:fs:delmarkers");
        player.notifyWithPicture("Fahrschule Los Santos", "Mitarbeiterverwaltung","Du hast "+currentTarget.data.firstname + " "+ currentTarget.data.lastname + " entlassen.","CHAR_CALL911");
        currentTarget.data.faction = "Civillian";
        currentTarget.data.factionDuty = 0;
        currentTarget.data.factionrang = 0;
        gm.mysql.handle.query("UPDATE characters SET faction = ?, duty = ?, factionrang = ?, factioncloth = 'Zivil' WHERE id = ?", [currentTarget.data.faction, currentTarget.data.factionDuty,currentTarget.data.factionrang,currentTarget.data.charId], function(err12, ress12) {
            if(err12) console.log("Error in justiz Dismiss Member");
        });
        gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[currentTarget.data.charId], function(err5,res5) {
            if (err5) console.log("Error in Select Character: "+err5);
            
            res5.forEach(function(modelData) {
                currentTarget.setProp(0,modelData.hat,modelData.hattext); //Hut
                currentTarget.setProp(1,modelData.eye,modelData.eyetext); //Brille
                currentTarget.setClothes(1,modelData.mask,modelData.masktext,0); //Masken
                currentTarget.setClothes(3,modelData.torso,0,0); //Torso
                currentTarget.setClothes(4,modelData.leg,modelData.legtext,0); //Hose
                currentTarget.setClothes(6,modelData.shoe,modelData.shoetext,0); //Schuhe
                currentTarget.setClothes(11,modelData.jacket,player.data.jackettext,0);//Jacke
                currentTarget.setClothes(8,modelData.shirt,modelData.shirttext,0); //Shirt
                currentTarget.setClothes(9,modelData.body,modelData.bodytext,0); //Body
            });                          
        });
        }  else {
            player.notify("~r~Der Spieler Arbteitet nicht bei der Fahrschule!")
        } 
    }   
});

mp.events.add("server:fs:befördern", (player,rank) => {
    if (mp.players.exists(player)) {
        getNearestPlayer(player,2);
        if (currentTarget !== null) {
            if (currentTarget.data.faction == "Fahrschule") {
                gm.mysql.handle.query("UPDATE characters SET factionrang = ? WHERE id = ?", [rank,currentTarget.data.charId], function (err,res) {
                    if (err) console.log("Error in Update Character Factionrank: "+err);
                    player.notify("~g~Die Person wurde auf "+rank+" gesetzt");
                    currentTarget.notify("Du wurdest auf Rang "+rank+" gesetzt");
                    currentTarget.data.factionrang = rank;                    
                });
            } else {
                player.notify("~r~Die Person ist nicht bei der Fahrschule");
            }
        } else {
            player.notify("~r~Keiner in deiner Nähe");
        }
    }
});

mp.events.add("server:fs:mitarbeiter",(player) => {
    gm.mysql.handle.query("SELECT firstname,lastname,factionrang,id FROM characters WHERE faction = 'Fahrschule'",[],function(err,res) {
        if (err) console.log("Error in Select LSC Characters: "+err);
        if (res.length > 0) {
            var LSCList = [];
            var i = 1;
            res.forEach(function(justiz) {
                let obj = { "firstname": String(justiz.firstname), "lastname": String(justiz.lastname),"factionrang": String(justiz.factionrang), "id": String(justiz.id)};
                LSCList.push(obj);
                if (parseInt(i) == parseInt(res.length)) {
                    if (mp.players.exists(player)) player.call("client:fs:Memberlist", [JSON.stringify(LSCList)]);
                }
                i++;
            });
        } else {   
            player.notify("Es gibt keine Fahrschule Mitarbeiter");
        }
     });
});

mp.events.add("server:fs:mitarbeiterentl",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM characters WHERE id = ?",[id],function(err,res) {
        if (err) console.log("Error in Select Kündigen Char: "+err);
        res.forEach(function(justiz) {
            if (justiz.isOnline == 1) {
                gm.mysql.handle.query("UPDATE characters SET faction = 'Civillian', duty = '0', factionrang = '0', factioncloth = 'Zivil' WHERE id = ?",[id],function(err1,res1) {
                    if (err1) console.log("Error in Update Faction Char: "+err1);
                    mp.players.forEach(
                        (playerToSearch, id) => {
                            if (playerToSearch.id == justiz.onlineId) {                
                                playerToSearch.data.faction = 'Civillian';
                                playerToSearch.data.factionDuty = 0;
                                playerToSearch.data.factionrang = 0;
                                playerToSearch.setProp(0,justiz.hat,justiz.hattext); //Hut
                                playerToSearch.setProp(1,justiz.eye,justiz.eyetext); //Brille
                                playerToSearch.setClothes(1,justiz.mask,justiz.masktext,0); //Masken
                                playerToSearch.setClothes(3,justiz.torso,0,0); //Torso
                                playerToSearch.setClothes(4,justiz.leg,justiz.legtext,0); //Hose
                                playerToSearch.setClothes(6,justiz.shoe,justiz.shoetext,0); //Schuhe
                                playerToSearch.setClothes(11,justiz.jacket,justiz.jackettext,0);//Jacke
                                playerToSearch.setClothes(8,justiz.shirt,justiz.shirttext,0); //Shirt
                                playerToSearch.setClothes(9,justiz.body,justiz.bodytext,0); //Body
                                playerToSearch.call("client:faction:delmarkers");
                            }                      
                        }                        
                    );
                    playerToSearch.data.faction == 'Civillian';
                    playerToSearch.data.factionDuty == 0;
                    playerToSearch.data.factionrang == 0;
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


mp.events.add("server:fs:einstellen",(player) => {
    getNearestPlayer(player, 2);  
    if (currentTarget !== null) {
        if (currentTarget.data.faction == "Civillian") {
            gm.mysql.handle.query("UPDATE characters SET faction = 'Fahrschule', factionrang = '1' WHERE id = ?",[currentTarget.data.charId], function (err,res) {
                if (err) console.log("Error in Update Faction user: "+err);
                player.notify("~g~Der Bürger wurde eingestellt");
                currentTarget.notify("Sie wurden bei der Fahrschule eingestellt!");
                currentTarget.data.faction = "Fahrschule";
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
    } else {
        player.notify("~r~Keiner in deiner Nähe");
    }       
});

mp.events.add("server:fs:spawnVehicle",(player,type) => {
    const one = new mp.Vector3(472.5721130371094, -1108.94384765625, 29.199628829956055);
    const onehead = 266;
    const two = new mp.Vector3(471.6991882324219, -1092.409423828125, 29.201807022094727);
    const twohead = 268;   
    if (getVehicleFromPosition(one, 3).length > 0) {    
        if (getVehicleFromPosition(two, 3).length > 0) {   
            player.notify("~r~Alle Fahrzeugspawns sind belegt");
        } else {
            var veh = mp.vehicles.new(parseFloat(type), two, {
                heading: twohead,
                numberPlate: "School",
                locked: true,
                engine: false,
                dimension: 0
            });    
            player.notify("~g~Dein Fahrzeug steht auf Stellplatz 2");
            veh.setColorRGB(255,255,255,255,255,255);
            veh.setVariable("faction", "Fahrschule");
            veh.setVariable("fuel",100);
            veh.setVariable("fuelart","Diesel");
            veh.setVariable("isDead","false");
            veh.setVariable('Kilometer',0);
            veh.setVariable("tanken","false");
            veh.numberPlateType = 1;
            veh.numberPlate = "SCHOOL";
        }  
    } else {
        var veh = mp.vehicles.new(parseFloat(type), one, {
            heading: onehead,
            numberPlate: "SCHOOL",
            locked: true,
            engine: false,
            dimension: 0
        });  
        player.notify("~g~Dein Fahrzeug steht auf Stellplatz 1");  
        veh.setColorRGB(255,255,255,255,255,255);
        veh.setVariable("faction", "Fahrschule");
        veh.setVariable("fuel",100);
        veh.setVariable("fuelart","Diesel");
        veh.setVariable("isDead","false");
        veh.setVariable("tanken","false");
        veh.setVariable('Kilometer',0);
        veh.numberPlateType = 1;
        veh.numberPlate = "SCHOOL";
    }                        
});

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

mp.events.add("server:fs:parkin",(player,x,y,z) => {
    const pos = new mp.Vector3(player.position);
    const veh = getVehicleFromPosition(pos, 5)[0];
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