var buildMap = function(id){
   
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    var url = obj.url;
    var mType = obj.map;
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
            var mapMarkers = [];
            var colon = "";
            for(var i=0;i<result.length;i++){
                if(result[i].value!=undefined && result[i].value!=""){colon=": ";}
                mapMarkers.push({coords: [Number(result[i].lat), Number(result[i].lon)], name: result[i].name + colon + result[i].value,  value: Number(result[i].value)});
            }
        //   console.log(mapMarkers);
            var vMap = new JsVectorMap({
              map: mType,
              selector: '#'+id,
              zoomButtons: true,
              markers: mapMarkers,
              markerStyle: {
                initial: {
                  r: 9,
                  stroke: window.theme.white,
                  strokeWidth: 7,
                  stokeOpacity: 0.4,
                  fill: window.theme.primary,
                },
                hover: {
                  fill: window.theme.primary,
                  stroke: window.theme.primary,
                },
              },
              regionStyle: {
                initial: {
                  fill: window.theme['gray-200'],
                },
              },
              zoomOnScroll: false,
            });
            // Hide loader
            $('#loader-'+obj.id).remove();
        }});
        
    }
    
    
    
    // window.addEventListener('resize', () => {
    //   //worldMap.updateSize();
    //   //usaMap.updateSize();
    // });
    // setTimeout(function () {
    //  // worldMap.updateSize();
    //   //usaMap.updateSize();
    // }, 250);
    
}
var initMaps = function(){
    $('.map').each(function(){
        buildMap($(this).attr('id'));
    });
   
}

$(function () {
    initMaps();
});