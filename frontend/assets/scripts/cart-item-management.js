const cartItemsUpdateForm = document.querySelectorAll('.cart-item-management');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadges = document.querySelectorAll('.nav-items .badge');

async function updateCartItem(event) {
  event.preventDefault();
  const { target: form } = event;
  const productId = form.dataset.productid;
  const quantity = form.firstElementChild.value;
  let res;
  try {
    res = await fetch('/cart/items', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId, quantity,
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('Something went wrong');
    return;
  }

  if (!res.ok) {
    alert('Something went wrong');
    return;
  }

  const resData = await res.json();
  const { newTotalQuantity, newTotalPrice, updatedProductPrice } = resData.updatedCartData;
  if (updatedProductPrice === 0) {
    form.closest('li').remove();
  } else {
    const cartItemPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemPriceElement.textContent = updatedProductPrice.toFixed(2);
  }
  cartTotalPrice.textContent = newTotalPrice.toFixed(2);
  cartBadges.forEach((badge) => { badge.textContent = newTotalQuantity; });
}

cartItemsUpdateForm.forEach((form) => form.addEventListener('submit', updateCartItem));
