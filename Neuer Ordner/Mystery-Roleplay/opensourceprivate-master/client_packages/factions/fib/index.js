const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;
let selectedNumPlate = null;
player = mp.players.local;
const MenuPoint = new Point(50, 50);
let clothesFIB = null;
let mainMenuFIB = null;
let memberMenuFIB = null;

// Main Menu
mp.events.add("client:fib:openMainMenu", (factionrang) => {
  mainMenuFIB = new Menu("FIB","",MenuPoint);
  mainMenuFIB.AddItem(new UIMenuItem("Dienstausweis zeigen","Du zeigst deinen Dienstausweis"));
  mainMenuFIB.AddItem(new UIMenuItem("Dispatches","Liste aller aktiven Dispatches"));
  mainMenuFIB.AddItem(new UIMenuItem("Festnehmen","Du nimmst die Person fest"));
  mainMenuFIB.AddItem(new UIMenuItem("Freilassen","Du lässt die Person frei"));
  mainMenuFIB.AddItem(new UIMenuItem("Durchsuchen","Du durchsuchst die Person"));
  mainMenuFIB.AddItem(new UIMenuItem("Waffen Durchsuchen","Du durchsuchst die Person nach Waffen"));
  mainMenuFIB.AddItem(new UIMenuItem("Bußgeld ausstellen","Du stellst ein Bußgeld aus"));
  mainMenuFIB.AddItem(new UIMenuItem("Fahrzeug Beschlagnahmen","Fahrzeug beschlagnahmen"));
    if(factionrang > 6){
      mainMenuFIB.AddItem(new UIMenuItem("Mitarbeiterverwaltung",""));
    }
    if(mainMenuFIB.Visible == false && memberMenuFIB.Visible == false)
    {
    mainMenuFIB.Open();
    }
    mainMenuFIB.ItemSelect.on((item, index) => {
      const nextMenu = index;    
      if (item.Text !== "Bußgeld ausstellen") {
        mp.events.callRemote("server:fib:mainMenu",item.Text);
        mainMenuFIB.Close();
      } else {
        mp.events.call("createInputShop", "LspdTicket");
        mainMenuFIB.Close();
      }          
    });
    mainMenuFIB.MenuClose.on(() => {
      mp.events.callRemote("server:playermenu:variable");
    });    
});
mp.events.add("client:fib:requestTicket", (cop, amount, accountamount, staatskonto) => {
  const   ui_ticket = new Menu("Ticket bezahlen", "Du sollst "+amount+"$ bezahlen", MenuPoint);
          ui_ticket.AddItem( new UIMenuItem("Bezahlen", "Bezahle das Ticket"));
          ui_ticket.AddItem( new UIMenuItem("Ablehnen", "Das Ticket nicht bezahlen"));
          ui_ticket.Visible = true;

  ui_ticket.ItemSelect.on((item, index, value) => {
      if (item.Text == 'Bezahlen') {
          mp.events.callRemote("server:fib:payTicket",cop,amount,accountamount, staatskonto);
          ui_ticket.Close();
      } else if (item.Text == 'Ablehnen') {
          mp.events.callRemote("server:fib:dontPayTicket",cop);
          ui_ticket.Close();
      }
  });
});

//MemberMenu
mp.events.add("client:fib:openMemberMenu", () => {
  memberMenuFIB = new Menu("FIB","Mitarbeiterverwaltung",MenuPoint);
  memberMenuFIB.AddItem(new UIMenuItem("Einstellen","Person einstellen"));
  memberMenuFIB.AddItem( new UIMenuListItem("Befördern","Befördere dein gegenüber", FIBRanks =new ItemsCollection(["1", "2", "3","4","5","6","7","8","9","10","11","12"])));
  memberMenuFIB.AddItem(new UIMenuItem("Dienstnummer zuweisen","Du weist die Dienstnummer zu"));
  memberMenuFIB.AddItem(new UIMenuItem("Entlassen","Person entlassen"));
  memberMenuFIB.Open();
  memberMenuFIB.ItemSelect.on((item, index) => {  
     if (item.Text == "Einstellen") {
      mp.events.callRemote("server:fib:einstellen");
      memberMenuFIB.Close();
     }  
     if (item.Text == "Dienstnummer zuweisen") {
      mp.events.call("createInputShop", "dienstnummerfib");
      memberMenuFIB.Close();
     }  
     if (item.Text == "Befördern") {
      mp.events.callRemote("server:fib:befördern",item.SelectedItem.DisplayText);
      memberMenuFIB.Close();
     }
     if (item.Text == "Entlassen") {
      mp.events.callRemote("server:fib:entlassen");
      memberMenuFIB.Close();
     }
  });
});
mp.events.add("client:fib:closeMemberMenu", () => {
memberMenuFIB.Close();
});

