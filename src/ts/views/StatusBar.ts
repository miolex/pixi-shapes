export class StatusBar {
    private _numberOfShapes: HTMLLabelElement;
    private _occupiedArea: HTMLLabelElement;

    constructor() {
        this._numberOfShapes = document.getElementById(
            "number-of-shapes"
        ) as HTMLLabelElement;
        this._occupiedArea = document.getElementById(
            "occupied-area"
        ) as HTMLLabelElement;
    }

    /**
     * Update displayed number of shapes & occupied area
     * @param numberOfShapes Number of shapes value
     * @param occupiedArea Occupied area value
     */
    public updateInfo(numberOfShapes: number, occupiedArea: number) {
        this._numberOfShapes.innerText = numberOfShapes.toString();
        this._occupiedArea.innerText = occupiedArea.toString();
    }
}
