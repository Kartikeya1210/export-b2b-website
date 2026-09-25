// B2B Wholesale theme – minimal JS
document.addEventListener('DOMContentLoaded', function () {
  // Quantity inputs: ensure min/max (B2B: cart updates support high quantities)
  document.querySelectorAll('input[type="number"][name="quantity"], input[type="number"][name^="updates"]').forEach(function (input) {
    input.addEventListener('change', function () {
      var min = parseInt(this.getAttribute('min'), 10);
      var max = parseInt(this.getAttribute('max'), 10) || 999;
      var val = parseInt(this.value, 10);
      if (!isNaN(min) && val < min) this.value = min;
      if (!isNaN(max) && val > max) this.value = max;
    });
  });
});
