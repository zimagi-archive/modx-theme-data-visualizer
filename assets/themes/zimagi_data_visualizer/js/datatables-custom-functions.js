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

var setNodeValuesInArray = function(data){
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


var getHeaders = function(data){
    var str = "";
    var thArr = getKeyNames(data);
    for(var i=0;i<thArr.length;i++){
      str+='<th>'+thArr[i]+'</th>';
    }
    return str;
}

// function isJson(item) {
//     item = typeof item !== "string"
//         ? JSON.stringify(item)
//         : item;

//     try {
//         item = JSON.parse(item);
//     } catch (e) {
//         return false;
//     }

//     if (typeof item === "object" && item !== null) {
//         return true;
//     }

//     return false;
// }

// function csvJSON(csv){

//   var lines=csv.split("\n");
//   var result = [];
//   var headers=lines[0].split(",");

//   for(var i=1;i<lines.length-1;i++){

// 	  var obj = {};
// 	  var currentline=lines[i].split(",");

// 	  for(var j=0;j<headers.length;j++){
// 		  obj[headers[j]] = currentline[j];
// 	  }

// 	  result.push(obj);

//   }
  
//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
// }

var buildDataTable = function(id, url, cols){
    var cols = cols.split(',');
    //console.log(cols.length);
    // Build loader
    $('#'+id).parent().append('<div id="loader-'+id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
    
    $.ajax({ type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
            var result = "";
            // Remove loader
            $('#loader-'+id).remove();
            if(isJson(data)){
                result = JSON.parse(data);
                // console.log(result);
            }else{
                // Its a csv
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
        /*
    $.get(url, function(result){
        // Remove loader
        $('#loader-'+id).remove();
        if(){
            
        }
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
        
    });*/
    
}