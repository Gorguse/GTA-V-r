let out2 = mp.colshapes.newSphere(287.81,-920,29, 2, 0);
let out3 = mp.colshapes.newSphere(-47.32,-585.56,37, 2, 0);
let out4 = mp.colshapes.newSphere(-658.56,887,229, 2, 0);
let out5 = mp.colshapes.newSphere(-216.47,-1674.48,34.4634, 2, 0);
let out6 = mp.colshapes.newSphere(343.253,-2027.99, 22.3543, 2, 0);
let out7 = mp.colshapes.newSphere(-152.016,910.791, 235.656, 2, 0);
let out8 = mp.colshapes.newSphere(-113.353,985.875, 235.754, 2, 0);
let out9 = mp.colshapes.newSphere(-476.65,647.491, 144.387, 2, 0);
let out10 = mp.colshapes.newSphere(-526.847,517.387,112.941, 2, 0);
let out11 = mp.colshapes.newSphere(-536.72,477.393,103.194, 2, 0);
let out12 = mp.colshapes.newSphere(1386.07,-593.424,74.4855, 2, 0);
let out13 = mp.colshapes.newSphere(1303.16,-527.48,71.4607, 2, 0);
let out14 = mp.colshapes.newSphere(85.7106,-1959.57,21.1217, 2, 0);
let out15 = mp.colshapes.newSphere(510.53,232.52,104.744, 2, 0);



mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(out2.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,2);   
    } else if(out3.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,3);
    } else if(out4.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,4);     
    } else if(out5.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,5);
    } else if(out6.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,6);
    } else if(out7.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,7);
    } else if(out8.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,8);
    } else if(out9.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,9);
    } else if(out10.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,10);
    } else if(out11.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,11);
    } else if(out12.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,12);
    } else if(out13.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,13); 
    } else if(out14.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,14);
    } else if(out15.isPointWithin(player.position)) {
        mp.events.call("server:housing:openMenu",player,15);     
    }      
  }
});

let in2 = mp.colshapes.newSphere(266.08,-1007.34,-101, 2, 0);
let in3 = mp.colshapes.newSphere(-18.36,-591.059,90, 2, 0);
let in4 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in5 = mp.colshapes.newSphere(266.08,-1007.34,-101, 2, 0);
let in6 = mp.colshapes.newSphere(266.08,-1007.34,-101, 2, 0);
let in7 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in8 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in9 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in10 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in11 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);
let in12 = mp.colshapes.newSphere(1273.9,-1719.305,54.77141, 2, 0);
let in13 = mp.colshapes.newSphere(1273.9,-1719.305,54.77141, 2, 0);
let in14 = mp.colshapes.newSphere(266.08,-1007.34,-101, 2, 0);
let in15 = mp.colshapes.newSphere(-860.101,690.32,152.86, 2, 0);



mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(in2.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,2);   
    } else if(in3.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,3);
    } else if(in4.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,4);    
    } else if(in5.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,5);
    } else if(in6.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,6);
    } else if(in7.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,7);
    } else if(in8.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,8);
    } else if(in9.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,9);
    } else if(in10.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,10);
    } else if(in11.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,11);
    } else if(in12.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,12);
    } else if(in13.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,13);
    } else if(in14.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,14);
    } else if(in15.isPointWithin(player.position)) {
        mp.events.call("server:housing:openInMenu",player,15);
    }      
  }
});

let outfit2 = mp.colshapes.newSphere(260,-1004,-99, 2, 0);
let outfit3 = mp.colshapes.newSphere(-38,-583,83.91, 2, 0);
let outfit4 = mp.colshapes.newSphere(0,0,0, 2, 0);
let outfit5 = mp.colshapes.newSphere(260,-1004,-99, 2, 0);
let outfit6 = mp.colshapes.newSphere(260,-1004,-99, 2, 0);
let outfit14 = mp.colshapes.newSphere(260,-1004,-99, 2, 0);



mp.events.add("PushE", (player) => {
  if (mp.players.exists(player)) {
    if(outfit2.isPointWithin(player.position)) {
        mp.events.call("client:housing:outfit",player,2);   
    } else if(outfit3.isPointWithin(player.position)) {
        mp.events.call("client:housing:outfit",player,3);
    } else if(outfit5.isPointWithin(player.position)) {
        mp.events.call("client:housing:outfit",player,5);
    } else if(outfit6.isPointWithin(player.position)) {
        mp.events.call("client:housing:outfit",player,6);
    } else if(outfit14.isPointWithin(player.position)) {
        mp.events.call("client:housing:outfit",player,14);     
    } else if(outfit4.isPointWithin(player.position)) {
        player.call("client:housing:outfit");
    }      
  }
});