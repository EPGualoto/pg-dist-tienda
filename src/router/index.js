import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Books from '../views/BooksView.vue';
import Register from '../views/RegisterView.vue';
import DetalleLibro from '../views/BookDetalleView.vue';
import Carrito from '../views/CarritoView.vue';
import OrdenesClientes from '../views/OrdenesClientesView.vue';
import AñadirAutores from '../views/AñadirAutoresView.vue'; 
import AñadirLibros from '../views/AñadirLibrosView.vue'; 
import AñadirClientes from '../views/AñadirClientesView.vue'; 
import BuscarView from '../views/BuscarView.vue'

const routes = [
  { path: '/', redirect: '/libros' },
  { path: '/login', component: Login },
  { path: '/libros', component: Books },
  { path: '/register', component: Register },
  { path: '/libros/:isbn', component: DetalleLibro },
  { path: '/carrito', component: Carrito },
  { path: '/ordenes-clientes', component: OrdenesClientes },
  { path: '/añadir-autores', component: AñadirAutores }, 
  { path: '/añadir-libros', component: AñadirLibros }, 
  { path: '/añadir-clientes', component: AñadirClientes }, 
  { path: '/buscar', component: BuscarView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;