(function () {
    let url = "https://script.google.com/macros/s/AKfycbzX08wPJZMZOzlzSYsjESl23aImpJQLBXwSK-FaeoOnRfL84O0/exec",
        template,
        data;

    $.getJSON(url, function(json, textStatus) {
        data = json.result.reverse();
        // console.log(data);

        for (var i = 0; i < data.length; i++) {
            // console.log();
            // data[i];
            // console.log(data[i][3]);
            if (data[i][7] === 'y') {
                setTemplate(i);
            }
        }
    });

    function setTemplate(i) {
        let image = data[i][3],
            name = data[i][2],
            link = data[i][4],
            rate = data[i][6],
            star = '',
            text = data[i][5].replace(/\n/g, "<br>");
        if (image !== '') {
            image = 'style="background-image: url('+image+')"';
        };
        if (rate) {
            let i = 0;
            // console.log(rate);
            while (i < rate) {
                star += '<i class="icon-star"></i>';
                i++;
            }
            // console.log(name);
            // console.log(star);
        }
        template = `<div class="reviewLine__item">
                        <div class="reviewLine__user">
                          <div class="reviewLine__photo" `+image+`></div>
                          <a href="`+link+`" target="blank" class="reviewLine__name">`+name+`</a>
                          <div class="reviewLine__rate">
                                `+star+`
                          </div>
                        </div>
                        <div class="reviewLine__text">`+text+`</div>
                      </div>`;
        // console.log(template);
        switch (data[i][1]) {
            case 'Вэб-дизайн':

                $('#webReview').append(template);
                break;
            case 'Графический дизайн':

                $('#grafReview').append(template);
                break;
            case 'Разработка сайтов':

                $('#frontReview').append(template);
                break;
            default:

        }
    }
})();

$('#inputfile').change(function(event) {
    // console.log($(this).val());
    uploadImage();
});

function uploadImage() {
    let file = $("#inputfile"),
        fd = new FormData,
        path = '/img/review/upload/' + file.prop('files')[0]['name'];


    fd.append('img', file.prop('files')[0]);

    $.ajax({
        url: '/upload.php',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (response) {
            console.log(response);
            $('.form__uploadImg').html('<img src='+response+' />').css('background-image', 'url('+response+')');
            $('.form__uploadText').html(file.prop('files')[0]['name'] + ' загружен');
            $('input#photo').val(response);
        },
        error: function (response) {
            // $('#success').modal('show');
            // console.log('error');
            console.log(response);
        }
    });
}

$('.reviewForm .btn').on('click', function(event) {
    console.log($('[name="entry.1019608975"]').val());
});

$('.formRate input').change(function(event) {
    console.log($(this).val());
    $('#reviewRate').val($(this).val());
});

$('.js_sendReview').on('click', function(event) {
    event.preventDefault();
    $('#antispam').val('checked');
    var form = $(this).closest('.form');
    var url = form.attr('action');
    // var form_data = new FormData(reviewForm);
    var form_data = form.serialize();
    var fields = form.find('[required]');
    console.log(form_data);

    if (checRequiredFields(fields) == 'error') {
        return false;
    } else {
        // form.submit();
        if ($('#antispam').val() !== 'checked') {
            return false;
        }
        $.ajax({
            url: url,
            type: "POST",
            dataType: "xml",
            data: form_data,
            statusCode: {
                0: function(resp) {
                    //Success message
                    // console.log(resp);
                    console.log('success');
                    form.addClass('loaded');
                    setTimeout(function () {
                        form
                            .html('<h2 class="txt_center">Спасибо за ваш отзыв!</h2>')
                            .removeClass('loaded');
                    }, 1000);
                },
                200: function(resp) {
                    // console.log(resp);
                    console.log('error');
                    //Success Message
                }
            }
        });
    }

})

// https://lh5.googleusercontent.com/x6at7bzJ4WDL7saVPbhE458_3MxCxLKLyCJl-9AV_1xkv3NXgOwdfm8E9cSuFOOPcQN07oNUd4d-gFt3g8wj=w1920-h981
//https://drive.google.com/file/d/1gQjzLBcJI3ShJgf0CP3vQcO0tv4wjAqq/view
