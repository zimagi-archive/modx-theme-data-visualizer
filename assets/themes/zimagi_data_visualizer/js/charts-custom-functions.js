var charts = [];

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

var updateConfigAsNewObject = function(chart, options) {
    chart.options.plugins.title.text = 'new title';
    //chart[chart].options = options;
    chart[chart].update();
    // console.log('update');
}
var updateConfigByMutating = function(chart) {
    chart.options.plugins.title.text = 'new title';
    chart.update();
}


// function destroyCharts(){
//     // for(chart in charts){
//     //   charts[chart].destroy();
//     // }
// }
var getPercentage = function(num, arr){
    var total = 0;
    var result;
    for(var i=0; i<arr.length; i++){
        total += Number(arr[i]);
    }
    result = Math.round((num/total)*100);
    
    //(num/100)*per
    return result+'%';
}

var getFirstKeyValue = function(node){
    var result = "";
    var c = 0;
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            if(c==0){
                result = node[key];
            }
        }
        c++;
    }
    return result;
}

var generateLabels = function(data, boolKey, boolCounter, arrLegend){
    var labels = [];
    if(boolKey==undefined){
        boolKey = true;  
    }
    if(boolCounter==undefined){
        boolCounter = false;  
    }
    // Build labels based on first json node
    for(var i=0;i<data.length;i++){
        
        var node = data[i];
        if(boolCounter==true){
            // Set labels base on counter
            labels.push(i+1);
        }else{
            if(boolKey==false){
                // Set all labels once based on the key names
                if(i==0){
                    var c = 0;
                    for (var key in node) {
                            // Use defined legend labels instead
                            if(arrLegend[c]!=undefined && arrLegend[c] != ""){
                                labels.push(arrLegend[c]);
                            }else{
                                labels.push(key);
                            }
                        //}
                        c++;
                    }
                }
            }else{
                // Set labels based on key values 
                labels.push(getFirstKeyValue(node));
            }
        }
        
           
    }
    return labels;
}

var getNodeData = function(node, includeFirstNode){
    var result = [];
    var c = 0;
    if(includeFirstNode==undefined){
        includeFirstNode = true;
    }
    console.log(node);
    for (var key in node) {
        console.log(key + ' = ' + node[key]);
        if(includeFirstNode==true){
            result.push(node[key]);
        }else{
            if(c>0){
                result.push(node[key]);
            }
        }
       
        c++;
    }
    return result;
}

var generateDatasets = function(data, includeFirstNode, chartType, arrLegend){
    var datasets = [];
    if(includeFirstNode==undefined){
        // Set default value
        includeFirstNode = true;
    }
    if(chartType==undefined){
       chartType = 'bar'; 
    }
    
    switch(chartType){
        case 'radar':
            // Build datasets 
            for(var i=0;i<data.length;i++){
               
                var node = data[i];
                datasets.push({label:'Dataset '+(i+1), data: []});
                // Populate data in datasets
                // Ex. { "label": "Dataset 1", "data": [54, -67, 41, 55, -62, 45, 55, 73, 60, 76, 48, 79] }
                var c = 0;
                for (var key in node) {
                    
                    datasets[i].data.push(node[key]);
                    c++;
                }
                  
            }
            break;
        case 'bar':
        case 'line':
            
            // Generate datasets labels without data
            // Ex. { "label": "Dataset 1", "data": [] }
            var c = 0;
            for (var key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    if(includeFirstNode==true){
                        if(arrLegend[c]!=undefined && arrLegend[c] != ""){
                            datasets.push({label: arrLegend[c], originalLabel: key, data:[]});
                        }else{
                            datasets.push({label: key, originalLabel: key, data:[]});
                        }
                    }else{
                        // Skip first node usually used for x axis labels on bar charts
                        if(c>0){
                            if(arrLegend[c-1]!=undefined && arrLegend[c-1] != ""){
                                datasets.push({label: arrLegend[c-1], originalLabel: key, data:[]});
                            }else{
                                datasets.push({label: key, originalLabel: key, data:[]});
                            }
                        } 
                    }
                    
                }
                c++;
            }
            // console.log(datasets);
            // return;
            // // Build labels based on first json node
            for(var i=0;i<data.length;i++){
               
                var node = data[i];
              
                // Populate data in datasets
                // Ex. { "label": "Dataset 1", "data": [54, -67, 41, 55, -62, 45, 55, 73, 60, 76, 48, 79] }
                var c = 0;
                for (var key in node) {
                    // console.log(key);
                        for(var d=0;d<datasets.length;d++){
                            var item = datasets[d];
                            // console.log(key + ' = '+item.originalLabel);
                            if(key==item.originalLabel){
                                item.data.push(node[key]);
                            }
                        }  
                    c++;
                }
                  
            }
            // console.log(datasets);
            // return;
            break;
        case 'pie':
        case 'doughnut':
            var node = data[0];
            // Set single dataset
            datasets.push({label: "Dataset", data: []});
            // Populate data in datasets
            // Ex. { "label": "Dataset 1", "data": [54, -67, 41, 55, -62, 45, 55, 73, 60, 76, 48, 79] }
            
            for (var key in node) {
                if (node.hasOwnProperty(key)) {
                    // Push value to array
                    datasets[0].data.push(node[key]);
                }
            }
            break;
    }
   
    
    
    return datasets;
}

