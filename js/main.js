/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 9/10/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */
var homeEvents = {
    townArr: [],
    loginPopup: function(){
        $('#login_link>span').on('click', function(e){
            e.preventDefault();
            $('.tip').toggle();
        })
        this.loginUser();
    },
    loginUser: function(){
        var notific = $('.notifications'),
            favor = $('.favorites'),
            loginLabel = $('#login_link>span'),
            loginPopup = $('.tip'),
            userLabel = $('.user');
        $('#log_btn').on('click', function(e){
            loginPopup.hide();
            loginLabel.hide();
            notific.show();
            favor.show();
            userLabel.show();
        })
    },
    location: function(){
        var locInput = $('#location_search'),
            locIcon = $('#location_icon');
        locInput.on('focus', function(){
            locIcon.css('background-color', 'white')
        });
        locInput.on('blur', function(){
            locIcon.css('background-color', '#b0dbf2')
        });
        locIcon.on('click', function(){
            locInput.trigger('focus')
        })
    },
    locationPopup: function(element, button){
        var self = this,
            button = $(button);
            if(!element){
                var modal_popup = button.siblings('.modal_popup');
            }else{
                var modal_popup = $(element);
            }
        var main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            main_check_list = modal_popup.find('.check_list');
        console.log(modal_popup)
        button.on('click', function(e){
            if(!modal_popup.is(':visible')){
                modal_popup.show();
                self.selectCountry(modal_popup);
                if(main_check_list.length){
                    console.log(main_check_list);
                    console.log('========')
                    self.selectRegion();
                }
            }else{
                modal_popup.hide();
                self.addRegion();
                self.clearTown();
                main_check_list.hide();
                modal_navigation.hide();
                main_list.show();
                $('.top_select li').unbind('click');
                main_list.find('li').unbind('click');
                main_check_list.find('input').unbind('change');
            }

        })
    },
    selectCountry: function(modal_popup){
        var self = this,
            main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            main_check_list = modal_popup.find('.check_list');
        modal_popup.find('.top_select li').on('click', function () {
            self.removeActiveClass(modal_popup, 'top_select', 'active');
            $(this).addClass('active');
            self.addRegion();
            self.clearTown();
            main_check_list.hide();
            modal_navigation.hide();
            main_list.show();
            main_check_list.find('input').unbind('change')
        })
    },
    clearTown: function () {
        var self = this;
        self.townArr.length = 0;
        $('.modal_navigation').find('li.nav_items').remove();
        self.uncheckTowns();
    },
    uncheckTowns: function () {
        Array.prototype.forEach.call($('.main_check_list input'), function (e) {
            if ($(e).is(':checked')) {
                $(e).removeAttr('checked')
            }
        })
    },

    removeActiveClass: function (parent, elClass, className, exceptEl) {
        Array.prototype.forEach.call(parent.find('.' + elClass + '>li'), function (e) {
            if ($(e).hasClass(className) && e !== exceptEl) {
                $(e).removeClass(className)
            }
        })
    },
    activeCity: function () {
        var nav_item;
        Array.prototype.forEach.call($('.top_select li'), function (e) {
            if ($(e).hasClass('active')) {
                nav_item = $(e).text();
            }
        });
        return nav_item;
    },
    addRegion: function () {
        var self = this;
        $('.modal_navigation').find('.nav_items').text(self.activeCity())
    },
    selectRegion: function(){
        var self = this,
            main_list_item = $('.main_list li'),
            main_list = $('.main_list'),
            modal_navigation = $('.modal_navigation'),
            check_list = $('.check_list');
        main_list_item.on('click', function(){
            main_list.hide();
            modal_navigation.show();
            check_list.show();
            self.makeTownList(4);
            self.addTown();
        })
    },
    addTown: function () {
        var self = this,
            townStr = '';
        $('.main_check_list input').on('change', function () {
            if ($(this).is(':checked')) {
                self.townArr.push($(this).next().text());
                townStr = self.townArr.toString();
                if ($('.modal_navigation').find('li.nav_items').length) {
                    $('.modal_navigation').find('li.nav_items').text(townStr);
                } else {
                    $('.modal_navigation').append('<li class="nav_items">' + townStr + '</li>');
                }
            } else if (self.townArr.length) {
                var index = self.townArr.indexOf($(this).next().text());
                if (index > -1) {
                    self.townArr.splice(index, 1);
                    townStr = self.townArr.toString();
                    if (self.townArr.length) {
                        $('.modal_navigation').find('li.nav_items').text(townStr);
                    } else {
                        $('.modal_navigation').find('li.nav_items').remove()
                    }
                }
            }
        })
    },
    makeTownList: function (maxListLength) {
        var self = this,
            arrToNextList = [],
            arrToInsert = [],
            insertStr = '',
            cutStr = '',
            townList = $('.main_check_list'),
            length = townList.length,
            lastList = townList.eq(length - 1).find('li'),
            clone = lastList.clone();
        if (lastList.length > maxListLength) {
            arrToInsert = Array.prototype.slice.apply(clone, [0, maxListLength])
            arrToNextList = Array.prototype.slice.apply(clone, [maxListLength]);
            lastList.remove();
            for (var j = 0; j < maxListLength; j++) {
                insertStr += arrToInsert[j].outerHTML;
            }
            townList.eq(length - 1).find('ul').append(insertStr)
            for (var i = 0; i < arrToNextList.length; i++) {
                cutStr += arrToNextList[i].outerHTML;
            }
            $('ul.check_list').append('<li class="main_check_list"><ul>' + cutStr + '</ul></li>');
            self.makeTownList(maxListLength)
        }
    },
    rangeSlyder: function(){
        $(function() {
            $( "#price_range" ).slider({
                range: true,
                min: 0,
                max: 500,
                values: [ 0, 500 ],
                slide: function( event, ui ) {
                    $( "#from" ).text( "$ " + ui.values[ 0 ]);
                    $( "#to" ).text( "$ " + ui.values[ 1 ] );
                }
            });
            $( "#from" ).text( "$ " + $( "#price_range" ).slider( "values", 0 ));
            $('#to').text("$ " + $( "#price_range" ).slider( "values", 1 ) );
        });
    },
    seeMore: function(className, count){
        var button = $('.' + className),
            invisible_elements = $('ul.all li');
        if(invisible_elements.length > count ){
            for(var i=count; i<invisible_elements.length; i++){
                if($(invisible_elements[i]).attr('class') !== className){
                    $(invisible_elements[i]).css('display', 'none');
                }
            }
        }
        button.on('click', function(){
            for(var i=0; i<invisible_elements.length; i++){
                invisible_elements[i].removeAttribute('style')
            }
            $(this).css('display', 'none');
        })
    },
    selectDropdown: function(){
        var self = this,
            dropdowns = $('.categories_dropdowns>li'),
            dropdownsParent = $('#container');
        for(var i=0; i<=dropdowns.length; i++){
            $(dropdowns[i]).on('click', function(e){
                $(this).toggleClass('active_ctegory');
                self.removeActiveClass(dropdownsParent, 'categories_dropdowns', 'active_ctegory', e.currentTarget);
            })
        }
    }
};
$(document).ready(function(){
    homeEvents.loginPopup();
    homeEvents.location();
    homeEvents.locationPopup('#loc_popup', '#location_icon');
    homeEvents.locationPopup(null, '#drop_book');
    homeEvents.locationPopup(null, '#hot');
    homeEvents.rangeSlyder();
    homeEvents.seeMore('see_more', 12);
    homeEvents.selectDropdown();
});