mp.events.add("server:license:openShop", (player) => {
  if (mp.players.exists(player)) {
    player.call("client:licenseshop:mainMenu",[player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);       
  }
});

mp.events.add("server:licenseshop:buyLicense",(player,item) => {
    if (mp.players.exists(player)) {
        if (item == "PKW Führerschein kaufen") {
            if (mp.players.exists(player)) {
                gm.mysql.handle.query("UPDATE licenses SET pkw = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
                    if (err) console.log("Error in Update pkw: "+err);
                    player.data.pkw = 1;
                    player.notify("~g~PKW Führerschein gekauft");
                    player.call("client:licenseshop:mainMenu",[player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
                });
            }        
        } else
        if (item == "LKW Führschein kaufen") {
            if (mp.players.exists(player)) {
                gm.mysql.handle.query("UPDATE licenses SET lkw = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
                    if (err) console.log("Error in Update lkw: "+err);
                    player.data.lkw = 1;
                    player.notify("~g~LKW Führerschein gekauft");
                    player.call("client:licenseshop:mainMenu",[player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
                });
            }        
        } else
        if (item == "Piloten Lizenz kaufen") {
            gm.mysql.handle.query("UPDATE licenses SET pilot = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
                if (err) console.log("Error in Update pilot: "+err);
                player.data.pilot = 1;
                player.notify("~g~Pilotenlizenz gekauft");
                player.call("client:licenseshop:mainMenu",[player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
            });
        } else
        if (item == "Job Lizenz kaufen") {
            gm.mysql.handle.query("UPDATE licenses SET job = '1' WHERE charId = ?", [player.data.charId], function(err,res) {
                if (err) console.log("Error in Update job: "+err);
                player.data.job = 1;
                player.notify("~g~Joblizenz gekauft");
                player.call("client:licenseshop:mainMenu",[player.data.pkw, player.data.lkw, player.data.pilot, player.data.job]);
            });
        }
    }    
});