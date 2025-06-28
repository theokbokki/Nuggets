import { gsap } from "gsap"
import BackdropCursor from './BackdropCursor';
import CursorWithCats from './CursorWithCats';
import { getCssValue, isMouseOverZone } from './Helpers.js';

export default class Cursor {
    constructor(el) {
        this.el = el;

        if (navigator.maxTouchPoints > 1) {
            return;
        }

        this.getElements();
        this.init();
        this.setEvents();
        this.animate();
    }

    getElements() {
        this.topLink = document.querySelector('.footer__link[href="#top"]');
        this.theooLink = document.querySelector('[href="https://theoo.dev"]');
        this.nuggets = document.querySelectorAll('.nugget');
    }

    init() {
        this.mouse = {
            x: 0,
            y: 0,
        };

        this.behaviours = [
            new BackdropCursor(this, this.topLink),
            new CursorWithCats(this, this.theooLink),
        ];

        this.currentBehaviour = null;

        this.hasMoved = false;

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
        this.hasMoved = true;
    }

    animate() {
        this.handleMouseOpacity();

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
            if (this.hasMoved && !this.firstMoveHandled) {
                gsap.set(this.el, {
                    x: this.mouse.x - this.width / 2,
                    y: this.mouse.y - this.height / 2,
                });

                this.firstMoveHandled = true;
            } else if (this.firstMoveHandled) {
                gsap.to(this.el, {
                    x: this.mouse.x - this.width / 2,
                    y: this.mouse.y - this.height / 2,
                    width: this.width,
                    height: this.height,
                    borderRadius: this.radius,
                    backgroundColor: this.backgroundColor,
                    duration: 0.15,
                    ease: "power2.out",
                });
            }
        }

        this.currentBehaviour?.whileBehaviour();

        requestAnimationFrame(() => this.animate());
    }

    handleMouseOpacity() {
        if (!this.hasMoved) {
            return;
        }

        this.nuggets.forEach((nugget) => {
            const bounds = nugget.getBoundingClientRect();

            if (isMouseOverZone(this.mouse.x, this.mouse.y, bounds, -16)) {
                gsap.to(this.el, {
                    opacity: 0,
                    duration: .5,
                    ease: "power3.out",
                });

                document.documentElement.style.cursor = 'unset';
                return;
            }

            gsap.to(this.el, {
                opacity: 1,
                duration: .5,
                ease: "power3.out",
            });

            document.documentElement.style.cursor = 'none';
        });
    }
}
