let shop7 = mp.colshapes.newSphere(-43.12,-1092,26.42, 2, 0);
let shop20 = mp.colshapes.newSphere(-1013,-2691,13.97, 2, 0);
let shop14 = mp.colshapes.newSphere(1158.36,-776.268,57.5987, 2, 0);
let shop12 = mp.colshapes.newSphere(927.063,-1560,30.9385, 2, 0);
let shop9 = mp.colshapes.newSphere(-229.617,-1377.24,31.2582, 2, 0);
let shop11 = mp.colshapes.newSphere(475.998,-1893.58,26.0946, 2, 0);
let shop13 = mp.colshapes.newSphere(967.813,-1829.15,31.2384, 2, 0);
let shop16 = mp.colshapes.newSphere(1920.01,3738.43,32.6314, 2, 0);
let shop17 = mp.colshapes.newSphere(-33.1259,6455.74,31.4757, 2, 0);
let shop18 = mp.colshapes.newSphere(-200.025,6234.39,31.5027, 2, 0);
let shop19 = mp.colshapes.newSphere(-359.009,6061.73,31.5001, 2, 0);
let shop21 = mp.colshapes.newSphere(153.2588348388672, -3218.755126953125, 5.909510612487793, 2, 0);


/*let shopArray = [];
// X, Y, Z, Range, Dimension
shopArray.push(mp.colshapes.newSphere(24.47,-1347.1,29.497, 2, 0), 1);
shopArray.push(mp.colshapes.newSphere(-47.693,-1759,29.42, 2, 0), 3);
shopArray.push(mp.colshapes.newSphere(-709,-915,19, 2, 0), 4);*/

mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {

    // shopArray.forEach((shape, id, index) => {
    //     console.log(`${shopArray[shape]} + ${shopArray[index]}`);
    //     if(shape.isPointWithin(player.position) && player.data.mainmenu == false) {
    //         if(id == 19 && !player.data.faction == "VanillaUnicorn") { continue; }
    //         player.call("server:carshop:openShop", index);
    //         player.data.mainmenu = true;
    //         return;
    //     }
    // });



     if(shop7.isPointWithin(player.position) && player.data.mainmenu == false) {//Taylor
        mp.events.call("server:carshop:openShop",player,7,"PDM");	   
        player.data.mainmenu = true;
    } else if(shop14.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,14,"Vans");  
        player.data.mainmenu = true;
    } else if(shop12.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,12,"LKW");  
        player.data.mainmenu = true;
    } else if(shop9.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,9,"Compacts");  
        player.data.mainmenu = true;
    } else if(shop11.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,11,"CustomCars");  
        player.data.mainmenu = true;
    } else if(shop13.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,13,"Rostautos");  
        player.data.mainmenu = true;
    } else if(shop16.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,16,"Motorcycles");  
        player.data.mainmenu = true;
    } else if(shop17.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,17,"Offroad");  
        player.data.mainmenu = true;
    } else if(shop18.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,18,"MuscleCars");  
        player.data.mainmenu = true;
    } else if(shop19.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,19,"Sedans");
        player.data.mainmenu = true;
    } else if(shop21.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,21,"Coupes");  
        player.data.mainmenu = true;
    } else if(shop20.isPointWithin(player.position) && player.data.mainmenu == false) {
        mp.events.call("server:carshop:openShop",player,20,"Fahrräder");  
        player.data.mainmenu = true;
    }   
  }
});