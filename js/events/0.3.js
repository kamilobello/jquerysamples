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
            })
            .catch(({statusText}) => {
                $('#gallery').append(`<strong>${statusText}</strong>`) 
            })
    });
    $('div.photo').hover((e) => {
        $(e.currentTarget).find('.details').fadeTo('fast', 0.7);
    }, (e) => {
        $(e.currentTarget).find('.details').fadeOut('fast');
    })
});