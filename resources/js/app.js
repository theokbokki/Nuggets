import.meta.glob([
    '../img/**',
    '../fonts/**',
    '../favicon/**',
]);

import Cursor from './Components/Cursor';
import ImageStack from './Components/ImageStack';

class App {
    constructor(el) {
        this.el = el;

        new Cursor(this.el.querySelector('.cursor'));

        new ImageStack(this.el.querySelector('.image-stack'));
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new App(document.querySelector('.app'));
})
