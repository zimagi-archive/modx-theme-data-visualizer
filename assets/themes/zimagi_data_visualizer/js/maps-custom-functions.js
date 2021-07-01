var buildMap = function(id){
   
    var obj = JSON.parse($('#'+id).attr('data-attr'));
    var url = obj.url;
    var mType = obj.map;
    var mapMarkers = [];
    if(url!=''){
        // Build loader
        $('#card-'+obj.id+' .card-body').append('<div id="loader-'+obj.id+'" class="loader-container d-flex justify-content-center align-items-center"><div class="loader"></div></div>');
         $.get(url, function(data, status){
            if(data.datasets.length>0){
                for(var i=0;i<data.datasets.length;i++){
                    if(data.datasets[i].value != null && data.datasets[i].value != '' && data.datasets[i].value != undefined){
                        mapMarkers.push({coords: data.datasets[i].coords, name: data.datasets[i].name + ': '+ data.datasets[i].value});  
                    }else{
                        mapMarkers.push({coords: data.datasets[i].coords, name: data.datasets[i].name});
                    }
                }
            }
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
            
        }); 
        // Hide loader
        $('#loader-'+obj.id).remove();
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