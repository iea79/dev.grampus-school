// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $(".js_pay").on('click', function (e){
        e.preventDefault();
        var form = $(this).closest('.form_yk');
        var url = form.attr('action');
        var form_data = form.serialize();
        var fields = form.find('[required]');
        // console.log(form_data);

        if (checRequiredFields(fields) == 'error') {
            return false;
        } else {
            form.submit();
        }

        // console.log(empty);

        // $.ajax({
        //     url: url,
        //     type: "POST",
        //     dataType: "html",
        //     data: form_data,
        //     success: function (response) {
        //         // $('#success').modal('show');
        //         // console.log('success');
        //         console.log(response);
        //         // console.log(data);
        //         // document.location.href = "success.html";
        //     },
        //     error: function (response) {
        //         // $('#success').modal('show');
        //         // console.log('error');
        //         console.log(response);
        //     }
        // });
    });

}

function sendOrder() {
    $('.js_sendOrder').on('click', function() {
        var form = $('#payment'),
            MKmodal = $('#order'),
            MKform = $('#order form'),
            MKclassId = $('.oneClassItem').attr('value'),
            fields = form.find('input[required]').not('[type=hidden]'),
            name = $('[name=custName]'),
            phone = $('[name=custAddr]'),
            vk = $('[name=custEmail]'),
            MKname = $('[name="fldname"]'),
            MKphone = $('[name="fldphone"]'),
            MKvk = $('[name="fld18"]'),
            MKsubmit = MKform.find('[name=submit]'),
            MKid = MKform.attr('id');

        // console.log('Order');

        if (checRequiredFields(fields) == 'error') {
            // console.log(checRequiredFields(fields));
            return false;
        } else {
            // console.log(checRequiredFields(fields));
            // form.submit();
            // form.modal('hide');

            MKname.val(name.val());
            MKphone.val(phone.val().replace(' ', '').replace(' ', '').replace('(', '').replace(')', '').replace('+', ''));
            MKvk.val(vk.val());





            // MKmodal.modal('show');
            MKsubmit.trigger('click');
            // $.post('https://app.moyklass.com/api/site/widget/forms?id='+MKid+'&class_id='+MKclassId+'&params[name]='+MKname+'&params[phone]='+MKphone+'&params[18]='+MKvk+'', function(resp) {
            //     console.log(resp);
            // })
        }

    });
}

function checRequiredFields(fields) {

    var empty = 0;

    fields.each(function() {
        if ($(this).val() == "") {
            $(this).addClass('invalid');
            $('.form__error').html('Не заполнены обязательные поля');
            setTimeout(function () {
                $('.form__error').html('');
            }, 5000);
            // return false;
            empty++;
        } else {
            $(this).removeClass('invalid');
            $(this).addClass('valid');
        }
    });

    fields.on('keyup change', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

    console.log(empty);

    if (empty > 0) return 'error';

}

formSubmit();
sendOrder();
