import { AppView } from "../views/View";
import { AppModel } from "../models/Model";
import { random } from "../Utils";
import { Shape } from "../models/Shape";
import { SHAPE_SIZE_LIMIT } from "../Config";

export class AppController {
    private static instance: AppController;
    private view: AppView;
    private model: AppModel;

    /**
     * Returns new AppController instance
     * @param view AppView instance
     * @param model AppModel instance
     */
    private constructor(view: AppView, model: AppModel) {
        this.view = view;
        this.model = model;
    }

    /**
     *  AppController instance
     **/
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppController(
                AppView.getInstance(),
                AppModel.getInstance()
            );
        }
        return this.instance;
    }

    /**
     * tick invoke every tick of app ticker
     * @param containerHeight - need for check out of bounds
     * @param shouldGenerate
     */
    public tick(containerHeight: number, shouldGenerate: boolean) {
        // every second generates shapes and remove unused shapes
        if (shouldGenerate) {
            this._generateRandomShapes();
            this.model.removeUnusedShapes(containerHeight);
        }
        // simulates gravity
        this.model.moveShapes();
        // updates displayed info
        this.view.statusBar.updateInfo(
            this.model.numberOfShapes,
            this.model.occupiedArea
        );
    }

    /**
     * On Shape click handler
     */
    private onShapeClickHandler(shape: Shape) {
        this.model.removeShape(shape); // remove clicked shape
        this.model.changeColors(shape); // change color of all Shapes the same type
        this.view.statusBar.updateInfo(
            this.model.numberOfShapes,
            this.model.occupiedArea
        ); // update displayed info
    }

    /**
     * Add Shape to the view
     */
    private addShape(shape: Shape) {
        shape.graphics.on("click", () => {
            this.onShapeClickHandler(shape);
        }); // add on click handler
        this.view.shapesDisplay.addShape(shape); // add Shape to the view
        this.view.statusBar.updateInfo(
            this.model.numberOfShapes,
            this.model.occupiedArea
        ); // update displayed info
    }

    /**
     * Adds Shape to pointer position
     */
    public addShapeOnClick(mousePoint: { x: number; y: number }) {
        const shape = this.model.addShape(
            mousePoint.x,
            mousePoint.y,
            random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX),
            random(SHAPE_SIZE_LIMIT.HEIGHT.MIN, SHAPE_SIZE_LIMIT.HEIGHT.MAX)
        );
        this.addShape(shape);
    }

    /**
     * Adds random shapes
     */
    private _generateRandomShapes() {
        for (let i = 0; i < this.model.shapesPerSecond; i++) {
            const x = random(
                SHAPE_SIZE_LIMIT.WIDTH.MIN / 2,
                this.view.shapesDisplay.containerWidth / 2 -
                    SHAPE_SIZE_LIMIT.WIDTH.MIN / 2
            );
            const width = random(
                SHAPE_SIZE_LIMIT.WIDTH.MIN,
                SHAPE_SIZE_LIMIT.WIDTH.MAX
            );
            const height = random(
                SHAPE_SIZE_LIMIT.WIDTH.MIN,
                SHAPE_SIZE_LIMIT.WIDTH.MAX
            );
            const shape = this.model.addShape(x, 0 - height / 2, width, height);

            this.addShape(shape);
        }
    }
}
