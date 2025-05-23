const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const routes = require('./routes.json');

// Habilitar CORS
server.use(cors());

// Habilitar body-parser para analizar solicitudes JSON
server.use(bodyParser.json());

// Middleware y rutas predeterminadas
server.use(middlewares);
server.use(jsonServer.rewriter(routes));


// Endpoint para autenticación de usuarios (login)
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email recibido:', email);
  console.log('Password recibido:', password);

  // Buscar usuario por email en la base de datos
  const users = router.db.get('customers').value();
  const user = users.find(u => u.email === email && u.password === password);

  console.log('Usuario encontrado:', user);

  // Verificar si el usuario existe y la contraseña coincide
  if (user) {
    res.json({ message: 'Login exitoso', user });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Endpoint para obtener pedidos por customerId con detalles de producto
server.get('/ordersByCustomer/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const db = router.db;

  // Obtener pedidos y productos
  const orders = db.get('orders').filter({ customerId }).value();
  const products = db.get('products').value();

  // Enriquecer los pedidos con los nombres de productos
  const enrichedOrders = orders.map(order => ({
    ...order,
    cartItems: order.cartItems.map(cartItem => ({
      ...cartItem,
      productName: products.find(product => product.id === cartItem.productId)?.name || 'Producto no encontrado'
    }))
  }));

  res.json(enrichedOrders);
});

server.use(router);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
