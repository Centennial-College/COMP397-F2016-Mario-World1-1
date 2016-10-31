module objects {
    export class Player extends objects.GameObject {
        constructor(imgString : string) {
            super(atlas, imgString);
        }

        public start() : void {

        }

        public update() : void {
            this.y += 9.81;
        }

        public moveRight() : void {
            this.x += 5;
        }

        public moveLeft() : void {
            this.x -= 5;
        }
    }
}