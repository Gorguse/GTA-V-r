const fs = require("fs");
const path = require("path");

const markerRange = 1;
const markerColor = [174, 219, 242, 150];

// Would be great if you don't touch this
const allowedModels = {};
allowedModels[ mp.joaat("mp_m_freemode_01") ] = "male";
allowedModels[ mp.joaat("mp_f_freemode_01") ] = "female";

const shopData = {};

function giveClothingToPlayer(player, name, type, slot, drawable, texture) {
    slot = Number(slot);
    drawable = Number(drawable);
    texture = Number(texture);

    switch (type) {
        case "clothes":
            player.setClothes(slot, drawable, texture, 2);
        break;

        case "props":
            player.setProp(slot, drawable, texture);
        break;
    }

    player.call("clothesMenu:updateLast", [drawable, texture]);
    player.notify(`Bought ${name}.`);
}

// Load all clothes
const shopsPath = path.join(__dirname, "shops");
fs.readdir(shopsPath, (error, files) => {
    if (error) {
        console.error(`[CLOTHES] Failed reading clothing data: ${error.message}`);
        return;
    }

    for (const file of files) {
        if (path.extname(file) !== ".json") continue;

        const filePath = path.join(shopsPath, file);
        const fileName = path.basename(filePath, ".json");

        try {
            shopData[fileName] = require(filePath);

            // Create shop entities
            for (const shopPosition of shopData[fileName].shops) {
                const tempColShape = mp.colshapes.newSphere(shopPosition.x, shopPosition.y, shopPosition.z, 1);
                tempColShape.clothingShopType = fileName;
                
                mp.markers.new(0, shopPosition, markerRange, {
                    visible: true,
                    color: markerColor
                });
            }

            console.log(`[CLOTHES] Loaded ${file}.`);
        } catch (loadingError) {
            console.error(`[CLOTHES] Failed to load ${file}: ${loadingError.message}`);
        }
    }
});

// RAGEMP Events
mp.events.add("playerEnterColshape", (player, shape) => {
    if (shape.clothingShopType && typeof player.clothingShopType !== "string") player.clothingShopType = shape.clothingShopType;
});

mp.events.add("playerExitColshape", (player, shape) => {
    if (shape.clothingShopType && player.clothingShopType) {
        player.clothingShopType = null;
        player.call("clothesMenu:close");
    }
});

mp.events.add("setHairColor", (player,colorID) => {
    player.setHairColor(colorID, player.data.highColor);
});

mp.events.add("setHighlightColor", (player,colorID) => {
    player.setHairColor(player.data.hairColor, colorID);
});

