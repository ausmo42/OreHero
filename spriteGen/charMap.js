
var fs = require('fs');
var Jimp = require('jimp');

var source = "./image/character/source";
var target = "./image/character/target";

fs.readdir(source, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        exit(1);
    }

    files.forEach(function (filename, index) {
        var stats = fs.statSync(source + "/" + filename);
        var mtime = new Date(stats.mtime);
        console.log("%s last modified %s", filename, mtime.toLocaleString("en-US"));
        characterMap(filename);
    });
});

function characterMap(filename) {
    Jimp.read(source + "/" + filename, (err, srcImg) => {
        if (err) throw err;
        const w = Number(srcImg.bitmap.width);
        const h = Number(srcImg.bitmap.height);
        //console.log("%dx%d", w, h);

        new Jimp(h * 9, h * 6, (err, tarImg) => {
            if (err) throw err;
            //idle
            blitFrame(tarImg, srcImg, h, h, 0, 0, 0);
            blitFrame(tarImg, srcImg, h, h, 1, 0, 1);
            blitFrame(tarImg, srcImg, h, h, 2, 0, 0);
            //atk
            blitFrame(tarImg, srcImg, h, h, 3, 0, 3);
            blitFrame(tarImg, srcImg, h, h, 4, 0, 4);
            blitFrame(tarImg, srcImg, h, h, 5, 0, 4);
            //dodge
            blitFrame(tarImg, srcImg, h, h, 6, 0, 5);
            blitFrame(tarImg, srcImg, h, h, 7, 0, 5);
            blitFrame(tarImg, srcImg, h, h, 8, 0, 5);
            //prepare attack
            blitFrame(tarImg, srcImg, h, h, 6, 1, 6);
            blitFrame(tarImg, srcImg, h, h, 7, 1, 6);
            blitFrame(tarImg, srcImg, h, h, 8, 1, 6);
            //atk2
            blitFrame(tarImg, srcImg, h, h, 6, 1, 3);
            blitFrame(tarImg, srcImg, h, h, 7, 1, 4);
            blitFrame(tarImg, srcImg, h, h, 8, 1, 4);
            //victory
            blitFrame(tarImg, srcImg, h, h, 6, 1, 3);
            blitFrame(tarImg, srcImg, h, h, 7, 1, 7);
            blitFrame(tarImg, srcImg, h, h, 8, 1, 7);
            //prepare special
            blitFrame(tarImg, srcImg, h, h, 6, 1, 6);
            blitFrame(tarImg, srcImg, h, h, 7, 1, 6);
            blitFrame(tarImg, srcImg, h, h, 8, 1, 6);
            //cast
            blitFrame(tarImg, srcImg, h, h, 6, 1, 3);
            blitFrame(tarImg, srcImg, h, h, 7, 1, 4);
            blitFrame(tarImg, srcImg, h, h, 8, 1, 4);
            //guard
            //low health/abnormal/sleeping
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    blitFrame(tarImg, srcImg, h, h, 6 + i, 2 + j, 9);
                }
            }
            //ko'd
            blitFrame(tarImg, srcImg, h, h, 6, 5, 10);
            blitFrame(tarImg, srcImg, h, h, 7, 5, 10);
            blitFrame(tarImg, srcImg, h, h, 8, 5, 10);

            tarImg.write(target + "/" + filename);
        });

    });
}

function blitFrame(tarImg, srcImg, w, h, tx, ty, sframe) {
    tarImg.blit(srcImg, w * tx, h * ty, w * sframe, 0, w, h);
}
