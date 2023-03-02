const cartItemsUpdateForm = document.querySelectorAll('.cart-item-management');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadges = document.querySelectorAll('.nav-items .badge');

async function fetchCartData({ target: form }) {
  const productId = form.dataset.productid;
  const quantity = form.firstElementChild.value;
  try {
    const res = await fetch('/cart/items', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId, quantity,
      }),
    });

    if (!res.ok) {
      alert('Something went wrong');
      return;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    alert('Something went wrong');
  }
}

async function updateCartItem(event) {
  event.preventDefault();
  const resData = await fetchCartData(event);

  const { newTotalQuantity, newTotalPrice, updatedProductPrice } = resData.updatedCartData;
  if (updatedProductPrice === 0) {
    event.target.closest('li').remove();
  } else {
    const cartItemPriceElement = event.target.parentElement.querySelector('.cart-item-price');
    cartItemPriceElement.textContent = updatedProductPrice.toFixed(2);
  }
  cartTotalPrice.textContent = newTotalPrice.toFixed(2);
  cartBadges.forEach((badge) => { badge.textContent = newTotalQuantity; });
}

cartItemsUpdateForm.forEach((form) => form.addEventListener('submit', updateCartItem));