// Script Events
mp.events.add("buyClothingItem", (player, type, slot, texture, drawable,name) => {
   if (type == "clothes") {
    if (slot == 1) {
        gm.mysql.handle.query("UPDATE characters SET mask = ?, masktext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Maske wurde gekauft");
                    player.data.mask = drawable;
                    player.data.masktext = texture;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Maske wurde gekauft");
                        player.data.mask = drawable;
                        player.data.masktext = texture;
                    });
                }
            });            
        });
    }
    if (slot == 2) {
        gm.mysql.handle.query("UPDATE characters SET hair = ?, hairtext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            player.notify("~g~Haare wurden geschnitten!");
        });
    }
    if (slot == 3) {
        gm.mysql.handle.query("UPDATE characters SET torso = ? WHERE id = ?",[drawable,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Torso wurde gekauft");
                    player.data.torso = drawable;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Torso wurde gekauft");
                        player.data.torso = drawable;
                    });
                }
            });            
        });
    }
    if (slot == 4) {
        gm.mysql.handle.query("UPDATE characters SET leg = ?, legtext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Hose wurde gekauft");
                        player.data.leg = drawable;
                        player.data.legtext = texture;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Hose wurde gekauft");
                        player.data.leg = drawable;
                        player.data.legtext = texture;
                    });
                }
            });            
        });
    }
    if (slot == 6) {
        gm.mysql.handle.query("UPDATE characters SET shoe = ?, shoetext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Schuhe wurden gekauft");
                    player.data.shoe = drawable;
                    player.data.shoetext = texture;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Schuhe wurden gekauft");
                        player.data.shoe = drawable;
                        player.data.shoetext = texture;
                    });
                }
            });            
        });        
    }
    if (slot == 7) {
        gm.mysql.handle.query("UPDATE characters SET accessoire = ?, accessoiretext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Accessoire wurden gekauft");
                    player.data.accessoire = drawable;
                    player.data.accessoiretext = texture;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Accessoire wurden gekauft");
                        player.data.accessoire = drawable;
                        player.data.accessoiretext = texture;
                    });
                }
            });            
        });        
    }
    if (slot == 8) {
        gm.mysql.handle.query("UPDATE characters SET shirt = ?, shirttext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Shirt wurden gekauft");
                        player.data.shirt = drawable;
                        player.data.shirttext = texture;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Shirt wurden gekauft");
                            player.data.shirt = drawable;
                            player.data.shirttext = texture;
                        });
                    }
                });                      
        });
    }
    if (slot == 11) {
        gm.mysql.handle.query("UPDATE characters SET jacket = ?, jackettext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
            if (err) console.log("Error in Update Mask: "+err);
            gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ?",[slot,drawable,player.data.charId], function(err1,res1) {
                if (err1) console.log(err1);
                if (res1.length > 0) {
                    player.notify("~g~Oberteil wurden gekauft");
                    player.data.jacket = drawable;
                    player.data.jackettext = texture;
                } else {
                    gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                        if (err2) console.log(err2);
                        player.notify("~g~Oberteil wurden gekauft");
                        player.data.jacket = drawable;
                        player.data.jackettext = texture;
                    });
                }
            });            
        }); 
    }
   } if (type == "props") {
        if (slot == 0) {
            gm.mysql.handle.query("UPDATE characters SET hat = ?, hattext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
                if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ? AND art = 'P'",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Hut wurden gekauft");
                        player.data.hat = drawable;
                        player.data.hattext = texture;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, art = 'P', clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Hut wurden gekauft");
                            player.data.hat = drawable;
                            player.data.hattext = texture;
                        });
                    }
                });                          
            });
        } 
        if (slot == 1) {
            gm.mysql.handle.query("UPDATE characters SET eye = ?, eyetext = ? WHERE id = ?",[drawable,texture,player.data.charId], function(err,res) {
                if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ? AND art = 'P'",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Brille wurden gekauft");
                        player.data.eye = drawable;
                        player.data.eyetext = texture;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, art = 'P', clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Brille wurden gekauft");
                            player.data.eye = drawable;
                            player.data.eyetext = texture;
                        });
                    }
                });                
            });
        }
        if (slot == 2) {
            gm.mysql.handle.query("UPDATE characters SET earpice = ? WHERE id = ?",[drawable,player.data.charId], function(err,res) {
                if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ? AND art = 'P'",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Ohrring wurden gekauft");
                        player.data.ear = drawable;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, art = 'P', clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Ohrring wurden gekauft");
                            player.data.ear = drawable;
                        });
                    }
                });                
            });
        }
        if (slot == 6) {
            gm.mysql.handle.query("UPDATE characters SET clock = ? WHERE id = ?",[drawable,player.data.charId], function(err,res) {
                if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ? AND art = 'P'",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Uhr wurden gekauft");
                        player.data.clock = drawable;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, art = 'P', clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Uhr wurden gekauft");
                            player.data.clock = drawable;
                        });
                    }
                });                
            });
        }
        if (slot == 7) {
            gm.mysql.handle.query("UPDATE characters SET arm = ? WHERE id = ?",[drawable,player.data.charId], function(err,res) {
                if (err) console.log("Error in Update Mask: "+err);
                gm.mysql.handle.query("SELECT * FROM user_clothes WHERE zone = ? AND drawId = ? AND charId = ? AND art = 'P'",[slot,drawable,player.data.charId], function(err1,res1) {
                    if (err1) console.log(err1);
                    if (res1.length > 0) {
                        player.notify("~g~Armband wurden gekauft");
                        player.data.arm = drawable;
                    } else {
                        gm.mysql.handle.query("INSERT INTO user_clothes SET zone = ?, drawId = ?, textureId = ?, charId = ?, art = 'P', clothname = ?",[slot,drawable,texture,player.data.charId,name], function(err2,res2) {
                            if (err2) console.log(err2);
                            player.notify("~g~Armband wurden gekauft");
                            player.data.arm = drawable;
                        });
                    }
                });                
            });
        }
   }
});

mp.events.add("server:clothes:loadClothes",(player,item) => {
    if (item == "Torsos") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '3' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Tops") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '11' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Tshirts") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '8' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Hosen") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '4' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Schuhe") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '6' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Hüte") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'P' AND zone = '0' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Brillen") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'P' AND zone = '1' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Masken") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '1' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Uhren") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'P' AND zone = '6' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Accessoires") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'C' AND zone = '7' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Armbänder") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'P' AND zone = '7' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
    if (item == "Ohren") {
        gm.mysql.handle.query("SELECT * FROM user_clothes WHERE art = 'P' AND zone = '2' AND charId = ?",[player.data.charId],function(err,res) {
            if (err) console.log("Error in Select Clothes: "+err);
            if (res.length > 0) {
                var i = 1;
                let clothList = [];
                res.forEach(function(cloth) {
                    let obj = {"name": String(cloth.clothname), "id": String(cloth.id)};
                    clothList.push(obj);
                    if (parseInt(i) == parseInt(res.length)) {
                        if(mp.players.exists(player)) player.call("client:clothes:buyedMenu", [JSON.stringify(clothList)]);
                    }
                    i++;
                });
            } else {
                player.notify("~r~Du besitzt keine "+item);
            }
        });
    }
});

