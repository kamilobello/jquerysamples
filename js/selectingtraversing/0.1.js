$(() => {

    function stripe() {
        $("tbody")
            .each((index, element) => {
                $(element)
                    .children()
                    .has('td')
                    .removeClass('alt')
                    .filter(i => (i % 2) == 0)
                    .addClass('alt')
            });
    }

    stripe();

    $('#topics a')
     .click((e) => {
        e.preventDefault();
        const topic = $(e.target).text();
        console.log(topic)

        $(e.target)
            .addClass('selected')
            .siblings('.selected')
            .removeClass('selected')

        $('tbody tr').show()
        if(topic !== 'All') {
            $(`tr:has(td):not(:contains("${topic}"))`).hide()
        }
        stripe();
     });

});