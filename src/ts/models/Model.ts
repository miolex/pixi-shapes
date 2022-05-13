import { random } from "../Utils";
import { AppView } from "../views/View";
import { Shape } from "./Shape";
import * as SHAPES from "./Shape_types";

/**
 * Array of Shapes classes
 */
const shapeClasses = [
    SHAPES.Triangle,
    SHAPES.Rectangle,
    SHAPES.Circle,
    SHAPES.Ellipse,
    SHAPES.Pentagon,
    SHAPES.Hexagon,
    SHAPES.Diamond,
    SHAPES.Star,
];

export class AppModel {
    private static instance: AppModel;
    private _shapes: Array<Shape>;
    private _gravity: number;
    private _shapesPerSecond: number;

    /**
     * Returns new AppModel instance
     */
    private constructor() {
        this._shapes = []; // array of shapes
        this._gravity = 1; // gravity value
        this._shapesPerSecond = 2; // shapes per second value
    }

    /**
     * Returns AppModel instance
     */
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppModel();
        }
        return this.instance;
    }

    /**
     * Returns new random Shape instance
     * @param x Position by x
     * @param y  Position by y
     * @param width Shape width
     * @param height Shape height
     * @returns Random Shape instance
     */
    public addShape(
        x: number,
        y: number,
        width: number,
        height: number
    ): Shape {
        const ShapeClass = shapeClasses[random(0, shapeClasses.length)]; // choose random Shape class
        const newShape = new ShapeClass(x, y, width, height);
        newShape.graphics.interactive = true;
        newShape.graphics.buttonMode = true;
        this._shapes.push(newShape);

        return newShape;
    }

    /**
     * Removes Shape from array
     * @param shape Shape to remove
     */
    public removeShape(shape: Shape) {
        const shapeIndex = this._shapes.findIndex((s) => s.id == shape.id);
        AppView.getInstance().shapesDisplay.removeShape(
            this._shapes[shapeIndex]
        );
        this._shapes.splice(shapeIndex, 1);
    }

    /**
     * Changes Shapes colors of one type
     * @param shape Shape which type will change color
     */
    public changeColors(shape: Shape) {
        this._shapes
            .filter((s) => s.constructor.name == shape.constructor.name)
            .forEach((s) => {
                s.changeColor();
            });
    }

    /**
     * Removes Shapes that out of bottom bounds of container
     * @param containerHeight Container height
     */
    public removeUnusedShapes(containerHeight: number) {
        this._shapes
            .filter((shape) => shape.y - shape.height >= containerHeight)
            .forEach((shape) => {
                this.removeShape(shape);
            });
    }

    /**
     * Moves all Shapes to simulate gravity
     */
    public moveShapes() {
        this._shapes.forEach((shape) => {
            shape.move(0, this._gravity);
        });
    }

    /**
     * Returns sum of Shapes areas
     */
    public get occupiedArea() {
        return Math.ceil(
            this._shapes.reduce((prev, curr) => prev + curr.getArea(), 0)
        );
    }

    /**
     * Returns gravity valuew
     */
    public get gravity() {
        return this._gravity;
    }

    /**
     * Sets gravity value
     * Gravity must be in range from 1 to 10
     */
    public set gravity(value: number) {
        if (value < 0 || value > 10) {
            return;
        }
        this._gravity = Number(value);
    }

    /**
     * Returns shapes per second value
     */
    public get shapesPerSecond() {
        return this._shapesPerSecond;
    }

    /**
     * Sets shapes per second value
     * Shapes per second must be in range from 1 to 10
     */
    public set shapesPerSecond(value) {
        if (value < 0) {
            return;
        }
        this._shapesPerSecond = Number(value);
    }

    /**
     * Returns number of all Shapes in _shapes array
     */
    public get numberOfShapes() {
        return this._shapes.length;
    }
}
