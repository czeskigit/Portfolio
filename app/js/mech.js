$(document).ready(function () {

});

//  hero
$(window).scroll(function () {
    let scrollPosition = $(this).scrollTop();
    let windowHeight = window.innerHeight;

    $('#hero').css('background-position', '0px ' + scrollPosition / 2 + 'px');

    $('#earth').css({
        'width': 50 + scrollPosition / 30 + '%',
        'left': -5 + scrollPosition / 30 + '%'
    });
    $('#moon').css({
        'right': 20 + scrollPosition / 20 + '%',
        'width': 10 - scrollPosition / 50 + '%',
        'top': 20 + scrollPosition / 10 + '%'
    });

    //  mobile

    $('#mobileMoon').css({
        'top': 25 + scrollPosition / 10 + '%'
    });
    /*$('#heroMobile').css('background-position', '0px ' + scrollPosition +'px');*/

    // Hero title fade in-out
    if (scrollPosition <= 1) {
        $('#hero-center-title').fadeIn(2000);
        $('#heroMobile-title').fadeIn(2000);
    } else {
        $('#hero-center-title').fadeOut(500);
        $('#heroMobile-title').fadeOut(500);
    }

    //  navigation

    if (scrollPosition >= (windowHeight - 5)) {
        $('#main-nav').removeClass('navbar-transp');
        $('#main-nav').addClass('navbar-blue');

    } else {
        $('#main-nav').addClass('navbar-transp');
        $('#main-nav').removeClass('navbar-blue');
    }

});

