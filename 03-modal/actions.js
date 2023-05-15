const btnDemo = document.querySelector('[data-modal="demo"]');
const modal = document.querySelector('uc-modal');

btnDemo.addEventListener('click', () => {
    modal.open();
});