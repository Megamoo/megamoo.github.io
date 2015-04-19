/**
 * Created by Megamoo on 4/16/2015.
 */
function GameSave() { //Stores save data
    this.money = 0;
    this.quantity = 0;
}

function Building() { //Defines building object
    this.name = "Building Name";
    this.cost = 10;
    this.persec = 1;
    this.qty = 0;
}

function updateValues() { //Updates values of shekels, building qty, etc.
    document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money;
    document.getElementById("building.qty").innerHTML = "Quantity : " + Synagogue.qty;
}

function Reset() { //Reset all stats
	game.money = 0;
//	Synagogue.qty = 0;
	updateValues(); //Updates values of shekels, building qty, etc.
	Save();
}

function buySynagogue(){ //Buy Buildings *TEMP*
    if (game.money >= Synagogue.cost) { //Checks if the player has enough money
        game.money -= Synagogue.cost;
        Synagogue.qty += 1;
        updateValues();
    }
}


function Tick() { //Money gained per sec
    game.money += Synagogue.qty * Synagogue.persec;
    updateValues(); //Updates values of shekels, building qty, etc.
}

function gatherMoney() { //Money gained per click
    game.money = game.money + 1;
    updateValues(); //Updates values of shekels, building qty, etc.
}

var Timer = window.setInterval(function(){Tick()}, 1000); //income
var AutoSave = window.setInterval(function(){Save()}, 10000); //autosave

window.onload = function() {  //Decode + Load
    window.game = new GameSave(); //Define Global Variable
    SaveGame = window.localStorage['SaveName'];
    SaveGame = lzw_decode(SaveGame);
    SaveGame = decode_utf8(SaveGame);
    window.game = JSON.parse(SaveGame);


    //Buildings
    window.Synagogue = new Building(); //Synagogue
    Synagogue.name = "Synagogue";
    Synagogue.cost = 10;
    Synagogue.persec = 1;
	
	updateValues(); //Updates values of shekels, building qty, etc.
};

function Save() { //Save + Encode
    var SaveGame = JSON.stringify(game);
    SaveGame = encode_utf8(SaveGame);
    SaveGame = lzw_encode(SaveGame);
    window.localStorage['SaveName'] = SaveGame;
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