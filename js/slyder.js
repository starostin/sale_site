/**
 * Created with JetBrains PhpStorm.
 * User: ОлеЖка
 * Date: 01.09.13
 * Time: 13:01
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var goods = $('.goods'),
        university = $('.un_slyder'),
        arrow_left = goods.find('li:first-child'),
        arrow_right = goods.find('li:last-child'),
        un_arrow_left = university.find('li:first-child'),
        un_arrow_right = university.find('li:last-child');
    arrow_left.on('click',function(){
        var last = goods.find(arrow_right).prev(),
            first = goods.find(arrow_left).next();
        first.hide();
        $(last).after(first);
        first.show();
    });
    arrow_right.on('click', function(){
        var last = goods.find(arrow_right).prev(),
            first = goods.find(arrow_left).next();
        last.hide();
        $(first).before(last);
        last.show();
    });
    un_arrow_left.on('click',function(){
        var last = university.find(un_arrow_right).prev(),
            first = university.find(un_arrow_left).next();
        first.hide();
        $(last).after(first);
        first.show();
    });
    un_arrow_right.on('click', function(){
        var last = university.find(un_arrow_right).prev(),
            first = university.find(un_arrow_left).next();
        last.hide();
        $(first).before(last);
        last.show();
    })
})