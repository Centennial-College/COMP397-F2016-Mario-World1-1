var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this.start();
        }
        Play.prototype.start = function () {
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");
            this._pipes = [];
            this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984, 363)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2458, 363)));
            this._ground.y = 538;
            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            for (var _i = 0, _a = this._pipes; _i < _a.length; _i++) {
                var pipe = _a[_i];
                this._scrollableObjContainer.addChild(pipe);
            }
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            stage.addChild(this);
        };
        Play.prototype.update = function () {
            this._player.update();
            if (controls.LEFT) {
                this._player.moveLeft();
                this._scrollBGBackward();
            }
            if (controls.RIGHT) {
                this._player.moveRight();
                this._scrollBGForward();
            }
        };
        Play.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.SHOOT = true;
                    break;
            }
        };
        Play.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.SHOOT = false;
                    break;
            }
        };
        Play.prototype._scrollBGForward = function () {
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX += 1;
        };
        Play.prototype._scrollBGBackward = function () {
            if (this._scrollableObjContainer.regX > 0.0)
                this._scrollableObjContainer.regX -= 1;
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map