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
        this.nugget = this.el.closest(".nugget");
        this.bg = this.el.querySelector(".image-stack__bg");
    }

    setEvents() {
        this.el.addEventListener("click", this.open.bind(this));

        this.nugget.addEventListener("click", (e) => {
            if (!this.el.contains(e.target)) {
                this.close();
            }
        });
    }

    open() {
        const state = Flip.getState(this.images);

        this.el.classList.add("image-stack--clicked");

        gsap.to(this.bg, {
            width: "256px",
            height: "184px",
            backgroundColor: "rgb(0, 0, 0, .15)",
            duration: 0.9,
            ease: "elastic.out(1, 0.6)",
        });

        Flip.from(state, {
            absolute: true,
            duration: 0.7,
            ease: "elastic.out(1, 0.6)",
            stagger: 0.02,
            scale: true,
            props: "backgroundColor",
        });
    }

    close() {
        const state = Flip.getState(this.images);

        this.el.classList.remove("image-stack--clicked");

        gsap.to(this.bg, {
            width: "0",
            height: "0",
            backgroundColor: "rgb(0, 0, 0, 0)",
            duration: 0.7,
            ease: "power2.inOut",
        });

        Flip.from(state, {
            absolute: true,
            duration: 0.5,
            ease: "power2.inOut",
            stagger: 0.02,
            scale: true,
            props: "backgroundColor",
        });
    }
}
