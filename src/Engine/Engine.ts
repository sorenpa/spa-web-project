import * as Rx from 'rxjs';

import RenderEngine from './RenderEngine'


const LOOP_INTERVAL = 1000;

export default class Engine{

    public static renderEngine: RenderEngine;

    public static boot(){

        const gameloop$ : Rx.Observable<number> = Rx.interval(LOOP_INTERVAL);

        this.renderEngine = new RenderEngine(gameloop$);

    }

    
}