class Menu {
	constructor() {
		this.body = document.body;
		this.burger = this.body.querySelector('.burger');
		this.links = this.body.querySelectorAll('.menu__link');
		this.staggerItems = this.body.querySelectorAll('.menu__stagger-item');
		this.hourglass = this.body.querySelector('.menu__hourglass');
		this.state = 'closed';
		this.inAction = false;

    this.setupTl();
		this.events();
	}

	events() {
		const _this = this;

		this.burger.addEventListener('click', () => this.toggleMenu());

		window.onresize = event => this.update();

		this.links.forEach(link => {			
			link.addEventListener('click', event => {
				event.preventDefault();
				_this.close();
			})
		});
	}

	setupTl(){
    let _this = this;
    // gsap.set(_this.staggerItems, {x: '-1em', autoAlpha: 0});

		this.tl = gsap.timeline({ defaults: {duration: .5, ease: 'power1.easeInOut'} });
    this.tl.pause();

    this.tl
      .add(() => {
        if (_this.tl.reversed()){
          _this.inAction = false;
        }
      })
			.set(_this.staggerItems, {x: '-2em', autoAlpha: 0})
			.set(_this.hourglass, {y: '1em', autoAlpha: 0})
      // .to(_this.menu, .05, {autoAlpha: 1})
      // .to(_this.bg, .4, {x: 0}, 0)
      .to(_this.staggerItems, {x: 0, duration: .25, autoAlpha: 1, stagger: .1}, .3)
      .to(_this.hourglass, {y: 0, duration: .25, autoAlpha: 1}, '-=.2')
      .add(() => {
        if (!_this.tl.reversed()){
          _this.inAction = false;
        }
      });
  }

	toggleMenu() {
		if (!this.inAction) {
			this.inAction = true;

			if (this.state === 'closed') {
				this.state = 'open';
				this.body.classList.add('has-active-menu');
				this.tl.play();
			} else {
				this.state = 'closed';
				this.body.classList.remove('has-active-menu');
				this.tl.reverse();
			}
		}
	}

	close() {
    if (!this.inAction && this.state === 'open'){
      this.inAction = true;
      
			this.state = 'closed';
      this.body.classList.remove('has-active-menu');
      this.tl.reverse();
    }
  }

	update() {
		this.inAction = false
		this.state = 'closed'
		this.body.classList.remove('has-active-menu');
		this.tl.revert();
		this.setupTl();
	}
}

export default Menu