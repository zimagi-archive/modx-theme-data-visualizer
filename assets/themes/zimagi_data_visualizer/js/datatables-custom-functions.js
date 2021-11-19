var setNodeValuesInArray = function(data){
   var arr = [];
   for(var i=0;i<data.length;i++){
       var item = [];
       for (var key in data[i]) {
            
            item.push(data[i][key]);
        }
       arr.push(item); 
   }
   
   return arr;
}


var getHeaders = function(data){
    var str = "";
    var thArr = getKeyNames(data);
    for(var i=0;i<thArr.length;i++){
      str+='<th>'+thArr[i]+'</th>';
    }
    return str;
}

var buildDataTable = function(id, url, cols){
    // Only execute if panel toolbar is closed
    if($('.fred--panel').length>0 && !$('.fred--panel').hasClass('fred--hidden')){
        return;
    }
    var cols = cols.split(',');
    // console.log('build datatable');
    // Build loader
    $('#'+id).parent().append('<div id="loader-'+id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
    
    $.ajax({ type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
            // console.log(data);
            var result = "";
            // Remove loader
            $('#loader-'+id).remove();
            if(isJson(data)){
                result = JSON.parse(data);
                // console.log(result);
            }else{
                // Its a csv
                // return console.log(csvJSON(data));
                result = JSON.parse(csvJSON(data));
               // console.log(result);
                //return;
            }
            
            // Generate reference table headers
            if($('#tr-'+id).length == 0 && $('.fred').length>0){
                $('#'+id+' thead').append('<tr class="help-th" id="#tr-'+id+'" title="This row serves as guide to name your column headers in the settings.">'+getHeaders(result)+'</tr>');
                  
            }
            $('#'+id).DataTable({
                data: setNodeValuesInArray(result)
            });
            
        }});
        
    
}