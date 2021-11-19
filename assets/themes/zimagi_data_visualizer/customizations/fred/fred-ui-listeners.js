var updateModalFredHelp = function(ele){
    var ds = $(ele).attr('data-source');
    var mt = $(ele).attr('data-title');
    $.get( ds, function( data ) {
        $('#modalFredHelp .modal-title').html(mt);
        $('#modalFredHelp .modal-body').html('<pre><code>'+JSON.stringify(data, undefined, 2)+'</code></pre>');
    });
    // Close on Fred Panel 
    $('.fred--panel dt').removeClass('active');
    $('#modalFredHelp').modal('show');
    
}

document.body.addEventListener("FredElementDrop", function(){
    setTimeout(function(){
       
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
        
    }, 1000);
    
    
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
var showToolbar = function(){
    //console.log('show toolbar');
    var elems = document.querySelectorAll(".fred--sidebar.fred--hidden");
    [].forEach.call(elems, function(el) {
        el.classList.remove("fred--hidden");
        el.setAttribute("aria-hidden", false);
    });
}

$(function(){
    
    setTimeout(function(){
        $('a[title="Enable Fred"]').css('background-image', 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA3MCA3MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNzAgNzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNDE0MDQyO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMzUiIGN5PSIzNSIgcj0iMzIuOCIvPgo8Zz4KCQoJCTxpbWFnZSBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTtvcGFjaXR5OjAuNTM7IiB3aWR0aD0iMjA5IiBoZWlnaHQ9IjE2MCIgeGxpbms6aHJlZj0iNjU2MUI3RjBGODczOERBNy5wbmciICB0cmFuc2Zvcm09Im1hdHJpeCgwLjI0IDAgMCAwLjI0IDEwLjQ0IDE1LjQ4KSI+Cgk8L2ltYWdlPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOS40LDIwaC00LjJ2MS43SDE5VjIzaC0zLjh2Mmg0LjR2MS40aC02di03LjloNS44VjIweiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjAuOCwxOC42aDEuN2wzLjEsNS41di01LjVoMS41djcuOWgtMS43bC0zLjItNS42djUuNmgtMS41VjE4LjZ6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMS4xLDE4LjZoMS45bDIuOCw3LjlIMzRsLTAuNS0xLjZoLTIuOUwzMCwyNi41aC0xLjdMMzEuMSwxOC42eiBNMzEsMjMuNWgybC0xLTMuMUwzMSwyMy41eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDIuNywxOS40YzAuMiwwLjMsMC40LDAuNywwLjQsMS4yYzAsMC41LTAuMSwwLjktMC40LDEuMmMtMC4xLDAuMi0wLjMsMC4zLTAuNiwwLjUKCQkJCWMwLjQsMC4xLDAuNywwLjQsMC45LDAuN2MwLjIsMC4zLDAuMywwLjcsMC4zLDEuMmMwLDAuNS0wLjEsMC45LTAuNCwxLjNjLTAuMSwwLjItMC4zLDAuNS0wLjYsMC42Yy0wLjMsMC4yLTAuNiwwLjMtMC45LDAuNAoJCQkJcy0wLjcsMC4xLTEuMSwwLjFoLTMuNnYtNy45aDMuOEM0MS42LDE4LjYsNDIuMywxOC44LDQyLjcsMTkuNHogTTM4LjQsMTkuOXYxLjdoMS45YzAuMywwLDAuNi0wLjEsMC44LTAuMgoJCQkJYzAuMi0wLjEsMC4zLTAuNCwwLjMtMC43YzAtMC40LTAuMS0wLjYtMC40LTAuN2MtMC4yLTAuMS0wLjYtMC4xLTAuOS0wLjFIMzguNHogTTM4LjQsMjN2Mi4xaDEuOWMwLjMsMCwwLjYsMCwwLjgtMC4xCgkJCQljMC4zLTAuMiwwLjUtMC41LDAuNS0xYzAtMC40LTAuMi0wLjctMC41LTAuOEM0MC45LDIzLDQwLjYsMjMsNDAuMywyM0gzOC40eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDQuNywxOC42aDEuN1YyNWg0djEuNGgtNS42VjE4LjZ6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01Ny4zLDIwaC00LjJ2MS43aDMuOFYyM2gtMy44djJoNC40djEuNGgtNnYtNy45aDUuOFYyMHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwLjcsMzAuNmgxLjdsLTIuNyw3LjloLTEuNmwtMi43LTcuOWgxLjhsMS43LDZMMjAuNywzMC42eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjQuOSwzOC41aC0xLjZ2LTcuOWgxLjZWMzguNXoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTI3LjcsMzZjMC4xLDAuNCwwLjIsMC42LDAuMywwLjhjMC4zLDAuMywwLjcsMC41LDEuNCwwLjVjMC40LDAsMC43LDAsMS0wLjFjMC41LTAuMiwwLjctMC41LDAuNy0wLjkKCQkJCWMwLTAuMy0wLjEtMC41LTAuMy0wLjZjLTAuMi0wLjEtMC42LTAuMy0xLjEtMC40bC0wLjktMC4yYy0wLjgtMC4yLTEuNC0wLjQtMS43LTAuNmMtMC41LTAuNC0wLjgtMC45LTAuOC0xLjcKCQkJCWMwLTAuNywwLjMtMS4zLDAuOC0xLjhzMS4zLTAuNywyLjMtMC43YzAuOCwwLDEuNiwwLjIsMi4yLDAuN2MwLjYsMC40LDAuOSwxLjEsMC45LDEuOWgtMS42YzAtMC41LTAuMi0wLjgtMC42LTEKCQkJCWMtMC4zLTAuMS0wLjYtMC4yLTEtMC4yYy0wLjQsMC0wLjgsMC4xLTEsMC4zYy0wLjMsMC4yLTAuNCwwLjQtMC40LDAuN2MwLDAuMywwLjEsMC41LDAuNCwwLjZjMC4yLDAuMSwwLjUsMC4yLDEuMSwwLjNsMS40LDAuMwoJCQkJYzAuNiwwLjEsMS4xLDAuMywxLjQsMC42YzAuNSwwLjQsMC43LDAuOSwwLjcsMS42YzAsMC43LTAuMywxLjMtMC44LDEuOGMtMC42LDAuNS0xLjMsMC43LTIuNCwwLjdjLTEsMC0xLjktMC4yLTIuNS0wLjcKCQkJCXMtMC45LTEuMS0wLjktMS45SDI3Ljd6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMy44LDMwLjZoMS43djQuOWMwLDAuNSwwLjEsMC45LDAuMiwxLjJjMC4yLDAuNCwwLjYsMC43LDEuMywwLjdjMC43LDAsMS4xLTAuMiwxLjMtMC43CgkJCQljMC4xLTAuMiwwLjItMC42LDAuMi0xLjJ2LTQuOWgxLjd2NC45YzAsMC44LTAuMSwxLjUtMC40LDJjLTAuNSwwLjktMS40LDEuMy0yLjgsMS4zYy0xLjQsMC0yLjMtMC40LTIuOC0xLjMKCQkJCWMtMC4zLTAuNS0wLjQtMS4xLTAuNC0yVjMwLjZ6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00NCwzMC42aDEuOWwyLjgsNy45aC0xLjhsLTAuNS0xLjZoLTIuOWwtMC41LDEuNmgtMS43TDQ0LDMwLjZ6IE00My45LDM1LjVoMmwtMS0zLjFMNDMuOSwzNS41eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDkuNywzMC42aDEuN1YzN2g0djEuNGgtNS42VjMwLjZ6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMS4zLDQ0aC00LjJ2MS43SDIxVjQ3aC0zLjh2Mmg0LjR2MS40aC02di03LjloNS44VjQ0eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjcuNCw0Mi43YzAuNiwwLjIsMSwwLjUsMS4zLDFjMC4zLDAuNCwwLjUsMC44LDAuNiwxLjNjMC4xLDAuNSwwLjIsMC45LDAuMiwxLjNjMCwxLjEtMC4yLDEuOS0wLjYsMi43CgkJCQljLTAuNiwxLTEuNSwxLjUtMi43LDEuNWgtMy40di03LjloMy40QzI2LjcsNDIuNiwyNy4xLDQyLjYsMjcuNCw0Mi43eiBNMjQuNCw0My45djUuMmgxLjVjMC44LDAsMS4zLTAuNCwxLjYtMS4yCgkJCQljMC4yLTAuNCwwLjMtMC45LDAuMy0xLjVjMC0wLjgtMC4xLTEuNC0wLjQtMS45cy0wLjgtMC42LTEuNS0wLjZIMjQuNHoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMyLjIsNTAuNWgtMS42di03LjloMS42VjUwLjV6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zOS41LDQyLjZWNDRoLTIuNHY2LjVoLTEuN1Y0NGgtMi40di0xLjRIMzkuNXoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTQ2LjQsNDkuOGMtMC42LDAuNi0xLjUsMC45LTIuNiwwLjlzLTItMC4zLTIuNi0wLjlDNDAuNCw0OSw0MCw0Ny45LDQwLDQ2LjVjMC0xLjUsMC40LTIuNSwxLjItMy4zCgkJCQljMC42LTAuNiwxLjUtMC45LDIuNi0wLjlzMiwwLjMsMi42LDAuOWMwLjgsMC43LDEuMiwxLjgsMS4yLDMuM0M0Ny42LDQ3LjksNDcuMiw0OSw0Ni40LDQ5Ljh6IE00NS40LDQ4LjYKCQkJCWMwLjQtMC41LDAuNi0xLjIsMC42LTIuMWMwLTAuOS0wLjItMS42LTAuNi0yLjFjLTAuNC0wLjUtMC45LTAuNy0xLjYtMC43cy0xLjIsMC4yLTEuNiwwLjdjLTAuNCwwLjUtMC42LDEuMi0wLjYsMi4xCgkJCQljMCwwLjksMC4yLDEuNiwwLjYsMi4xYzAuNCwwLjUsMC45LDAuNywxLjYsMC43UzQ1LDQ5LDQ1LjQsNDguNnoiLz4KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTU0LDQyLjhjMC4zLDAuMSwwLjUsMC4zLDAuNywwLjZjMC4yLDAuMiwwLjMsMC40LDAuNCwwLjdjMC4xLDAuMiwwLjEsMC41LDAuMSwwLjhjMCwwLjQtMC4xLDAuNy0wLjMsMS4xCgkJCQljLTAuMiwwLjQtMC41LDAuNi0wLjksMC44YzAuNCwwLjEsMC42LDAuNCwwLjgsMC42UzU1LDQ4LDU1LDQ4LjV2MC41YzAsMC40LDAsMC42LDAsMC43YzAsMC4yLDAuMSwwLjQsMC4zLDAuNXYwLjJoLTEuOAoJCQkJYzAtMC4yLTAuMS0wLjMtMC4xLTAuNGMwLTAuMi0wLjEtMC41LTAuMS0wLjdsMC0wLjdjMC0wLjUtMC4xLTAuOC0wLjMtMWMtMC4yLTAuMi0wLjUtMC4zLTAuOS0wLjNoLTEuNnYzLjFoLTEuNnYtNy45aDMuOAoJCQkJQzUzLjIsNDIuNiw1My43LDQyLjYsNTQsNDIuOHogTTUwLjUsNDMuOXYyLjFoMS44YzAuNCwwLDAuNiwwLDAuOC0wLjFjMC4zLTAuMiwwLjUtMC40LDAuNS0wLjljMC0wLjUtMC4yLTAuOC0wLjUtMQoJCQkJYy0wLjItMC4xLTAuNC0wLjEtMC44LTAuMUg1MC41eiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K")');
        $('a[title="Enable Fred"]').css({'background-size':'100% auto', 'background-position': 'center center'});
    },1000);
    
    $('.fred--sidebar_more').click(function(){
        $('.fred--text_menu a[title="Disable Fred"]').html('Disable Visual Editor(Fred)');
    });
    
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
                
                 // Add resource ID to dropdowns
                $('.choices__item.choices__item--selectable').each(function(){
                    $(this).append(' ('+$(this).attr('data-value')+')');
                    $(this).attr('data-select-text', '');
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
    if($('.fred--sidebar').css('left') == "0px"){
            $('body').css("padding-left", "80px");
        }
    setTimeout(function(){
        
        if($('.fred--sidebar').css('left') == "0px"){
            $('body').css("padding-left", "80px");
        }else{
            if( $('body').css("padding-left") == "80px"){
               $('body').css("padding-left", "0px"); 
            }
            
        }
        
        
        if($('.fred--toolbar-grip.handle').length>0){
            $('.fred--toolbar-grip.handle').each(function(){
                $(this).mouseout(function(){
                    // Fix to show toolbar after draggin a fred element
                    showToolbar();
                });
            });
        }
    },500);
    
    // Disable links only in edit mode
    $('a[data-fred-editable="true"]').each(function(){
        $(this).attr('disabled', true);
        $(this).attr('href', 'javascript://');
    });
    
   
    

});
