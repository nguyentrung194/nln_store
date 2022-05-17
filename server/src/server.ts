import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProductsRoute from './routes/products.route';
import OrdersRoute from './routes/orders.route';
import CategoriesRoute from './routes/categories.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute(),
  new OrdersRoute(),
  new CategoriesRoute(),
]);

app.listen();
