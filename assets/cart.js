// Cart page functionality (extracted from sections/main-cart.liquid)
document.addEventListener('DOMContentLoaded', function() {
  const toast = document.getElementById('cart-toast');

  function showToast(message, isError = false) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('error');
    if (isError) {
      toast.classList.add('error');
    }
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Remove item from cart
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const line = this.dataset.line;
      
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, quantity: 0 })
      })
      .then(response => response.json())
      .then(data => {
        showToast('Item removed from cart');
        setTimeout(() => location.reload(), 500);
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('Error removing item', true);
      });
    });
  });

  // Validate TradingView username before checkout
  window.validateAndCheckout = function() {
    const tradingViewInput = document.getElementById('cart-note');
    const username = tradingViewInput ? tradingViewInput.value.trim() : '';
    
    if (!username) {
      showToast('Please enter your TradingView username', true);
      if (tradingViewInput) tradingViewInput.focus();
      return;
    }
    
    // Save the note to cart
    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: username })
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/checkout';
    })
    .catch(error => {
      console.error('Error:', error);
      showToast('Error saving username', true);
    });
  }
});

