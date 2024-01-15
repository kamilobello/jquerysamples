let currentPage = 1;
$(() => {
    $('#more-photos').click((e) => {
        e.preventDefault();
        currentPage++;

        const url = $(e.target).attr('href').replace('$param', currentPage);

        $.get(url)
            .then(data => {
                data.forEach(element => {
                    $('#gallery').append(`<div class="photo">
                    <img src="${element.download_url}" alt="Imagen ${element.id}">
                    <div class="details">
                        <p>${element.author}</p>
                    </div>
                </div>`) 
                });

                $('div.photo').off('mouseenter mouseleave')
                initEvents();
            })
            .catch(({statusText}) => {
                $('#gallery').append(`<strong>${statusText}</strong>`) 
            })
    });
    initEvents();

    function initEvents() {
        $('div.photo').on('mouseenter mouseleave', (e) => {
            console.log('handle' , e.type)
            const $details = $(e.currentTarget).find('.details');
            if (e.type === 'mouseenter') {
                $details.fadeTo('fast', 0.7);
            } else {
                $details.fadeOut('fast');
            }
        });
    }
});