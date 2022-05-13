import { App } from "../App";
import { ControlPanel } from "./ControlPanel";
import { ShapesDisplay } from "./ShapesDisplay";
import { StatusBar } from "./StatusBar";

export class AppView {
    private static instance: AppView;
    private _controlPanel: ControlPanel;
    private _statusBar: StatusBar;
    private _shapesDisplay: ShapesDisplay;

    public get statusBar(): StatusBar {
        return this._statusBar;
    }

    public get controlPanel(): ControlPanel {
        return this._controlPanel;
    }

    public get shapesDisplay(): ShapesDisplay {
        return this._shapesDisplay;
    }

    /**
     * Returns new AppView instance
     */
    private constructor() {
        this._controlPanel = new ControlPanel();
        this._statusBar = new StatusBar();
        this._shapesDisplay = new ShapesDisplay(App.getInstance().app);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppView();
        }
        return this.instance;
    }
}
