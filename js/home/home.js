const btn_basket = document.querySelector('.btn-basket');

btn_basket.addEventListener('click', () => location_cart());

function location_cart() {
    window.location.href = '../../basket.html';
    console.log('clicked');
}