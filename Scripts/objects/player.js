var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Objects;
(function (Objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(imgString) {
            _super.call(this, atlas, imgString);
        }
        Player.prototype.start = function () {
        };
        Player.prototype.update = function () {
            this.position.y += 5;
            this.update();
        };
        return Player;
    }(objects.GameObject));
    Objects.Player = Player;
})(Objects || (Objects = {}));
//# sourceMappingURL=player.js.map