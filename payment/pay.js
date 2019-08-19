$('[type="submit"]').on('click', function(e){
    e.preventDefault();
    var form = $(this).closest('.form');
    var url = form.attr('action');
    var form_data = form.serialize();
    var field = form.find('[required]');
    console.log(form_data);

    empty = 0;

    field.each(function() {
        if ($(this).val() == "") {
            $(this).addClass('invalid');
            // return false;
            empty++;
        } else {
            $(this).removeClass('invalid');
            $(this).addClass('valid');
        }
    });

    console.log(empty);

    if (empty > 0) {
        $('.form__message').html('Нужно ответить на все вопросы :)');
        return false;
    } else {
        // form.submit();
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: form_data,
            success: function (response) {
                // $('#success').modal('show');
                console.log('success');
                console.log(response);
                // console.log(data);
                // document.location.href = "success.html";
            },
            error: function (response) {
                // $('#success').modal('show');
                console.log('error');
                console.log(response);
                // console.log(data);
                // document.location.href = "success.html";
            }
        });
        // $('.form__message').html('Спасибо за ваши ответы! <br>Вы можете посмотреть результаты перейдя <a href="https://docs.google.com/forms/d/10UDf10pDDkULzaFTfH5syaK9FTZ-eFk1z7mhjLyRE2Y/#responses" target="_blank">по ссылке</a>');
        // document.querySelector('.form__message').innerHTML = getDataGoogle();
    }


});

$('body').on('keyup', 'input.invalid', function() {
    if ($(this).val().length > 0) {
        $(this).removeClass('invalid');
    }
})
