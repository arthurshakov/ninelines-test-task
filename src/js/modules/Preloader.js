import helpers from '../helpers'

class Preloader {
	constructor() {
		this.body = document.body;
		this.preloader = this.body.querySelector('.preloader');
		this.cookieName = 'ninelines-test-task';
		this.cookieValue = 'you have been here';
		this.cookieDays = 1;
		this.loadedClass = 'is-loaded';

		this.setup();
	}

	setup() {
		// checking if the user has been here before
		if (!helpers.getCookie(this.cookieName)) {
			document.addEventListener("DOMContentLoaded", () => this.setupAnimation());
		} else {
			this.removePreloader();
		}
	}

	removePreloader() {
		const _this = this;

		gsap.to(_this.preloader, {
			autoAlpha: 0,
			duration: .1,
			onComplete: () => {
				_this.body.classList.add('is-loaded');
			}
		})
		
	}
	
	setupAnimation() {
		const _this = this;

		this.container = this.preloader.querySelector('.preloader__container');
		this.image = this.container.querySelector('.preloader__image');
		this.percentage = this.container.querySelector('.preloader__percentage');
		this.background = this.preloader.querySelector('.preloader__background');
		this.images = this.body.querySelectorAll('img');
		const increment = .8 / _this.images.length;
		let imageCounter = 0;
		let currentPercentage = {value: 0};

		this.tl = gsap.timeline({
			onComplete: () => {
				helpers.setCookie(_this.cookieName, _this.cookieValue, _this.cookieDays);
				_this.removePreloader();
			}
		});
		this.tl.pause();
		
		this.tl
			.set(_this.image, {opacity: 0})
			.set(_this.percentage, {opacity: 1})
			.to(_this.image, {
				opacity: 1,
				duration: .3
			})
			.to(_this.image, {
				x: _this.container.offsetWidth + _this.image.offsetWidth,
				y: -_this.container.offsetHeight - _this.image.offsetHeight,
				ease: "slow(0.1, 0.7, false)"
			}, 0)
			.to(_this.background, {
				xPercent: 112,
				duration: .15,
				ease: "power4.inOut"
			}, '-=.1')
			.to(_this.percentage, {
				opacity: 0,
				duration: .15,
				ease: "power4.inOut"
			}, '-=.2');

		function updatePercentage() {
			gsap.to(currentPercentage, {
				value: (imageCounter / _this.images.length * 100).toFixed(),
				duration: .5,
				onUpdate: () => {
					_this.percentage.innerHTML = `${currentPercentage.value}%`;
				}
			})
		}

		checkTheImages();

		function checkTheImages() {
			Array.from(_this.images).forEach((image, index) => {
				if (image.complete) {
					imageCounter++;

					updatePercentage();

					gsap.to(_this.tl, {progress: increment * index, duration: 1});
				} else {
					image.onload = () => {
						imageCounter++;
						
						updatePercentage();

						if (imageCounter === _this.images.length) {
							gsap.to(_this.tl, {progress: 1, duration: 2});
							return;
						}

						gsap.to(_this.tl, {progress: `+=${increment}`, duration: 1});
					}
				}
			})

			if (imageCounter === _this.images.length) {
				gsap.to(_this.tl, {progress: 1, duration: 2});
			}
		}
	}
}

export default Preloader