//MemberMenü Ende
//Cothes Menu
clothesFIB = new Menu("FIB", "Umkleide", MenuPoint);
clothesFIB.AddItem(new UIMenuItem("Zivil","Deine Zivilkleidung"));
clothesFIB.AddItem(new UIMenuItem("Undercover","Deine Undercoverkleidung"));
clothesFIB.Visible = false;

mp.events.add("client:fib:clothes", () => {
  clothesFIB.Visible = true;
});

clothesFIB.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:fib:clothes",item.Text);
});
clothesFIB.MenuClose.on(() => {
  mp.events.callRemote("server:playermenu:variable");
});

//Cothes Menu


// MAIN MENU anzeigen
function drawDipatch(disJSON){
  // Menu für Fahrzeugliste anlegen
  ui_Dispatchv = new Menu("Dispatches", "Liste aller Dispatches", MenuPoint);
  ui_Dispatchv.Visible = true;
  if (disJSON != "none"){
    disList = JSON.parse(disJSON);
    disList.forEach(dispatch => {
        let newItem = new UIMenuItem("Dispatch-"+dispatch.disid, ""+dispatch.id);
        ui_Dispatchv.AddItem(newItem);
    });
  } else{
    ui_Dispatchv.AddItem( new UIMenuItem("Keine Dispatches vorhanden", ""));
  }

  // Auswertung Menuauswahl ausparken
  ui_Dispatchv.ItemSelect.on((item, index) => {
      mp.events.call("client:fib:dispatchsub", item.Description);
      ui_Dispatchv.Close();
  });
}
mp.events.add("client:fib:dispatchvewer", drawDipatch);

mp.events.add("client:fib:dispatchsub", (position) => {
  const   ui_subdispatch = new Menu("Dipatch", "Wähle eine Aktion", MenuPoint);
  ui_subdispatch.AddItem( new UIMenuItem("Dispatch Makieren", ""+position));
  ui_subdispatch.AddItem( new UIMenuItem("Dispatch löschen", ""+position));
  ui_subdispatch.Visible = true;

  ui_subdispatch.ItemSelect.on((item) => {
      if (item.Text == 'Dispatch Makieren') {
          mp.events.callRemote("server:fib:mark",item.Description)
          ui_subdispatch.Close();
      } else if (item.Text == 'Dispatch löschen') {
          mp.events.callRemote("server:fib:deletedispatch",item.Description);
          ui_subdispatch.Close();
      }
  });
});

mp.events.add("client:fib:markdispatch",(posx, posy) => {
  mp.game.ui.setNewWaypoint(posx, posy);
});


mp.events.add("client:fib:openWeapon", (ausnahme) => {
  let weapon = new Menu("Waffenkammer", "Waffenkammer", MenuPoint);
  weapon.AddItem(new UIMenuItem("Waffen nehmen","")); 
  weapon.AddItem(new UIMenuItem("Waffen abgeben",""));     
  weapon.AddItem( new UIMenuItem("Schließen", ""));
  weapon.Visible = true;

  weapon.ItemSelect.on((item, index, value) => {
    if (item.Text == "Waffen nehmen") {
      mp.events.call("client:fib:Weapons", ausnahme);
      weapon.Close();
    } else if (item.Text == "Waffen abgeben") {
      mp.events.call("client:fib:deleteWeapons");
      weapon.Close();
    } else if (item.Text == "Schließen") {
      weapon.Close();
    }
  });
  weapon.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});

mp.events.add("client:fib:searchInvMenu", (inventory) => {
  const ui_search = new Menu("Durchsuchung", "Das hat diese Person dabei", MenuPoint);

  var invParsed = JSON.parse(inventory);
  invParsed.forEach((invItem) => {
        ui_search.AddItem( new UIMenuItem(""+invItem.itemName+" ("+invItem.amount+"x)", ""+invItem.id));
  });
        ui_search.AddItem( new UIMenuItem("Schließen", "Durchsuchung beenden"));
        ui_search.Visible = true;

  ui_search.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:removeItem",item.Description);
    } else {
      ui_search.Close();
    }
  });
});

