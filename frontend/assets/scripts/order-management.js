const updateOrderFormElements = document.querySelectorAll(
  '.order-actions form',
);

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newStatus,
      }),
    });
  } catch (error) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  const responseData = await response.json();

  form.closest('article').querySelector('.badge').textContent = responseData.newStatus.toUpperCase();
}

updateOrderFormElements.forEach((formEl) => {
  formEl.addEventListener('submit', updateOrder);
});
