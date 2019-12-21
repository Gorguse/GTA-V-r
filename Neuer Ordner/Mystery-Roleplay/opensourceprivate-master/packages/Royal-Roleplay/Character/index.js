const freemodeCharacters = [mp.joaat("mp_m_freemode_01"), mp.joaat("mp_f_freemode_01")];

mp.events.add("server:charcreator:startcreator", (player) => {
  if(mp.players.exists(player)) {
      
  }
});

mp.events.add("createCharacter", (player, data) => {
  if(mp.players.exists(player)) {
    gm.mysql.handle.query("UPDATE characters SET created = '1' WHERE id = '" + player.data.charId + "'", (err, res) => {
        if (err) throw err;
        //player.position = new mp.Vector3(-1042.6781005859375, -2746.25, 21.35940170288086);
        //player.heading = 323.992858886715;
        //player.notify("~g~Dein Character ist nun eingereist!");

        if (player.model === mp.joaat("mp_m_freemode_01")) {
            player.setClothes(1, 0, 0, 0); //Mask
            player.setClothes(3, 6, 0, 0); //Torso
            player.setClothes(4, 1, 0, 0); //Legs
            player.setClothes(6, 1, 0, 0); //Shoes
            player.setClothes(8, 15, 0, 0); //Undershirt
            player.setClothes(11, 41, 0, 0); //Top
        } else {
            player.setClothes(1, 0, 0, 0); //Mask 
            player.setClothes(3, 15, 0, 0); //Torso
            player.setClothes(4, 73, 0, 0); //Legs
            player.setClothes(6, 3, 0, 0); //Shoes
            player.setClothes(8, 16, 0, 0); //Undershirt
            player.setClothes(11, 16, 0, 0); //Top
        }

        gm.mysql.handle.query("UPDATE characters SET data =? WHERE id='" + player.data.charId + "'", [data], function (err, res) {
            if (err) throw err;
        });
        player.dimension = 0;
        player.alpha = 255;
        player.call("stopCreator");
        //In die "Einreisehalle"

 



        //player.call("sendPlayerToAirport");
    });
  }
});



