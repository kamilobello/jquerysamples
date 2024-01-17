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

     $('table')
     .on('click', 'th', function () {
        let index = $(this).index(),
          rows = [],
          thClass = $(this).hasClass('asc') ? 'desc' : 'asc';

        $('th').removeClass('asc desc');
        $(this).addClass(thClass);

        $('tbody tr').each(function (index, row) {
            rows.push($(row).detach());
        });

        rows.sort(function (a, b) {
            var aValue = $(a).find('td').eq(index).text(),
                bValue = $(b).find('td').eq(index).text();

            return aValue > bValue
                ? 1
                : aValue < bValue
                ? -1
                : 0;
        });

        if ($(this).hasClass('desc')) {
            rows.reverse();
        }

        $.each(rows, function (index, row) {
            $('tbody').append(row);
        });
        stripe();
     });

     $('#githubForm').on('submit', (e) => {
        e.preventDefault();
        $('#repos tbody').load(
            "https://github.com/search .container",
            $(e.target).serialize()
        );
     })

});