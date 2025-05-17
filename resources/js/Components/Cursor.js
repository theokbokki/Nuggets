import { animate, eases } from 'animejs';

export default class Cursor {
    constructor(el) {
        this.el = el;

        this.getElements();
        this.init();
        this.setEvents();
    }

    init() {
        this.mouseOverLink = false;

        this.width = this.getCssValue(this.el, 'width', true);
        this.height = this.getCssValue(this.el, 'height', true);
        this.radius = this.getCssValue(this.el, 'border-radius', true);
        this.background = this.getCssValue(this.el, 'background');

        this.topLinkRect = this.topLink.getBoundingClientRect();
        this.topLinkRadius = this.getCssValue(this.topLink, 'border-radius', true);
    }

    getElements() {
        this.topLink = document.querySelector('.footer__link[href="#top"]');
    }

    setEvents() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        this.topLink.addEventListener('mouseover', this.handleTopLinkOver.bind(this));

        this.topLink.addEventListener('mouseout', this.handleTopLinkOut.bind(this));
    }

    handleMouseMove(e) {
        // The element is hidden until the mouse moves so it doesn't show up in the top right corner on page load.
        this.el.style.opacity = 1;

        animate(this.el, {
            x: this.getX(e),
            y : this.getY(e),
            scaleX: this.getWidth(),
            scaleY: this.getHeight(),
            borderRadius: this.getRadius(),
            background: this.getBackground(),
            duration: 75,
            ease: eases.outQuad,
        });
    }

    handleTopLinkOver() {
        this.mouseOverLink = true;
    }

    handleTopLinkOut() {
        this.mouseOverLink = false;
    }

    getX(e) {
        if (! this.mouseOverLink) {
            return e.clientX - this.width;
        }

        return this.topLinkRect.left + this.topLinkRect.width / 2 - this.width / 2;
    }

    getY(e) {
        if (! this.mouseOverLink) {
            return e.clientY - this.height;
        }

        return this.topLinkRect.top + this.topLinkRect.height / 2 - this.height / 2;
    }

    getWidth() {
        if (! this.mouseOverLink) {
            return 1;
        }

        return this.topLinkRect.width / this.width;
    }

    getHeight() {
        if (! this.mouseOverLink) {
            return 1;
        }

        return this.topLinkRect.height / this.height;
    }

    getRadius() {
        if (! this.mouseOverLink) {
            return `${this.radius}px`;
        }

        const { scaleX, scaleY } = this.getCurrentScale(this.el);

        const correctedHorizontal = this.topLinkRadius / scaleX;
        const correctedVertical = this.topLinkRadius / scaleY;

        return `${correctedHorizontal}px / ${correctedVertical}px`;
    }

    getCurrentScale(el) {
        const style = window.getComputedStyle(el);
        const transform = style.transform;

        if (transform === 'none') {
            return { scaleX: 1, scaleY: 1 };
        }

        const matrix = new DOMMatrix(transform);

        return {
            scaleX: matrix.a,
            scaleY: matrix.d
        };
    }

    getBackground() {
        if (! this.mouseOverLink) {
            return this.background;
        }

        return '#F5F5F4';
    }


    getCssValue(el, property, asInt = false) {
        const style = window.getComputedStyle(el);
        const value = style.getPropertyValue(property);

        if (! asInt) {
            return value;
        }

        return parseInt(value);
    }
}
