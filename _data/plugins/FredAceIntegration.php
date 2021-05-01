id: 3
name: FredAceIntegration
category: Fred
properties: 'a:0:{}'

-----

$modx->controller->addHtml("<script>(function() {
var langTools = ace.require('ace/ext/language_tools');
var lang = ace.require('ace/lib/lang');

var data = [];
var fredAttributes = (function() {
    var defaultValues = {
        contenteditable: 'true',
        'data-fred-render': 'false',
    };
    
    if (data.length === 0) {
        return new Promise(function(resolve, reject){
            function reqListener () {
              for (var item of this.responseXML.querySelectorAll('article h2')) {

                  var snippet = {
                        caption: item.innerText,
                        meta: 'fred',
                        type: 'snippet'
                    };  
                  
                    if (defaultValues[snippet.caption]) {
                        snippet.snippet = snippet.caption + '=\"\${1:' + defaultValues[snippet.caption] + '}\"';
                    } else {
                        snippet.snippet = snippet.caption + '=\"\${1}\"';
                    }
                  
                    snippet.docHTML = ['<b>', lang.escapeHTML(snippet.caption), '</b>', '<hr></hr>'];
                    
                    var el = item.nextElementSibling;
                    while ((el !== null) && (el.nodeName !== 'H2')) {
                        snippet.docHTML.push(el.outerHTML);
                        el = el.nextElementSibling;
                    }
                    
                    snippet.docHTML = snippet.docHTML.join('');
                  data.push(snippet);
                }
                
                resolve(data);
            }
            
            var oReq = new XMLHttpRequest();
            oReq.addEventListener(\"load\", reqListener);
            oReq.responseType = \"document\";
            oReq.open(\"GET\", \"https://modxcms.github.io/fred/themer/elements/attributes/\");
            oReq.send();
        });
    }
    
    return Promise.resolve(data);
})();

langTools.addCompleter({
        getCompletions: function(editor, session, pos, prefix, callback) {
            if (prefix.length === 0) { callback(null, []); return }
            
            if((editor.getSession().\$modeId === 'ace/mode/html') || (editor.getSession().\$modeId === 'ace/mode/twig')) {
                fredAttributes.then(function(data){
                    callback(null, data);
                });
            }
        }
    });
})()</script>");