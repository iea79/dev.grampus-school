// @prepros-append browserDetect.js
// @prepros-append payment.js
// @prepros-append submit.js
// @prepros-append modal.js
// @prepros-append custom-select.js
// @prepros-append jquery.maskedinput.js
// @prepros-append select2/select2.min.js

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    touchDevice: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);
    }
};

function isLgWidth() {
    return $(window).width() >= TempApp.lgWidth;
} // >= 1200
function isMdWidth() {
    return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $(window).width() < TempApp.smWidth;
} // < 768
function isIOS() {
    return TempApp.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return TempApp.touchDevice();
} // for touch device


$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function() {
            $(document).on('touchend', 'a', $.noop)
        });
    }


    // First screen full height
    function setHeiHeight() {
        $('.full__height').css({
            minHeight: $(window).height() + 'px'
        });
    }
    setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
    $(window).resize(setHeiHeight); // обновляем при изменении размеров окна


    // Reset link whte attribute href="#"
    $('[href="#"]').click(function(event) {
        event.preventDefault();
    });

    // Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
    // $('#main__menu a[href^="#"]').click( function(){
    // 	var scroll_el = $(this).attr('href');
    // 	if ($(scroll_el).length != 0) {
    // 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
    // 	}
    // 	return false;
    // });

    // Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    var HeaderTop = $('.header').offset().top;

    $(window).scroll(function() {
        if ($(window).scrollTop() > HeaderTop) {
            $('.header').addClass('stiky');
        } else {
            $('.header').removeClass('stiky');
        }
    });

    // Inputmask.js
    $('[type=tel]').mask("+9(999)999 99 99",{ showMaskOnHover: false });
    // $('[name=sum]').mask("999/999/999",{ showMaskOnHover: false });
    // formSubmit();

    // gridMatch();
    checkOnResize();
    mobileNav();

    $('.review__slider').slick({
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false,
                adaptiveHeight: true
            }
        }]
    });

    $('.reviewLine__title').on('click', function() {
        var item = $(this).closest('.reviewLine');

        $('.reviewLine').not(item).removeClass('reviewLine_active');

        item.toggleClass('reviewLine_active');
    });

    setTimeout(function() {
        $('.wdgMoyklass-course-title a').each(function() {
            $(this).removeAttr('target');
        });
    }, 3000);

    setTimeout(function() {
        // $('.select').each(function(index, el) {
        //     var box = $(this).parent().find('.custom-select');
        //     // console.log(box.length);
        //     if (box.length < 1) {
        //         $(this).wrap('<div class="custom-select"></div>');
        //         customSelectInit("custom-select");
        //     }
        // });
        $('select').select2({
            placeholder: 'Выберите',
            minimumResultsForSearch: Infinity
        });

        $('select').on('select2:open', function(e) {
            var drop = $('.select2-container').last(),
                container = $(this).parent();

            container.addClass('select2-wrapper');
            drop.addClass('select2-drop');
            container.append(drop);
        })
    }, 1000);


    setTimeout(function () {
        $('#yami_iframe_container').css('visibility', 'visible');
    }, 10000);


});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) {
        return;
    }
    TempApp.resized = windowWidth;

    checkOnResize();

});

function checkOnResize() {
    // gridMatch();
    // fontResize();
    if (isXsWidth()) {
        $('.header__action').appendTo('.navbar');
    } else {
        $('.header__action').insertAfter('.header__left');
    }
    if (isSmWidth() || isXsWidth()) {
        $('.training__students').insertAfter('.training__sales');
    } else {
        $('.training__students').insertAfter('.training__bottom');
    }
};


