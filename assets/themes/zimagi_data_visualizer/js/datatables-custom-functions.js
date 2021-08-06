// function setAsDataColumns(arr){
//     var cols = [];
//     for(var i=0;i<arr.length;i++){
//       cols.push({data: arr[i]})  
//     }
//     return cols;
// }
// function buildDataTable(id, url){
//     // Build loader
//     $('#'+id).parent().append('<div id="loader-'+id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
       
//     $.get(url, function(data){
//         // Remove loader
//         $('#loader-'+id).remove();
//         if(data.columns){
//             // Set table columns
//             for(var i=0; i<data.columns.length;i++){
//                 $('#'+id+ ' thead tr').append('<th scope="col">'+data.columns[i]+'</th>');
//                 // console.log(data.columns[i]);
//             }
//             // return;
//             $('#'+id).DataTable({
//                 "ajaxSource": url
//             });
//         }else{
//             alert('Please set a columns array in your data set. Ex. "columns": ["Name", "Position", "Office", "Age", "Start date", "Salary"]');
//         }
        
//     });
    
// }

function setNodeValuesInArray(data){
   var arr = [];
   for(var i=0;i<data.length;i++){
       var item = [];
       for (var key in data[i]) {
            // if (data[i].hasOwnProperty(key)) {
            //     console.log(key + " -> " + data[i][key]);
                
            // }
            item.push(data[i][key]);
        }
       arr.push(item); 
   }
   
   return arr;
}

function getKeyNames(data){
    var arr = [];
    for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
            //console.log(key);
            arr.push(key);
        }
        
    }
    
    return arr;
}

function getHeaders(data){
    var str = "";
    var thArr = getKeyNames(data);
    for(var i=0;i<thArr.length;i++){
      str+='<th>'+thArr[i]+'</th>';
    }
    return str;
}

function buildDataTable(id, url, cols){
    var cols = cols.split(',');
    //console.log(cols.length);
    // Build loader
    $('#'+id).parent().append('<div id="loader-'+id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
       
    $.get(url, function(result){
        // Remove loader
        $('#loader-'+id).remove();
        // console.log(Object.keys(result).length);
        // Generate reference table headers
        if($('#tr-'+id).length == 0 && $('.fred').length>0){
            $('#'+id+' thead').append('<tr class="help-th" id="#tr-'+id+'" title="This row serves as guide to name your column headers in the settings.">'+getHeaders(result)+'</tr>');
              
        }
        // if(Object.keys(result[0]).length != cols.length){
        //     console.log('You have to set '+Object.keys(result[0]).length+' column names in the settings.');
        // }else{
            // console.log(getKeyNames(result));
            
            // console.log(setNodeValuesInArray(result));
            //  columns: [{data: "amount"},{data: "year__name"},{data: "committee__name"},{data: "committee__state__name"},{data: "committee__party__full_name"},{data: "committee__candidates__office__full_name"},{data: "committee__candidates__party__full_name"},{data: "committee__candidates__first_name"},{data: "committee__candidates__last_name"},{data: "contributor__state__name"},{data: "contributor__city__name"},{data: "contributor__zipcode__name"},{data: "contributor__occupation__name"},{data: "contributor__employer__name"}],
            $('#'+id).DataTable({
                data: setNodeValuesInArray(result)
            });
        // }
        
        // if(data.columns){
        //     // Set table columns
        //     // for(var i=0; i<data.columns.length;i++){
        //     //     $('#'+id+ ' thead tr').append('<th scope="col">'+data.columns[i]+'</th>');
        //     //     // console.log(data.columns[i]);
        //     // }
        //     // return;
        //     $('#'+id).DataTable({
        //         "ajaxSource": url
        //     });
        // }else{
        //     alert('Please set a columns array in your data set. Ex. "columns": ["Name", "Position", "Office", "Age", "Start date", "Salary"]');
        // }
        
    });
    
}