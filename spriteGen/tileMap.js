
var fs = require('fs');
var Jimp = require('jimp');

var source = "C:/Users/quasi/Documents/OreHero/mvproject/img/tilesets16";
var target = "C:/Users/quasi/Documents/OreHero/mvproject/img/tilesets";

var filewatcher = require('filewatcher');

var watcher = filewatcher();

var fsWait = false;


// ... or a directory

console.log('Starting tileMapper');

watcher.add(source);

watcher.on('change', function (file, stat) {
    // console.log(file)
    // console.log(stat)

    if (fsWait) return;
    fsWait = setTimeout(() => {
        fsWait = false;
        mapFiles();
    }, 100);

});

function mapFiles() {
    var history;

    if (fs.existsSync('./tileHistory')) {
        history = JSON.parse(fs.readFileSync('./tileHistory'));
    }

    fs.readdir(source, function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            exit(1);
        }

        let h = {};
        files.forEach(function (filename, index) {
            var stats = fs.statSync(source + "/" + filename);
            var mtime = new Date(stats.mtime);

            if (filename.includes('.png')) {
                if (history[filename] === mtime.toLocaleString("en-US")) {
                    //skip
                } else {
                    console.log("processing %s - last modified %s", filename, mtime.toLocaleString("en-US"));
                    history[filename] = mtime.toLocaleString("en-US");
                    tileMap(filename);
                }
            }
        });

        fs.writeFileSync('./tileHistory', JSON.stringify(history));
    });
}

function tileMap(filename) {
    Jimp.read(source + '/' + filename).then(srcImg => {
        srcImg.scale(3, [Jimp.RESIZE_NEAREST_NEIGHBOR]);
        srcImg.write(target + "/" + filename);
    }).catch(err => {
        console.log(err);
    });
}
