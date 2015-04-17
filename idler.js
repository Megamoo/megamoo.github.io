/**
 * Created by Megamoo on 4/16/2015.
 */
var money, income;
income = 1;
money = 0;
function Tick() {
    money = money + income;
    document.getElementById("money").innerHTML = money;
}
function GatherMoney() {
    money = money + 1 + income;
    document.getElementById("money").innerHTML = money;
}

var Timer = window.setInterval(function(){Tick()}, 1000);
