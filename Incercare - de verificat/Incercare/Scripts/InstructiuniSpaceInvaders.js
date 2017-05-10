function instr() {

    document.getElementById("s").innerHTML += "You are the comander of a SpaceShip. Your mission is to kill as many invaders as you can. If an invader touches your spaceship, you die.You kill the invaders by click.To go back to menu:press escape. To restart press SPACE.";
    document.getElementById("instr").disabled = true;
}

function reset() {
    location.reload();
}

window.onkeydown = function (e) {
    if (e.keyCode == 32) {
        reset();
    }
    if (e.keyCode == 27) {
        window.location.href = '/Home/SpaceInvaders';
       
    }
} 