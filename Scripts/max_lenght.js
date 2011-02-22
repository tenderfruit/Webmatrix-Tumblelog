var maxChars = 170;
$('.maxlength')
    .after("<span>"+ maxChars +"</span> left")
    .next()
    .hide()
    .end()
    .keypress(function (e) {
        var current = $(this).val().length;
        if (current >= maxChars) {
            if (e.which != 0 && e.which != 8) {
                e.preventDefault();
            }
        }
        
        $(this).next().show().text(maxChars - current);

    });