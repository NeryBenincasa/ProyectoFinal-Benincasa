
// Define el arreglo de los productos en el carrito
let cartItems = [];

// Función para agregar productos al carrito
function addItemToCart(item) {
  // Busca si el producto ya está en el carrito
  const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    existingItem.quantity++;
  } else {
    // Si el producto no está en el carrito, agrega el producto con cantidad 1
    cartItems.push({...item, quantity: 1});
  }
  
  // Agrega eventos de click a los botones de suma y resta
  const addButtons = document.querySelectorAll('.add-item');
  const subtractButtons = document.querySelectorAll('.subtract-item');
  
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      const cartItem = cartItems.find(item => item.name === itemName);
      cartItem.quantity++;
      displayCartItems();
    });
  });
  
  subtractButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      const cartItem = cartItems.find(item => item.name === itemName);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      }
      displayCartItems();
    });
  });
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
    
    // Agrega botones para sumar y restar
    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.addEventListener('click', () => {
      addOne(item);
      displayCartItems();
    });
    li.appendChild(addButton);
    
    const removeButton = document.createElement('button');
    removeButton.innerText = '-';
    removeButton.addEventListener('click', () => {
      removeOne(item);
      displayCartItems();
    });
    li.appendChild(removeButton);
    
    // Agrega la cantidad del producto al carrito
    const quantitySpan = document.createElement('span');
    quantitySpan.innerText = item.quantity;
    li.appendChild(quantitySpan);
    
    cartItemsList.appendChild(li);
    
    // Suma el precio del producto al total
    total += item.price * item.quantity;
  });
  
  // Actualiza el precio total
  const cartTotal = document.getElementById('cart-total');
  cartTotal.innerText = total;
}

// Función para agregar una unidad de un producto al carrito
function addOne(item) {
  const index = cartItems.indexOf(item);
  cartItems[index].quantity += 1;
}

// Función para remover una unidad de un producto del carrito
function removeOne(item) {
  const index = cartItems.indexOf(item);
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  } else {
    cartItems.splice(index, 1);
  }
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
    Swal.fire(`Se ha agregado ${itemName} al carrito`)
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
  Swal.fire('Gracias por su compra :)');
});








