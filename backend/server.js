

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Razorpay = require('razorpay')
const app = express();
const PORT = 5000;
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketIo = require('socket.io');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
const server = http.createServer(app);
const io = socketIo(server);
// passport(app)

const URL = "mongodb+srv://visheshj865:Vishesh6609@cluster0.bw0bufi.mongodb.net/filmy-kart?retryWrites=true&w=majority";


mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const categoryRoutes = require('./Routes/categoryRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const couponRouter = require('./Routes/couponRoutes');
const forgotPasswordRoutes = require('./Routes/forgetPassword');
const userRouter = require('./Routes/userRoutes');
const resetPassword = require('./Routes/passwordReset');
const authRoutes = require('./Routes/authRoutes');
const client = twilio('AC4bdfb42cbba91736e223a1cf55538779', 'c2b8afb11b63905ebe348f3c15b2fa08');


const CLIENT_ID = '40785045790-0sit5dgvdc4jpi386bajvajj50q6hnod.apps.googleusercontent.com'; // Replace with your actual client ID
const googleclient = new OAuth2Client(CLIENT_ID);


const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  qty: Number,
  sizes: [String],
  // thumbnail: String, 
  images: [String], // Assuming images are stored as Buffers
  status: String,
  category: String,
  producttype: String,
  movietype: String,
  celebrities: String,
});



const bannerSchema = new mongoose.Schema({
  bannerName: String,
  bannerImage: String,
  bannerStatus: String,
});

const orderSchema = new mongoose.Schema({
  products: [
    {
      productName: String,
      size: [String],
      qty: Number,
      proid: String,
      images: String,
      price: Number
    }
  ],
  userId: String,
  userEmail: String,
  cardHolderName: String,
  cardNumber: String,
  expiry: String,
  cvv: String,
  address1: String,
  address2: String,
  landmark: String,
  state: String,
  city: String,
  pincode: String,
  totalPrice: Number,
  // images: String,
  paymentType: String,
  status: String,
  orderDate: String,
  mobileNumber: String,
});

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userPointsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  // path: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

const UserPoints = mongoose.model('UserPoints', userPointsSchema);

const Admin = mongoose.model('Admin', adminSchema);


const Banner = mongoose.model('Banner', bannerSchema);

const Product = mongoose.model('Product', productSchema);

// const Category = mongoose.model('Category', categorySchema);

const Order = mongoose.model('Order', orderSchema);

const storage = multer.diskStorage({
  destination: 'public/Images',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/api/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email, password });

    if (user) {
      res.sendStatus(200); // Login successful
      // console.log(res.status)
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.sendStatus(500); // Internal server error
  }
});

// app.use(categoryRoutes);
app.use(reviewRouter);
app.use(couponRouter);
app.use(userRouter);
app.use('/api/auth', authRoutes);
// app.use("/auth",authRoutes)

