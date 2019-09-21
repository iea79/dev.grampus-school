function calculatePayForm() {

    if (!$('select').is('#payType')) return false;

    var shopId = '597204',
        select = $('#payType'),
        value = select.val(),
        tarif = $('#Tarif'),
        tarifBtn = $('[data-tarif]'),
        sale = $('#sale'),
        sumField = $('input#sum'),
        handleField = $('input#handle'),
        saleBox = $('.checkbox'),
        messageBox = $('.form__total'),
        optHandle = $('#typeHandle'),
        optYkCredit = $('#typeYkCredit'),
        optGrampusCredit = $('#typeGrampusCredit'),
        optSingle = $('#typeSingleSum'),
        curentPrice = coursePrice,
        creditTerm = '',
        creditPercent = '',
        creditAmount = '',
        creditTotalAmount = '';

    select.on('change', function() {
        hideSaleBox();
        changePaymentType($(this).val());
    });

    tarif.on('change', function() {
        curentPrice = $(this).val();
        // tarifType = $(this).data('tarif');
        optSingle.prop('selected', true);
        select.trigger('change');

        hideSaleBox();
        setTarifPrice(curentPrice);
        changePaymentType(curentPrice);
        // switch (tarifType) {
        //     case 'self':
        //         break;
        //     case 'standart':
        //         setTarifPrice(curentPrice);
        //         break;
        //     case 'pro':
        //         setTarifPrice(curentPrice);
        //         break;
        //     default:
        //
        // }

    });

    function setTarifPrice(sum) {
        // optGrampusCredit.val(((sum*1.1/courseDuration)/100, 0) * 100);
        optGrampusCredit.val(Math.round(sum*1.1/courseDuration));
        optYkCredit.val(sum);
        optSingle.val(sum);
    }

    tarifBtn.on('click', function() {
        var id = $(this).data('tarif');
        $('#'+id).attr('selected', true);
        tarif.trigger('change');
    })

    hideSaleBox();

    if (Array.isArray(coursePrice)) {
        // console.log(coursePrice);

        for (var i = 0; i < coursePrice.length; i++) {
            // console.log(coursePrice[i]);
            setCreditPrice(coursePrice[i].summ, coursePrice[i].name);
        }
    } else {
        setCreditPrice(coursePrice);
    }

    sale.on('change', function() {
        if (sale.prop('checked')) {
            value = Math.round(select.val()*0.8);
            curentPrice = coursePrice*0.8;
            changePaymentType(value);
        } else {
            value = select.val();
            curentPrice = coursePrice;
            changePaymentType(value);
        }
    });

    handleField.on('keyup', function() {
        var handleSum = $(this).val();

        if (handleSum.length > 0) {
            sumField.val(handleSum);
            showTotalSum('К оплате '+thousandSeparator(handleSum)+' руб.');
        } else {
            sumField.val('');
            showTotalSum('Сумма не выбрана');
        }
    });

    function changePaymentType(value) {

        var type = select.find('option:selected').attr('id');

        $('.form__row.hidden').removeClass('hidden');

        // console.log(type);
        handleField.attr('type', 'hidden').removeAttr('required');
        sumField.val(value);
        showTotalSum('К оплате '+thousandSeparator(value)+' руб.');


        switch (type) {
            case 'typeBook':
                hideSaleBox();
                showTotalMessage('После оплаты за вами бронируется место на курсе, а так же текущая стоимость. Остальную часть необходимо внести до начала занятий по выбранному вами варианту (рассрочка или один платеж)<br>*Остаток одним платежом - '+thousandSeparator(coursePrice - 2000)+'&nbsp;руб. <br>**При оплате в рассрочку первый платеж до начала курса - '+thousandSeparator((Math.round((coursePrice/courseDuration*1.1)/100, 0)*100)-2000)+'&nbsp;руб. <br>**Полная стоимость в рассрочку от Grampus - '+thousandSeparator(Math.round((coursePrice*1.1)/100, 0)*100)+'&nbsp;руб.');

                break;
            case 'typeGrampusCredit':
                // console.log(coursePrice);
                // console.log(curentPrice);
                showSaleBox();
                showTotalMessage('Рассрочка от школы "Grampus" на '+courseDuration+' месяца. <br>Полная стоимость курса в данном случае составит '+ thousandSeparator((Math.round((curentPrice*1.1)/100, 0)*100)) +' руб.')

                break;
            case 'typeYkCredit':
                hideSaleBox();
                sumField.val(coursePrice);
                showTotalSum('От '+thousandSeparator(value)+' руб. в месяц.');
                showTotalMessage('Кредитная программа от Яндекс Кассы. <br>На шаге оплаты выберите пункт "Заплатить по частям" для выбора варианта по срокам кредита и заполнения анкеты. <br>Решение по кредиту за 15 минут<br>30 дней погашение без процентов');

                break;
            case 'typeSingleSum':
                showSaleBox();
                showTotalMessage('После оплаты с вами свяжется наш специалист для подверждения оплаты и проинструктирует по дальнейшим действиям')

                break;
            case 'typeHandle':
                sumField.val('');
                handleField
                    .attr('type', 'number')
                    .attr('required', true);
                hideSaleBox();
                showTotalSum('Введите сумму');

                break;
            default:
                hideSaleBox();
                sumField.val('');
                showTotalSum('Выберите вариант оплаты');

        }
    }

    function hideSaleBox() {
        sale.prop('checked', false);
        saleBox.hide();
    };

    function showSaleBox() {
        saleBox.show();
    };

    function showTotalSum(message) {
        messageBox.html(message);
    };

    function showTotalMessage(message) {
        messageBox.append('<span>' + message + '</span>');
    };

    function setCreditPrice(sum, tariffName) {

        if (coursePrice) {
            // console.log(coursePrice);
            $.getJSON('https://money.yandex.ru/credit/order/ajax/credit-pre-schedule?shopId=' + shopId +'&sum='+ sum +'', function(json, textStatus) {

                // console.log(coursePrice);
                if (textStatus !== 'success') {
                    creditAmount = Math.round(((coursePrice*1.1)/courseDuration)/100, 0)*100;
                } else {
                    // console.log(json);
                    creditTerm = json.term;
                    creditPercent = json.creditPercent;
                    creditAmount = Number(json.amount).toFixed();
                    creditTotalAmount = json.totalAmount;
                }
                if (tariffName) {
                    // console.log(tariffName);
                    $('[data-tarif='+tariffName+'] span').html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес')
                } else {
                    $('.training__price span').html('от ' + thousandSeparator(creditAmount) + ' руб');
                    $('.js_btn_pay span').html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес');
                    optYkCredit.val(creditAmount);
                }

                if (!$('.training__creditPrice').text()) {
                    $('.training__creditPrice').html('<span>Стоимость:</span> <span>от ' + thousandSeparator(creditAmount) + '&nbsp;руб/мес</span>');
                }
            });
        }
    };
};

calculatePayForm();
