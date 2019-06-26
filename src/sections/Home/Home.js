// Modules.
import React from 'react';
import * as PIXI from 'pixi.js';

// Styles.
import './Home.scss';

// Utils.
import { constraintDistance } from '../../utils';

// Constants.
const CONSTRAINT_DISTANCE = 100;

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.pixi = null;
        this.circle = new PIXI.Point();
    }

    componentDidMount() {
        this.pixi = new PIXI.Application({ 
            width: this.$canvas.clientWidth,
            height: this.$canvas.clientHeight,
            resolution: 2,
            autoDensity: true,
            antialias: true,
            view: this.$canvas,
            transparent: true
        });
        
        const graphics = new PIXI.Graphics();

        this.pixi.stage.interactive = true;

        // Apply an update on mouse move.
        this.pixi.stage.on('mousemove', e => {
            // Draw the constraint circle around the mouse.
            graphics.clear();
            graphics.lineStyle(1, 0x000000);
            graphics.drawCircle(e.data.global.x, e.data.global.y, CONSTRAINT_DISTANCE);

            // If the ball is hitting the constraint edge, drag it along.
            if(this.circle.magnitudeFrom(e.data.global) > CONSTRAINT_DISTANCE) {
                this.circle = constraintDistance(this.circle, e.data.global, CONSTRAINT_DISTANCE);
            }

            // Draw the ball.
            graphics.beginFill(0x000000, 1);
            graphics.drawCircle(this.circle.x, this.circle.y, 10);
            graphics.endFill();
        });

        this.pixi.stage.addChild(graphics);
    }

    componentWillUnmount() {
        this.stage = null;
        delete this.pixi;
        this.pixi = null;
    }

    render() {
        return (
            <section className="Home">
                <canvas ref={ el => this.$canvas = el } />
            </section>
        );
    }
}

export default Home;