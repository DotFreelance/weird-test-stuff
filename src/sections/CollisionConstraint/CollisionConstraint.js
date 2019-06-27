// Modules.
import React from 'react';
import * as PIXI from 'pixi.js';

// Styles.
import './CollisionConstraint.scss';

// Utils.
import { constraintDistance } from '../../utils';

// Constants.
const CONSTRAINT_DISTANCE = 100;
const CIRCLE_RADIUS = 10;

class CollisionConstraint extends React.Component {

    constructor(props) {
        super(props);

        this.primaryContainer = new PIXI.Container();
        this.circles = new Array(15).fill(new PIXI.Point());
    }

    componentDidMount() {
        
        const graphics = new PIXI.Graphics();
        const { pixi } = this.props;

        pixi.resizeTo = this.$container;
        this.primaryContainer.interactive = true;

        // Generate circles.
        const numCircles = this.circles.length;
        graphics.beginFill(0x000000, 1);
        for(let i = numCircles-1; i >= 0; i--) {
            this.circles[i] = new PIXI.Point(
                pixi.renderer.scaledWidth / 2 + Math.cos(i / numCircles * Math.PI * 2) * CONSTRAINT_DISTANCE * 1.5,
                pixi.renderer.scaledHeight / 2 + Math.sin(i / numCircles * Math.PI * 2) * CONSTRAINT_DISTANCE * 1.5
            );
            graphics.drawCircle(this.circles[i].x, this.circles[i].y, CIRCLE_RADIUS);
        }
        graphics.endFill();

        // Apply an update on mouse move.
        this.primaryContainer.on('mousemove', e => {
            // Draw the constraint circle around the mouse.
            graphics.clear();
            graphics.lineStyle(1, 0x000000);
            graphics.drawCircle(e.data.global.x, e.data.global.y, CONSTRAINT_DISTANCE);
            graphics.lineStyle(0, 0x000000);


            const numCircles = this.circles.length;
            for(let i = numCircles-1; i >= 0; i--) {
                if(this.circles[i].magnitudeFrom(e.data.global) <= CONSTRAINT_DISTANCE + CIRCLE_RADIUS + 1) {
                    this.circles[i] = constraintDistance(this.circles[i], e.data.global, CONSTRAINT_DISTANCE + CIRCLE_RADIUS + 1);
                }
                // Move the balls away from each other.
                for(let j = i; j >= 0; j--) {
                    if(this.circles[i].magnitudeFrom(this.circles[j]) <= CIRCLE_RADIUS * 2) {
                        const temp = constraintDistance(this.circles[i], this.circles[j], CIRCLE_RADIUS * 2);
                        this.circles[j] = constraintDistance(this.circles[j], this.circles[i], CIRCLE_RADIUS * 2);
                        this.circles[i] = temp;
                    }
                }

                graphics.drawCircle(this.circles[i].x, this.circles[i].y, CIRCLE_RADIUS);
            }

            // Draw the balls.
            graphics.beginFill(0x000000, 1);
            for(let i = this.circles.length-1; i >= 0; i--) {
                graphics.drawCircle(this.circles[i].x, this.circles[i].y, CIRCLE_RADIUS);
            }
            graphics.endFill();
        });

        this.primaryContainer.addChild(graphics);
        pixi.stage.addChild(this.primaryContainer);
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
            <section className="CollisionConstraint" ref={ el => this.$container = el }>
                
            </section>
        );
    }
}

export default CollisionConstraint;