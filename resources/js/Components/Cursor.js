import { waapi } from 'animejs';

export default class Cursor {
    constructor(el) {
        this.el = el;

        this.init();
        this.setEvents();
    }

    init() {
        this.x = 0;
        this.y = 0;
        this.width = parseInt(window.getComputedStyle(this.el).getPropertyValue('width'));
    }

    setEvents() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        // The element is hidden until the mouse moves so it doesn't show up in the top right corner on page load.
        this.el.style.opacity = 1;

        // dividing the width by two to center the cursor properly.
        this.x = e.clientX - this.width / 2;
        this.y = e.clientY - this.width / 2;

        waapi.animate(this.el, {
            transform: `translate3d(${this.x}px, ${this.y}px, 0)`,
            duration: 0,
        });
    }
}
