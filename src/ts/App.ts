import { Application } from "pixi.js";
import { AppController } from "./controllers/Controller";
import { AppModel } from "./models/Model";
import { AppView } from "./views/View";

export class App {
    private static instance: App;
    private _app: Application;
    private _appContainer: HTMLElement;

    public get app(): Application {
        return this._app;
    }

    private constructor() {
        // create PIXI.Application instance
        this._appContainer = document.getElementById("app")!;
        this._app = new Application({
            width: this._appContainer.clientWidth,
            height: this._appContainer.clientHeight,
            antialias: true,
        });
        // Add Application to child
        this._appContainer?.appendChild(this._app.view);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new App();
        }
        return this.instance;
    }
}

export class AppManager {
    private static instance: AppManager;
    private _app: Application;
    private _model: AppModel;
    private _view: AppView;
    private _controller: AppController;

    /**
     * Returns new AppManager instance
     */
    private constructor(app: Application) {
        // Init Model, View and Controller
        this._model = AppModel.getInstance();
        this._view = AppView.getInstance();
        this._controller = AppController.getInstance();
        this._app = App.getInstance().app;
        // Init ticker
        this.initTicker(this._app, this._controller, this._view);
        AppManager.instance = this;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppManager(App.getInstance().app);
        }
        return this.instance;
    }

    /**
     *
     * @param app PIXI.Application instance
     * @param controller AppController instance
     * @param view AppView instance
     */
    private initTicker(
        app: Application,
        controller: AppController,
        view: AppView
    ) {
        let renderCounter = 0;
        app.ticker.add(() => {
            const tickerInterval = app.ticker.elapsedMS; // difference between frames
            const shouldGenerate =
                (renderCounter * tickerInterval) % 1000 < tickerInterval; // 'true' if a second passed

            // Every tick invoke controller method 'tick'
            controller.tick(view.shapesDisplay.containerHeight, shouldGenerate);

            renderCounter++;
        });
    }
}

window.onload = () => {
    AppManager.getInstance();
};
