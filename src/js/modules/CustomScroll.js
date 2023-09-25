class CustomScroll {
	constructor() {
		const _this = this;
		this.body = document.body;
		this.scrollLinks = this.body.querySelectorAll('.js-scroll-link');
		this.menuItems = this.body.querySelectorAll('.menu__item');
		this.menuLinks = this.body.querySelectorAll('.menu__link');
		this.menuAnchors = [];
		this.isScrolling = false;
		this.locomotiveScroll = new LocomotiveScroll({
			el: _this.body.querySelector('[data-scroll-container]'),
			smooth: true,
			resetNativeScroll: false,
			reloadOnContextChange: true,
			smartphone: {
				smooth: true
			},
			tablet: {
					smooth: true
			}
		});

		this.events();
	}

	events() {
		const _this = this;

		this.scrollLinks.forEach(link => {
			const href = link.getAttribute('href');
			let target;
		
			if (!href) {
				target = link.dataset.scrollTarget;
			} else {
				target = document.getElementById(href.replace(/^#/, ''));
			}
			
			link.addEventListener('click', event => {
				event.preventDefault();

				this.scrollTo(target, href);
			})
		});

		this.menuLinks.forEach((link, index) => {
			const href = link.getAttribute('href').replace(/^#/, '');
			this.menuAnchors.push(href);
		
			link.addEventListener('click', event => {
				event.preventDefault();

				if (!!href) {
					this.scrollToMenuSection(index);
				}
			})
		});

		this.locomotiveScroll.on('scroll', data => this.doOnScroll(data));

		// window.onresize = event => this.locomotiveScroll.update();
	}

	scrollTo(target, href) {
		this.locomotiveScroll.scrollTo(target);
		
		if (!!href) {
			history.pushState(null, null, href);
		}
	}

	scrollToMenuSection(index) {
		const _this = this;
		const anchor = _this.menuAnchors[index];

		this.isScrolling = true;
		this.setActiveMenuItem(index);
		history.pushState(null, null, `#${anchor}`);
		this.locomotiveScroll.scrollTo(document.getElementById(anchor), {
			offset: -20,
			callback: () => {
				_this.isScrolling = false;
			}
		});
	}

	setActiveMenuItem(index) {
		this.menuItems.forEach(el => el.classList.remove('is-active'));
		this.menuItems[index].classList.add('is-active');
	}

	doOnScroll(data) {
		const _this = this;

		// If scrolling is not triggered by clicking on a menu item
		if (!this.isScrolling) {
			this.menuAnchors.forEach((anchor, index) => {
				if (data.currentElements.hasOwnProperty(anchor) && data.currentElements[anchor].inView) {
					this.setActiveMenuItem(index);
					return;
				}
			});
		}
	
		// adding 'at-the-top' class to the body when the scroll is at the top
		data.scroll.y <= 100 ?
			this.body.classList.remove('not-at-the-top') :
			this.body.classList.add('not-at-the-top');
		
			// adding 'reached-the-bottom' class to the body when the scroll has reached the bottom
		data.scroll.y >= data.limit.y - 10 ?
			this.body.classList.add('reached-the-bottom') :
			this.body.classList.remove('reached-the-bottom');
	}
}

export default CustomScroll
