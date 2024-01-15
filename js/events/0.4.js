let currentPage = 0;
$(() => {
    $('#more-photos').click((e) => {
        e.preventDefault();
        currentPage++;
        const url = $(e.target).attr('href').replace('$param', currentPage);
        getImageData(url);
    });

    const url = $('#more-photos').attr('href').replace('$param', currentPage);
    getImageData(url);

    function renderImage(element) {
        $('#gallery').append(`<div class="photo">
            <img src="${element.download_url}" alt="Imagen ${element.id}">
            <div class="details">
                <p>${element.author}</p>
            </div>
        </div>`);
    }

    function getImageData(url) {
        $.get(url)
            .then(data => {
                data.forEach(element => {
                    renderImage(element);
                });

                $('div.photo').off('mouseenter mouseleave');
                initEvents();
            })
            .catch(({ statusText }) => {
                $('#gallery').append(`<strong>${statusText}</strong>`);
            });
    }
    function initEvents() {
        $('div.photo').on('mouseenter mouseleave', (e) => {
            const $target = $(e.currentTarget);
            const $details = $target.find('.details');
            if (e.type === 'mouseenter') {
                $details.fadeTo('fast', 0.7);
                $target.animate({
                    padding: 0
                })
            } else {
                $details.fadeOut('fast');
                $target.animate({
                    padding: 15
                })
            }
        });
    }

});
