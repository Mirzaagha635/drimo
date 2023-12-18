const div = document.getElementById('productsList')
const btn = document.getElementById('pagi')
let page = 1
let limit = 3
async function getProducts() {
    let skip = (page - 1) * limit;
    try {
        const response = await axios.get(`https://65680fe59927836bd97408d3.mockapi.io/products?page=${page}&limit=${limit}&skip=${skip}`);
        const data = response.data;
        db = data

        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'boxDiv col-xl-4 col-lg-6 col-md-6 col-sm-12';
            box.innerHTML = `
                <img class='imagebox' src="${item.image}" alt="">
                <p class='title'>${item.title}</p>
                <button onclick="addToBasket(${item.id})">Add to basket</button>
            `;
            div.appendChild(box);
        });
        page++;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
btn.addEventListener('click', getProducts)
function addToBasket (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart))
}







window.onload = () => {
    getProducts()
}