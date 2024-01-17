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
        
        $.get({
            url: "https://api.github.com/search/repositories",
            dataType: 'jsonp',
            data: {
                q: $('#username').val()
            }
        }).done(response => {
            const repos = response.data.items;
            repos.forEach(element => {
                $('tbody').append(`
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.url}</td>
                    <td>${element.private}</td>
                </tr>
                `)
            });
            stripe();
        }).fail(function() {
            alert( "error" );
          });
     })

});