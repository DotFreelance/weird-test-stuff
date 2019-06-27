// Modules.
import React from 'react';
import * as PIXI from 'pixi.js';

// Styles.
import './FabrikChain.scss';

// Utils.
import { constraintDistance } from '../../utils';

// Constants.
const CONSTRAINT_DISTANCE = 50;

class FabrikChain extends React.Component {

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

            this.circles[0] = e.data.global;
            for(let i = 1; i < this.circles.length; i++) {
                this.circles[i] = constraintDistance(this.circles[i], this.circles[i-1], CONSTRAINT_DISTANCE);
            }
            
            this.circles[this.circles.length-1] = new PIXI.Point(pixi.renderer.scaledWidth / 2, pixi.renderer.scaledHeight / 2);
            for(let j = this.circles.length-2; j >= 0; j--) {
                this.circles[j] = constraintDistance(this.circles[j], this.circles[j+1], CONSTRAINT_DISTANCE);
            }

            graphics.drawCircle(this.circles[0].x, this.circles[0].y, 10);
            for(let k = 1; k < this.circles.length; k++) {
                // Draw the line between the dots.
                graphics.lineStyle(5);
                graphics.moveTo(this.circles[k-1].x, this.circles[k-1].y);
                graphics.lineTo(this.circles[k].x, this.circles[k].y);
                graphics.lineStyle(0);

                // Draw point.
                graphics.drawCircle(this.circles[k].x, this.circles[k].y, 10);
            }
            
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
            <section className="FabrikChain" ref={ el => this.$container = el }>
                
            </section>
        );
    }
}

export default FabrikChain;