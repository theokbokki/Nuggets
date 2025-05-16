import.meta.glob([
    '../img/**',
    '../fonts/**',
    '../favicon/**',
]);

import Cursor from './Components/Cursor';

class App {
    constructor(el) {
        this.el = el;

        new Cursor(this.el.querySelector('.cursor'));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new App(document.querySelector('.app'));
})
