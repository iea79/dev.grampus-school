// Ответ при оплате ?action=PaymentSuccess&custAddr=%2B8%28912%29481+06+99&custName=Тест&customerNumber=Интенсив+-+Javascript+для+верстальщиков&netSum=1&nst_eplPayment=true&scid=959623&shopArticleId=1569169&shopId=597204&shopSuccessURL=https%3A%2F%2Fgrampus-school.ru%2Ffrontend%2Fintensive%2Fsuccess.html&sum=1
function calculatePayForm() {

    if (!$('select').is('#payType')) return false;

    var shopId = '597204',
        select = $('#payType'),
        value = select.val(),
        tarif = $('#Tarif'),
        tarifOpt = tarif.find('option'),
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
        minCreditPrice,
        online = false,
        creditTerm = '',
        creditPercent = '',
        creditAmount = '',
        creditTotalAmount = '';

    if (Array.isArray(coursePrice)) {
        online = true;
    }


    select.on('change', function() {
        hideSaleBox();
        changePaymentType($(this).val());
    });

    tarif.on('change', function() {
        var tarifId = $(this).find('option:selected').attr('id');
        // console.log(tarifId);
        curentPrice = $(this).val();
        coursePrice = $(this).val();
        optSingle.prop('selected', true);
        select.trigger('change');

        minCreditPrice = $('[data-tarif='+tarifId+']').data('amount');
        // console.log(minCreditPrice);

        hideSaleBox();
        setTarifPrice(curentPrice);
        changePaymentType(curentPrice);
    });

    function setTarifPrice(sum) {
        optGrampusCredit.val(Math.round(sum*1.05/courseDuration));
        optYkCredit.val(sum);
        optSingle.val(sum);
    };

    tarifBtn.on('click', function() {
        var id = $(this).data('tarif');
        tarifOpt.removeAttr('selected');
        $('#'+id).attr('selected', true);
        minCreditPrice = $(this).data('amount');
        tarif.trigger('change');
        coursePrice = $(this).data('price');

        // console.log(minCreditPrice);
    });

    hideSaleBox();

    if (online) {
        for (var i = 0; i < coursePrice.length; i++) {
            // console.log(coursePrice[1].sum);
            if (i == 0) {
                curentPrice = coursePrice[i].summ
            }
            // console.log(coursePrice[i].summ);
            setCreditPrice(coursePrice[i].summ, coursePrice[i].name);
        }
    } else {
        setCreditPrice(coursePrice);
    };

    var salePercent = 0.8;
    if (online) {
        salePercent = 0.95;
    }

    sale.on('change', function() {
        if (sale.prop('checked')) {
            curentPrice = coursePrice*salePercent;
            if (online) {
                value = Math.round(tarif.val()*salePercent);
            } else {
                value = Math.round(select.val()*salePercent);
            }
            changePaymentType(value);
        } else {
            curentPrice = coursePrice;
            if (online) {
                value = tarif.val();
            } else {
                value = select.val();
            }
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
                showTotalMessage('После оплаты за вами бронируется место на курсе, а так же текущая стоимость. Остальную часть необходимо внести до начала занятий по выбранному вами варианту (рассрочка или один платеж)<br>*Остаток одним платежом - '+thousandSeparator(coursePrice - 2000)+'&nbsp;руб. <br>**При оплате в рассрочку первый платеж до начала курса - '+thousandSeparator((Math.round((coursePrice/courseDuration*1.05)/100, 0)*100)-2000)+'&nbsp;руб. <br>**Полная стоимость в рассрочку от Grampus - '+thousandSeparator(Math.round((coursePrice*1.05)/100, 0)*100)+'&nbsp;руб.');

                break;
            case 'typeGrampusCredit':
                // console.log(coursePrice);
                // console.log(curentPrice);
                showSaleBox();
                showTotalMessage('Рассрочка от школы "Grampus" на '+courseDuration+' месяца. <br>Полная стоимость курса в данном случае составит '+ thousandSeparator((Math.round((curentPrice*1.05)/100, 0)*100)) +' руб.')

                break;
            case 'typeYkCredit':
                hideSaleBox();
                sumField.val(coursePrice);
                if (online) {
                    showTotalSum('От '+thousandSeparator(minCreditPrice)+' руб. в месяц.');
                } else {
                    showTotalSum('От '+thousandSeparator(value)+' руб. в месяц.');
                }
                showTotalMessage('Кредитная программа от Яндекс Кассы. <br>Без первоначального взноса. <br>Решение по кредиту за 15 минут <br>30 дней погашение без процентов. <br>На шаге оплаты выберите пункт "Заплатить по частям" для выбора варианта по срокам кредита и заполнения анкеты.');

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
    };

    function hideSaleBox() {
        sale.prop('checked', false);
        saleBox.hide();
    };

    function showSaleBox() {
        if (online) return false;
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
                    creditAmount = Math.round(((coursePrice*1.05)/courseDuration)/100, 0)*100;
                } else {
                    // console.log(json);
                    creditTerm = json.term;
                    creditPercent = json.creditPercent;
                    creditAmount = Number(json.amount).toFixed();
                    creditTotalAmount = json.totalAmount;

                    console.log(creditAmount);
                }
                if (tariffName) {
                    if (tariffName == 'self') {
                        minCreditPrice = creditAmount;
                        minCreditTotalAmount = creditTotalAmount;
                        $('.js_btn_pay span').html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес');
                        $('.training__creditPrice').html('<span>Стоимость:</span> <span>от ' + thousandSeparator(creditAmount) + '&nbsp;руб/мес</span>');
                    }
                    // console.log(tariffName);
                    $('[data-tarif='+tariffName+']')
                        .attr('data-amount', creditAmount)
                        .find('span')
                        .html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес');
                } else {
                    $('.js_btn_pay span').html('от ' + thousandSeparator(creditAmount) + '&nbsp;₽&nbsp;/&nbsp;мес');
                    $('.training__price').first().html(thousandSeparator(creditAmount) + '&nbsp;руб/мес</span>');
                    $('.training__creditPrice').html('<span>Стоимость:</span> <span>от ' + thousandSeparator(creditAmount) + '&nbsp;руб/мес</span>');
                    optYkCredit.val(creditAmount);
                }

            });
        };
    };
};

calculatePayForm();
