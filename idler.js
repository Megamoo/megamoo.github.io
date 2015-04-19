/**
 * Created by Megamoo on 4/16/2015.
 */
function GameSave() {
    this.money = 0;
//    this.quantity = 0;
}

function Building() {
    this.name = "Building Name";
    this.cost = 10;
    this.persec = 1;
    this.qty = 0;
}

<<<<<<< HEAD
function Reset() {
	game.money = 0;
	Synagogue.qty = 0;
	Save();
}

function Save() {
	Save();
}

=======
>>>>>>> parent of a0e791e... Added reset
function buySynagogue(){
    if (game.money >= Synagogue.cost) { //Checks if the player has enough money
        game.money -= Synagogue.cost;
        Synagogue.qty += 1;
        document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money;
        document.getElementById("building.qty").innerHTML = "Quantity : " + Synagogue.qty;
    }
}

function Tick() { //Money gained per sec
    game.money += Synagogue.qty * Synagogue.persec;
    document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money;
}

function gatherMoney() { //Money gained per click
    game.money = game.money + 1;
    document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money;
}

var Timer = window.setInterval(function(){Tick()}, 1000); //income
var AutoSave = window.setInterval(function(){Save()}, 10000); //autosave

window.onload = function() {  //Load
//    SaveGame = window.localStorage['SaveName'];
//   SaveGame = lzw_decode(SaveGame);
//    SaveGame = decode_utf8(SaveGame);
//    window.game = JSON.parse(SaveGame);

    window.game = new GameSave(); //Defines Money as a global Var
    game.money = JSON.parse(window.localStorage['SaveName']); //Reads save and sets money


    document.getElementById("money").innerHTML = "Shekels in the BANK : " + game.money; //Displays money on page
//    document.getElementById("building.qty").innerHTML = "Quantity : " + game.quantity; //Displays quantity on page

    window.Synagogue = new Building(); //Synagogue
    Synagogue.name = "Synagogue";
    Synagogue.cost = 10;
    Synagogue.persec = 1;
};

//var game = GameSave();

function Save() {
//    var SaveGame = JSON.stringify(Game);
//    SaveGame = encode_utf8(SaveGame);
//    SaveGame = lzw_encode(SaveGame);
//   window.localStorage['SaveName'] = SaveGame;
    window.localStorage['SaveName'] = JSON.stringify(game.money);
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