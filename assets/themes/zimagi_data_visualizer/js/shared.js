var date = new Date();
var timestamp = date.getTime();


var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

var hexToRgbA = function(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

var getNode = function(obj, key){
    var result = {};
    for(var i=0;i<obj.length;i++){
       if(obj[key] == key){
           
       } 
    }
    return result;
}
var isJson = function(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

var csvJSON = function(csv){
    // console.log('----');
    // console.log(csv);
    // console.log('----');
    var lines=csv.split("\n");
    var result = [];
    // console.log(lines);
    var headers=lines[0].split(",");
    
    for(var i=1;i<lines.length;i++){
    
    	var obj = {};
    	var currentline=lines[i].split(",");
    
    	for(var j=0;j<headers.length;j++){
    		obj[headers[j]] = currentline[j];
    	}
    
    	result.push(obj);
    
    }
      
    // return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

var getKeyName = function(node){
    // console.log(node);
    var result = "";
    var c = 0;
    for (var key in node) {
        if (node.hasOwnProperty(key)) {
            //if(c>0){
                result = key;
            //}
        }
        c++;
    }
    return result;
}

var getKeyNames = function(data){
    var arr = [];
    for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
            //console.log(key);
            arr.push(key);
        }
        
    }
    
    return arr;
}


var pushDataToObj = function(obj, keyName, value){
    // var result = obj;
    for(var i=0;i<obj.length;i++){
        var node = obj[i];
        for (var key in node) {
            if (node.hasOwnProperty(key)) {
                if(key==keyName){
                    // Push data value of node
                    node.data.push(value);
                }
            }
        }
    }
    // return result;
    
}