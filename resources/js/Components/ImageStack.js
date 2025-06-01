import { gsap } from "gsap"
import Flip from "gsap/Flip";

export default class ImageStack {
    constructor (el) {
        this.el = el;

        gsap.registerPlugin(Flip);

        this.getElements();
        this.setEvents();
    }

    getElements() {
        this.images = this.el.querySelectorAll(".image-stack__img");
        this.imagesContainer = this.el.querySelector(".image-stack__images");
        this.nugget = this.el.closest(".nugget");
        this.bg = this.el.querySelector(".image-stack__bg");
    }

    setEvents() {
        this.nugget.addEventListener("click", (e) => {
            const isClickInsideImages = this.imagesContainer.contains(e.target);
            const isClickInsideBg = this.bg.contains(e.target);
            const isOpen = this.el.classList.contains("image-stack--open");

            if (!isOpen && isClickInsideImages) {
                this.open();
            } else if (isOpen && !isClickInsideImages && !isClickInsideBg) {
                this.close();
            }
        });
    }

    open() {
        const state = Flip.getState(this.images, {
            props: "opacity",
        });

        this.el.classList.add("image-stack--open");

        gsap.to(this.bg, {
            width: "256px",
            height: "184px",
            backgroundColor: "rgb(255, 255, 255, .15)",
            boxShadow: "0 4px 16px -8px rgb(0,0,0,0.35)",
            duration: 0.9,
            ease: "elastic.out(1, 0.6)",
        });

        Flip.from(state, {
            absolute: true,
            duration: 0.7,
            ease: "elastic.out(1, 0.6)",
            stagger: 0.02,
            scale: true,
            props: "opacity",
        });
    }

    close() {
        const state = Flip.getState(this.images, {
            props: "opacity, filter",
        });

        this.el.classList.remove("image-stack--open");

        gsap.to(this.bg, {
            width: "0",
            height: "0",
            backgroundColor: "rgb(255, 255, 255, 0)",
            boxShadow: "0 4px 16px -16px rgb(0,0,0,0)",
            duration: 0.7,
            ease: "power3.inOut",
        });

        Flip.from(state, {
            absolute: true,
            duration: 0.5,
            ease: "power3.inOut",
            stagger: 0.02,
            scale: true,
            props: "opacity, filter",
        });
    }
}
