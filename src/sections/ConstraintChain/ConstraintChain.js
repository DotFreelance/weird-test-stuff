// Modules.
import React from 'react';
import * as PIXI from 'pixi.js';

// Styles.
import './ConstraintChain.scss';

// Utils.
import { constraintDistance } from '../../utils';

// Constants.
const CONSTRAINT_DISTANCE = 50;

class ConstraintChain extends React.Component {

    constructor(props) {
        super(props);

        this.primaryContainer = new PIXI.Container();
        this.circles = new Array(5).fill(new PIXI.Point());
    }

    componentDidMount() {
        
        const graphics = new PIXI.Graphics();
        const { pixi } = this.props;

        this.primaryContainer.interactive = true;

        // Apply an update on mouse move.
        this.primaryContainer.on('mousemove', e => {
            graphics.clear();

            // Draw the balls.
            graphics.beginFill(0x000000, 1);

            this.circles.forEach((circle, key) => {
                let newPoint = new PIXI.Point();
                if(key === 0) {
                    newPoint = e.data.global;
                } else {
                    newPoint = constraintDistance(circle, this.circles[key-1], CONSTRAINT_DISTANCE);
                    // Draw the line between the dots.
                    graphics.lineStyle(5);
                    graphics.moveTo(this.circles[key-1].x, this.circles[key-1].y);
                    graphics.lineTo(newPoint.x, newPoint.y);
                    graphics.lineStyle(0);
                }
                // Draw point.
                graphics.drawCircle(newPoint.x, newPoint.y, 10);
                // Update point in data structure.
                this.circles[key] = newPoint;
            });

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