 $(function () {
    $("abbr.timeago").timeago();
    
    
    $('.delete').hide();
    
    //showhide delete links
    $('#page > ul').delegate('aside', 'mouseover',  show_delete );
    $('#page > ul').delegate('aside', 'mouseout',  hide_delete );
     
    function show_delete(){
        $(this).find('.delete').show();
    }
    function hide_delete(){
        $(this).find('.delete').hide();
    } 
    
    //delete post
    $('#page > ul').delegate('.delete', 'click',  delete_post );
 
    function delete_post(){
        $this = $(this);
        $hidden = $this.closest('article').find('input#id');
        var postId = $hidden.attr('value');
        $.post('/deletepost', {id : postId} , function(){
            $this.closest('li').fadeOut();
        })
        return false;
    } 
    
    //toggle entry form
    $('#comment-toggler').parent().next().hide();
    $('#comment-toggler').click(
        function () {
        $(this).parent().next().slideToggle('slow');
       }
    );
   
    //create post
    $('#myForm').submit(function(){
        $this = $(this);
        
        var form_data = $('form').serialize();
        $.post('/getarticle', form_data, prepend_output);
        return false;
    });
    
    //prepend new post
    function prepend_output(data){ 
        //http://stackoverflow.com/questions/1906066/jquery-prepend-fadein
        //var $textarea = $this.find('#text');
        //$textarea.empty();
        $('li:eq(1)').prepend(
            $(data).hide().fadeIn('slow')
        ); 
        
    }
});
            
          