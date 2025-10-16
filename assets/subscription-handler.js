// Handles subscription product add to cart
document.addEventListener("DOMContentLoaded", function () {
  const subscriptionForms = document.querySelectorAll(".subscription-form");
  subscriptionForms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "Adding...";
      button.disabled = true;
      try {
        const formData = new FormData(this);
        const data = { items: [{ id: formData.get("id"), quantity: 1 }] };
        const sellingPlan = formData.get("selling_plan");
        if (sellingPlan) { data.items[0].selling_plan = sellingPlan; }
        const response = await fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (response.ok) {
          button.textContent = "✓ Added!";
          button.style.background = "linear-gradient(135deg, #00ff88, #00cc66)";
          setTimeout(() => { window.location.href = "/cart"; }, 800);
        } else {
          throw new Error("Failed to add to cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        button.textContent = "Error - Try Again";
        button.style.background = "linear-gradient(135deg, #ff4444, #cc0000)";
        setTimeout(() => { button.textContent = originalText; button.style.background = ""; button.disabled = false; }, 2000);
      }
    });
  });
});

// Optional helper for custom buttons
window.addSubscriptionToCart = async function (variantId, sellingPlanId = null) {
  const data = { items: [{ id: variantId, quantity: 1 }] };
  if (sellingPlanId) { data.items[0].selling_plan = sellingPlanId; }
  try {
    const response = await fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (response.ok) { window.location.href = "/cart"; } else { throw new Error("Failed to add to cart"); }
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error adding the subscription. Please try again.");
  }
};