mp.events.add("client:fib:Weapons", (ausnahme) => {
  let weaponFIB = new Menu("Waffenkammer", "Waffenkammer", MenuPoint);
  weaponFIB.AddItem(new UIMenuItem("Schutzweste",""));
  weaponFIB.AddItem(new UIMenuItem("Fallschirm",""));
  weaponFIB.AddItem(new UIMenuItem("Taschenlampe",""));
  weaponFIB.AddItem(new UIMenuItem("Schlagstock",""));
  weaponFIB.AddItem(new UIMenuItem("Tazer",""));
  weaponFIB.AddItem(new UIMenuItem("Pistole Kaliber .50",""));
  weaponFIB.AddItem(new UIMenuItem("AP-Pistole",""));
  if (ausnahme == 1) {
    weaponFIB.AddItem(new UIMenuItem("SMG",""));
    weaponFIB.AddItem(new UIMenuItem("Karabiner",""))  
    weaponFIB.AddItem(new UIMenuItem("Spezial Karabiner MK2","")) 
  }    
  weaponFIB.AddItem( new UIMenuItem("Schließen", ""));
  weaponFIB.Visible = true;

  weaponFIB.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:weapons",item.Text);
    } else if (item.Text == "Schließen") {
      weaponFIB.Close();
    }
  });
  weaponFIB.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});

mp.events.add("client:fib:deleteWeapons", () => {
  let weaponDFIB = new Menu("Waffenkammer", "Waffenkammer", MenuPoint);
  weaponDFIB.AddItem(new UIMenuItem("Schutzweste",""));
  weaponDFIB.AddItem(new UIMenuItem("Fallschirm",""));
  weaponDFIB.AddItem(new UIMenuItem("Taschenlampe",""));
  weaponDFIB.AddItem(new UIMenuItem("Schlagstock",""));
  weaponDFIB.AddItem(new UIMenuItem("Tazer",""));
  weaponDFIB.AddItem(new UIMenuItem("Pistole Kaliber .50",""));
  weaponDFIB.AddItem(new UIMenuItem("AP-Pistole",""));
  weaponDFIB.AddItem(new UIMenuItem("SMG",""));
  weaponDFIB.AddItem(new UIMenuItem("Karabiner",""));   
  weaponDFIB.AddItem(new UIMenuItem("Spezial Karabiner MK2",""));    
  weaponDFIB.AddItem( new UIMenuItem("Schließen", ""));
  weaponDFIB.Visible = true;

  weaponDFIB.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:weaponsdelete",item.Text);
    } else if (item.Text == "Schließen") {
      weaponDFIB.Close();
    }
  });
});

let dismissFIB = null;
mp.events.add("client:fib:askedForDismiss", () => {
  dismissFIB = new Menu("FIB","Willst du den Mitarbeiter wirklich entlassen?",MenuPoint);
  dismissFIB.AddItem(new UIMenuItem("Ja","Der Mitarbeiter wird entlassen."));
  dismissFIB.AddItem(new UIMenuItem("Nein","Aktion abbrechen"));
  dismissFIB.Open();

  dismissFIB.ItemSelect.on((item, index) => {      
    mp.events.callRemote("server:fib:dismissMember",item.Text);
  });
});
mp.events.add("client:fib:closeDismissMenu", () => {
  dismissFIB.Close();
});

mp.events.add("client:fib:createOfficeComputer", (factionrang) => {
   const officeComputer = new Menu("FIB","Computer",MenuPoint);
  officeComputer.AddItem(new UIMenuItem("Aktive Mitarbeiter","Du siehst alle Officer die im Dienst sind!"));
  officeComputer.AddItem(new UIMenuItem("Halterabfrage","Hier kannst du über ein Kennzeichen den Halter ermitteln."));
  officeComputer.AddItem(new UIMenuItem("Leitstelle","Rufnummer: 999"));
  if (factionrang > 6) {
    officeComputer.AddItem(new UIMenuItem("Ausnahmezustand","Ausnahmezustand aktivieren/deaktivieren"));
  }  
  officeComputer.Visible = true;
  

  officeComputer.ItemSelect.on((item, index) => {
    if (item.Text == "Aktive Mitarbeiter" || item.Text == "Ausnahmezustand") {
      mp.events.callRemote("server:fib:officeComputer",item.Text);
      officeComputer.Close();
    } else if (item.Text == "Halterabfrage") {
      mp.events.call("createInputText", "fibHalter");
      officeComputer.Close();      
    }  else if (item.Text == "Leitstelle") {
      mp.events.callRemote("server:phone:getLeitstelle",999);
      officeComputer.Close();      
    }  
  });
  officeComputer.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
  
});
function activeFIBMemberList(playerJSON,id){  
  activeMemberMenu = new Menu("Aktive Mitarbeiter", "Liste aller Mitarbeiter im Dienst", MenuPoint);
  activeMemberMenu.Visible = true;
  if (playerJSON != "none") {
    playerJSON = JSON.parse(playerJSON);
    playerJSON.forEach(players => {
        let newItem = new UIMenuItem("" + players.firstname+" "+players.lastname, ""+players.onlineid);
        activeMemberMenu.AddItem(newItem);
        newItem.SetRightLabel("Rang: "+players.factionrang);
    });
  } else {
    activeMemberMenu.AddItem( new UIMenuItem("Keine Mitarbeiter sind im Dienst!", ""));
  }

  activeMemberMenu.ItemSelect.on((item, index) => {
    activeMemberMenu.Close();
    
    
  });
}
mp.events.add("client:fib:activeMemberList", activeFIBMemberList);


