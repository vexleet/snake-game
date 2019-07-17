window.onload = function () {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext("2d");
    let appleX = canvas.width / 2;
    let appleY = canvas.height / 2;
    let snakeX = 50;
    let snakeY = canvas.height / 2;
    let snakeIsGoingUp = false;
    let snakeIsGoingDown = false;
    let snakeIsGoingRight = true;
    let snakeIsGoingLeft = false;
    let snake = [{
        x: snakeX,
        y: snakeY,
    }];
    let score = 0;

    function drawApple() {
        ctx.beginPath();
        ctx.rect(appleX, appleY, 10, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function drawSnake() {
        for (let i = 0; i < snake.length; i++) {
            let s = snake[i];

            ctx.beginPath();
            ctx.rect(s.x, s.y, 20, 20);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.closePath();
        }
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener('keydown', snakeMovementListener);

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

        if (snakeIsGoingLeft) {
            snakeX -= 20;
        } else if (snakeIsGoingRight) {
            snakeX += 20;
        } else if (snakeIsGoingUp) {
            snakeY -= 20;
        } else if (snakeIsGoingDown) {
            snakeY += 20;
        }

        if (appleX < snakeX + 20 && appleX + 10 > snakeX &&
            appleY < snakeY + 20 && appleY + 10 > snakeY) {
            appleX = Math.floor(Math.random() * 17 + 1) * 20;
            appleY = Math.floor(Math.random() * 15 + 3) * 20;
            score++;
        } else {
            snake.pop();
        }

        let newHead = {
            x: snakeX,
            y: snakeY,
        }

        if (snakeX >= canvas.width - 20 || snakeX + 20 <= 0 ||
            snakeY >= canvas.height || snakeY <= 20 || collision(newHead, snake)) {
            clearInterval(game);
        }

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "30px Changa one";
        ctx.fillText(`Score: ${score}`, 20, 30);
    }


    let game = setInterval(draw, 100)
};