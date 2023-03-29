// Define el arreglo de los productos en el carrito
let cartItems = [];

// Función para agregar productos al carrito
function addItemToCart(item) {
  cartItems.push(item);
}

// Función para mostrar los productos en el carrito
function displayCartItems() {
  const cartItemsList = document.getElementById('cart-items');
  
  // Vacia el contenido del carrito antes de volver a mostrar los productos
  cartItemsList.innerHTML = '';
  
  // Calcula el precio total de los productos en el carrito
  let total = 0;
  
  cartItems.forEach(item => {
    // Agrega cada producto al carrito como un elemento de lista
    const li = document.createElement('li');
    li.innerText = `${item.name} - Precio: $${item.price}`;
    cartItemsList.appendChild(li);
    
    // Suma el precio del producto al total
    total += item.price;
  });
  
  // Actualiza el precio total
  const cartTotal = document.getElementById('cart-total');
  cartTotal.innerText = total;
}

// Selecciona el botón "Agregar al carrito" de cada artículo
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Agrega un evento de click a cada botón "Agregar al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Obtiene el nombre y precio del producto
    const itemName = button.getAttribute('data-name');
    const itemPrice = Number(button.getAttribute('data-price'));
    
    // Crea un objeto para el producto
    const item = {
      name: itemName,
      price: itemPrice
    };
    
    // Agrega el producto al carrito
    addItemToCart(item);
    
    // Muestra un mensaje de confirmación
    alert(`Se ha agregado ${itemName} al carrito`);
  });
});

// Selecciona el botón "Abrir carrito"
const openCartButton = document.getElementById('open-cart');

// Agrega un evento de click al botón "Abrir carrito"
openCartButton.addEventListener('click', () => {
  // Muestra la ventana modal del carrito
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'block';
  
  // Muestra los productos en el carrito
  displayCartItems();
});

// Selecciona el botón "Cerrar" de la ventana modal del carrito
const closeCartButton = document.querySelector('.close');

// Agrega un evento de click al botón "Cerrar"
closeCartButton.addEventListener('click', () => {
  // Oculta la ventana modal del carrito
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
});

// Selecciona el botón "Finalizar compra"
const checkoutButton = document.getElementById('checkout');

// Agrega un evento de click al botón "Finalizar compra"
checkoutButton.addEventListener('click', () => {
  // Vacia el contenido del carrito y muestra un mensaje de confirmación
  cartItems = [];
  displayCartItems();
  alert('¡Gracias por su compra!');
});








