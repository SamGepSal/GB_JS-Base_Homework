const basketButtonEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
const basketCounterEl = document.querySelector('.cartIconWrap span');
const totalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal')

basketButtonEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden')
})

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    if (!event.target.closest('.addToCart')){
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price)
})

function addToCart (id, name, price) {
    if (!(id in basket)){
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
         }
    } basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount();
    totalValueEl.textContent = getTotalBasketPrice().toFixed(2)
    renderProducts(id);
}



function getTotalBasketCount() {
    const productsArray = Object.values(basket);
    let count = 0;
    for (product of productsArray) {
        count += product.count; 
    } return count;
}

function getTotalBasketPrice() {
    const productsArray = Object.values(basket);
    let price = 0;
    for (product of productsArray) {
        price += product.count * product.price;
    } return price;
}

function renderProducts(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId = "${id}"]`);
    if(!basketRowEl) {
        renderNewProducts(id);
        return;
    } 
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow').textContent = basket[id].price * basket[id].count;
}

function renderNewProducts(productId) {
    const productRow = `
    <div class = "basketRow" data-productId = "${productId}">
    <div> ${basket[productId].name}</div>
    <div>
    <span class = "productCount">${basket[productId].count}</span> шт.</div>
    <div>$${basket[productId].price}</div>
    <div> 
    $<span class = "productTotalRow">${(basket[productId].price * basket[productId].count)}</span> </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow)
}