mp.events.add("client:fib:createChiefMenu",() => {
  let main = new Menu("Chief PC", "Chief Computer", MenuPoint);
    main.AddItem(new UIMenuItem("Mitarbeiter",""));   
    main.AddItem( new UIMenuItem("Schließen", ""));
    main.Visible = true;

    main.ItemSelect.on((item, index, value) => {
    if (item.Text == "Mitarbeiter") {
      mp.events.callRemote("server:fib:mitarbeiter");
      main.Close();
    } else if (item.Text == "Schließen") {
      main.Close();
    }
  });
  main.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});

function drawMenu(charJSON){
  mp.gui.cursor.visible = false;
  // Menu für Fahrzeugliste anlegen
  ui_List = new Menu("Charakter", "Liste aller Charakter", MenuPoint);
  ui_List.Visible = true;
  if (charJSON != "none"){
    charList = JSON.parse(charJSON);
    charList.forEach(char => {
        let newItem = new UIMenuItem(""+char.firstname+" "+char.lastname, ""+char.id);
        ui_List.AddItem(newItem);
        newItem.SetRightLabel("Rang: "+char.factionrang);
    });
  } else{
    ui_List.AddItem(new UIMenuItem("Du besitzt keine Charaktere!", ""));
  }


  ui_List.ItemSelect.on((item, index) => {      
      mp.events.call("client:fib:memberSub",item.Description);
      ui_List.Close();
  });
}
mp.events.add("client:fib:Memberlist", drawMenu);

mp.events.add("client:fib:memberSub",(id) => {
  let memberSub = new Menu("Chief PC", "Chief Computer", MenuPoint);
  memberSub.AddItem(new UIMenuItem("Kündigen",""));   
  memberSub.AddItem( new UIMenuItem("Schließen", ""));
  memberSub.Visible = true;

    memberSub.ItemSelect.on((item, index, value) => {
    if (item.Text == "Kündigen") {
      mp.events.callRemote("server:fib:mitarbeiter",id);
      memberSub.Close();
    } else if (item.Text == "Schließen") {
      memberSub.Close();
    }
  });
});


mp.events.add("client:fib:createVeichleMenu",(rang) => {
  let vehicles = new Menu("Dienstfahrzeuge", "Die Dienstfahrzeuge", MenuPoint);
    vehicles.AddItem(new UIMenuItem("UM Charger","1"));
    vehicles.AddItem(new UIMenuItem("Marked Charger","2"));  
    vehicles.AddItem(new UIMenuItem("Caracara","2945871676‬"));
    vehicles.AddItem(new UIMenuItem("Baller","1878062887‬"));    
    vehicles.AddItem(new UIMenuItem("FIB Buffalo","1127131465"));
    vehicles.AddItem(new UIMenuItem("FIB Stanier","2321795001‬"));
    vehicles.AddItem(new UIMenuItem("FIB Granger","2647026068‬"));
    vehicles.AddItem(new UIMenuItem("Revolter","3884762073‬"));
    vehicles.AddItem(new UIMenuItem("Schafter V12","2809443750‬"));
    vehicles.AddItem(new UIMenuItem("Dubsta","3900892662‬"));
    vehicles.AddItem(new UIMenuItem("Insurgent","2071877360‬"));

    
  vehicles.AddItem( new UIMenuItem("Schließen", ""));
  vehicles.Visible = true;

  vehicles.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:spawnVehicle",item.Description);
      vehicles.Close();
    } else if (item.Text == "Schließen") {
      vehicles.Close();
    }
  });
  vehicles.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});

