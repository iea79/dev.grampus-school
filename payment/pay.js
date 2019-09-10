// const checkout = YandexCheckout(603707, {
//     language: 'ru'
// });
//
// const $checkout = YandexCheckoutUI(603707, {
//     language: 'ru',
//     domSelector: '.my-form',
//     amount: 99.99
// });
// // $checkout.open();
//
// const $checkoutCreditUI = YandexCheckoutCreditUI({
//     shopId: '597204',
//     sum: '16000'
// });
//
// const checkoutCreditButton1 = $checkoutCreditUI({
//     type: 'button',
//     theme: 'default',
//     domSelector: '.form-btn'
// });
//
// $.getJSON('https://money.yandex.ru/credit/order/ajax/credit-pre-schedule?shopId=597204&sum=16000&term=6', function(json, textStatus) {
//     console.log(json);
// });

//
//
// $('[type="submit"]').on('click', function(e){
//     e.preventDefault();
//     var form = $(this).closest('.form');
//     var url = form.attr('action');
//     // var url = 'https://payment.yandex.net/api/v3/';
//     var form_data = form.serialize();
//     var field = form.find('[required]');
//     console.log(form_data);
//
//     empty = 0;
//
//     field.each(function() {
//         if ($(this).val() == "") {
//             $(this).addClass('invalid');
//             // return false;
//             empty++;
//         } else {
//             $(this).removeClass('invalid');
//             $(this).addClass('valid');
//         }
//     });
//
//     console.log(empty);
//
//     if (empty > 0) {
//         $('.form__message').html('Нужно ответить на все вопросы :)');
//         return false;
//     } else {
//
//         // checkout.tokenize({
//         //     number: '5555555555554477',
//         //     cvc: '000',
//         //     month: '10',
//         //     year: '22'
//         //     // number: document.querySelector('.cartNumber').value,
//         //     // cvc: document.querySelector('.cartCvc').value,
//         //     // month: document.querySelector('.expiry_month').value,
//         //     // year: document.querySelector('.expiry_year').value
//         // }).then(res => {
//         //     console.log('then');
//         //     if (res.status === 'success') {
//         //         console.log('success');
//         //         console.log(res.data);
//         //         console.log(res.data.response);
//         //         const { paymentToken } = res.data.response;
//         //
//         //         console.log(paymentToken);
//         //
//         //         return paymentToken;
//         //     }
//         //     if (res.status === 'error') {
//         //
//         //         // console.log(res.data.response);
//         //         const { type } = res.error;
//         //         const { status_code } = res.error;
//         //
//         //         /*
//         //             [
//         //                 {
//         //                     code: 'invalid_expiry_month',
//         //                     message: 'Невалидное значение месяца'
//         //                 },
//         //                 {
//         //                     code: 'invalid_cvc',
//         //                     message: 'Невалидное значение CVC'
//         //                 }
//         //             ]
//         //         */
//         //         const { params } = res.error;
//         //
//         //         console.log(res);
//         //         console.log(status_code);
//         //         console.log(type);
//         //         console.log(params);
//         //
//         //         return res;
//         //     }
//         // });
//         // form.submit();
//         // var path = url + '{123456789}/603707:test_tc3A7ai50zIlMdo4mSRtvzr7rPcqfgC5VTylYswqEis' + form_data;
//
//         // $.post(url, {form_data}, function(json, status) {
//         //     if (status !== 'success') return false;
//         //     console.log(json);
//         // });
//         // $.getJSON(url, {form_data}, function(json, status) {
//         //     if (status !== 'success') return false;
//         //     console.log(json);
//         // });
//         $.ajax({
//             url: url,
//             type: "POST",
//             dataType: "json",
//             data: form_data,
//             success: function (data) {
//                 // $('#success').modal('show');
//                 console.log('success');
//                 console.log(data);
//                 console.log(data.confirmation.confirmation_url);
//                 // var json = $.getJSON(response);
//                 // console.log(json);
//
//                 // console.log(url + form_data);
//                 // console.log(data);
//                 if (data.status === 'pending') {
//                     document.location.href = data.confirmation.confirmation_url;
//                 }
//             },
//             error: function (data) {
//                 // $('#success').modal('show');
//                 console.log('error');
//                 console.log(data);
//                 // console.log(data);
//                 // document.location.href = "success.html";
//             }
//         });
//         // $('.form__message').html('Спасибо за ваши ответы! <br>Вы можете посмотреть результаты перейдя <a href="https://docs.google.com/forms/d/10UDf10pDDkULzaFTfH5syaK9FTZ-eFk1z7mhjLyRE2Y/#responses" target="_blank">по ссылке</a>');
//         // document.querySelector('.form__message').innerHTML = getDataGoogle();
//     }
//
//
// });
//
//
// // $.getJSON('https://money.yandex.ru/credit/order/ajax/credit-pre-schedule?shopId=603707&sum=16500', function(json, status) {
// //     console.log(json);
// // });
// //
// // $.post('https://money.yandex.ru/credit/order/ajax/credit-pre-schedule?shopId=603707&sum=16500', function(data) {
// //     console.log(data);
// // });
//
//
// $('body').on('keyup', 'input.invalid', function() {
//     if ($(this).val().length > 0) {
//         $(this).removeClass('invalid');
//     }
// })
