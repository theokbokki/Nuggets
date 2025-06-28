import { gsap } from "gsap"
import { isMouseOverZone } from './Helpers.js';

export default class CursorWithCats {
    constructor (cursor, el) {
        this.cursor = cursor;
        this.el = el;

        this.getElements();
        this.init();
        this.setEvents();
    }

    init() {
        this.setRect();

        this.active = false;
        this.hoverMargin = 5;
        this.elasticEasing = "elastic.out(1.5, 0.4)";
        this.elasticDuration = .75;
        this.duration = .25;
    }

    getElements() {
        this.cats = this.cursor.el.querySelectorAll('.cursor__cat');
        this.tsuki = this.cats[0];
        this.matcha = this.cats[1];
    }

    setEvents() {
        window.addEventListener('scroll', this.setRect.bind(this));

        window.addEventListener('resize', this.setRect.bind(this));
    }

    setRect() {
        this.rect = this.el.getBoundingClientRect();
    }

    isActive() {
        if (isMouseOverZone(this.cursor.mouse.x, this.cursor.mouse.y, this.rect)) {
            this.active = true;
        }

        if (! isMouseOverZone(this.cursor.mouse.x, this.cursor.mouse.y, this.rect, this.hoverMargin)) {
            this.active = false;
        }

        return this.active;
    }

    startBehaviour() {
        if (this.catAnim) {
            this.catAnim.kill();
        }

        this.cursor.el.style.zIndex = 0;

        gsap.to(this.tsuki, {
            x: this.cursor.width,
            y: this.cursor.width,
            scale: 1.5,
            rotate: 25,
            duration: this.elasticDuration,
            ease: this.elasticEasing,
        });

        gsap.to(this.matcha, {
            x: -this.cursor.width,
            y: -this.cursor.width,
            scale: 1.5,
            rotate: -25,
            duration: this.elasticDuration,
            ease: this.elasticEasing,
        });

        gsap.to(this.cats, {
            opacity: 1,
            duration: 0.075,
            ease: "power1.out",
        });
    }

    whileBehaviour() {
        gsap.to(this.cursor.el, {
            x: this.cursor.mouse.x - this.cursor.width / 2,
            y: this.cursor.mouse.y - this.cursor.height / 2,
            backgroundColor: "#FB4300",
            duration: this.duration,
            ease: "power1.out",
        });

        gsap.to(this.cursor.el, {
            scale: 1.5,
            duration: this.duration,
            ease: "power1.out",
        });
    }

    endBehaviour() {
        gsap.to(this.cursor.el, {
            scale: 1,
            duration: this.duration,
            ease: "power1.out",
        });

        this.catAnim = gsap.to(this.cats, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            rotate: 0,
            duration: this.duration,
            ease: "power1.out",
        });
    }
}
