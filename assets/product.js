// Product page functionality (extracted from sections/main-product.liquid)
document.addEventListener('DOMContentLoaded', function() {
  // Plan switcher for bot suite products
  const monthlyOption = document.querySelector('.monthly-option');
  const annualOption = document.querySelector('.annual-option');
  
  if (monthlyOption) {
    monthlyOption.addEventListener('click', function() {
      window.location.href = '/products/trading-bot-suite-49';
    });
  }
  
  if (annualOption) {
    annualOption.addEventListener('click', function() {
      window.location.href = '/products/trading-bot-suite-490-annual';
    });
  }

  // Standard add to cart functionality
  const form = document.getElementById('product-form');
  const addButton = document.getElementById('add-to-cart');
  const btnText = addButton ? addButton.querySelector('.btn-text') : null;
  const messageDiv = document.getElementById('cart-message');
  const isSetupProduct = document.querySelector('.setup-product-page') !== null;

  if (form && addButton && btnText) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      
      // Disable button
      addButton.disabled = true;
      btnText.textContent = 'Adding...';
      
      // Add product to cart
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Item added successfully');
        
        // Success!
        btnText.textContent = '✓ Added!';
        
        // Use orange for setup products, green for others
        if (isSetupProduct) {
          addButton.style.background = 'linear-gradient(135deg, #FFA500, #FF8C00)';
        } else {
          addButton.style.background = 'linear-gradient(135deg, #00ff41, #00dd3a)';
        }
        
        if (messageDiv) {
          messageDiv.textContent = 'Item added to cart successfully!';
          messageDiv.className = 'cart-message success';
          
          // Override success message color for setup products
          if (isSetupProduct) {
            messageDiv.style.background = 'rgba(255, 165, 0, 0.2)';
            messageDiv.style.borderColor = '#FFA500';
            messageDiv.style.color = '#FFA500';
          }
          
          messageDiv.style.display = 'block';
        }
        
        // Redirect to cart
        setTimeout(() => {
          window.location.href = '/cart';
        }, 800);
      })
      .catch(error => {
        console.error('❌ Error:', error);
        
        // Show error
        btnText.textContent = isSetupProduct ? 'Add Setup' : 'Add to Cart';
        addButton.disabled = false;
        
        if (messageDiv) {
          messageDiv.textContent = 'Error adding to cart. Please try again.';
          messageDiv.className = 'cart-message error';
          messageDiv.style.display = 'block';
          
          setTimeout(() => {
            messageDiv.style.display = 'none';
          }, 3000);
        }
      });
    });
  }
});