mp.events.add("creator_GenderChange", (player, gender) => {
  if(mp.players.exists(player)) {
    player.model = freemodeCharacters[gender];
    player.data.model = gender;
    player.alpha = 0;

    player.changedGender = true;
    player.call("genderChange");
  }
});
mp.events.add("server:characters:clothes", (player,slot) => {
  if(slot == 0)
  {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0); //Frau 120
      player.setClothes(11,278,1,0);
      player.setClothes(8,2,0,0);
      player.setClothes(4,1,0,0);
      player.setClothes(6,1,0,0);
      player.setClothes(3,0,0,0);
    }
    else 
    {
      player.setProp(0,120,0); //Frau 120
    }
  }
  else if(slot == 1) {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0);
      player.setClothes(1, 0, 0, 0); //Mask
      player.setClothes(3, 6, 0, 0); //Torso
      player.setClothes(4, 1, 0, 0); //Legs
      player.setClothes(6, 1, 0, 0); //Shoes
      player.setClothes(8, 15, 0, 0); //Undershirt
      player.setClothes(11, 41, 0, 0); //Top
    }
    else
    {
      player.setProp(0,120,0);
    }
  }
  else if(slot == 2) {
    if (player.model === mp.joaat("mp_m_freemode_01")) 
    {
      player.setProp(0,121,0);
      player.setClothes(11,284,0,0);
      player.setClothes(8,2,0,0);
      player.setClothes(4,10,0,0);
      player.setClothes(6,10,0,0);
      player.setClothes(3,1,0,0);
    }
    else {
      player.setProp(0,120,0);
    }
  }
  else if(slot == 3) {
    let hat = player.getProp(0);
    let jackets = player.getClothes(11);
    let torso = player.getClothes(3);
    let leg = player.getClothes(4);
    let shoe = player.getClothes(6);
    let shirt = player.getClothes(8);
    let body = player.getClothes(9);
    gm.clothes.SetPlayerClothes(player,"hat",hat.drawable, hat.texture);
    gm.clothes.SetPlayerClothes(player,"jacket",jackets.drawable,jackets.texture);
    gm.clothes.SetPlayerClothes(player,"torso",torso.drawable,0);
    gm.clothes.SetPlayerClothes(player,"leg",leg.drawable,leg.texture);
    gm.clothes.SetPlayerClothes(player,"shoe",shoe.drawable,shoe.texture);
    gm.clothes.SetPlayerClothes(player,"shirt",shirt.drawable,shirt.texture);
    gm.clothes.SetPlayerClothes(player,"body",body.drawable,body.texture);

    player.call("client:characters:closeClothes");
    player.call("client:characters:closeCamera");
    /*player.position = new mp.Vector3(-1042.6781005859375, -2746.25, 21.35940170288086);
    player.heading = 323.992858886715;
    player.data.isSpawned = 1;*/
    gm.mysql.handle.query('SELECT fistname,lastname,id FROM characters WHERE accountID = ? AND whitelisted = ?', [player.data.accountID,1], function (err1, res1, row1) {
      if (err1) console.log("Error in Select Characters: "+err1);	
          if(res1.length) {
              var charList = [];
              res1.forEach(function(chars) {
                  let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                  charList.push(obj);

              });					
              player.call("client:characters:choosechar", [JSON.stringify(charList)]);	
              
          }
          player.position = new mp.Vector3(-797.3433227539062, 332.110595703125, 153.8050079345703);
          player.heading = 268.0709228515625;
          player.call("client:characters:showCamera");
      });
  }

  
    
});
mp.events.add("server:characters:selected", (player, slot) => {
    if(slot == 0)
    {
      player.position = new mp.Vector3(player.data.posX,player.data.posY,player.data.posZ);
      player.heading = player.data.posR;
      player.dimension = player.data.dimension;
      player.data.isSpawned = 1;
      player.call("client:characters:destroyMenu");
      player.call("ConnectTeamspeak", [true]);
      player.call("openHud");
      var money = parseFloat(player.data.money).toFixed(2);
      player.call("changeValue", ['money', money]);    
      player.call("changeValue", ['food', player.data.food]);
      player.call("changeValue", ['drink', player.data.drink]); 
      player.call("changeValue", ['voice', 0]); 
      gm.mysql.handle.query("UPDATE characters SET isOnline = '1' , onlineId = ? WHERE id = ?", [player.id,player.data.charId],function(err5,res5) {
        if(err5) console.log("Error in Update Online Status: "+err5);
      });
      player.data.onlineId = player.id;
      gm.mysql.handle.query('SELECT * FROM peds WHERE 1=1', [], function (error, results, fields) {
        for(let i = 0; i < results.length; i++) {
            player.call("LoadPeds",[results[i].posX,results[i].posY,results[i].posZ,results[i].posR,results[i].ped]);				
        }
    });
      if (player.data.dead == 1) {
        player.health = 0;
        player.data.health = 0;
        mp.events.call("playerDeath",player);
      }
      gm.mysql.handle.query("SELECT * FROM licenses WHERE charId = ?",[player.data.charId],function(err56,res56) {
        if (err56) console.log("Error in Select Bankkonten on Login: "+err56);
        if (res56.length > 0) {

        } else {
          gm.mysql.handle.query("INSERT INTO licenses SET charId = ?",[player.data.charId]);
        }
      });
      gm.mysql.handle.query("SELECT * FROM user_weapons WHERE charId = ?",[player.data.charId],function(err57,res57) {
        if (err57) console.log("Error in Select Bankkonten on Login: "+err57);
        if (res57.length > 0) {

        } else {
          gm.mysql.handle.query("INSERT INTO user_weapons SET charId = ?",[player.data.charId]);          
        }
      });
      gm.mysql.handle.query("SELECT * FROM faction_weapons WHERE charId = ?",[player.data.charId],function(err58,res58) {
        if (err58) console.log("Error in Select Bankkonten on Login: "+err58);
        if (res58.length > 0) {

        } else {
          gm.mysql.handle.query("INSERT INTO faction_weapons SET charId = ?",[player.data.charId]);
        }
      });
      gm.mysql.handle.query("SELECT * FROM shortcuts WHERE charId = ?",[player.data.charId],function(err59,res59) {
        if (err59) console.log("Error in Select Bankkonten on Login: "+err59);
        if (res59.length > 0) {

        } else {
          gm.mysql.handle.query("INSERT INTO shortcuts SET charId = ?",[player.data.charId]);
        }
      });
      if (player.data.inventory == 30) {
        player.setClothes(5, 45, 0, 0);
      }
    }
    else if(slot == 1)
    {
      gm.mysql.handle.query('SELECT firstname,lastname,id FROM characters WHERE accountID = ? AND whitelisted = ?', [player.data.accountID,1], function (err1, res1, row1) {
        if (err1) console.log("Error in Select Characters: "+err1);	
            if(res1.length) {
                var charList = [];
                res1.forEach(function(chars) {
                    let obj = {"firstname": String(chars.firstname), "lastname": String(chars.lastname), "id": String(chars.id)};
                    charList.push(obj);

                });					
                player.call("client:characters:choosechar", [JSON.stringify(charList)]);	

            }
            player.call("client:characters:destroySpawnMenu");
        });
    }
});