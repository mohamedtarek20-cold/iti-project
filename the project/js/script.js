// Functionality for "Add to Cart", "Favorite", and "Remove" buttons
document.addEventListener('DOMContentLoaded', () => {

    const productsContainer = document.querySelector('.products');
    const allProducts = document.querySelectorAll('.products .product');
    const searchForm = document.getElementById('search-form');
    const searchInput = searchForm.querySelector('input[name="search"]');

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsList = document.getElementById('cart-items');

    // تم اختيار أيقونة التواصل باستخدام الـ ID الجديد
    const contactIcon = document.getElementById('contact-icon');
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const cartCountElement = document.querySelector('.icon2 .count');
    const favoriteCountElement = document.querySelector('.icon1 .count');

    let cartItemCount = 0;
    let favoriteItemCount = 0;
    const cart = [];
    const favorites = [];

    // --- Search functionality ---
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = searchForm.querySelector('select').value.toLowerCase();
        
        allProducts.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.dataset.category.toLowerCase();

            const isCategoryMatch = selectedCategory === 'all categories' || productCategory === selectedCategory;
            const isSearchMatch = productName.includes(searchTerm);
            
            if (isCategoryMatch && isSearchMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        filterProducts();
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            allProducts.forEach(product => {
                product.style.display = 'block';
            });
        }
    });

    // --- Contact Icon functionality ---
    contactIcon.addEventListener('click', () => {
        const phoneNumber = "000000000000";
        const address = "0000000000000000";
        alert(`Contact Us\nPhone: ${phoneNumber}\nAddress: ${address}`);
    });

    // --- Add to Cart functionality ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.closest('.product');
            const productName = productDiv.querySelector('h3').textContent;
            
            let productPrice = 0;
            const priceSpan = productDiv.querySelector('.price');
            if (priceSpan) {
                productPrice = parseFloat(priceSpan.dataset.price);
            } else {
                const priceText = productDiv.querySelector('p').textContent;
                productPrice = parseFloat(priceText.match(/\d+/)[0]);
            }

            const newProduct = {
                name: productName,
                price: productPrice
            };
            
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                newProduct.quantity = 1;
                cart.push(newProduct);
            }

            cartItemCount++;
            cartCountElement.textContent = cartItemCount;

            alert(`${productName} added to cart!`);
            console.log("Current Cart:", cart);
        });
    });

    // --- Favorite (Heart Icon) functionality ---
    const favoriteIcons = document.querySelectorAll('.products .fav i');

    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const productDiv = icon.closest('.product');
            const productName = productDiv.querySelector('h3').textContent;
            
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = 'red';
                
                favorites.push(productName);
                favoriteItemCount++;
                favoriteCountElement.textContent = favoriteItemCount;
                
                alert(`${productName} added to favorites!`);
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = 'gray';
                
                const index = favorites.indexOf(productName);
                if (index > -1) {
                    favorites.splice(index, 1);
                }
                favoriteItemCount--;
                favoriteCountElement.textContent = favoriteItemCount;
                
                alert(`${productName} removed from favorites!`);
            }

            console.log("Current Favorites:", favorites);
        });
    });
    
    // --- Remove Button functionality ---
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.closest('.product');
            const productName = productDiv.querySelector('h3').textContent;
            const index = cart.findIndex(product => product.name === productName);
            
            if (index > -1) {
                cart.splice(index, 1);
                cartItemCount--;
                cartCountElement.textContent = cartItemCount;
                alert(`${productName} has been removed from the cart.`);
            } else {
                alert(`${productName} not found in cart.`);
            }
            
            console.log("Current Cart after removal:", cart);
        });
    });

    // --- Cart Modal functionality ---
    cartIcon.addEventListener('click', () => {
        cartItemsList.innerHTML = ''; // Clear previous items
        if (cart.length > 0) {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.name} x${item.quantity}</span> <span>${item.price * item.quantity} L.E</span>`;
                cartItemsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'Your cart is empty.';
            cartItemsList.appendChild(li);
        }
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});