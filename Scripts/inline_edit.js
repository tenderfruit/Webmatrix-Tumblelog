$(".editable, .editable-area")
    .hover(function() {
        $(this).toggleClass("over-inline");
    }) 
    .dblclick(function(e) {
        // Start the inline editing
        var $editable = $(this);
        if ($editable.hasClass('active-inline')) {
            return;
        }
        var contents = $.trim($editable.html());
        $editable
            .addClass("active-inline")
            .empty();
        // Determine what kind of form element we need
        var editElement = $editable.hasClass('editable') ? '<input type="text" />' : '<textarea></textarea>';
        // Replace the target with the form element
        $(editElement)
            .val(contents)
            .appendTo($editable)
            .focus()
            .blur(function(e) {
                $editable.trigger('blur');
            });     
    }) 
    .blur(function(e) {
        // end the inline editing
        var $editable = $(this);
        
        var contents = $editable.find(':first-child:input').val();
        $editable
            .contents()
            .replaceWith('<em class="ajax">Saving … </em>');
    
        var $hidden = $editable.closest('article').find('input#id');
        var postId = $hidden.attr('value');
    
        // post the new value to the server along with its ID
        $.post('/updatepost', 
            {id: postId, text: contents},
            function(data) {
                $editable
                    .removeClass('active-inline')
                    .contents()
                    .replaceWith(contents);
        });                    
    });

