import { getCssValue, isMouseOverZone, hexToRgb } from './Helpers.js';
import { createAnimatable, eases } from 'animejs';

export default class CursorOverLink {
    constructor (cursor, link) {
        this.cursor = cursor;
        this.link = link;

        this.init();
        this.setEvents();
    }

    init() {
        this.isActive = false;

        this.resetLinkRect();
        this.linkRadius = getCssValue(this.link, 'border-radius', true);

        this.duration = 75;

        this.linkAnim = createAnimatable(this.link, {
            x: this.duration,
            y: this.duration,
            ease: eases.outQuint,
        });

        this.hoverZoneMargin = 32;
    }

    setEvents() {
        window.addEventListener('click', this.handleClick.bind(this));

        window.addEventListener('scroll', this.resetLinkRect.bind(this));

        window.addEventListener('resize', this.resetLinkRect.bind(this));
    }


    handleClick() {
        if (! this.isActive) {
            return;
        }

        window.location.hash = new URL(this.link.href).hash;
    }

    resetLinkRect() {
        this.linkRect = this.link.getBoundingClientRect();
    }

    onBehaviourStart(e, cursor) {
        cursor
            .x(this.getX(e))
            .y(this.getY(e))
            .width(this.linkRect.width)
            .height(this.linkRect.height)
            .borderRadius(this.linkRadius)
            .backgroundColor(hexToRgb('#F5F5F4'))

        this.cursor.targetRadius = this.linkRadius;

        this.linkAnim
            .x(this.getLinkX(e), 150)
            .y(this.getLinkY(e), 150)
    }

    onBehaviourEnd(e, cursor) {
        this.linkAnim
            .x(0, 750, eases.outElastic())
            .y(0, 750, eases.outElastic());
    }

    getIsActive(e) {
        // Only transform the cursor when it's over the link
        if (isMouseOverZone(e, this.linkRect)) {
            this.isActive = true;
        }

        // Only remove the transform when it's outisde of the hover zone
        if (! isMouseOverZone(e, this.linkRect, this.hoverZoneMargin)) {
            this.isActive = false;
        }

        return this.isActive;
    }

    getX(e) {
        const linkCenter = this.linkRect.left + this.linkRect.width / 2 - this.cursor.width / 2;
        const dist = e.clientX - linkCenter;

        return this.linkRect.left + this.exponentialEase(dist)
    }

    getY(e) {
        const linkCenter = this.linkRect.top + this.linkRect.height / 2 - this.cursor.height / 2;
        const dist = e.clientY - linkCenter;

        return this.linkRect.top + this.exponentialEase(dist);
    }

    getLinkX(e) {
        const linkCenter = this.linkRect.left + this.linkRect.width / 2 - this.cursor.width / 2;
        const dist = e.clientX - linkCenter;

        return this.exponentialEase(dist) * 1.5;
    }

    getLinkY(e) {
        const linkCenter = this.linkRect.top + this.linkRect.height / 2 - this.cursor.height / 2;
        const dist = e.clientY - linkCenter;

        return this.exponentialEase(dist) * 1.5;
    }

    exponentialEase(distance, factor = 8) {
        return (1 - Math.pow(2, -0.05 * Math.abs(distance))) * Math.sign(distance) * factor;
    }
}
