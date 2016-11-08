module objects {
    export class Player extends objects.GameObject {

        private _gravity: number = 9.81;

        private _maxSpeedX: number = 10;
        private _velocity: objects.Vector2;
        private _accelerationX: number = 0.05;
        private _jumpSpeed: number = 10;
        private _friction: number = 0.9;

        private _marioState: number = config.MarioState.SMALL;
        private _isStar: boolean = false;
        private _isDead: boolean = false;
        private _isGrounded: boolean = false;
        private _touchingLeftWall: boolean = false;

        constructor(imgString: string) {
            super(atlas, imgString);
            this.start();
        }

        public getVelocity(): objects.Vector2 {
            return this._velocity
        }
        public setVelocity(v: objects.Vector2): void {
            this._velocity = v
        }

        public getTouchingLeftWall(): boolean {
            return this._touchingLeftWall
        }
        public setTouchingLeftWall(t: boolean): void {
            this._touchingLeftWall = t
        }

        public getIsGrounded(): boolean {
            return this._isGrounded
        }
        public setIsGrounded(b: boolean): void {
            this._isGrounded = b
        }

        public start(): void {
            this._velocity = new objects.Vector2(0, 0);
            this.regX = this.width / 2
            this.regY = this.height / 2;
            this.position.x = this.regX
        }

        public update(): void {

            this._move()

            if (!this._isGrounded) {
                this.position.y += this._velocity.y + this._gravity;
            }

            //mario cannot go beyond the left wall
            if (!this._touchingLeftWall) {
                this.position.x += this._velocity.x;
            }

            super.update();
        }

        private _move(): void {

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
                this._velocity.x *= this._friction
            }

        }
    }
}