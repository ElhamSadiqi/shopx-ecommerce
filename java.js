
let lastScrollTop = 0; // Keep track of the last scroll position

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop; // Current scroll position

  // If the user scrolls down, hide the navbar
  if (currentScroll > lastScrollTop) {
    document.querySelector('header').style.top = "-80px"; // Adjust the value based on the height of your navbar
  } else {
    // If the user scrolls up, show the navbar
    document.querySelector('header').style.top = "0"; // Reset the navbar to the top
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update the last scroll position
});

document.getElementById('brand-select').addEventListener('change', function () {
  var selectedBrand = this.value;
  var products = document.querySelectorAll('.image');

  // Identify the initial 4 products (first 4 in the DOM or specific IDs)
  var initialProducts = ['product-1', 'product-2', 'product-3', 'product-4']; // Adjust IDs as per your HTML

  // Define lists of product IDs for each brand
  var brandProductMap = {
      nike: ['nike-1', 'nike-2','nike-3', 'nike-4','nike-5', 'nike-6','nike-7', 'nike-8','nike-9', 'nike-10','nike-11', 'nike-12'], // Replace with actual Nike product IDs
      adidas: ['adidas-1', 'adidas-2','adidas-3', 'adidas-4','adidas-5', 'adidas-6','adidas-7', 'adidas-8','adidas-9', 'adidas-10'], // Replace with actual Adidas product IDs
      puma: ['puma-1', 'puma-2','puma-3', 'puma-4','puma-5', 'puma-6','puma-7', 'puma-8','puma-9'], // Replace with actual Puma product IDs
      reebok: ['reebok-1', 'reebok-2','reebok-3', 'reebok-4','reebok-5', 'reebok-6','reebok-7', 'reebok-8','reebok-9'], // Replace with actual Reebok product IDs
  };

  // Hide all products initially
  products.forEach(function (product) {
      product.style.display = 'none';
  });

  if (selectedBrand === 'all') {
      // Show initial products for "all"
      initialProducts.forEach(function (productId) {
          var product = document.getElementById(productId);
          if (product) {
              product.style.display = 'flex';
          }
      });
  } else {
      // Show only the selected brand's products
      (brandProductMap[selectedBrand] || []).forEach(function (productId) {
          var product = document.getElementById(productId);
          if (product) {
              product.style.display = 'flex';
          }
      });
  }
});

// Attach event listeners for each button
document.getElementById('size-s').onclick = function () {
    filterProducts(['nike-11', 'nike-2','puma-3', 'puma-2','adidas-5', 'adidas-6','adidas-8', 'reebok-8','reebok-6']);
};

document.getElementById('size-m').onclick = function () {
    filterProducts(['adidas-1', 'adidas-2','adidas-3', 'adidas-10','nike-1', 'nike-8','nike-10', 'nike-12','reebok-1', 'puma-4','nike-6','reebok-5', 'puma-6','puma-8']);
};

document.getElementById('size-l').onclick = function () {
    filterProducts(['puma-1', 'puma-5','nike-4','nike-5', 'nike-7','adidas-7', 'adidas-9','reebok-3','reebok-7']);
};

document.getElementById('size-xl').onclick = function () {
    filterProducts(['reebok-2', 'reebok-4','reebok-9', 'nike-3','nike-9', 'puma-7','puma-9', 'adidas-4']);
};

// Function to filter products based on IDs
function filterProducts(showIds) {
    var products = document.querySelectorAll('.image');

    products.forEach(function (product) {
        if (showIds.includes(product.id)) {
            product.style.display = 'flex'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}

// Get all buttons inside the size filter
var sizeButtons = document.querySelectorAll('#size-filter .size-options button');

// Add click event listeners to all size buttons
sizeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        sizeButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        this.classList.add('active');
    });
});



// Initial setup: Show only the first 4 products
document.addEventListener('DOMContentLoaded', function () {
  var products = document.querySelectorAll('.image');
  products.forEach(function (product, index) {
      if (index < 4) {
          product.style.display = 'flex'; // Show the initial 4 products
      } else {
          product.style.display = 'none'; // Hide the rest
      }
  });
});

const minSlider = document.getElementById('min-price');
const maxSlider = document.getElementById('max-price');
const minValue = document.getElementById('price-min');
const maxValue = document.getElementById('price-max');

// Function to update price labels and background
function updatePrices() {
  // Update price labels
  minValue.textContent = `$${minSlider.value}`;
  maxValue.textContent = `$${maxSlider.value}`;

  // Update background colors based on slider values
  const minPercent = (minSlider.value - minSlider.min) / (minSlider.max - minSlider.min) * 100;
  const maxPercent = (maxSlider.value - minSlider.min) / (maxSlider.max - minSlider.min) * 100;

  minSlider.style.background = `linear-gradient(to right, #ffcd3c ${minPercent}%, #ddd ${minPercent}%)`;
  maxSlider.style.background = `linear-gradient(to right, #ffcd3c ${maxPercent}%, #ddd ${maxPercent}%)`;
}

// Event listeners for input
minSlider.addEventListener('input', function () {
  if (parseInt(minSlider.value) > parseInt(maxSlider.value) - 10) {
    minSlider.value = maxSlider.value - 10; // Ensure a gap of 10
  }
  updatePrices();
});

maxSlider.addEventListener('input', function () {
  if (parseInt(maxSlider.value) < parseInt(minSlider.value) + 10) {
    maxSlider.value = parseInt(minSlider.value) + 10; // Ensure a gap of 10
  }
  updatePrices();
});

// Initial price update on page load
updatePrices();
