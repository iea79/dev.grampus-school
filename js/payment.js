function calculatePayForm() {

    if (!$('select').is('#payType')) return false;

    var shopId = '597204',
        select = $('#payType'),
        value = select.val(),
        sale = $('#sale'),
        sumField = $('input#sum'),
        handleField = $('input#handle'),
        saleBox = $('.checkbox'),
        messageBox = $('.form__total'),
        optHandle = $('#typeHandle'),
        optYkCredit = $('#typeYkCredit'),
        optGrampusCredit = $('#typeGrampusCredit'),
        curentPrice = coursePrice,
        creditTerm = '',
        creditPercent = '',
        creditAmount = '',
        creditTotalAmount = '';

    select.on('change', function() {
        hideSaleBox();
        changePaymentType($(this).val());
    });

    hideSaleBox();

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

    setCreditPrice(coursePrice);

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
                showTotalSum('Данный вариант не доступен! Выберите другой');

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

    function setCreditPrice(sum) {

        if (coursePrice) {
            // console.log(coursePrice);
            $.getJSON('https://money.yandex.ru/credit/order/ajax/credit-pre-schedule?shopId=' + shopId +'&sum='+ sum +'', function(json, textStatus) {

                if (textStatus !== 'success') {
                    creditAmount = Math.round(((coursePrice*1.1)/courseDuration)/100, 0)*100;
                } else {
                    // console.log(json);
                    creditTerm = json.term;
                    creditPercent = json.creditPercent;
                    creditAmount = Number(json.amount).toFixed();
                    creditTotalAmount = json.totalAmount;
                }

                $('.training__creditPrice').html('<span>Стоимость:</span> <span>от ' + thousandSeparator(creditAmount) + ' руб/мес</span>');
                $('.training__price span').html('от ' + thousandSeparator(creditAmount) + ' руб');
                $('.js_btn_pay span').html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес');
                optYkCredit.val(creditAmount);
            });
        }
    };

};

calculatePayForm();
