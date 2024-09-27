let cart = [];
let total = 0;

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        // Add item to cart
        cart.push({ item: itemName, price: itemPrice });
        total += itemPrice;

        // Update total cart value
        document.getElementById('cart-total').textContent = total.toFixed(2);
        alert(`${itemName} added to cart!`);
        
        // Save cart to localStorage for later retrieval on cart page
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', total);
    });
});

// Cart Page Logic
if (window.location.pathname.endsWith('cart.html')) {
    const cartItemsList = document.getElementById('cart-items');
    const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCartValue = parseFloat(localStorage.getItem('total')) || 0;

    cartFromStorage.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${item.item} - $${item.price} 
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>`;
        cartItemsList.appendChild(li);
    });

    document.getElementById('cart-total').textContent = totalCartValue.toFixed(2);

    // Remove item from cart
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const itemIndex = button.getAttribute('data-index');
            totalCartValue -= cartFromStorage[itemIndex].price;
            cartFromStorage.splice(itemIndex, 1);

            localStorage.setItem('cart', JSON.stringify(cartFromStorage));
            localStorage.setItem('total', totalCartValue);
            
            window.location.reload();
        });
    });
}