//  smooth scrolling
$('.menu-link').on('click', function (event) {

    if (this.hash !== "") {

        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
});

// hobby toggle window
$('.box-hobby').hide();

$('.hobby').click(function () {

    $('.hobby').removeAttr('style');
    let box = $('#box-' + this.id);

    //start the game if programming hobby is clicked
    if ($(this).attr('id') == $('#hobby-3').attr('id') && $(this).css('background-color') == 'rgb(4, 180, 4)') {

        myGameArea.stop();
        myGameArea.clear();

    } else if ($(this).attr('id') == $('#hobby-3').attr('id')) {

        //        startGame();

    } else {

        myGameArea.stop();

    }

    if ($(this).css('background-color') == 'rgb(4, 180, 4)') {

        //hide content
        box.fadeOut(500, function () {

            //slide up container
            $('#hobby-description-container').animate({
                height: '0'
            }, 500);
        });

        $(this).removeAttr('style');

    } else {

        //slide down
        $('html, body').animate({
            scrollTop: $('#hobby-description-container').offset().top - 100
        }, 800);

        //hide other contents
        $('.box-hobby').fadeOut(500);
        $('#hobby-description-container').removeAttr('style');

        //slide down container
        $('#hobby-description-container').animate({
            height: 'auto'
        }, 500, function () {

            //show content
            box.fadeIn(500);
        });

        $(this).css({
            'background-color': '#04B404',
            'border-color': '#04B404'
        });
    }



});

// NASA API APOD ajax

$.getJSON({
    url: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
    onerror: function (msg) {
        alert('NASA API error: ' + msg);
    }
}).done(function (data, textStatus, jqXHR) {
    console.log(jqXHR.getAllResponseHeaders());
    console.log(data);
    console.log(textStatus);
    console.log(data.url);
    $('#Nasa-photo').attr('src', data.url);
    $('#photo-title').text('Tytuł: ' + data.title);
});

//game

// game start button

$('#Game-Start').click(function () {

    if (gameActive) {
        if (player.y >= 100) {
            player.jump();
        }
    } else {
        startGame();
        $('#Game-Start').text('Skok');
        score = 0;
    }
});

//some variables for game
var player;
var backgroundMountains;
var backgroundGround;
var rockBottom = 100;
var groundLine = rockBottom + 10;
var gameActive = false;
var playerJumps = false;
var score = 0;
var firstStart = true;
//game start
async function startGame() {

    //player
    player = new component(10, 10, '#04B404', 20, 0);

    //background
    backgroundMountains = new component(302, 152, 'tloGry.jpg', 0, 0, 'image');
    backgroundMountainsSecond = new component(302, 152, 'tloGry.jpg', 302, 0, 'image');
    backgroundGround = new component(302, 62, 'tloZiemia.jpg', 0, 110, 'image');
    backgroundGroundSecond = new component(302, 62, 'tloZiemia.jpg', 302, 110, 'image');

    //obstacles
    obstacleOne = new component(5, 20, '#DF0101', -5, 90);
    obstacleTwo = new component(5, 20, '#DF0101', -10, 90);
    obstacleThree = new component(5, 20, '#DF0101', -15, 90);
    obstacleFour = new component(5, 20, '#DF0101', -20, 90);

    //score
    scoreText = new component('20px', 'Consolas', '#fff', 180, 40, 'text');
    firstStart = false;
    myGameArea.start();
}

var myGameArea = {
    canvas: $('#game'),
    start: function () {
        gameActive = true;
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.get(0).getContext('2d');
        this.interval = setInterval(runningGame, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        gameActive = false;
    }

}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == 'image') {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.jumpSpeed = 0.2;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == 'image') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else if (type == 'text') {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.positionChange = function () {

        if (playerJumps) {
            if (this.jumpPower < 0) {
                this.jumpPower = 0;
                playerJumps = false;
            }

            this.jumpPower -= this.jumpSpeed;
            this.y -= this.jumpPower;

        } else {
            this.gravitySpeed += this.gravity;
            this.y += this.gravitySpeed;
        }
    }
    this.jump = function () {

        playerJumps = true;
        this.gravitySpeed = 0;
        this.jumpPower = 4;
        this.positionChange();
    }
    this.hits = function (obstacle) {
        var playerRight = this.x + this.width;
        var playerLeft = this.x;
        var playerBottom = this.y + this.height;

        var obstacleLeft = obstacle.x;
        var obstacleRight = obstacle.x + obstacle.width;
        var obstacleTop = obstacle.y;

        if ((playerRight < obstacleLeft) || (playerLeft > obstacleRight) || (playerBottom < obstacleTop)) {

        } else {
            myGameArea.stop();
            $('#Game-Start').text('Zagraj');
        }

    }
}

function runningGame() {
    score += 1;
    myGameArea.clear();

    //repeating the background
    if (backgroundGround.x <= -302) {

        backgroundGround.x = 302;
    } else if (backgroundGroundSecond.x <= -302) {

        backgroundGroundSecond.x = 302;
    } else if (backgroundMountains.x <= -302) {

        backgroundMountains.x = 302;
    } else if (backgroundMountainsSecond.x <= -302) {

        backgroundMountainsSecond.x = 302;
    } else {

    }

    //background movement
    backgroundMountains.x -= 0.2;
    backgroundGround.x -= 2;

    backgroundMountainsSecond.x -= 0.2;
    backgroundGroundSecond.x -= 2;

    backgroundMountains.update();
    backgroundMountainsSecond.update();

    backgroundGround.update();
    backgroundGroundSecond.update();

    //obstacle random x position plus movement and repeating
    //    console.log(Math.floor((Math.random() * 100) % 30 + 1));
    obstacleOne.x -= 2;
    obstacleTwo.x -= 2;
    obstacleThree.x -= 2;
    obstacleFour.x -= 2;

    if (obstacleOne.x <= -25) {

        obstacleOne.x = 302 + Math.floor((Math.random() * 100) % 30 + 1);
    } else if (obstacleTwo.x <= -25) {

        obstacleTwo.x = 402 + Math.floor((Math.random() * 100) % 30 + 1);
    } else if (obstacleThree.x <= -25) {

        obstacleThree.x = 502 + Math.floor((Math.random() * 100) % 30 + 1);
    } else if (obstacleFour.x <= -25) {

        obstacleFour.x = 602 + Math.floor((Math.random() * 100) % 30 + 1);
    } else {

    }

    obstacleOne.update();
    obstacleTwo.update();
    obstacleThree.update();
    obstacleFour.update();

    //score update
    scoreText.text = 'wynik: ' + score;
    scoreText.update();

    //hit checker
    player.hits(obstacleOne);
    player.hits(obstacleTwo);
    player.hits(obstacleThree);
    player.hits(obstacleFour);

    //player movement plus leveling
    if (player.y < 100) {
        player.positionChange();
    } else if (player.y > 100) {

        player.y = 100;
    }
    player.update();
}

// if game has started - default event of keys are disabled, player jump event

$(window).on('keydown', function (e) {
    if (gameActive && e.keyCode == 32) {
        e.preventDefault();
        if (player.y >= 100) {
            player.jump();
        }
    }
});

