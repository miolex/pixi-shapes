import { AppModel } from "../models/Model";

export class ControlPanel {
    private _gravityPlus: HTMLInputElement;
    private _gravityMinus: HTMLInputElement;
    private _shapesPerSecondPlus: HTMLInputElement;
    private _shapesPerSecondMinus: HTMLInputElement;
    private _shapesPerSecond: HTMLInputElement;
    private _gravity: HTMLInputElement;

    constructor() {
        this._shapesPerSecondPlus = document.getElementById(
            "shapes-per-second-plus"
        ) as HTMLInputElement;
        this._shapesPerSecondMinus = document.getElementById(
            "shapes-per-second-minus"
        ) as HTMLInputElement;
        this._gravityPlus = document.getElementById(
            "gravity-plus"
        ) as HTMLInputElement;
        this._gravityMinus = document.getElementById(
            "gravity-minus"
        ) as HTMLInputElement;
        this._shapesPerSecond = document.getElementById(
            "shapes-per-second"
        ) as HTMLInputElement;
        this._gravity = document.getElementById("gravity") as HTMLInputElement;

        this._shapesPerSecondPlus.addEventListener("click", () => {
            const sps = Number.parseInt(this._shapesPerSecond.value);
            AppModel.getInstance().shapesPerSecond = isNaN(sps) ? 0 : sps;
        });

        this._shapesPerSecondMinus.addEventListener("click", () => {
            const sps = Number.parseInt(this._shapesPerSecond.value);
            AppModel.getInstance().shapesPerSecond = isNaN(sps) ? 0 : sps;
        });

        this._gravityMinus.addEventListener("click", () => {
            const gvt = Number.parseInt(this._gravity.value);

            AppModel.getInstance().gravity = isNaN(gvt) ? 0 : gvt;
        });

        this._gravityPlus.addEventListener("click", () => {
            const gvt = Number.parseInt(this._gravity.value);
            AppModel.getInstance().gravity = isNaN(gvt) ? 0 : gvt;
        });
    }
}
