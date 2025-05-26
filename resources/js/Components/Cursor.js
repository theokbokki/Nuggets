import { createAnimatable, eases } from 'animejs';
import { getCssValue, hexToRgb } from './Helpers.js';
import CursorOverLink from './CursorOverLink';
import CursorWithCats from './CursorWithCats';

export default class Cursor {
    constructor(el) {
        this.el = el;

        this.getElements();
        this.init();
        this.setEvents();
    }

    init() {
        this.width = getCssValue(this.el, 'width', true);
        this.height = getCssValue(this.el, 'height', true);
        this.radius = getCssValue(this.el, 'border-radius', true);
        this.background = hexToRgb('#292524');

        this.behaviours = [
            new CursorOverLink(this, this.topLink),
            new CursorWithCats(this, this.theooLink),
        ];
        this.activeBehaviour = null;

        this.duration = 75;

        this.cursor = createAnimatable('.cursor', {
            x: this.duration,
            y: this.duration,
            width: this.duration,
            height: this.duration,
            scale: this.duration,
            backgroundColor: this.duration,
            borderRadius: this.duration,
            opacity: 0,
            ease: eases.outQuint,
        });
    }

    getElements() {
        this.topLink = document.querySelector('.footer__link[href="#top"]');
        this.theooLink = document.querySelector('[href="https://theoo.dev"]');
    }

    setEvents() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        for (const behaviour of this.behaviours) {
            if (this.activeBehaviour?.getIsActive(e)) {
                break;
            }

            if (behaviour.getIsActive(e)) {
                this.activeBehaviour = behaviour;
                this.activeBehaviour.onBehaviourStart(e, this.cursor);
                break;
            }

            this.activeBehaviour?.onBehaviourEnd(e, this.cursor);
            this.activeBehaviour = null;
        }

        if (this.activeBehaviour) {
            this.activeBehaviour.whileBehaviour(e, this.cursor);
            return;
        }

        this.cursor
            .x(e.clientX - this.width / 2)
            .y(e.clientY - this.height / 2)
            .width(this.width)
            .height(this.height)
            .scale(1)
            .backgroundColor(this.background)
            .borderRadius(this.radius)
            .opacity(1);
    }
}
