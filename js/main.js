/**
 * Created with JetBrains PhpStorm.
 * User: user
 * Date: 9/10/13
 * Time: 12:32 PM
 * To change this template use File | Settings | File Templates.
 */
var homeEvents = {
    townArr: [],
    rememberedPopup: [],
    logined: false,
    favorCounter: 0,
    loginPopup: function(){
        $('#login_link>span').on('click', function(e){
            e.preventDefault();
            $('.login_tip').toggle();
        })
        this.loginUser();
    },
    loginUser: function(){
        var self = this,
            notific = $('.notifications'),
            favor = $('.favorites'),
            loginLabel = $('#login_link>span'),
            loginPopup = $('.login_tip'),
            userLabel = $('.user');
        $('#log_btn').on('click', function(e){
            loginPopup.hide();
            loginLabel.hide();
            notific.show();
            favor.show();
            userLabel.show();
            self.logined = true;
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
                self.movePopupTriangle(modal_popup, button);
            }else{
                var modal_popup = $(element);
            }
        var main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            main_check_list = modal_popup.find('.check_list');
        button.on('click', function(e){
            if(self.rememberedPopup.length &&  self.rememberedPopup[2] !== modal_popup){
                self.hidePopup(self.rememberedPopup[0], self.rememberedPopup[1]);
            }
            if(!modal_popup.is(':visible')){
                if(button.hasClass('around_me')){
                    button.closest('li').addClass('active_ctegory');
                }
                modal_popup.show();
                self.selectCountry(modal_popup);
                if(main_check_list.length){
                    self.selectRegion(modal_popup);
                }
                self.rememberedPopup = [element, button, modal_popup];
            }else{
                self.hidePopup(element, button);
            }

        })
    },
    movePopupTriangle: function(modal_popup, button){
        var before = button.parent().position().left + 56;
        modal_popup.find('div.arrow-up').css('left', before);
    },
    hidePopup: function(element, button){
        var self = this,
            button = $(button);
        self.rememberedPopup = [];
        if(!element){
            var modal_popup = button.siblings('.modal_popup');
        }else{
            var modal_popup = $(element);
        }
        var main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            main_check_list = modal_popup.find('.check_list');

        if(button.hasClass('around_me')){
            button.closest('li').removeClass('active_ctegory');
        }
        modal_popup.hide();
        self.addRegion(modal_popup);
        self.clearTown(modal_popup);
        main_check_list.hide();
        modal_navigation.hide();
        main_list.show();
        modal_popup.find('.top_select li').unbind('click');
        main_list.find('li').unbind('click');
        main_check_list.find('input').unbind('change');
    },
    selectCountry: function(modal_popup){
        var self = this,
            main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            main_check_list = modal_popup.find('.check_list');
        modal_popup.find('.top_select li').on('click', function () {
            self.removeActiveClass(modal_popup, 'top_select', 'active');
            $(this).addClass('active');
            self.addRegion(modal_popup);
            self.clearTown(modal_popup);
            main_check_list.hide();
            modal_navigation.hide();
            main_list.show();
            main_check_list.find('input').unbind('change')
        })
    },
    clearTown: function (modal_popup) {
        var self = this;
        self.townArr.length = 0;
        modal_popup.find('.modal_navigation').find('li.nav_items').remove();
        self.uncheckTowns(modal_popup);
    },
    uncheckTowns: function (modal_popup) {
        Array.prototype.forEach.call(modal_popup.find('.main_check_list input'), function (e) {
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
    activeCity: function (modal_popup) {
        var nav_item;
        Array.prototype.forEach.call(modal_popup.find('.top_select li'), function (e) {
            if ($(e).hasClass('active')) {
                nav_item = $(e).text();
            }
        });
        return nav_item;
    },
    addRegion: function (modal_popup) {
        var self = this;
        modal_popup.find('.modal_navigation').find('.nav_items').text(self.activeCity(modal_popup))
    },
    selectRegion: function(modal_popup){
        var self = this,
            main_list_item = modal_popup.find('.main_list li'),
            main_list = modal_popup.find('.main_list'),
            modal_navigation = modal_popup.find('.modal_navigation'),
            check_list = modal_popup.find('.check_list');
        main_list_item.on('click', function(){
            main_list.hide();
            modal_navigation.show();
            check_list.show();
            self.makeTownList(4, modal_popup);
            self.addTown(modal_popup);
        })
    },
    addTown: function (modal_popup) {
        var self = this,
            townStr = '';
        modal_popup.find('.main_check_list input').on('change', function () {
            if ($(this).is(':checked')) {
                self.townArr.push($(this).next().text());
                townStr = self.townArr.toString();
                if (modal_popup.find('.modal_navigation').find('li.nav_items').length) {
                    modal_popup.find('.modal_navigation').find('li.nav_items').text(townStr);
                } else {
                    modal_popup.find('.modal_navigation').append('<li class="nav_items">' + townStr + '</li>');
                }
            } else if (self.townArr.length) {
                var index = self.townArr.indexOf($(this).next().text());
                if (index > -1) {
                    self.townArr.splice(index, 1);
                    townStr = self.townArr.toString();
                    if (self.townArr.length) {
                        modal_popup.find('.modal_navigation').find('li.nav_items').text(townStr);
                    } else {
                        modal_popup.find('.modal_navigation').find('li.nav_items').remove()
                    }
                }
            }
        })
    },
    makeTownList: function (maxListLength, modal_popup) {
        var self = this,
            arrToNextList = [],
            arrToInsert = [],
            insertStr = '',
            cutStr = '',
            townList = modal_popup.find('.main_check_list'),
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
            townList.eq(length - 1).find('ul').append(insertStr);
            for (var i = 0; i < arrToNextList.length; i++) {
                cutStr += arrToNextList[i].outerHTML;
            }
            modal_popup.find('ul.check_list').append('<li class="main_check_list"><ul>' + cutStr + '</ul></li>');
            self.makeTownList(maxListLength, modal_popup)
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
    addToFavorite: function(){
        var self = this;
        $('.add_to_favorite').on('click', function(){
            if(self.logined){
                if($(this).hasClass('inactive')){
                    $(this).attr('src', 'img/star.png');
                    $('.favorites').addClass('favorites_active');
                    self.addNumberToFavorite()
                }else{
                    $(this).attr('src', 'img/star_inactive.png');
                    self.removeNumberFromFavorite();
                }
                $(this).toggleClass('inactive');
            }
        })
    },
    addNumberToFavorite: function(){
        var self = this;
        self.favorCounter ++;
        var str = '(' + self.favorCounter + ')';
        $('.favor_numbers').text(str);
    },
    removeNumberFromFavorite: function(){
        var self = this;
        self.favorCounter --;
        var str = '(' + self.favorCounter + ')';
        if(self.favorCounter === 0){
            $('.favorites').removeClass('favorites_active');
            str = ''
        }
        $('.favor_numbers').text(str);
    },
    showFavoritePopup: function(){
        var self = this;
        $('.favor_click').on('click', function(){
            if(self.favorCounter > 0){
                $('.favorite_tip').toggle();
            }
        })
    },
    changeTab: function(){
        var self = this,
            parent = $('.text_desc'),
            previous_classes;
        $('.desc_labels li').on('click', function(){
            previous_classes = $('.tab_selected').attr('class');
            var selected = this.className.split(' ')[1];
            var previous = previous_classes.split(' ')[1];
            $('.for_' + previous).hide();
            $('.for_' + selected).show();
            self.removeActiveClass(parent, 'desc_labels', 'tab_selected');
            $(this).addClass('tab_selected');
        })
    },
    showNumber: function(){
        $('.show_number').on('click', function(){
            $(this).replaceWith('<p class="phone_number">12-312-388</p>');
        })
    },
    sendEmail: function(){
        $('#seller_email').on('click', function(){
            $('.layout').show();
        })
    },
    closeEmailWindow: function(){
        $('.message').find('.close, #send_email').on('click', function(){
            $('.layout').hide();
        })
    }
};
$(document).ready(function(){
    homeEvents.loginPopup();
    homeEvents.location();
    homeEvents.locationPopup('#loc_popup', '#location_icon');
//    homeEvents.locationPopup(null, '#drop_books');
//    homeEvents.locationPopup(null, '#drop_phones');
//    homeEvents.locationPopup(null, '#drop_cameras');
//    homeEvents.locationPopup(null, '#drop_laptops');
//    homeEvents.locationPopup(null, '#drop_tablets');
//    homeEvents.locationPopup(null, '#drop_bicycles');
//    homeEvents.locationPopup(null, '#drop_tvs');
//    homeEvents.rangeSlyder();
//    homeEvents.seeMore('see_more', 12);
    homeEvents.addToFavorite();
    homeEvents.showFavoritePopup();
    homeEvents.changeTab();
    homeEvents.showNumber();
    homeEvents.sendEmail();
    homeEvents.closeEmailWindow();
});