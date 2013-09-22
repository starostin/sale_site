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
    locationPopup: function(){
        var self = this,
            locInput = $('#location_search'),
            locPlaces = $('.loc_places'),
            locIcon = $('#location_icon'),
            allRegions = $('.regions'),
            cityNav = $('.cityNav'),
            towns = $('.towns');;
        locIcon.on('click', function(e){
            if(!locPlaces.is(':visible')){
                locPlaces.show();
                self.selectCountry();
                self.selectRegion();
            }else{
                locPlaces.hide();
                self.addRegion();
                self.clearTown();
                towns.hide();
                cityNav.hide();
                allRegions.show();
                $('.countries li').unbind('click');
                $('.regions li').unbind('click');
            }

        })
    },
    selectCountry: function(){
        var self = this,
            region = $('.regions li'),
            allRegions = $('.regions'),
            cityNav = $('.cityNav'),
            towns = $('.towns');
        $('.countries li').on('click', function () {
            self.removeActiveClass();
            $(this).addClass('active');
            self.addRegion();
            self.clearTown();
            towns.hide();
            cityNav.hide();
            allRegions.show();
            $('.town_list input').unbind('change')
        })
    },
    clearTown: function () {
        var self = this;
        self.townArr.length = 0;
        $('.cityNav').find('li.town').remove();
        self.uncheckTowns();
    },
    uncheckTowns: function () {
        Array.prototype.forEach.call($('.town_list input'), function (e) {
            if ($(e).is(':checked')) {
                $(e).removeAttr('checked')
            }
        })
    },

    removeActiveClass: function () {
        Array.prototype.forEach.call($('.countries li'), function (e) {
            if ($(e).hasClass('active')) {
                $(e).removeClass('active')
            }
        })
    },
    activeCity: function () {
        var region;
        Array.prototype.forEach.call($('.countries li'), function (e) {
            if ($(e).hasClass('active')) {
                region = $(e).text();
            }
        })
        return region;
    },
    addRegion: function () {
        var self = this;
        $('.cityNav').find('.region').text(self.activeCity())
    },
    selectRegion: function(){
        var self = this,
            region = $('.regions li'),
            allRegions = $('.regions'),
            cityNav = $('.cityNav'),
            towns = $('.towns');
        region.on('click', function(){
            allRegions.hide();
            cityNav.show();
            towns.show();
            self.makeTownList(4);
            self.addTown();
        })
    },
    addTown: function () {
        var self = this,
            townStr = '';
        $('.town_list input').on('change', function () {
            if ($(this).is(':checked')) {
                self.townArr.push($(this).next().text());
                townStr = self.townArr.toString();
                if ($('.cityNav').find('li.town').length) {
                    $('.cityNav').find('li.town').text(townStr);
                } else {
                    $('.cityNav').append('<li class="town">' + townStr + '</li>');
                }
            } else if (self.townArr.length) {
                var index = self.townArr.indexOf($(this).next().text());
                if (index > -1) {
                    self.townArr.splice(index, 1);
                    townStr = self.townArr.toString();
                    if (self.townArr.length) {
                        $('.cityNav').find('li.town').text(townStr);
                    } else {
                        $('.cityNav').find('li.town').remove()
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
            townList = $('.town_list'),
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
            $('ul.towns').append('<li class="town_list"><ul>' + cutStr + '</ul></li>');
            self.makeTownList(maxListLength)
        }
    }
};
$(document).ready(function(){
    homeEvents.loginPopup();
    homeEvents.location();
    homeEvents.locationPopup();
});