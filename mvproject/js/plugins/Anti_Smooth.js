(function() {
    ImageManager.loadBitmap = function(folder, filename, hue, smooth) { 
        if (filename) { 
        var path = folder + encodeURIComponent(filename) + '.png'; 
        var bitmap = this.loadNormalBitmap(path, hue || 0); 
        //console.log("disabling smoothing for "+path); 
        bitmap.smooth = false; 
        return bitmap; 
        } else { return this.loadEmptyBitmap(); }
    };

    
    // var bitmap_create_bas_texture = Bitmap.prototype._createBaseTexture;
    // Bitmap.prototype._createBaseTexture = function(source){
    //     bitmap_create_bas_texture(source)
    //     Bitmap.prototype._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    // };

    // Object.defineProperty(Bitmap.prototype, 'smooth', {
    //     get: function() {
    //         return false;
    //     },
    //     set: function(value) {
    //         this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    //     },
    //     configurable: true
    // });
    
})();