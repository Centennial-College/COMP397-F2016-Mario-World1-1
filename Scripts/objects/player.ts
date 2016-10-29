module Objects {
    export class Player extends objects.GameObject {
        constructor(imgString : string) {
            super(atlas, imgString);
        }

        public start() : void {

        }

        public update() : void {
            this.position.y += 5;

            this.update();
        }
    }
}