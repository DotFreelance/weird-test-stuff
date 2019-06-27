// Modules.
import React from 'react';
import * as PIXI from 'pixi.js';

// Styles.
import './ConstraintChain.scss';

// Utils.
import { constraintDistance } from '../../utils';

// Constants.
const CONSTRAINT_DISTANCE = 100;

class ConstraintChain extends React.Component {

    constructor(props) {
        super(props);

        this.primaryContainer = new PIXI.Container();
        this.circle = new PIXI.Point();
    }

    componentDidMount() {
        
        const graphics = new PIXI.Graphics();
        const { pixi } = this.props;

        this.primaryContainer.interactive = true;

        // Apply an update on mouse move.
        this.primaryContainer.on('mousemove', e => {
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

        this.primaryContainer.addChild(graphics);
        pixi.stage.addChild(this.primaryContainer);
        pixi.resizeTo = this.$container;
        this.$container.appendChild(pixi.view);
    }

    componentWillUnmount() {
        const { pixi } = this.props;

        this.primaryContainer.destroy();
        pixi.stage.removeChildren();
        pixi.destroy(false, true);
    }

    render() {
        return (
            <section className="ConstraintChain" ref={ el => this.$container = el }>
                
            </section>
        );
    }
}

export default ConstraintChain;