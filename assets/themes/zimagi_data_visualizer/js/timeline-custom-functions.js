var buildTimeline = function(id){
   
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    var url = obj.url;
    if(url!=''){
        // Build loader
        $('#card-'+obj.id+' .card-body').append('<div id="loader-'+obj.id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
         $.get(url, function(data, status){
            if(data.datasets.length>0){
                // Clear all li items if any
                $('#'+id).html('');
                for(var i=0;i<data.datasets.length;i++){
                    var time = timeago.format(data.datasets[i].date);
                    $('#'+id).append('<li class="timeline-item"><strong>'+data.datasets[i].head+'</strong><span class="float-right text-muted text-sm">'+time+'</span><div><p>'+data.datasets[i].content+'</p></div></li>');
                }
            }
            
            
        }); 
        // Hide loader
        $('#loader-'+obj.id).remove();
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