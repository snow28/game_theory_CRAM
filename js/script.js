$(document).ready(function() {

    var player_1;
    var player_2;


    var totalCells=25;
    var sizeY=5;
    var sizeX=5;

    var move = 1;   // 1 = vertical , 2 = horizontal


    $(document).on('click' , '.js-cell' ,function(e){
        $('.js-role').toggleClass('current');
        var x = $(this).data('x');
        var y = $(this).parent('.game-row').data('y');
        var tmpX = x+1;
        var tmpY = y+1;
        var right_status = $("*[data-y='" + y + "']  div[data-x='"+ tmpX +"']").data('filled');
        var bottom_status = $("*[data-y='" + tmpY + "']  div[data-x='"+ x +"']").data('filled');
        if(y == sizeY-1 && move == 1){
            alert('You cannot move here');
            $('.js-role').toggleClass('current');
        }else if(x == sizeX-1 && move == 2){
            alert('You cannot move here');
            $('.js-role').toggleClass('current');
        }else if(move == 1 && bottom_status == 1){
            alert('Bottom cell is filled');
            $('.js-role').toggleClass('current');
        }else if(move == 2 && right_status == 1){
            alert('Right cell is filled');
            $('.js-role').toggleClass('current');
        }else{
            $(this).data('filled', 1);
            y = y + 1;
            $(this).css('pointer-events','none');
            if(move == 1){
                $(this).children('.top').removeClass('hide');
                $("*[data-y='" + y + "']  div[data-x='"+ x +"'] .top").removeClass('hide');
                $("*[data-y='" + y + "']  div[data-x='"+ x +"']").css('pointer-events','none');
                $("*[data-y='" + y + "']  div[data-x='"+ x +"']").data('filled',1);
                move = 2;
                totalCells--;
            }else if(move == 2){
                $(this).children('.right').removeClass('hide');
                x++;
                y--;
                $("*[data-y='" + y + "']  div[data-x='"+ x +"'] .right").removeClass('hide');
                $("*[data-y='" + y + "']  div[data-x='"+ x +"']").css('pointer-events','none');
                $("*[data-y='" + y + "']  div[data-x='"+ x +"']").data('filled',1);
                $(this).children('.top').addClass('hide');
                move = 1;
                totalCells--;
            }
        }
        e.preventDefault();



        var loop = 0;

        //checking for ability to move more
        var isMove = false;
        if(move == 1){ //vertical
            for(var z = 0; z < sizeY; z++){//z detects Y coordinate on field
                if(isMove == true || z >= sizeY-1){
                    break;
                }
                for(var c = 0; c < sizeX; c++){//c detects X coordinate on field
                    if(isMove == true || c > sizeX-1){
                        break;
                    }
                    var tmp = z+1;// some difference in coordinate naming
                    var current = $("*[data-y='" + z + "'] [data-x='" + c + "']").data('filled');//checking if current cell if field
                    var second = $("*[data-y='" + tmp + "'] [data-x='" + c + "']").data('filled');//checking if current cell if next cell is field
                    if(current != 1 && second != 1){// console log next possible move  those sells free
                        loop++;
                        console.log('y : ' + z + " x : " + c);
                    }
                }
            }
            if(loop == 0){
                alert('Player '+  player_1  +  ' won');
                window.location.replace("./end.html");
            }
        }else if(move == 2){ //horizontal
            for(var z = 0; z < sizeY; z++){
                if(isMove == true || z >= sizeY){
                    break;
                }
                for(var c = 0; c < sizeX; c++){
                    if(isMove == true || c > sizeX-2){
                        break;
                    }
                    var tmp = c+1;
                    var current = $("*[data-y='" + z + "'] [data-x='" + c + "']").data('filled');
                    var second = $("*[data-y='" + z + "'] [data-x='" + tmp + "']").data('filled');
                    if(current != 1 && second != 1){
                        loop++;
                        console.log('y : ' + z + " x : " + c);
                    }
                }
            }
            if(loop == 0){
                alert('Player '+  player_2  +  ' won');
                window.location.replace("./end.html");
            }
        }
        console.log(loop + " loop ");

    });


    var tmpy;
    var tmpx;

    /*$('.js-cell').hover(function(){
        var x = $(this).data('x');
        var y = $(this).parent('.game-row').data('y');
        tmp = x;
        $(this).children('.top').removeClass('hide');
        var y2 = y + 1;
        $("*[data-y='" + y2 + "']  div[data-x='"+ x +"']  .top").removeClass('hide');
        tmpy =y;
        tmpx = x;
    });

    $('.js-cell').mouseleave(function(){
        var filled = $(this).data('filled');
        if(filled != 1){
            var x = $(this).data('x');
            var y = $(this).parent('.game-row').data('y');
            y = y + 1;
            $(this).children('.top').addClass('hide');
            $("*[data-y='" + y + "']  div[data-x='"+ x +"']  .top").addClass('hide');
        }
    });*/





    $('.js-start-game').on('click',function(){
        $('.js-names-div').removeClass('hide');
        $('.js-role-div').removeClass('hide');
        player_1=$('.js-player-1').val();
        player_2=$('.js-player-2').val();
        $('.js-name-1').text(player_1);
        $('.js-name-2').text(player_2);
        var x = $('.js-size-x').val();
        var y = $('.js-size-y').val();
        //totalCells = x * y;
        //sizeX = x;
        //sizeY = y;
        if(player_2.length > 0 && player_1.length > 0 && x.length > 0 && y.length > 0 ){
            var cell = "<div class=\"game-cell js-cell\"><i class=\"fa fa-arrow-circle-down hide top\"></i><i class=\"fa fa-arrow-circle-right hide right\"></i></div>";
            var row = '';
            var game = '';
            for(var z = 0; z < x ; z++ ){
                row = row + "<div " + "data-x='" + z + "' " +  "class=\"game-cell js-cell\"><i class=\"fa fa-arrow-circle-down hide top\"></i><i class=\"fa fa-arrow-circle-right hide right\"></i></div>"
            }
            for(var q = 0; q < y ; q++ ){
                var tmp = "";
                tmp = "<div " + "data-y='" +  q + "'"   + " class='game-row'>" + row + "</div>";
                game = game.concat(tmp);
            }
            //row = "<div " + "data-y='" +  q + "'"   + " class='game-row'>" + row + "</div>";
            $('.js-game').html(game);
            $('.js-select').addClass('hide');
            $('.js-game').removeClass('hide');
        }
        totalCells = x * y;
        sizeX = x;
        sizeY = y;
        console.log('Total cells : ' + totalCells);
    });




    //logging and registering


    $('.js-logreg').on('click',function(){
        $('.js-logreg').removeClass('current');
        $(this).addClass('current');
        if($(this).hasClass('log')){
            $('.js-log-block').removeClass('hide');
            $('.js-reg-block').addClass('hide');
        }else if($(this).hasClass('reg')){
            $('.js-log-block').addClass('hide');
            $('.js-reg-block').removeClass('hide');
        }
    });

    var i;

    console.log("local storage");
    for (i = 0; i < localStorage.length; i++)   {
        console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }

    console.log("session storage");
    for (i = 0; i < sessionStorage.length; i++) {
        console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
    }

    if(localStorage.getItem("index") == null){
        localStorage.setItem("index", 1);
    }else{
        console.log('We have index : ' + localStorage.getItem("index"));
    }

    var index = localStorage.getItem("index");


    $('.js-register').on('click',function(){
        var name = $('.js-name').val();
        var email = $('.js-email').val();
        var username = $('.js-username').val();
        var password = $('.js-password').val();
        if(name.length > 0 && email.length > 0 && username.length > 0 && password.length > 0){
            localStorage.setItem("username" + index, username);
            localStorage.setItem("password" + index, password);
            index++;
            localStorage.setItem("index", index);
            location.reload();
        }else{
            console.log("U have to fill all fields");
            $('.js-errors').text('U have to fill all fields');
        }
    });



    $(".js-log-in").on('click',function(){
        var log_name = $('.js-log-name').val();
        var log_pass = $('.js-log-pass').val();
        var length = localStorage.getItem("index");
        var trigger = false;
        for(var x = 0; x < length; x++){
            var tmp_name = localStorage.getItem("username"+x);
            var tmp_pass = localStorage.getItem("password"+x);
            if(log_name == tmp_name && log_pass == tmp_pass){
                trigger = true;
                document.location.href = './main.html';
            }
        }
        if(trigger == false){
            $('.js-errors').text("We didn't find this account in our database");
        }
    });




});