app.post('/api/categories', upload.single('image'), async (req, res) => {
  try {

    const { name } = req.body;
    const image = req.file ? req.file.filename : null;
    const imagePath = image;

    const category = new Category({ name, image, imagePath });
    await category.save();

    res.json({ message: 'Category saved successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/getcategories', async (req, res) => {

  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post('/api/upload', upload.array('images', 5), async (req, res) => {
//   try {
//     const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
//     res.json({ fileUrls });
//   } catch (error) {
//     console.error('Error uploading images:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/api/products', upload.array('images', 4), async (req, res) => {
  try {
    const { name, description, price, qty, sizes, status, category, producttype, movietype, celebrities } = req.body;
    const images = req.files.map(file => file.filename);

    console.log(category)
    const newProduct = new Product({
      name,
      description,
      price,
      qty,
      sizes,
      images,
      category,
      status,
      producttype,
      movietype,
      celebrities,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({
      $and: [
        { status: 'true' },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/products/:searchQuery', async (req, res) => {
//   const { searchQuery } = req.params
//   console.log(searchQuery)

//   try {
//     const products = await Product.find({ $text: { $search: searchQuery, $caseSensitive: false } });
//     res.json(products);
//   } catch (error) {
//     console.error('Error searching for products:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.get('/products/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  console.log(searchQuery);

  try {
    const products = await Product.find({
      $and: [
        { $text: { $search: searchQuery, $caseSensitive: false } },
        { status: 'true' },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// app.get('/api/products/search', async (req, res) => {
//   const { searchQuery } = req.query;
//   console.log(searchQuery);

//   try {
//     // Perform a case-insensitive search for products matching the search query
//     const products = await Product.find({ $text: { $search: search, $caseSensitive: false } });

//     res.json(products);
//   } catch (error) {
//     console.error('Error searching for products:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.get('/api/random-products', async (req, res) => {
  const count = await Product.countDocuments();
  const randomProducts = await Product.aggregate([
    { $sample: { size: 8 } }
  ]);
  res.json(randomProducts);
});


app.get('/api/productsbycategory/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category, status: "true" });
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/productbytype/:producttype', async (req, res) => {
  const { producttype } = req.params;
  try {
    const trendingProducts = await Product.find({ producttype });
    res.json(trendingProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error);
    res.status(500).json({ message: 'Failed to fetch trending products. Please try again later.' });
  }
});
app.get('/api/productsbytype/:moviename', async (req, res) => {
  const { moviename } = req.params;
  console.log(moviename)
  try {
    const trendingProducts = await Product.find({ movietype: moviename });
    res.json(trendingProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error);
    res.status(500).json({ message: 'Failed to fetch trending products. Please try again later.' });
  }
});


app.get('/api/productsbycelebrities/:celebrities', async (req, res) => {
  let { celebrities } = req.params;
  celebrities = celebrities.toLowerCase();
  console.log(celebrities);
  try {
    const products = await Product.find({ celebrities });
    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/singleproductfetch/:id', async (req, res) => {
  const proid = req.params.id;
  try {
    const products = await Product.findById(proid);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/updateproduct/:id', upload.array('newImages', 4), async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    if (req.body.name) existingProduct.name = req.body.name;
    if (req.body.description) existingProduct.description = req.body.description;
    if (req.body.price) existingProduct.price = req.body.price;
    if (req.body.qty) existingProduct.qty = req.body.qty;
    if (req.body.category) existingProduct.category = req.body.category;
    if (req.body.movietype) existingProduct.movietype = req.body.movietype;
    if (req.body.celebrities) existingProduct.celebrities = req.body.celebrities;
    if (req.body.producttype) existingProduct.producttype = req.body.producttype;
    if (req.body.status) existingProduct.status = req.body.status;

    // Update images array with new image filenames
    if (req.files && req.files.length > 0) {
      existingProduct.images = req.files.map((file) => file.filename);
    }

    // Update sizes array
    if (req.body.sizes) existingProduct.sizes = req.body.sizes;

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/uploadbanner', upload.single('bannerImage'), async (req, res) => {
  const { bannerName, bannerStatus } = req.body;
  const bannerImage = req.file.filename; // Multer adds a "file" property to the request
  // console.log(bannerName)
  try {
    const newBanner = new Banner({ bannerName, bannerImage, bannerStatus });
    await newBanner.save();
    res.json({ message: 'Banner uploaded successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/api/getuploadbanner', async (req, res) => {
  try {
    const activeImages = await Banner.find({ bannerStatus: 'active' });
    console.log(activeImages)
    res.json(activeImages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post('/api/categories', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;
    const imagePath = image;
    const category = new Category({ name, image, imagePath });
    await category.save();
    res.json({ message: 'Category saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/getcategories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // Use Mongoose to find and delete the category by ID
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/api/singlefetchcategories/:id', async (req, res) => {
  const catid = req.params.id;
  try {
    const categories = await Category.findById(catid);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/categories/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;


  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = newName;
    await category.save();

    return res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/placeOrder', upload.array('images', 5), async (req, res) => {
  const orderData = req.body
  console.log(orderData)
  try {
    // const {
    //   productId,
    //   productName,
    //   sizes,
    //   quantity,
    //   price,
    //   userId,
    //   userEmail,
    //   cardHolderName,
    //   cardNumber,
    //   expiry,
    //   cvv,
    //   address1,
    //   address2,
    //   landmark,
    //   state,
    //   city,
    //   pincode,
    //   totalBillAmount,
    //   images,
    //   status,
    //   orderDate,
    //   mobilenumber,
    // } = req.body;
    const { userEmail } = req.body
    console.log(userEmail)
    const {mobileNumber}=req.body
    console.log(mobileNumber)

    for (const orderItem of orderData.products) {
      const { qty, proid } = orderItem;

      console.log(qty)
      const product = await Product.findById(proid);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${proid} not found` });
      }

      if (product.qty < qty) {
        return res.status(400).json({ message: `Not enough quantity available for product ${product.name}` });
      }

      product.qty -= qty;
      await product.save();
    }
    // // const images = req.file ? req.file.filename : null;
    // // const imagePath = images;

    // console.log(req.body)
    // const orders = new Order({
    //   productId,
    //   productName,
    //   sizes,
    //   quantity,
    //   price,
    //   userId,
    //   userEmail,
    //   cardHolderName,
    //   cardNumber,
    //   expiry,
    //   cvv,
    //   address1,
    //   address2,
    //   landmark,
    //   state,
    //   city,
    //   pincode,
    //   totalBillAmount,
    //   images,
    //   status,
    //   orderDate,
    //   mobilenumber,
    // });


    const order = new Order(orderData);
    await order.save();

    const productIds = orderData.products.map(product => product.proid);
    const products = await Product.find({ _id: { $in: productIds } });
    await sendEmail(userEmail, order,products);
    await sendTextMessage(mobileNumber, 'Your order has been confirmed! thanks from shopping us ');

    return res.status(200).json({ message: 'Order placed successfully' });

    // await orders.save();



    // res.status(201).json({ message: 'Order placed successfully', orders });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again later.' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'filmykart6609@gmail.com',
      pass: 'tfle ylxb wamt yjnx'
  } 
});
// Function to send email
// async function sendEmail(userEmail, orders) {
//   try {
//     // Check if userEmail is defined and not empty
//     if (!userEmail || userEmail.trim() === '') {
//       throw new Error('No recipient email address provided');
//     }

//     await transporter.sendMail({
//       from: 'filmykart6609@gmail.com',
//       to: userEmail,
//       subject: 'Order Confirmation',
//       html: `
//         <h1>Order Confirmation</h1>
//         <p>Thank you for your order!</p>
//         <div
//         className="max-w-3xl mx-auto p-6 bg-white rounded shadow-sm my-6 invoice mt-[150px]"
//         id="invoice"
//     >
//         <div className="grid grid-cols-2 items-center">
//             <div>
//                 {/*  Company logo  */}
//                 <img
//                     src={Logo}
//                     alt="company-logo"
//                     height={100}
//                     width={100}
//                 />
//             </div>
//             <div className="text-right">
//                 <p>Filmy Kart</p>
//                 <p className="text-gray-500 text-sm">Visheshj865@gmail.com</p>
//                 <p className="text-gray-500 text-sm mt-1">+91 9054353157</p>
//                 <p className="text-gray-500 text-sm mt-1">A 202 Maruti Complex, Surat - 395010</p>
//             </div>
//         </div>
//         {/* Client info */}
//         <div className="grid grid-cols-2 items-center mt-8">
//             <div>
//                 <p className="font-bold text-gray-800">Bill to :</p>
//                 <p className="text-gray-500">
//                     ${orders.fullname}
//                     <br />
//                     ${orders.address1}

//                     ${orders.address12}
//                     <br />
//                     ${orders.city}  -  ${orders.pincode}
//                 </p>
//                 <p className="text-gray-500">${orders.userEmail}</p>
//             </div>
//             <div className="text-right">
//                 <p className="">
//                     Invoice Id:
//                     <span className="text-gray-500">  #${orders._id}</span>
//                 </p>
//                 <p>
//                     Invoice date: <span className="text-gray-500">${orders.orderDate}</span>
//                 </p>
//             </div>
//         </div>
//         {/* Invoice Items */}
//         <div className="-mx-4 mt-8 flow-root sm:mx-0">
//             <table className="min-w-full">
//                 <colgroup>
//                     <col className="w-full sm:w-1/2" />
//                     <col className="sm:w-1/6" />
//                     <col className="sm:w-1/6" />
//                     <col className="sm:w-1/6" />
//                 </colgroup>
//                 <thead className="border-b border-gray-300 text-gray-900">
//                     <tr>
//                         <th
//                             scope="col"
//                             className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
//                         >
//                             Items
//                         </th>
//                         <th
//                             scope="col"
//                             className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
//                         >
//                             Quantity
//                         </th>
//                         <th
//                             scope="col"
//                             className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
//                         >
//                             Price
//                         </th>
//                         <th
//                             scope="col"
//                             className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
//                         >
//                             Amount
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="border-b border-gray-200">
//                         <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
//                             <div className="font-medium text-gray-900">
//                                 ${orders.products.productName}
//                             </div>

//                         </td>
//                         <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
//                             ${orders.quantity}
//                         </td>
//                         <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
//                             ₹ ${orders.price}
//                         </td>
//                         <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
//                             ₹ ${orders.price * orders.quantity}
//                         </td>
//                     </tr>

//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <th
//                             scope="row"
//                             colSpan={3}
//                             className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
//                         >
//                             Subtotal
//                         </th>
//                         <th
//                             scope="row"
//                             className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
//                         >
//                             Subtotal
//                         </th>
//                         <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
//                             ₹ ${orders.price * orders.quantity}
//                         </td>
//                     </tr>
//                     <tr>
//                         <th
//                             scope="row"
//                             colSpan={3}
//                             className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
//                         >
//                             Dilivery Charges
//                         </th>
//                         <th
//                             scope="row"
//                             className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
//                         >
//                             Dilivery Charges
//                         </th>
//                         <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
//                             ₹ 49
//                         </td>
//                     </tr>
//                     <tr>
//                         <th
//                             scope="row"
//                             colSpan={3}
//                             className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
//                         >
//                             Discount
//                         </th>
//                         <th
//                             scope="row"
//                             className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
//                         >
//                             Discount
//                         </th>
//                         <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
//                             - 10%
//                         </td>
//                     </tr>
//                     <tr>
//                         <th
//                             scope="row"
//                             colSpan={3}
//                             className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
//                         >
//                             Total
//                         </th>
//                         <th
//                             scope="row"
//                             className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
//                         >
//                             Total
//                         </th>
//                         <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
//                             ₹ ${orders.price * orders.quantity + 49}
//                         </td>
//                     </tr>
//                 </tfoot>
//             </table>
//         </div>
//         {/*  Footer  */}
//         <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
//             Please pay the invoice before the due date. You can pay the invoice by
//             logging in to your account from our client portal.
//         </div>
//     </div>
//       `,
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// }

async function sendEmail(userEmail, orderData, products) {
  try {
      // Check if userEmail is defined and not empty
      if (!userEmail || userEmail.trim() === '') {
          throw new Error('No recipient email address provided');
      }

      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'filmykart6609@gmail.com',
              pass: 'tfle ylxb wamt yjnx'
          }
      });

      let productRows = '';
      for (const product of products) {
          productRows += `
              <tr>
                  <td>${product.name}</td>
                  <td>${product.description}</td>
                  <td>${product.price}</td>
              </tr>
          `;
      }

      const mailOptions = {
          from: 'filmykart6609@gmail.com',
          to: userEmail,
          subject: 'Order Confirmation',
          html: `
              <h1>Order Confirmation</h1>
              <p>Thank you for your order!</p>
              <table border="1">
                  <thead>
                      <tr>
                          <th>Product Name</th>
                          <th>Description</th>
                          <th>Price</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${productRows}
                  </tbody>
              </table>
              <p>Address: ${orderData.address1}, ${orderData.address2}, ${orderData.landmark}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}</p>
              <p>Status: ${orderData.status}</p>
              <p>Mobile Number: ${orderData.mobileNumber}</p>
              <p>Order Date: ${orderData.orderDate}</p>
          `
      };

      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
}


async function sendTextMessage(recipient, message) {
  try {
      await client.messages.create({
          body: message,
          from: '+12132679152', // Twilio phone number
          to: `+91${recipient}`,
      });
      console.log('SMS sent successfully');
  } catch (error) {
      console.error('Error sending SMS:', error);
  }
}

app.get('/api/orders/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/allorders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.put('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Update the order status in the database
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: { status: status } }
    );

    // Check if order was found and updated
    if (result.nModified === 1) {
      res.status(200).json({ message: 'Order status updated successfully.' });
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/api/singleorderpage/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Order.findById(id);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/singleorderpage/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(status)

  try {
    const product = await Order.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'order not found' });
    }

    product.status = status;
    await product.save();

    return res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.put('/api/orders/:orderId/cancel', async (req, res) => {
//   const { orderId } = req.params;
//   const { productId } = req.body;

//   try {
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found.' });
//     }

//     // Find the index of the product in the products array
//     const productIndex = order.products.findIndex(product => product._id.toString() === productId);

//     if (productIndex === -1) {
//       return res.status(404).json({ message: 'Product not found in the order.' });
//     }

//     // Remove the product from the products array
//     order.products.splice(productIndex, 1);

//     // Update the order in the database
//     const updatedOrder = await order.save();

//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error('Error canceling product:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

app.put('/cancel/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userEmail = req.body.userEmail;
    console.log(userEmail)
    const order = await Order.findOneAndUpdate({ _id: orderId }, { status: 'cancelled' });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    sendCancelEmail(userEmail, orderId);
    res.json(order); // Return the updated order
  
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message }); // Return actual error message
  }
});
const sendCancelEmail = async (email, orderId) => {
  try {
    // Send email
    await transporter.sendMail({
      from: 'filmykart6609@gmail.com', // Sender address
      to: email, // List of recipients
      subject: 'Your Order has been Cancelled', // Subject line
      text: `Dear customer,\n\nYour order with ID ${orderId} has been cancelled.\n\nIf you have any concerns, please contact customer support.\n\nThank you.`, // Plain text body
    });

    console.log('Cancel email sent successfully');
  } catch (error) {
    console.error('Error sending cancel email:', error);
  }
};

// app.get('/api/recentorders', async (req, res) => {
//   try {

//     // Find the last 5 orders, sorted by date in descending order
//     const recentOrders = await Order.find().sort({orderDate:-1}).limit(5);
//     res.json(recentOrders);
//   } catch (error) {
//     console.error('Error fetching recent orders:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/api/savePoints', async (req, res) => {
  const { userId, points } = req.body;
  console.log(userId);
  console.log(points);
  try {
    // Check if user already has points in the database
    let userPoints = await UserPoints.findOne({ userId });

    if (!userPoints) {
      // If user doesn't have points, create a new entry
      userPoints = new UserPoints({
        userId,
        points,
      });
    } else {
      // If user already has points, update the existing entry
      userPoints.points += points;
    }

    // Save the updated points to the database
    await userPoints.save();

    res.status(200).json({ message: 'Points saved successfully' });
  } catch (error) {
    console.error('Error saving points:', error);
    res.status(500).json({ message: 'Failed to save points' });
  }
});

app.get('/api/getAvailablePoints/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user points by userId
    const userPoints = await UserPoints.findOne({ userId });
    if (!userPoints) {
      return res.status(404).json({ error: 'User points not found' });
    }

    // Retrieve available points for the user
    const availablePoints = userPoints.points;

    // Send the available points as response
    return res.status(200).json({ availablePoints });
  } catch (error) {
    console.error('Error retrieving available points:', error);
    return res.status(500).json({ error: 'Failed to retrieve available points' });
  }
});







app.post("/create", async (req, res) => {

  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_CqJpqDEEYWkBsk",
      key_secret: "v4loglERKpp6efajyWVuTcXj",

    });
    const { order_id, amount, payment_capture, currency } = req.body
    console.log(req.body)

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: order_id,
      payment_capture: payment_capture,
    };

    const order = await razorpay.orders.create(options)
    if (!order) return res.status(500).send("something wrong")
    res.status(200).json({ message: "order placed successfully", order })
  }
  catch (err) {
    res.status(500).json({ error: "something went wrong" })
  }


})

app.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    const sign = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex")

    if (razorpay_signature == expectedSign) {
      return res.status(200).json({ message: "Payment Verified Successfully" })
    }
    else {
      return res.status(400).json({ message: "Payment Verification Failed" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" })
  }
})



io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Listen for user messages
  socket.on('userMessage', (data) => {
    console.log('User message:', data);
    // Forward the message to admin
    io.emit('adminMessage', data);
  });

  // Listen for admin replies
  socket.on('adminReply', (data) => {
    console.log('Admin reply:', data);
    // Forward the reply to the user
    io.emit('userReply', data);
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
