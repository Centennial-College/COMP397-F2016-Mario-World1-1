var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(imgString) {
            _super.call(this, atlas, imgString);
        }
        Player.prototype.start = function () {
        };
        Player.prototype.update = function () {
            this.y += 9.81;
        };
        Player.prototype.moveRight = function () {
            this.x += 5;
        };
        Player.prototype.moveLeft = function () {
            this.x -= 5;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map