//=============================================================================
// More Character Frames
// by Shaz
// Last Updated: 2015.09.21
//=============================================================================

/*:
 * @plugindesc Allows more than 3 Frames
 * @author Shaz
 *
 * @help This plugin does not provide plugin commands.
 *
 * Add [D L R U] to your character sheet name (with $ prefix) to specify haw
 * many frames in each direction (Down, Left, Right, Up).
 * Spritesheets with this added to the file name will use a looping frame
 * animation rather than the back-and-forth default animation.
 *
 * The first frame should be the idle/still pose.
 *
 * eg. $Ralph [8 8 8 8].png
 *     is a character sheet consisting of 4 rows with 8 frames per row.
 *     Animation will go from frame 1 to 8 then start at 1 again.
 * 
 * @param Animation Speed
 * @type number
 * @min 1
 * @max 800
 * @desc multiply speed of animation.
 * Default: 100
 * @default 100
 */


(function() {

  var MoreCharFrames = MoreCharFrames || {};
  MoreCharFrames.Param = {};

  MoreCharFrames.Parameters = PluginManager.parameters('more_character_frames');
  MoreCharFrames.Param.animationSpeed  = Number(MoreCharFrames.Parameters['Animation Speed'] || 1);
  console.log(MoreCharFrames.Param.animationSpeed);

  ImageManager.isMultiFrameCharacter = function(filename) {
    var frames = filename.match(/\[(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\]/);
    return frames && frames.length === 5;
  };

  ImageManager.getCharacterFrameCount = function(filename) {
    var frames = filename.match(/\[(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\]/);
    if (!frames) {
      return [3, 3, 3, 3];
    } else {
      return frames.splice(1, 4);
    }
  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._isMultiFrame = false;
    this._frames = [3, 3, 3, 3];
  };

  var _Game_CharacterBase_maxPattern = Game_CharacterBase.prototype.maxPattern;
  Game_CharacterBase.prototype.maxPattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_maxPattern.call(this);
    } else {
      return this._frames[(this._direction / 2) - 1];
    }
  };

  var _Game_CharacterBase_pattern = Game_CharacterBase.prototype.pattern;
  Game_CharacterBase.prototype.pattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_pattern.call(this);
    } else {
      return this._pattern < this._frames[this._direction / 2 - 1] ? this._pattern : 0;
    }
  };

  var _Game_CharacterBase_isOriginalPattern = Game_CharacterBase.prototype.isOriginalPattern;
  Game_CharacterBase.prototype.isOriginalPattern = function() {
    if (!this._isMultiFrame) {
      return _Game_CharacterBase_isOriginalPattern.call(this);
    } else {
      return this.pattern() === 0;
    }
  };

  var _Game_CharacterBase_resetPattern = Game_CharacterBase.prototype.resetPattern;
  Game_CharacterBase.prototype.resetPattern = function() {
    if (!this._isMultiFrame) {
      _Game_CharacterBase_resetPattern.call(this);
    } else {
      this.setPattern(0);
    }
  };

  var _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
  Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
    _Game_CharacterBase_setImage.call(this, characterName, characterIndex);
    this._isMultiFrame = ImageManager.isMultiFrameCharacter(characterName);
    this._frames = ImageManager.getCharacterFrameCount(characterName);
  };

  var _Game_CharacterBase_setTileImage = Game_CharacterBase.prototype.setTileImage;
  Game_CharacterBase.prototype.setTileImage = function(tileId) {
    _Game_CharacterBase_setTileImage.call(this, tileId);
    this._isMultiFrame = false;
    this._frames = [3, 3, 3, 3];
  };

  Game_CharacterBase.prototype.isMultiFrame = function() {
    return this._isMultiFrame;
  };

  Game_CharacterBase.prototype.getDirectionFrames = function() {
    return this._frames[this._direction / 2 - 1];
  };

  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    if (this._isMultiFrame) {
      this._originalPattern = 0;
    }
  };

  var _Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
  Sprite_Character.prototype.patternWidth = function() {
    if (!this._character.isMultiFrame()) {
      return _Sprite_Character_patternWidth.call(this);
    } else {
      return this.bitmap.width / this._character.getDirectionFrames();
    }
  };

  //Quasimmortal addition
  var _Game_CharacterBase_animationWait = Game_CharacterBase.prototype.animationWait;
  Game_CharacterBase.prototype.animationWait = function() {
    if(this.isOriginalPattern())
      return _Game_CharacterBase_animationWait.call(this);
    else{
      return ((9 - this.realMoveSpeed()) * 12 / this.getDirectionFrames()) * 100 / MoreCharFrames.Param.animationSpeed;
      //return ((9 - this.realMoveSpeed()) * 12 / this.getDirectionFrames());
    }
  };

  Game_CharacterBase.prototype.updateAnimation = function() {
    this.updateAnimationCount();
    let _wait = this.animationWait();
    if (this._animationCount >= _wait) {
        this.updatePattern();
        this._animationCount = this._animationCount % _wait;
    }
  };

})();