import { isMouseOverZone, hexToRgb } from './Helpers.js';
import { createAnimatable, eases, createSpring } from 'animejs';

export default class CursorWithCats {
    constructor (cursor, target) {
        this.cursor = cursor;
        this.target = target;

        this.getElements();
        this.init();
        this.setEvents();
    }

    init() {
        this.isActive = false;
        this.resetTargetRect();
        this.duration = 150;

        this.tsuki = createAnimatable(this.cats[0], {
            x: this.duration,
            y: this.duration,
            scale: this.duration,
            rotate: this.duration,
            opacity: this.duration,
            ease: createSpring({ stiffness: 150, damping: 8 }),
        });

        this.matcha = createAnimatable(this.cats[1], {
            x: this.duration,
            y: this.duration,
            scale: this.duration,
            rotate: this.duration,
            opacity: this.duration,
            ease: createSpring({ stiffness: 150, damping: 8 }),
        });
    }

    getElements() {
        this.cats = this.cursor.el.querySelectorAll('.cursor__cat');
    }

    setEvents() {
        window.addEventListener('click', this.handleClick.bind(this));

        window.addEventListener('scroll', this.resetTargetRect.bind(this));

        window.addEventListener('resize', this.resetTargetRect.bind(this));
    }

    handleClick() {
        if (! this.isActive || ! this.target.href) {
            return;
        }

        window.location = new URL(this.target.href);
    }

    resetTargetRect() {
        this.targetRect = this.target.getBoundingClientRect();
    }

    onBehaviourStart(e, cursor) {
        this.target.style.zIndex = 0;

        this.tsuki
            .x(this.cursor.width)
            .y(this.cursor.width)
            .scale(1.5)
            .rotate(25)
            .opacity(1, this.duration, eases.outQuint);

        this.matcha
            .x(-this.cursor.width)
            .y(-this.cursor.width)
            .scale(1.5)
            .rotate(-25)
            .opacity(1, this.duration, eases.outQuint);
    }

    whileBehaviour(e, cursor) {
        cursor
            .backgroundColor(hexToRgb('#FB4300'))
            .scale(1.5, 250)
            .x(e.clientX - this.cursor.width / 2)
            .y(e.clientY - this.cursor.height / 2)
    }

    onBehaviourEnd(e, cursor) {
        this.tsuki
            .x(0)
            .y(0)
            .scale(0)
            .rotate(0)
            .opacity(0);

        this.matcha
            .x(0)
            .y(0)
            .scale(0)
            .rotate(0)
            .opacity(0);
    }

    getIsActive(e) {
        if (isMouseOverZone(e, this.targetRect)) {
            this.isActive = true;
        }

        if (! isMouseOverZone(e, this.targetRect, 5)) {
            this.isActive = false;
        }

        return this.isActive;
    }
}
