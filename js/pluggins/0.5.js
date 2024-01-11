(($) => {
    $.extend({
        mathUtils: {
            sum : (array) => {
                return array.reduce((result, item) => parseFloat($.trim(item)) + result, 0)
            },
            average : (array) => {
                return Array.isArray(array) 
                    ? $.sum(array) / array.length
                    : '';
            }
        }
    });    
})(jQuery);

$(() => {
    const quantities = $("li")
        .map((index, li) => $(li).text())
        .get();

    const sum = $.mathUtils.sum(quantities);
    const ave = $.mathUtils.average(quantities);
    $("#total > p > span").text(sum);
    $("#average > p > span").text(ave);
    console.log(quantities);
    console.log(sum)
    console.log(ave)
})