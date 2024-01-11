(($) => {
    $.extend({
        sum : (array) => {
            return array.reduce((result, item) => parseFloat($.trim(item)) + result, 0)
        },
        average : (array) => {
            return Array.isArray(array) 
                ? $.sum(array) / array.length
                : '';
        }
    });    
})(jQuery);

$(() => {
    const quantities = $("li")
        .map((index, li) => $(li).text())
        .get();

    const sum = $.sum(quantities);
    const ave = $.average(quantities);
    $("#total > p > span").text(sum);
    $("#average > p > span").text(ave);
    console.log(quantities);
    console.log(sum)
    console.log(ave)
})