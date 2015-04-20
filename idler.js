/**
 * Created by Megamoo on 4/16/2015.
 */

var buildings = [];

function GameSave() { //Stores save data
    this.money = 0;
}

function Building() { //Defines building object
    this.name = "Building Name";
    this.cost = 10;
    this.persec = 1;
    this.qty = 0;
}

function LoadBuilding(name,cost,persec) {
    var cur = buildings.length;

    buildings[cur] = new Building();
    buildings[cur].name = name;
    buildings[cur].cost = cost;
    buildings[cur].persec = persec;
}

function InitBuildings() {
    LoadBuilding("Synagogue",10,1)
}

function Build() { //Buy Buildings *TEMP*
    if (game.money >= buildings[0].cost) { //Checks if the player has enough money
        game.money -= buildings[0].cost;
        buildings[0].qty += 1;
        updateValues();
    }
}

function Tick() { //Money gained per sec
    game.money += buildings[0].qty * buildings[0].persec;
    updateValues(); //Updates values of shekels, building qty, etc.
}

function gatherMoney() { //Money gained per click
    game.money++;
    updateValues(); //Updates values of shekels, building qty, etc.
}

// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict['_' + phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));
            dict['_' + phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
            phrase = dict['_'+currCode] ? dict['_'+currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict['_'+code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}



function Save() { //Save + Encode
    var SaveGame = JSON.stringify(game);
    SaveGame = encode_utf8(SaveGame);
    SaveGame = lzw_encode(SaveGame);
    window.localStorage['SaveName'] = SaveGame;
}

    function Reset() { //Reset all stats
        game.money = 0;
	    buildings[0].qty = 0;
        updateValues(); //Updates values of shekels, building qty, etc.
        Save();
    }

var Timer = window.setInterval(function(){Tick()}, 100); //income
var AutoSave = window.setInterval(function(){Save()}, 10000); //autosave

function updateValues() { //Updates values of shekels, building qty, etc.
    document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money;
    document.getElementById("building.qty").innerHTML = "Quantity : " + buildings[0].qty;
}

window.onload = function() {  //Decode + Load
    //Define Global Variable
    window.game = new GameSave();
    //Buildings
    InitBuildings();

    SaveGame = window.localStorage['SaveName'];
    SaveGame = lzw_decode(SaveGame);
    SaveGame = decode_utf8(SaveGame);
    window.game = JSON.parse(SaveGame);

    updateValues(); //Updates values of shekels, building qty, etc.
};