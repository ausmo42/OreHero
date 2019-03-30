

var QIMap = QIMap || {};

QIMap.getMapping = function(itemId, process) {
    if (!$dataItems[itemId]) {return 0;}
    var notecontents = $dataItems[itemId].note;
    var notedata = notecontents.split(/[\r\n]+/);
    var regex1 = /<(.*)[ ](?:INTO)[ ](\d+)>/i;
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(regex1)) {
            var parsedProcess = String(RegExp.$1);
            if(parsedProcess == process)
                return parseInt(RegExp.$2);
        }
    }
    return itemId;
}
    
