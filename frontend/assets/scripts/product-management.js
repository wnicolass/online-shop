const deleteProductBtnElements = document.querySelectorAll('.product-item button');

async function deleteProduct({ target }) {
  const productId = target.dataset.id;
  const token = target.dataset.csrftoken;
  const URL = `/admin/products/${productId}`;

  try {
    const res = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'x-csrf-token': token,
      },
    });

    if (!res.ok) {
      // eslint-disable-next-line no-alert
      return alert('Something went wrong!');
    }

    target.parentElement.parentElement.parentElement.parentElement.remove();
  } catch (err) {
    console.error(err.message);
  }
}

deleteProductBtnElements.forEach((btn) => btn.addEventListener('click', deleteProduct));
