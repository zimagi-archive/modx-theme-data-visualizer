function percentage(total, value){
  total = Math.round(total.replace(/\$|,/g, ''));
  value = Math.round(value.replace(/\$|,/g, ''));
  
  return (value/total)*100;
}
function calculate(total, value){
        var pPos = parseInt(total); 
        var pEarned = parseInt(value);
        var perc="";
        if(isNaN(pPos) || isNaN(pEarned)){
            perc=" ";
           }else{
           perc = ((pEarned/pPos) * 100).toFixed(3);
           }

        return perc*100;
    }
var buildSimpleCard = function(id){
    //console.log(id);
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    var url = obj.url;
    if(url!=''){
        // Build loader
        $('#card-'+obj.id+' .card-body').append('<div id="loader-'+obj.id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
         $.get(url, function(data, status){
            // console.log(data);
            if(data.datasets.length>0){
                //setTimeout(function(){
                    // Set info
                    $('#'+id+' .card-title').html(data.datasets[0].label);
                    $('#'+id+' span.h1').html('$'+data.datasets[0].value);
                    $('#'+id+' .percentage').html(calculate(data.datasets[0].value, data.totalAmount)+'%');
                //},2000);
               
            }
        }); 
        // Hide loader
        $('#loader-'+obj.id).remove();
    }
    
}
