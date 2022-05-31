const authRoutes = require('./auth');
const adminRoutes = require('./admin/auth');
const initialDataRoutes = require('./admin/initialData');
const pageRoutes = require('./admin/page');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const tagsRoutes = require('./tags');
const productRoutes = require('./product');
const cartRoutes = require('./cart');
const addressRoutes = require('./address');
const orderRoutes = require('./order');
const adminOrderRoute = require("./admin/order.routes");

module.exports = (app) => {
  //user and admin register and login
  app.use('/api/user', authRoutes);
  app.use('/api/user', adminRoutes);

  //get initial Datas
  app.use('/api/user', initialDataRoutes);

  //Page CRUD
  app.use('/api/page', pageRoutes);

  //category CRUD
  app.use('/api/category', categoryRoutes);

  //brand CRUD
  app.use('/api/brand', brandRoutes);

  //product tags CRUD
  app.use('/api/tags', tagsRoutes);

  //product CRUD
  app.use('/api/product', productRoutes);

  //add to cart
  app.use('/api/user/cart', cartRoutes);

  //user address CRUD
  app.use('/api/user/address', addressRoutes);

  //order Routes
  app.use('/api/user/order', orderRoutes);

  //admin Order Routes
  app.use('/api/admin/order', adminOrderRoute);


  return app;
};