var isFirstNodeDate = function(node){
    var result = false;
    var c = 0;
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            if((c==0 && String(node[key]).indexOf('/')>0)||(c==0 && String(node[key]).indexOf('-')>0)){
                
                result = true;
            }
        }
        c++;
    }
    return result;
}

// var returnLegendLabel = function(key, obj){
    
// }

var buildChart = function(id){
    
    // Get chart attributes
    // console.log($('#'+id).attr('data-attr'));
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    // console.log(obj);
     // Add uId to id attribute
    // obj.id = id;
    var url = obj.url;
    var type = obj.type;
    var style = obj.style;
    var legend = obj.legend;
    var legend_pos = obj.legend_pos;
    var currency = obj.currency;
    
    // console.log(url);
    // Generate legend labels if defined in fred elements setting
    var arr_legend = obj.legend_labels;
    if(arr_legend!=""){
        arr_legend = arr_legend.split(',');
    }
    
    
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: legend,
              position: legend_pos
            }
        }
      };
    if(style==='stacked'){
        options.scales = {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
    }
    if(style==='horizontal'){
        options.indexAxis = 'y';
    }
    // console.log(options);
    //console.log(JSON.stringify(obj));
    // Set all values with id in canvas obj
    // making sure the id is allways the same
    // $('#'+id).attr('data-attr', JSON.stringify(obj))
    
    
    if(url!=''){
        // Build loader
        showCardLoader(obj.id);
        $.ajax({ type: "GET",
        url: url+'?v='+timestamp,
        dataType: "text",
        success: function(data) {
            // console.log(data);
            var result = "";
            // Remove loader
            // $('#loader-'+id).remove();
            if(isJson(data)){
                result = JSON.parse(data);
                // console.log('json');
                // console.log(result);
            }else{
                // Its a csv
                // console.log(data);
                var dataJson = csvJSON(data);
                // console.log(dataJson);
                result = JSON.parse(dataJson);
                // console.log('csv');
                //return;
            }
            // console.log(result);
            //  return;
            
            
            
            //return;
            
            // if(obj.remote == "true"){
            //     // Temporary/not reliable
            //     data = data[0];
            //     // If schema mapping is set 
            //     // define which json node name we will grab its content
            //     if(obj.map1 != ""){
            //         labels = data[obj.map1];
            //     }else{
            //         labels = data.labels;
            //     }
            //     if(obj.map2 != ""){
            //         datasets = data[obj.map2];
            //     }else{
            //         datasets = data.datasets;
            //     }
                
            // }else{
                // labels = data.labels;
                // datasets = data.datasets;
            // }
                
            //console.log(datasets.length);
            
            var labels = [];
            var datasets = [];
           
            // // Add colors to graph
            var colorIndex = 0;
            // console.log('chart type = '+type);
            if(type==='bar'){
                // Generate labels based in node values
                labels = generateLabels(result, true, !isFirstNodeDate(result[0]), arr_legend);
                // console.log(labels);
                // Generate datasets leaving first node for x axis if first node is date
                datasets = generateDatasets(result, !isFirstNodeDate(result[0]), type, arr_legend);
                colorIndex = 0;
                for(var i=0; i<datasets.length; i++){
                    datasets[i].backgroundColor = defaultGraphsColors[colorIndex];
                    datasets[i].borderColor = defaultGraphsColors[colorIndex];
                    datasets[i].hoverBackgroundColor = defaultGraphsColors[colorIndex];
                    datasets[i].hoverBorderColor = defaultGraphsColors[colorIndex];
                    datasets[i].barPercentage = barChartPercentage;
                    datasets[i].categoryPercentage = barChartCatPercentage;
                    colorIndex++;
                }
            }
            if(type==='line'){
                // Generate labels based in node values
                labels = generateLabels(result, true, !isFirstNodeDate(result[0]), arr_legend);
                // Generate datasets leaving first node for x axis if first node is date
                datasets = generateDatasets(result, !isFirstNodeDate(result[0]), type, arr_legend);
                colorIndex = 0;
                for(var i=0; i<datasets.length; i++){
                    datasets[i].backgroundColor = defaultGraphsColors[colorIndex];
                    datasets[i].borderColor = defaultGraphsColors[colorIndex];
                    colorIndex++;
                }
            }
            if(type === 'doughnut' || type === 'pie'){
                
                // Generate labels based on key names
                labels = generateLabels(result, false, false, arr_legend);
                // Generate datasets 
                datasets = generateDatasets(result, true, type);
                // console.log('----');
                // console.log(datasets);
                // console.log('----');
                datasets[0].backgroundColor = [];
                datasets[0].hoverOffset = 4;
                //console.log(datasets);
                colorIndex = 0;
                for(var i=0; i<datasets[0].data.length; i++){
                    datasets[0].backgroundColor.push(defaultGraphsColors[colorIndex]);
                    colorIndex++;
                }
                
            }
            if(type==='radar'){
                // Generate labels based in node values
                labels = generateLabels(result, false, false, arr_legend);
                
                datasets = generateDatasets(result, true, type);
                colorIndex = 0;
                for(var i=0; i<datasets.length; i++){
                    datasets[i].backgroundColor = hexToRgbA(defaultGraphsColors[colorIndex], 0.2);
                    datasets[i].borderColor = defaultGraphsColors[colorIndex];
                    colorIndex++;
                }
            }
            // if(type==='pie'){
            //     colorIndex = 0;
            //     var colors = [];
            //     if(datasets.length>1){
            //         // If there are more than one data set
            //         // remove others
            //         alert('Please verify your data source. Pie charts should have only a single dataset: Ex. "datasets": {"data": [2602,1253,541,1465]}');
                    
            //     }
            //     for(var i=0; i<data.datasets[0].data.length; i++){
            //         colors.push(defaultGraphsColors[colorIndex]);
                    
            //         colorIndex++;
            //     }
            //     datasets[0].backgroundColor = colors;
                
                
            // }
            // console.log(data.datasets[0]);
                
           
            
            // console.log(labels);
            // console.log(datasets);
            // return;
            
            var chartData = {};
            chartData.labels = labels;
            chartData.datasets = datasets;
            // console.log(chartData);
            // return;
                
            if(!charts.hasOwnProperty(id)){
              charts[id] = new Chart(document.getElementById(id), {
                  type: type,
                  data: chartData,
                  options: options,
              });
            //   console.log('build chart');
              // Generate table for pie charts
              if(type==='pie'){
                  colorIndex = 0;
                  var colors = [];
                  for(var i=0; i<labels.length; i++){
                      var hex = defaultGraphsColors[colorIndex];
                      var val = datasets[0].data[i];
                      if(currency){
                          val = formatter.format(val);
                      }else{
                          val = val.toLocaleString();
                      }
                      $('#'+id+'-tbl tbody').append('<tr><td><i class="fas fa-square-full" style="color: '+hex+' !important"></i> '+labels[i]+'</td><td class="text-right">'+val+'</td><td class="text-right text-success">'+getPercentage(datasets[0].data[i], datasets[0].data)+'</td></tr>');
                      colorIndex++;
                  }
                  
              }
             
            }
            // Hide loader
            $('#loader-'+obj.id).remove();
            
        }});
        
    }
}
var getChartOptions = function(chart){
    // console.log(chart + " chart");
    //console.log($('#'+chart).attr('data-attr'));
    var obj = JSON.parse($('#'+chart).attr('data-attr'));
  
    var options = {
            maintainAspectRatio: false,
            cornerRadius: 0,
            legend: {
              display: obj.legend,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  stacked: false,
                  ticks: {
                    stepSize: obj.step,
                  },
                  stacked: obj.stacked,
                },
              ],
              xAxes: [
                {
                  stacked: false,
                  gridLines: {
                    color: 'transparent',
                  },
                  stacked: obj.stacked,
                },
              ],
            },
          };
//   console.log(options);
    return options;
}
var initCharts = function(){
    $('.chart-canvas').each(function(){
        buildChart($(this).attr('id'));
    });
    
    // console.log("initCharts");
}

$(function () {
    initCharts();
});