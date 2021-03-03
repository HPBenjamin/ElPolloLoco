let canvas;
let ctx;
let character_x = 0;
let character_y = 200;
let isMovingLeft = false;
let isMovingRight = false;
let bg_elements = 0;
let lastJumpstarted = 0;


// -----------------Game config
let JUMP_TIME = 300;




function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    draw();
    listenForKeys();
}

function draw() {
    drawBackground();
    updateCharacter();
    requestAnimationFrame(draw);
}


function updateCharacter() {
    let base_image = new Image();
    base_image.src = '/Users/benjamintischoff/Desktop/Developer Arbeiten/Modul11/Mexicano - Sprites/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png';

    let timePassedSinceJump = new Date().getTime() - lastJumpstarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else {
        if (character_y < 200) {
            character_y = character_y + 10;
        }
    }

    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.25, base_image.height * 0.25);
    }
}


function drawBackground() {
    ctx.fillStyle = "rgb(228, 228, 228)";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

    drawGround();
}


function drawGround() {
    if (isMovingRight) {
        bg_elements = bg_elements - 2;
    }

    if (isMovingLeft) {
        bg_elements = bg_elements + 2;
    }

    let base_image = new Image();
    base_image.src = '/Users/benjamintischoff/Desktop/Developer Arbeiten/Modul11/Mexicano - Sprites/5.Fondo/Completo.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, bg_elements, 100, base_image.width * 0.4, base_image.height * 0.4);
    };
}


function listenForKeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            isMovingRight = true;
            character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            character_x = character_x - 5;
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpstarted;
        if(e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            lastJumpstarted = new Date().getTime();
        }
    });


    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            isMovingRight = false;
            character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = false;
            character_x = character_x - 5;
        }

        /*   if (e.code == 'Space') {
               isJumping = false;
           }  */
    });

}














