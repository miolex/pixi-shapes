import { Application, Container, Sprite, Texture } from "pixi.js";
import { App } from "../App";
import { AppController } from "../controllers/Controller";
import { Shape } from "../models/Shape";

export class ShapesDisplay {
    private _stage: Container;
    private _background!: Sprite;

    constructor(app: Application) {
        this._stage = app.stage;
        this._stage.interactive = true;

        this._stage.on("click", (e) => {
            const mousePoint: { x: number; y: number } = {
                x: e.data.global.x / 2,
                y: e.data.global.y / 2,
            };
            AppController.getInstance().addShapeOnClick(mousePoint);
        });

        this.addBackground();
    }

    /**
     * Adds Shape to app stage
     * @param shape Shape to add
     */
    public addShape(shape: Shape) {
        this._stage.addChild(shape.graphics);
    }

    /**
     * Removes Shape from app stage
     * @param shape Shape to remove
     */
    public removeShape(shape: Shape) {
        this._stage.removeChild(shape.graphics);
        shape.graphics.destroy(true);
    }

    /**
     * Initialize background
     */
    private addBackground() {
        this._background = new Sprite(Texture.WHITE);
        this._background.width = App.getInstance().app.screen.width;
        this._background.height = App.getInstance().app.screen.height;
        this._background.interactive = true;
        this._stage.addChild(this._background);
    }

    /**
     * Returns width of app background
     */
    public get containerWidth(): number {
        return this._background.width;
    }

    /**
     * Returns height of app background
     */
    public get containerHeight(): number {
        return this._background.height;
    }
}