function mobileNav() {
    var toggle = $('.navbar__toggle');
    var navbar = $('.navbar');
    var body = $('body');
    var backdrop = $('.navbar__backdrop');

    toggle.on('click', function() {
        if ($(this).hasClass('navbar__toggle_close')) {
            mobileNavClose();
        } else {
            body.css('overflow', 'hidden');
            body.append('<div class="navbar__backdrop"></div>')
            toggle.addClass('navbar__toggle_close');
            navbar.addClass('navbar_open');
        }
    });

    body.on('click', '.navbar__backdrop', function() {
        mobileNavClose();
    });

    function mobileNavClose() {
        body.removeAttr('style');
        $('.navbar__backdrop').remove();
        toggle.removeClass('navbar__toggle_close');
        navbar.removeClass('navbar_open');
        console.log("close")
    }
};

function gridMatch() {
    $('[data-grid-match] .grid__item').matchHeight({
        byRow: true,
    });
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
        var fontSize = windowWidth / 19.05;
    } else if (windowWidth < 1200) {
        var fontSize = 60;
    }
    $('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
$(function() {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function() {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(https://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<div class="video__play"><img src="img/play.svg" alt="Play"></div>'));

        });

        $('.video__play, .video__prev').on('click', function() {
            // создаем iframe со включенной опцией autoplay
            var videoId = $(this).closest('.js_youtube').attr('id');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
            })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});


// Деление чисел на разряды Например из строки 10000 получаем 10 000
// Использование: thousandSeparator(1000) или используем переменную.
function thousandSeparator(str) {
    var parts = (str + '').split('.'),
        main = parts[0],
        len = main.length,
        output = '',
        i = len - 1;

    while(i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = '&nbsp;' + output;
        }
        --i;
    }

    if (parts.length > 1) {
        output += '.' + parts[1];
    }
    return output;
};


// Хак для яндекс карт втавленных через iframe
// Страуктура:
//<div class="map__wrap" id="map-wrap">
//  <iframe style="pointer-events: none;" src="https://yandex.ru/map-widget/v1/-/CBqXzGXSOB" width="1083" height="707" frameborder="0" allowfullscreen="true"></iframe>
//</div>
// Обязательное свойство в style которое и переключет скрипт
// document.addEventListener('click', function(e) {
//     var map = document.querySelector('#map-wrap iframe')
//     if(e.target.id === 'map-wrap') {
//         map.style.pointerEvents = 'all'
//     } else {
//         map.style.pointerEvents = 'none'
//     }
// })



// Получаем параметры из ссылки
// Создаем массив из параметров
function getUrlParams() {
    var s1 = location.search.substring(1, location.search.length).split('&'),
        r = {}, s2, i;
    for (i = 0; i < s1.length; i += 1) {
        s2 = s1[i].split('=');
        r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
    }
    return r;
};
// Получаем один параметр
// getParams['paramName']
var getParams = getUrlParams();

function setInfoPopUp() {
    // var template;
    // if (!$('div').is('.training')) return false;
    setTemplate('Онлайн интенсив', 'Javascript для верстальщиков', '/frontend/intensive/?inner_link');
    showPopUp();
    // switch (courseName) {
    //     case 'frontend':
    //         break;
    //     default:
    //
    // };

    $('body').on('click', '.popupInfo__close', function(event) {
        $('.popupInfo').removeClass('popupInfo_open');
    })

    function setTemplate(type, title, link) {
        var template = '<div class="popupInfo">'+
                        '<div class="popupInfo__wrap">'+
                            '<div class="popupInfo__close"></div>'+
                            '<div class="popupInfo__type">'+type+'</div>'+
                            '<div class="popupInfo__title">'+title+'</div>'+
                            '<a target="blank" class="btn popupInfo__link" href="'+link+'">Узнать больше</a>'+
                        '</div>'+
                    '</div>';
        $('body').append(template);
    };

    function showPopUp(title, link) {
        setTimeout(function () {
            $('.popupInfo').addClass('popupInfo_open');
            // console.log('show');
            // setTemplate(title, link)
        }, 10000);
    };
};

setInfoPopUp();

$('.btn_senler').on('click', function() {
    var url = $(this).data('link'),
        name = $(this).data('name');

    window.open(url, name);
})
