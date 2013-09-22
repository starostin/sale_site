/**
 * Created with JetBrains PhpStorm.
 * User: ОлеЖка
 * Date: 01.09.13
 * Time: 13:01
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var arrow_left = $('#slyder').find('li').eq(0);
    var arrow_right = $('#slyder').find('li').eq(6);
    var un_arrow_left = $('#un_slyder').find('li').eq(0);
    var un_arrow_right = $('#un_slyder').find('li').eq(6);
    arrow_left.on('click',function(){
        var last = $('#slyder').find('li').eq(5);
        var first = $('#slyder').find('li').eq(1);
        first.hide();
        $(last).after(first);
        first.show();
    });
    arrow_right.on('click', function(){
        var last = $('#slyder').find('li').eq(5);
        var first = $('#slyder').find('li').eq(1);
        last.hide();
        $(first).before(last);
        last.show();
    })
    un_arrow_left.on('click',function(){
        var last = $('#un_slyder').find('li').eq(5);
        var first = $('#un_slyder').find('li').eq(1);
        first.hide();
        $(last).after(first);
        first.show();
    });
    un_arrow_right.on('click', function(){
        var last = $('#un_slyder').find('li').eq(5);
        var first = $('#un_slyder').find('li').eq(1);
        last.hide();
        $(first).before(last);
        last.show();
    })
})