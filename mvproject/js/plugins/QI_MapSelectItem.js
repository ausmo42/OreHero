//=============================================================================
// Yanfly Engine Plugins - Map Select Item (By Category)
// QI_MapSelectQItem.js
//=============================================================================

var QI = QI || {}
var Imported = Imported || {};
Imported.QI_MapSelectItem = true;

//=============================================================================
 /*:
 * @plugindesc v1.01 Open up a window similar to the Select Item Window,
 * but instead, returns weapon/armor ID's to a variable.
 * @author Quasimmortal with Dahlys and Yanfly
 * 
 * @param Default Columns
 * @type number
 * @min 1
 * @desc Default number of columns for the window.
 * @default 2
 *
 * @param Default Rows
 * @type number
 * @min 1
 * @desc Default number of rows for the window.
 * @default 4
 *
 * @param Default X Position
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Default X Position of the window.
 * left     center     right
 * @default center
 *
 * @param Default Y Position
 * @type combo
 * @option top
 * @option middle
 * @option bottom
 * @desc Default Y Position of the window.
 * top     middle     bottom
 * @default bottom
 *
 * @param Default Width
 * @type number
 * @min 0
 * @desc Default width of the window.
 * If set to 0, window width will be the screen width.
 * @default 0
 *
 * @param Default Enable
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable all QItems by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Default Quantity
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show the quantity of the QItems by default?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Select Item event in RPG Maker MV does what it's supposed to: selects an
 * item and then binds the value to a variable. However, it lacks the ability
 * to allow the player to select weapons, armors, or both. This plugin gives
 * you the functionality of selecting an QItem and binding the ID of the QItem
 * to a variable.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Use the following plugin commands to utilize the Map Select QItem plugin.
 *
 * --- Plugin Commands ---
 *
 * MapSelectQItem var type
 * - This will open up the Map Select QItem window. Replace 'var' with the ID
 * of the variable you wish to set the selected item to. Replace 'type' with
 * 'weapon', 'armor', or 'both'. The 'type' will decide the list type.
 *
 * MapSelectQItemColumns x
 * - Sets the number of columns for the Map Select QItem Window to x.
 *
 * MapSelectQItemRows x
 * - Sets the number of rows for the Map Select QItem Window to x.
 *
 * MapSelectQItemWidth x
 * - Sets the width for the Map Select QItem Window to x. If 0 is used, then
 * the window width will be the screen width.
 *
 * MapSelectQItemX left
 * MapSelectQItemX center
 * MapSelectQItemX right
 * - Sets the Map Select QItem Window to be aligned to the left side of the
 * screen, center of the screen, or right side of the screen.
 *
 * MapSelectQItemY top
 * MapSelectQItemY middle
 * MapSelectQItemY bottom
 * - Sets the Map Select QItem Window to be aligned to the top of the screen,
 * middle of the screen, or bottom of the screen.
 *
 * ShowMapSelectQItemQuantity
 * - Show the quantity of the QItems in the Map Select QItem Window.
 *
 * HideMapSelectQItemQuantity
 * - Hide the quantity of the QItems in the Map Select QItem Window.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

QI.Parameters = PluginManager.parameters('QI_MapSelectItem');
QI.Param = QI.Param || {};
QI.MSE = QI.MSE || {};

QI.Param.MSECol = Number(QI.Parameters['Default Columns']);
QI.Param.MSERow = Number(QI.Parameters['Default Rows']);
QI.Param.MSEPosX = String(QI.Parameters['Default X Position']);
QI.Param.MSEPosY = String(QI.Parameters['Default Y Position']);
QI.Param.MSEWidth = Number(QI.Parameters['Default Width']);
QI.Param.MSEEnable = eval(String(QI.Parameters['Default Enable']));
QI.Param.MSEQuantity = eval(String(QI.Parameters['Default Quantity']));

//=============================================================================
// Game_System
//=============================================================================

QI.MSE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    QI.MSE.Game_System_initialize.call(this);
    this.initMapSelectQItem();
};

Game_System.prototype.initMapSelectQItem = function() {
    this._MapSelectQItemWindowColumns = QI.Param.MSECol;
    this._MapSelectQItemWindowRows = QI.Param.MSERow;
    this._MapSelectQItemWindowPosX = QI.Param.MSEPosX;
    this._MapSelectQItemWindowPosY = QI.Param.MSEPosY;
    this._MapSelectQItemWindowWidth = QI.Param.MSEWidth;
    this._MapSelectQItemWindowEnable = QI.Param.MSEEnable;
    this._MapSelectQItemWindowQuantity = QI.Param.MSEQuantity;
};

Game_System.prototype.getMapSelectQItemColumns = function() {
    if (this._MapSelectQItemWindowColumns === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowColumns;
};

Game_System.prototype.setMapSelectQItemColumns = function(value) {
    if (this._MapSelectQItemWindowColumns === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowColumns = value;
};

Game_System.prototype.getMapSelectQItemRows = function() {
    if (this._MapSelectQItemWindowRows === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowRows;
};

Game_System.prototype.setMapSelectQItemRows = function(value) {
    if (this._MapSelectQItemWindowRows === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowRows = value;
};

Game_System.prototype.getMapSelectQItemPosX = function() {
    if (this._MapSelectQItemWindowPosX === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowPosX;
};

Game_System.prototype.setMapSelectQItemPosX = function(value) {
    if (this._MapSelectQItemWindowPosX === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowPosX = value;
};

Game_System.prototype.getMapSelectQItemPosY = function() {
    if (this._MapSelectQItemWindowPosY === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowPosY;
};

Game_System.prototype.setMapSelectQItemPosY = function(value) {
    if (this._MapSelectQItemWindowPosY === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowPosY = value;
};

Game_System.prototype.getMapSelectQItemWidth = function() {
    if (this._MapSelectQItemWindowWidth === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowWidth;
};

Game_System.prototype.setMapSelectQItemWidth = function(value) {
    if (this._MapSelectQItemWindowWidth === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowWidth = value;
};

Game_System.prototype.getMapSelectQItemEnable = function() {
    if (this._MapSelectQItemWindowEnable === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowEnable;
};

Game_System.prototype.setMapSelectQItemEnable = function(value) {
    if (this._MapSelectQItemWindowEnable === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowEnable = value;
};

Game_System.prototype.getMapSelectQItemQuantity = function() {
    if (this._MapSelectQItemWindowQuantity === undefined) {
      this.initMapSelectQItem();
    }
    return this._MapSelectQItemWindowQuantity;
};

Game_System.prototype.setMapSelectQItemQuantity = function(value) {
    if (this._MapSelectQItemWindowQuantity === undefined) {
      this.initMapSelectQItem();
    }
    this._MapSelectQItemWindowQuantity = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

QI.MSE.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    QI.MSE.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MapSelectQItem') {
        if (SceneManager._scene instanceof Scene_Map) {
            var varId = parseInt(args[0]);
            SceneManager._scene.setupMapSelectQItem(varId, args[1], false);
            this.wait(10);
        }
    }
//   } else if (command === 'MapSelectQItemBase') {
//     if (SceneManager._scene instanceof Scene_Map) {
//       var varId = parseInt(args[0]);
//       var line = String(args[1]);
//       if (line.match(/WEAPON/i)) {
//         var type = 'WEAPONS';
//       } else if (line.match(/ARMOR/i)) {
//         var type = 'ARMORS';
//       } else if (line.match(/BOTH/i)) {
//         var type = 'BOTH';
//       } else {
//         return;
//       }
//       SceneManager._scene.setupMapSelectQItem(varId, type, true);
//       this.wait(10);
//     }
//   } else if (command === 'MapSelectQItemColumns') {
//     var value = parseInt(args[0]);
//     $gameSystem.setMapSelectQItemColumns(value);
//   } else if (command === 'MapSelectQItemRows') {
//     var value = parseInt(args[0]);
//     $gameSystem.setMapSelectQItemRows(value);
//   } else if (command === 'MapSelectQItemWidth') {
//     var value = parseInt(args[0]);
//     $gameSystem.setMapSelectQItemWidth(value);
//   } else if (command === 'MapSelectQItemX') {
//     var value = String(args[0]).toLowerCase();
//     $gameSystem.setMapSelectQItemPosX(value);
//   } else if (command === 'MapSelectQItemY') {
//     var value = String(args[0]).toLowerCase();
//     $gameSystem.setMapSelectQItemPosY(value);
   else if (command === 'ShowMapSelectQItemQuantity') {
    $gameSystem.setMapSelectQItemQuantity(true);
  }
//   } else if (command === 'HideMapSelectQItemQuantity') {
//     $gameSystem.setMapSelectQItemQuantity(false);
//   }
};

//=============================================================================
// Window_MapSelectQItem
//=============================================================================

function Window_MapSelectQItem() {
    this.initialize.apply(this, arguments);
}

Window_MapSelectQItem.prototype = Object.create(Window_ItemList.prototype);
Window_MapSelectQItem.prototype.constructor = Window_MapSelectQItem;

Window_MapSelectQItem.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
};

Window_MapSelectQItem.prototype.windowWidth = function() {
    return this._windowWidth || Graphics.boxWidth;
};

Window_MapSelectQItem.prototype.windowHeight = function() {
    return this._windowHeight || this.fittingHeight(4);
};

Window_MapSelectQItem.prototype.setup = function(varId, type, base) {
    if (!varId) return;
    if (!type) return;
    this.updateWindowSettings();
    this._varId = varId;
    this._base = base;
    this.setType(type)
    this.refresh();
    this.activate();
    this.open();
    this.select(0);
};

Window_MapSelectQItem.prototype.setType = function(type) {
    this._type = type.toUpperCase();
};

Window_MapSelectQItem.prototype.includes = function(item) {
    if(item == null)
        return false;
    return this.getItemCategories(item).contains(this._type);
};

Window_MapSelectQItem.prototype.getItemCategories = function(item) {
    var notecontents = item.note;
    var notearray = notecontents.split(/[\r\n]+/); 
    var regex2 = /(?:<MENU CATEGORIES: )(.*)>/i;
    var regex1 = /(?:<MENU CATEGORY: )(.*)>/i;
    var categories = [];
    for (var i = 0; i < notearray.length; i++) {
        if (notearray[i].match(regex1)) {
            categories.push(regex1.exec(notearray[i])[1].toUpperCase()); 
        } else if (notearray[i].match(regex2)) {
            var temp = regex2.exec(notearray[i])[1];
            var precategories = temp.split(',');
            for (c in precategories) {
                categories.push(c.trim()).toUpperCase();
            }
        }
    }
    return categories;
};

Window_MapSelectQItem.prototype.maxCols = function() {
    return $gameSystem.getMapSelectQItemColumns() || 1;
};

Window_MapSelectQItem.prototype.updateWindowSettings = function() {
    this.width = $gameSystem.getMapSelectQItemWidth() || Graphics.boxWidth;
    var col = $gameSystem.getMapSelectQItemRows() || 4;
    this.height = this.fittingHeight(col);
    if ($gameSystem.getMapSelectQItemPosX() === 'left') {
      this.x = 0;
    } else if ($gameSystem.getMapSelectQItemPosX() === 'center') {
      this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
    } else {
      this.x = Graphics.boxWidth - this.width;
    }
    if ($gameSystem.getMapSelectQItemPosY() === 'top') {
      this.y = 0;
    } else if ($gameSystem.getMapSelectQItemPosY() === 'middle') {
      this.y = Math.floor((Graphics.boxHeight - this.height) / 2);
    } else {
      this.y = Graphics.boxHeight - this.height;
    }
};

Window_MapSelectQItem.prototype.isEnabled = function(item) {
    if ($gameSystem.getMapSelectQItemEnable()) return true;
    return Window_ItemList.prototype.isEnabled.call(this, item);
};

Window_MapSelectQItem.prototype.drawItemNumber = function(item, x, y, width) {
  if ($gameSystem.getMapSelectQItemQuantity()) {
    Window_ItemList.prototype.drawItemNumber.call(this, item, x, y, width);
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

QI.MSE.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    QI.MSE.Scene_Map_createAllWindows.call(this);
    this.createMapSelectQItemWindow();
};

Scene_Map.prototype.createMapSelectQItemWindow = function() {
    this._MapSelectQItemWindow = new Window_MapSelectQItem();
    this._MapSelectQItemWindow.setHandler('ok', 
      this.onMapSelectQItemOk.bind(this));
    this._MapSelectQItemWindow.setHandler('cancel', 
      this.onMapSelectQItemCancel.bind(this));
    this.addChild(this._MapSelectQItemWindow);
};

Scene_Map.prototype.setupMapSelectQItem = function(varId, type, base) {
    this._MapSelectQItemWindow.setup(varId, type, base);
    this._active = false;
};

Scene_Map.prototype.onMapSelectQItemOk = function() {
    this._MapSelectQItemWindow.close();
    var item = this._MapSelectQItemWindow.item();
    var varId = this._MapSelectQItemWindow._varId;
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvBridge();
    if (!item) {
      $gameVariables.setValue(varId, 0);
    } else {
      if (this._MapSelectQItemWindow._base && item.baseItemId) {
        $gameVariables.setValue(varId, item.baseItemId);
      } else {
        $gameVariables.setValue(varId, item.id);
      }
    }
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
    this._active = true;
};

Scene_Map.prototype.onMapSelectQItemCancel = function() {
    this._MapSelectQItemWindow.close();
    var varId = this._MapSelectQItemWindow._varId;
    $gameVariables.setValue(varId, 0);
    this._active = true;
};

//=============================================================================
// End of File
//=============================================================================