mp.events.add("client:fib:createHeliMenu",(rang) => {
  let heli = new Menu("Helikopter", "Die Dienst Helikopter", MenuPoint);
  heli.AddItem(new UIMenuItem("Buzzard","745926877‬"));
  heli.AddItem( new UIMenuItem("Schließen", ""));
  heli.Visible = true;

  heli.ItemSelect.on((item, index, value) => {
    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:spawnHeli",item.Description);
      heli.Close();
    } else if (item.Text == "Schließen") {
      heli.Close();
    }
  });
  heli.MenuClose.on(() => {
    mp.events.callRemote("server:playermenu:variable");
  });
});



mp.events.add("client:fib:vehicleblip", (posX, posY, posZ) => {
  var vehicle = "vehicle_";
  global[vehicle + "_"] = mp.blips.new(56, new mp.Vector3(parseFloat(posX), parseFloat(posY), parseFloat(posZ)),
  {
      name: "Streifenwagen",
      scale: 1.00,
      color: 70,
      alpha: 255,
      drawDistance: 10,
      shortRange: false,
      rotation: 0.00,
      dimension: 0,
  });
});

// Dispatch blips
mp.events.add("client:fib:showDispatch", (posX, posY, posZ, id) => {
  var dispatchTime = new Date().getTime();
  var policeDispatch = "policeDispatch_";
  mp.game.graphics.notify("Neuer Dispatch eingegangen.");

  global[policeDispatch + mp.players.local.getVariable("ingameName") + "_" + dispatchTime] = mp.blips.new(60, new mp.Vector3(parseFloat(posX), parseFloat(posY), parseFloat(posZ)),
  {
      name: "Notruf Standort: "+id,
      scale: 1.00,
      color: 1,
      alpha: 255,
      drawDistance: 10,
      shortRange: false,
      rotation: 0.00,
      dimension: 0,
  });
  setTimeout(() => {
    global[policeDispatch + mp.players.local.getVariable("ingameName") + "_" + dispatchTime].destroy();
  }, 600000)
});

mp.events.add("client:fib:weaponssee", (taser,pistol,fivepistol,schwerepistol,appistol,smg,pdw,karabiner,pump,taschenlampe,schlagstock,messer,bat,target) => {
  const ui_weapon = new Menu("Waffen", "", MenuPoint);
  if (taser == 1) {
    ui_weapon.AddItem( new UIMenuItem("Taser", ""));
  }
  if (pistol == 1) {
    ui_weapon.AddItem( new UIMenuItem("Pistole", ""));
  }
  if (fivepistol == 1) {
    ui_weapon.AddItem( new UIMenuItem("50. Kaliber", ""));
  }
  if (schwerepistol == 1) {
    ui_weapon.AddItem( new UIMenuItem("Schwere Pistole", ""));
  }
  if (appistol == 1) {
    ui_weapon.AddItem( new UIMenuItem("AP Pistole", ""));
  }
  if (smg == 1) {
    ui_weapon.AddItem( new UIMenuItem("SMG", ""));
  }
  if (pdw == 1) {
    ui_weapon.AddItem( new UIMenuItem("PDW", ""));
  }
  if (karabiner == 1) {
    ui_weapon.AddItem( new UIMenuItem("Karabiner", ""));
  }
  if (pump == 1) {
    ui_weapon.AddItem( new UIMenuItem("Pump Schrotflinte", ""));
  }
  if (taschenlampe == 1) {
    ui_weapon.AddItem( new UIMenuItem("Taschenlampe", ""));
  }
  if (schlagstock == 1) {
    ui_weapon.AddItem( new UIMenuItem("Schlagstock", ""));
  }
  if (messer == 1) {
    ui_weapon.AddItem( new UIMenuItem("Messer", ""));
  }
  if (bat == 1) {
    ui_weapon.AddItem( new UIMenuItem("Baseballschläger", ""));
  }
  ui_weapon.AddItem( new UIMenuItem("Schließen", ""));
  ui_weapon.Visible = true;

  ui_weapon.ItemSelect.on((item, index, value) => {
    let nearestPlayers = [];
    mp.players.forEachInRange(mp.players.local.position, 2, (nearPlayer) => {
        nearestPlayers.push(nearPlayer);
    });

    if (item.Text !== "Schließen") {
      mp.events.callRemote("server:fib:weaponbesch", item.Text,target);
      ui_weapon.Close();
    } else {
      ui_weapon.Close();
    }
  });
});



