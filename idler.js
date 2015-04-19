/**
 * Created by Megamoo on 4/16/2015.
 */
var money, income;
var Game = new NewGame();
income = 1;
money = 0;


function Tick() {
    money = money + income;
    document.getElementById("money").innerHTML = money;
}

function GatherMoney() {
    money = money + income;
    document.getElementById("money").innerHTML = money;
}

var Timer = window.setInterval(function(){Tick()}, 1000);

// Save Data


function NewGame() {
    this.savedata = [];
    this.savedata[1] = money;
}

function Save() {
//    var SaveGame = JSON.stringify(Game);
//    SaveGame = encode_utf8(SaveGame);
//    SaveGame = lzw_encode(SaveGame);
//    window.localStorage['SaveName'] = SaveGame;
    window.localStorage['SaveName'] = JSON.stringify(money);
}

window.onload = function Load () {
//    SaveGame = window.localStorage['SaveName'];
//    SaveGame = lzw_decode(SaveGame);
//    SaveGame = decode_utf8(SaveGame);
//    window.GameTwo = JSON.parse(SaveGame);
    money = JSON.parse(window.localStorage['SaveName']);
//    money = GameTwo.savedata[1];
    document.getElementById("money").innerHTML = money;

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