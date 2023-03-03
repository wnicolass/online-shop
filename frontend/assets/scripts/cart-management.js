const addToCartBtn = document.querySelector('#product-details button');
const cartBadges = document.querySelectorAll('.nav-items .badge');

async function addToCart() {
  const productId = addToCartBtn.dataset.productid;
  const token = addToCartBtn.dataset.csrftoken;
  let res;
  try {
    res = await fetch('/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': token,
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

  const totalCartQuantity = resData.newTotalItems;
  // eslint-disable-next-line no-return-assign
  cartBadges.forEach((badge) => badge.textContent = totalCartQuantity);
}

if (window.location.href.startsWith('http://localhost:3000/products/')) {
  addToCartBtn.addEventListener('click', addToCart);
}
