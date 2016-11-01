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
            this._gravity = 9.81;
            this._maxSpeedX = 10;
            this._accelerationX = 0.05;
            this._jumpSpeed = 10;
            this._friction = 0.9;
            this._marioState = config.MarioState.SMALL;
            this._isStar = false;
            this._isDead = false;
            this._isGrounded = false;
            this._touchingLeftWall = false;
            this.start();
        }
        Player.prototype.getVelocity = function () {
            return this._velocity;
        };
        Player.prototype.setVelocity = function (v) {
            this._velocity = v;
        };
        Player.prototype.getTouchingLeftWall = function () {
            return this._touchingLeftWall;
        };
        Player.prototype.setTouchingLeftWall = function (t) {
            this._touchingLeftWall = t;
        };
        Player.prototype.getIsGrounded = function () {
            return this._isGrounded;
        };
        Player.prototype.setIsGrounded = function (b) {
            this._isGrounded = b;
        };
        Player.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.regX = this.width / 2;
            this.regY = this.height;
            this.position.x = this.regX;
        };
        Player.prototype.update = function () {
            this._move();
            if (!this._isGrounded) {
                this.position.y += this._velocity.y + this._gravity;
            }
            //mario cannot go beyond the left wall
            if (!this._touchingLeftWall) {
                this.position.x += this._velocity.x;
            }
            _super.prototype.update.call(this);
        };
        Player.prototype._move = function () {
            //AccelerationX affects Velocity.x
            //Gravity affects Velocity.y
            //MaxSpeed caps Velocity.x
            if (controls.RIGHT || controls.LEFT) {
                //accelerate mario
                if (Math.abs(this._velocity.x) < this._maxSpeedX) {
                    this._velocity.x += controls.RIGHT ? this._accelerationX : -this._accelerationX;
                }
            }
            else {
                //decelerate mario
                this._velocity.x *= this._friction;
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map