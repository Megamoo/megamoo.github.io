/**
 * Created by Megamoo on 4/16/2015.
 */
var money, income;
//var Game = new NewGame();
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

function Save() {
    window.localStorage['SaveName'] = JSON.stringify(Game);
}
function Load () {
    window.GameTwo = JSON.parse(window.localStorage['SaveName']);
}

function NewGame() {
    this.money = [money];
    this.income = [income];
}