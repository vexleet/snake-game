window.onload = function () {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext("2d");
    let appleX = canvas.width / 2;
    let appleY = canvas.height / 2;
    let appleRadius = 10;
    let snakeX = canvas.width / 2;
    let snakeY = canvas.height / 2;
    let snakeIsGoingUp = false;
    let snakeIsGoingDown = false;
    let snakeIsGoingRight = false;
    let snakeIsGoingLeft = false;

    function drawApple() {
        ctx.beginPath();
        ctx.rect(appleX, appleY, 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function drawSnake() {
        ctx.beginPath();
        ctx.rect(snakeX, snakeY, 20, 20);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    document.addEventListener('keyup', snakeMovementListener);

    function snakeMovementListener(e) {
        if (e.keyCode === 87 || e.keyCode === 83 ||
            e.keyCode === 65 || e.keyCode === 68) {
            snakeIsGoingDown = false;
            snakeIsGoingUp = false;
            snakeIsGoingLeft = false;
            snakeIsGoingRight = false;

            if (e.keyCode === 87) {
                snakeIsGoingUp = true;
            } else if (e.keyCode === 83) {
                snakeIsGoingDown = true;
            } else if (e.keyCode === 65) {
                snakeIsGoingLeft = true;
            } else if (e.keyCode === 68) {
                snakeIsGoingRight = true;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawApple();
        drawSnake();

        if (snakeX >= canvas.width - 20) {
            alert('You Lose');
            location.reload();
        }
        if (snakeX <= 0) {
            alert('You Lose');
            location.reload();
        }
        if (snakeY >= canvas.height - 20) {
            alert('You Lose');
            location.reload();
        }
        if (snakeY <= 0) {
            alert('You Lose');
            location.reload();
        }

        if (appleX < snakeX + 20 && appleX + 10 > snakeX &&
            appleY < snakeY + 20 && appleY + 10 > snakeY) {
            console.log(appleX, snakeX);
            console.log(appleY, snakeY);

            appleX = Math.floor(Math.random() * canvas.width - 50) + 50;
            appleY = Math.floor(Math.random() * canvas.height - 50) + 50;
        }

        if (snakeIsGoingLeft) {
            snakeX -= 2;
        } else if (snakeIsGoingRight) {
            snakeX += 2;
        } else if (snakeIsGoingUp) {
            snakeY -= 2;
        } else if (snakeIsGoingDown) {
            snakeY += 2;
        }


        requestAnimationFrame(draw);
    }

    draw();
};