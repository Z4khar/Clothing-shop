const btn = document.querySelector('.btn-order');
const overlay = document.querySelector('.modal-overlay');
const cartBack = document.getElementById('cart-back');
const cartHead = document.getElementById('cart-head');
const closeBtn = document.querySelector('.icon-close');

btn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    cartBack.classList.add('start-animation-back');
    cartHead.classList.add('start-animation-head');
    нн
});

// закрытие модалки
closeBtn.addEventListener('click', () => {
    console.log('clicked');
    overlay.classList.add('hidden');
    cartBack.classList.remove('start-animation-back');
    cartHead.classList.remove('start-animation-head');
});
