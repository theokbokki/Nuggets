import { getCssValue, isMouseOverZone } from './Helpers.js';
import { gsap } from "gsap"

export default class BackdropCursor {
    constructor(cursor, el) {
        this.cursor = cursor;
        this.el = el;

        this.init();
        this.setEvents();
    }

    init() {
        this.setRect();

        this.radius = getCssValue(this.el, 'border-radius', true);
        this.active = false;
        this.duration = 0.15;
        this.hoverMargin = 32;
    }

    setEvents() {
        window.addEventListener('scroll', this.setRect.bind(this));

        window.addEventListener('resize', this.setRect.bind(this));
    }

    setRect() {
        this.rect = this.el.getBoundingClientRect();
    }

    isActive() {
        // Only transform the cursor when it's over the el
        if (isMouseOverZone(this.cursor.mouse.x, this.cursor.mouse.y, this.rect)) {
            this.active = true;
        }

        // Only remove the transform when it's outisde of the hover zone
        if (! isMouseOverZone(this.cursor.mouse.x, this.cursor.mouse.y, this.rect, this.hoverMargin)) {
            this.active = false;
        }

        return this.active;
    }

    startBehaviour() {}

    whileBehaviour() {
        gsap.to(this.cursor.el, {
            x: this.getX(),
            y: this.getY(),
            width: this.rect.width,
            height: this.rect.height,
            borderRadius: this.radius,
            backgroundColor: "#F5F5F4",
            duration: this.duration,
            ease: "power1.out",
        });

        gsap.to(this.el, {
            x: this.getElX(),
            y: this.getElY(),
            duration: this.duration,
            ease: "power1.out",
        });
    }

    endBehaviour() {
        gsap.to(this.el, {
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "elastic.out",
        });
    }

    getX() {
        const center = this.rect.left + this.rect.width / 2 - this.cursor.width / 2;
        const dist = this.cursor.mouse.x - center;

        return this.rect.left + this.exponentialEase(dist);
    }

    getY() {
        const center = this.rect.top + this.rect.height / 2 - this.cursor.height / 2;
        const dist = this.cursor.mouse.y - center;

        return this.rect.top + this.exponentialEase(dist);
    }

    getElX() {
        const center = this.rect.left + this.rect.width / 2 - this.cursor.width / 2;
        const dist = this.cursor.mouse.x - center;

        return this.exponentialEase(dist) * 1.5;
    }

    getElY() {
        const center = this.rect.top + this.rect.height / 2 - this.cursor.height / 2;
        const dist = this.cursor.mouse.y - center;

        return this.exponentialEase(dist) * 1.5;
    }

    exponentialEase(distance, factor = 8) {
        return (1 - Math.pow(2, -0.05 * Math.abs(distance))) * Math.sign(distance) * factor;
    }
}
