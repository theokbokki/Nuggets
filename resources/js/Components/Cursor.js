import { gsap } from "gsap"
import BackdropCursor from './BackdropCursor';
import { getCssValue, hexToRgb } from './Helpers.js';

export default class Cursor {
    constructor(el) {
        this.el = el;

        this.getElements();
        this.init();
        this.setEvents();
        this.animate();
    }

    getElements() {
        this.topLink = document.querySelector('.footer__link[href="#top"]');
        this.theooLink = document.querySelector('[href="https://theoo.dev"]');
    }

    init() {
        this.mouse = {
            x: 0,
            y: 0,
        };

        this.behaviours = [
            new BackdropCursor(this, this.topLink),
            new BackdropCursor(this, this.theooLink),
        ];

        this.currentBehaviour = null;

        this.width = getCssValue(this.el, 'width', true);
        this.height = getCssValue(this.el, 'height', true);
        this.radius = getCssValue(this.el, 'border-radius', true);
        this.backgroundColor = "#292524";
    }

    setEvents() {
        window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        this.mouse = { x: e.clientX, y: e.clientY };
    }

    animate() {
        for (const behaviour of this.behaviours) {
            if (this.currentBehaviour?.isActive()) {
                break;
            }

            if (behaviour.isActive()) {
                this.currentBehaviour = behaviour;
                this.currentBehaviour.startBehaviour();

                break;
            }

            this.currentBehaviour?.endBehaviour();
            this.currentBehaviour = null;
        }

        if (!this.currentBehaviour) {
            gsap.to(this.el, {
                x: this.mouse.x - this.width / 2,
                y: this.mouse.y - this.height / 2,
                opacity: 1,
                width: this.width,
                height: this.height,
                borderRadius: this.radius,
                backgroundColor: this.backgroundColor,
                duration: 0.15,
                ease: "power2.out",
            });
        }

        this.currentBehaviour?.whileBehaviour();

        requestAnimationFrame(() => this.animate());
    }
}
