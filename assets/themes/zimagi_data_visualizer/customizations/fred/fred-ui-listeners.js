


function updateModalFredHelp(ele){
    var ds = $(ele).attr('data-source');
    var mt = $(ele).attr('data-title');
    $.get( ds, function( data ) {
        $('#modalFredHelp .modal-title').html(mt);
        $('#modalFredHelp .modal-body').html('<pre><code>'+JSON.stringify(data, undefined, 2)+'</code></pre>');
    });
    $('#modalFredHelp').modal('show');
    
}

document.body.addEventListener("FredElementDrop", function(){
    // Show Fred Toolbar
    var elems = document.querySelectorAll(".fred--sidebar.fred--hidden");
    [].forEach.call(elems, function(el) {
        el.classList.remove("fred--hidden");
        el.setAttribute("aria-hidden", false);
    });
    // Remove active in Elements section
    var elems = document.querySelectorAll(".fred--sidebar_elements.active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
     // Remove active in Blueprints section
    var elems = document.querySelectorAll(".fred--sidebar_blueprints.active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
    
    // Init feather icons
    feather.replace();
    
   
    
    // Init charts
    initCharts();
    
    // $('.chart-canvas').each(function(){
    //     document.getElementById($(this).attr('id')).render();
    //     //$(this).attr('id');
    // });
    
    initMaps();
    
});
document.body.addEventListener("FredElementSettingChange", function(){
   // Init charts
   initCharts();
   
   // Init feather icons
   feather.replace();
   
   // Update charts
   ///*
  
//   for(chart in charts){
//       updateConfigAsNewObject(charts[chart], getChartOptions(chart));
//       console.log(chart + ' updated');
//   }
    // $('.chart-canvas').each(function(){
    //     var chart = $(this).attr('id');
    //     updateConfigAsNewObject(chart, getChartOptions(chart));
    //     console.log(getChartOptions(chart));
    // });
    //*/
   
});

$(function(){
    //
    var $div = $(".fred--panel");
    if($div.length){
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
              var attributeValue = $(mutation.target).prop(mutation.attributeName);
              $('.fred--panel .fred--input-group.fred--browse input').addClass('inpt-browse');
              setTimeout(function(){
                  $('.inpt-browse').each(function(){
                      $(this).attr('data-prev-val', $(this).val());
                  });
              },500);
              
              $('.fred--panel input, .fred--panel select').change(function(){
                   setTimeout(function(){
                       // Init charts
                       initCharts();
                   },500);
                   // Init icons
                   feather.replace();
               });
               
               var intBrowse = setInterval(function(){
                  // Verify input value hasn't been set via javascript
                  $('.inpt-browse').each(function(){
                      if($(this).val() !== $(this).attr('data-prev-val')){
                          setTimeout(function(){
                              initCharts();
                          },500);
                          $(this).attr('data-prev-val', $(this).val());
                          
                      }
                  });
               },1000);
               
            }
          });
        });
        observer.observe($div[0], {
          attributes: true
        });
    }

});
