class Modal {
	constructor() {
		this.body = document.body;
		this.modals = Array.from(this.body.querySelectorAll('.modal'));
		this.triggers = Array.from(this.body.querySelectorAll('.js-modal-trigger'));

		this.configureModals();
	}

	configureModals() {
		const _this = this;

		this.modals.forEach(
			modal => {
				const closingTriggers = modal.querySelectorAll('.modal__background, .modal__x');
				
				closingTriggers.forEach(trigger => {
					trigger.addEventListener('click', () => {
						modal.classList.remove('is-active');
					})
				})
			}
		);

		this.triggers.forEach(
			trigger => {
				const target = _this.modals.find(modal => modal.dataset.modalName === trigger.dataset.targetModal);

				trigger.addEventListener('click', () => {
					target.classList.add('is-active');
				});
			}
		);
	}

}

export default Modal