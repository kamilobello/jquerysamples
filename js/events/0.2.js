let currentPage = 1;
$(() => {
    $('#more-photos').click((e) => {
        e.preventDefault();
        currentPage++;

        const url = $(e.target).attr('href').replace('$param', currentPage);

        $.get(url)
            .then(data => {
                console.log(data);
                data.forEach(element => {
                    $('#gallery').append(`<img src="${element.download_url}" alt="Imagen ${element.id}">`) 
                });
            })
            .catch(({statusText}) => {
                $('#gallery').append(`<strong>${statusText}</strong>`) 
            })
    })
});