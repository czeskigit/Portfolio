$(document).ready(function(){
   
});

//  hero
$(window).scroll(function(){
    let scrollPosition = $(this).scrollTop();
    let windowHeight = window.innerHeight;
    
    $('#hero').css('background-position', '0px ' + scrollPosition/2 +'px');
    
    $('#earth').css({'width':  50 + scrollPosition/20 + '%',
                     'left': -5 + scrollPosition/100 + '%'});
    $('#moon').css({'right': 20 + scrollPosition/20 + '%',
                     'width': 10 - scrollPosition/50 + '%',
                   'top': 20 + scrollPosition/10 + '%'});
    //  mobile
    
    $('#mobileMoon').css({'top': 25 + scrollPosition/10 + '%'});
    $('#heroMobile').css('background-position', '0px ' + scrollPosition +'px');
    
    
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
    $("a").on('click', function (event) {

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

