const addToCartBtn = document.querySelector('#product-details button');
const cartBadge = document.querySelector('.nav-items .badge');

async function addToCart() {
  const productId = addToCartBtn.dataset.productid;
  let res;
  try {
    res = await fetch('/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-alert
    return alert('Something went wrong!');
  }

  if (!res.ok) {
    // eslint-disable-next-line no-alert
    return alert('Something went wrong!');
  }

  const resData = await res.json();

  console.log(resData);
  const totalCartQuantity = resData.newTotalItems;
  cartBadge.textContent = totalCartQuantity;
}

if (window.location.href.startsWith('http://localhost:3000/products/')) {
  addToCartBtn.addEventListener('click', addToCart);
}
