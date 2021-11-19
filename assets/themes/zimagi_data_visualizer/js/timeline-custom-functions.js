var buildTimeline = function(id){
   
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    var url = obj.url;
    if(url!=''){
        // Build loader
        showCardLoader(obj.id);
        $.ajax({ type: "GET",
        url: url+'?v='+timestamp,
        dataType: "text",
        success: function(data) {
            // return;
            var result = "";
            if(isJson(data)){
                result = JSON.parse(data);
            }else{
                // Its a csv
                var dataJson = csvJSON(data);
                result = JSON.parse(dataJson);
            }
            // Clear all li items if any
            $('#'+id).html('');
            for(var i=0;i<result.length;i++){
                var time = timeago.format(result[i].date);
                    $('#'+id).append('<li class="timeline-item"><strong>'+result[i].head+'</strong><span class="float-right text-muted text-sm">'+time+'</span><div><p>'+result[i].content+'</p></div></li>');
            }
           
            // Hide loader
            $('#loader-'+obj.id).remove();
        }}); 
        
    }
    
    
}
var initTimelines = function(){
    $('.timeline').each(function(){
        buildTimeline($(this).attr('id'));
    });
   
}

$(function () {
    initTimelines();
});