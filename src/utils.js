import * as PIXI from 'pixi.js';

/** 
 * Extending PIXI with a bit of functionality that makes it a little easier to use.
 * Author: Paul Jarrow <paul@thinkingbox.com>
 */

// Extend the Point class to add a simple normalize method.
PIXI.Point.prototype.normalize = function() {
    const magnitude = this.magnitude;
    return new PIXI.Point(this.x / magnitude, this.y / magnitude);
};

PIXI.Point.prototype.magnitudeFrom = function(otherPoint) {
    return (new PIXI.Point(this.x - otherPoint.x, this.y - otherPoint.y)).magnitude;
};

// Extend the Point class to add a simple magnitude property.
Object.defineProperty(PIXI.Point.prototype, "magnitude", {
    get: function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    },
    set: f => f,
});

// Extend the AbstractRenderer to add width and height with resolution taken into account.
Object.defineProperty(PIXI.AbstractRenderer.prototype, "scaledWidth", {
    get: function scaledWidth() {
        return this.width / this.resolution;
    },
    set: f => f,
});
Object.defineProperty(PIXI.AbstractRenderer.prototype, "scaledHeight", {
    get: function scaledHeight() {
        return this.height / this.resolution;
    },
    set: f => f,
});


/**
 * Given a point you want to constrain, 
 * an anchor to constrain it to,
 * and a distance,
 * will keep the point within distance of anchor.
 * 
 * @param {PIXI.Point} point 
 * @param {PIXI.Point} anchor 
 * @param {Number} distance 
 * @returns {PIXI.Point}
 */
export const constraintDistance = (point, anchor, distance) => {
    if(point === anchor) return point;
    const normalized = (new PIXI.Point(
        point.x - anchor.x,
        point.y - anchor.y,
    )).normalize();

    return new PIXI.Point(
        normalized.x * distance + anchor.x,
        normalized.y * distance + anchor.y,
    );
}