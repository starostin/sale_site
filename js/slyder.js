/**
 * Created with JetBrains PhpStorm.
 * User: ОлеЖка
 * Date: 01.09.13
 * Time: 13:01
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    function slyde(id){
        var slyder = $('#' + id),
            arrow_left = slyder.find('li:first-child'),
            arrow_right = slyder.find('li:last-child');
        arrow_left.on('click',function(){
            var last = slyder.find(arrow_right).prev(),
                first = slyder.find(arrow_left).next();
            first.hide();
            $(last).after(first);
            first.show();
        });
        arrow_right.on('click', function(){
            var last = slyder.find(arrow_right).prev(),
                first = slyder.find(arrow_left).next();
            last.hide();
            $(first).before(last);
            last.show();
        });
    }
    slyde('books');
    slyde('university');
    slyde('other');
})