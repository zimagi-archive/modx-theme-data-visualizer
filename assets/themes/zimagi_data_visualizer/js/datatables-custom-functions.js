// function setAsDataColumns(arr){
//     var cols = [];
//     for(var i=0;i<arr.length;i++){
//       cols.push({data: arr[i]})  
//     }
//     return cols;
// }
function buildDataTable(id, url){
    // Build loader
    $('#'+id).parent().append('<div id="loader-'+id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
       
    $.get(url, function(data){
        // Remove loader
        $('#loader-'+id).remove();
        if(data.columns){
            // Set table columns
            for(var i=0; i<data.columns.length;i++){
                $('#'+id+ ' thead tr').append('<th scope="col">'+data.columns[i]+'</th>');
                // console.log(data.columns[i]);
            }
            // return;
            $('#'+id).DataTable({
                "ajaxSource": url
            });
        }else{
            alert('Please set a columns array in your data set. Ex. "columns": ["Name", "Position", "Office", "Age", "Start date", "Salary"]');
        }
        
    });
    
}