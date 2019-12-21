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

const MenuPoint = new Point(50, 50);




function drawMenu(tankeJSON, job){
    ui_List = new Menu("Tankstelle", "", MenuPoint);
    ui_List.Visible = true;
    TankList = JSON.parse(tankeJSON);
    TankList.forEach(tanke => {
          let newbItem = new UIMenuItem("Benzin" , ""+tanke.id);
          ui_List.AddItem(newbItem);
          newbItem.SetRightLabel(""+tanke.bprice+"$");
          let newdItem = new UIMenuItem("Diesel" , ""+tanke.id);
          ui_List.AddItem(newdItem);
          newdItem.SetRightLabel(""+tanke.dprice+"$");
          let newsItem = new UIMenuItem("Strom" , ""+tanke.id);
          ui_List.AddItem(newsItem);
          newsItem.SetRightLabel(""+tanke.sprice+"$");
      });
      if (job == true) {
        ui_List.AddItem(new UIMenuItem("Befüllen",""));
      }      
  
    // Auswertung Menuauswahl ausparken
    ui_List.ItemSelect.on((item, index) => {
        mp.events.callRemote("server:tankstellen:tanken", item.Description, item.Text);
        ui_List.Close();
    });
    ui_List.MenuClose.on(() => {
      mp.events.callRemote("server:playermenu:variable");
    });
  }
  mp.events.add("client:tankstellen:drawMenu", drawMenu);