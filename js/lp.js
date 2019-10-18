(function () {
    let url = "https://script.google.com/macros/s/AKfycbzX08wPJZMZOzlzSYsjESl23aImpJQLBXwSK-FaeoOnRfL84O0/exec",
        template,
        data;

    $.getJSON(url, function(json, textStatus) {
        data = json.result.reverse();
        console.log(data);

        for (var i = 0; i < data.length; i++) {
            // console.log();
            // data[i];
            // console.log(data[i][3]);
            setTemplate(i);
            if (data[i][7] === 'y' ) {
            }
        }

        $('#jsReview').slick({
            infinite: false
        });
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
            case 'Javascript':

                $('#jsReview').append(template);

                break;
            default:

        }
    }
})();

// $('.js_free').on('click', function() {
//     window.open("https://vk.com/app5898182_-31893650#s=475271");
// })