mp.events.add("server:clothes:anziehen",(player,id) => {
    gm.mysql.handle.query("SELECT * FROM user_clothes WHERE id = ?", [id], function(err,res) {
        if (err) console.log("Error in Select Cloth: "+err);
        var art = ""+res[0].art;
        if (art == "C") {
            if (res[0].zone == 0) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.mask = parseInt(res[0].drawId);
                player.data.masktext = 0;
            } 
            if (res[0].zone == 3) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.torso = parseInt(res[0].drawId);
            }     
            if (res[0].zone == 4) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.leg = parseInt(res[0].drawId);
                player.data.legtext = 0;
            }      
            if (res[0].zone == 6) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.shoe = parseInt(res[0].drawId);
                player.data.shoetext = 0;
            }
            if (res[0].zone == 7) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.accessoire = parseInt(res[0].drawId);
                player.data.accessoiretext = 0;
            }
            if (res[0].zone == 8) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.shirt = parseInt(res[0].drawId);
                player.data.shirt = 0;
            }
            if (res[0].zone == 11) {
                player.setClothes(parseInt(res[0].zone),parseInt(res[0].drawId),0,0);
                player.data.jacket = parseInt(res[0].drawId);
                player.data.jackettext = 0;
            }
        } else {
            if (res[0].zone == 0) {
                player.setProp(parseInt(res[0].zone),parseInt(res[0].drawId), 0);
                player.data.hat = parseInt(res[0].drawId);
                player.data.hattext = 0;
            }  
            if (res[0].zone == 1) {
                player.setProp(parseInt(res[0].zone),parseInt(res[0].drawId), 0);
                player.data.eye = parseInt(res[0].drawId);
                player.data.eyetext = 0;
            }  
            if (res[0].zone == 2) {
                player.setProp(parseInt(res[0].zone),parseInt(res[0].drawId), 0);
                player.data.ear = parseInt(res[0].drawId);
            }         
            if (res[0].zone == 6) {
                player.setProp(parseInt(res[0].zone),parseInt(res[0].drawId), 0);
                player.data.clock = parseInt(res[0].drawId);
            }  
            if (res[0].zone == 7) {
                player.setProp(parseInt(res[0].zone),parseInt(res[0].drawId), 0);
                player.data.arm = parseInt(res[0].drawId);
            } 
        }
    });
});

// Commands
mp.events.add("PushE", (player) => {
    if (typeof player.clothingShopType !== "string") {
        //player.outputChatBox("You're not in a clothing shop marker.");
        return;
    }
    const key = allowedModels[player.model];
    if (typeof key !== "string") {
        player.outputChatBox("Your model is not allowed to use clothing shops.");
        return;
    }

    const shop = shopData[player.clothingShopType];
    if (typeof shop[key] === "undefined") {
        player.outputChatBox("Your model does not have any clothes available.");
        return;
    }
        player.call("clothesMenu:updateData", [ shop.bannerSprite, shop[key] ]);   
});

function setTexture(player, textureID, type){
    if(mp.players.exists(player)) {   
        if (type == "Oberteile") {
            player.setClothes(11,player.data.jacket,parseInt(textureID),2);
            player.data.jackettext = parseInt(textureID);
        } else if (type == "Tshirt") {
            player.setClothes(8,player.data.shirt,parseInt(textureID),2);  
            player.data.shirttext = parseInt(textureID);              
        } else if (type == "Hosen") {
            player.setClothes(4,player.data.leg,parseInt(textureID),2);  
            player.data.legtext = parseInt(textureID);    
        } else if (type == "Schuhe") {
            player.setClothes(6,player.data.shoe,parseInt(textureID),2);    
            player.data.shoetext = parseInt(textureID);      
        }  else if (type == "Hut") {
            player.setProp(0,player.data.hat,parseInt(textureID));
            player.data.hattext = parseInt(textureID);
        } else if (type == "Brille") {
            player.setProp(1,player.data.eye,parseInt(textureID));
            player.data.eyetext = parseInt(textureID);
        } else if (type == "Maske") {
            player.setClothes(1,player.data.mask,parseInt(textureID),2);  
            player.data.masktext = parseInt(textureID);  
        }       
    }      
  }
  mp.events.add("server:clothesShop:setTexture", setTexture);

  mp.events.add("server:clothesShop:savetexture",(player) => {
    gm.mysql.handle.query("UPDATE characters SET hattext = ?, eyetext = ?, masktext = ?, legtext = ?,  shoetext = ?, jackettext = ?,  shirttext = ? WHERE id = ?",[player.data.hattext,player.data.eyetext,player.data.masktext,player.data.legtext,player.data.shoetext,player.data.jackettext,player.data.shirttext,player.data.charId], function(err1,res1) {
        if (err1) console.log("Error in Update Characters Clothes: "+err1);
        player.notify("~g~Die Texturen wurden gespeichert!"); 
    });   
  });