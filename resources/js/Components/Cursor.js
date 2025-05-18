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

        this.currentRadius = this.radius;
        this.hoverZoneMargin = 32;
    }

    getElements() {
        this.topLink = document.querySelector('.footer__link[href="#top"]');
    }

    setEvents() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        window.addEventListener('click', this.handleClick.bind(this));
    }

    handleMouseMove(e) {
        // Only transform the cursor when it's over the link
        if (this.isMouseDirectlyOverLink(e)) {
            this.mouseOverLink = true;
        }

        // Only remove the transform when it's outisde of the hover zone
        if (! this.isMouseWithinHoverZone(e)) {
            this.mouseOverLink = false;
        }

        animate(this.el, {
            x: this.getX(e),
            y: this.getY(e),
            scaleX: this.getWidth(),
            scaleY: this.getHeight(),
            background: this.getBackground(),
            duration: this.getDuration(),
            // We need custom radius calculations so it doesn't get distorded
            onUpdate: () => this.el.style.borderRadius = this.getRadius(),
            ease: eases.outQuint,
        });

        this.el.style.opacity = 1;

        animate(this.topLink, {
            x: this.getLinkX(e),
            y: this.getLinkY(e),
            duration: this.getDuration(),
            ease: eases.outQuint,
        });
    }

    handleClick() {
        if (! this.mouseOverLink) {
            return;
        }

        window.location.hash = this.topLink.href;
    }

    getX(e) {
        if (! this.mouseOverLink) {
            return e.clientX - this.width / 2;
        }

        const linkCenter = this.topLinkRect.left + this.topLinkRect.width / 2 - this.width / 2;
        const dist = e.clientX - linkCenter;

        return linkCenter + this.exponentialEase(dist)
    }

    getLinkX(e) {
        if (! this.mouseOverLink) {
            return 0;
        }

        const linkCenter = this.topLinkRect.left + this.topLinkRect.width / 2 - this.width / 2;
        const dist = e.clientX - linkCenter;

        return this.exponentialEase(dist) * 1.5;
    }

    getY(e) {
        if (! this.mouseOverLink) {
            return e.clientY - this.height / 2;
        }

        const linkCenter = this.topLinkRect.top + this.topLinkRect.height / 2 - this.height / 2;
        const dist = e.clientY - linkCenter;

        return linkCenter + this.exponentialEase(dist)
    }

    getLinkY(e) {
        if (! this.mouseOverLink) {
            return 0;
        }

        const linkCenter = this.topLinkRect.top + this.topLinkRect.height / 2 - this.height / 2;
        const dist = e.clientY - linkCenter;

        return this.exponentialEase(dist) * 1.5;
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
        const targetRadius = this.mouseOverLink ? this.topLinkRadius : this.radius;

        const easingSpeed = 0.05;
        this.currentRadius += (targetRadius - this.currentRadius) * easingSpeed;

        const { scaleX, scaleY } = this.getCurrentScale();

        return `${this.currentRadius / scaleX}px / ${this.currentRadius / scaleY}px`;
    }

    getBackground() {
        if (! this.mouseOverLink) {
            return this.background;
        }

        return '#F5F5F4';
    }

    getDuration() {
        if (this.getCssValue(this.el, 'opacity', true)) {
            return 75;
        }

        return 0;
    }

    isMouseDirectlyOverLink(e) {
        return (
            e.clientX >= this.topLinkRect.left &&
            e.clientX <= this.topLinkRect.right &&
            e.clientY >= this.topLinkRect.top &&
            e.clientY <= this.topLinkRect.bottom
        );
    }

    isMouseWithinHoverZone(e) {
        return (
            e.clientX >= this.topLinkRect.left - this.hoverZoneMargin &&
            e.clientX <= this.topLinkRect.right + this.hoverZoneMargin &&
            e.clientY >= this.topLinkRect.top - this.hoverZoneMargin &&
            e.clientY <= this.topLinkRect.bottom + this.hoverZoneMargin
        );
    }

    exponentialEase(distance, factor = 8) {
        return (1 - Math.pow(2, -0.05 * Math.abs(distance))) * Math.sign(distance) * factor;
    }

    getCurrentScale() {
        const matrix = new DOMMatrix(this.getCssValue(this.el, 'transform'));

        return {
            scaleX: matrix.a,
            scaleY: matrix.d
        };
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
