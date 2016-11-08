module scenes {
    export class Play extends objects.Scene {

        private _bg: createjs.Bitmap;

        private _ground: createjs.Bitmap;
        private _player: objects.Player;

        private _pipes: objects.Pipe[];

        private _scrollableObjContainer: createjs.Container;

        constructor() {
            super();
            this.start();
        }

        public start(): void {
            this._bg = new createjs.Bitmap(assets.getResult("bg"));
            this._ground = new createjs.Bitmap(assets.getResult("floor"));
            this._scrollableObjContainer = new createjs.Container();
            this._player = new objects.Player("player");

            this._pipes = [];
            this._pipes.push(new objects.Pipe(config.PipeSize.SMALL, new objects.Vector2(1208, 450)));
            this._pipes.push(new objects.Pipe(config.PipeSize.MEDIUM, new objects.Vector2(1640, 408)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(1984, 363)));
            this._pipes.push(new objects.Pipe(config.PipeSize.LARGE, new objects.Vector2(2460, 363)));


            this._ground.y = 538;

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._player);
            this._scrollableObjContainer.addChild(this._ground);
            for (let pipe of this._pipes) {
                this._scrollableObjContainer.addChild(pipe);
            }

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            // createjs.Sound.play("theme")

            stage.addChild(this);
        }

        public update(): void {

            this._pipes.forEach(pipe => {
                if (this._checkCollision(this._player, pipe)) {
                    console.log(("Hit " + pipe.name));
                }
            });

            // if (this._checkCollision(this._player, this._pipes[0])) {
            // console.log(("Hit"));
            // }

            // if (!this._player.getIsGrounded) {
            this._checkIfPlayerGrounded();
            this._checkPlayerLeftBounds();
            // }

            this._player.update();

            //bg scrolls as mario moves right from the middle of the screen onwards
            this._scrollBGForward()
        }

        private _checkPlayerLeftBounds(): void {
            if (!this._player.getTouchingLeftWall() &&
                this._player.position.x < this._scrollableObjContainer.regX + this._player.width / 2) {
                this._player.position.x = this._scrollableObjContainer.regX + this._player.width / 2;
                this._player.setVelocity(new objects.Vector2(0, 0));
                this._player.setTouchingLeftWall(true)
            }
            else {
                this._player.setTouchingLeftWall(false);
            }
        }

        private _checkIfPlayerGrounded(): void {
            if (this._player.position.y + this._player.height / 2 >= this._ground.y) {
                this._player.position.y = this._ground.y - this._player.height / 2
                this._player.setIsGrounded(true)
            }
        }

        private _onKeyDown(event: KeyboardEvent): void {
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
        }

        private _onKeyUp(event: KeyboardEvent): void {
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
        }

        private _scrollBGForward(): void {
            if (this._scrollableObjContainer.regX < 3071 - 815) {
                if (this._player.position.x >= this._scrollableObjContainer.regX + config.Screen.CENTER_X)
                    this._scrollableObjContainer.regX += this._player.getVelocity().x;
                // this._scrollableObjContainer.regX += 5;
            }
        }

        private _scrollBGBackward(): void {
            if (this._scrollableObjContainer.regX > 0.0)
                this._scrollableObjContainer.regX -= 5;
        }

        private _checkCollision(obj1: objects.GameObject, obj2: objects.GameObject): boolean {
            //player is obj1; pipe is obj2
            if (obj2.x < obj1.x + obj1.width / 2 &&
                obj2.x + obj2.width > obj1.x - obj1.width / 2 &&
                obj2.y < obj1.y + obj1.height / 2 &&
                obj2.y + obj2.height > obj1.y - obj1.height / 2) {
                return true;
            }
            return false;
        }
    }
}