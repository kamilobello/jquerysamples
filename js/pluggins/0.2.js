(($) => {
    $.sum = (array) => {
        return array.reduce((result, item) => parseFloat($.trim(item)) + result, 0)
    }
})(jQuery);

$(() => {
    const quantities = $("li")
        .map((index, li) => $(li).text())
        .get();

    console.log(quantities);
    const sum = $.sum(quantities);
    $("#total > p > span").text(sum);
    console.log(sum)
})