

const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserController');
const productController = require('../controllers/ProductController');
const cartController = require('../controllers/CartController');
const profileController = require('../controllers/ProfileController');
const orderplaceController = require('../controllers/OrderController');
const adminbankController = require('../controllers/AdminBankController');
const auth = require('../middleware/auth');
const multer = require('multer');

 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({storage})


router.post('/registerapi', userControllers.register);
router.post('/loginapi',userControllers.login);
router.post('/forgotpasswordapi',userControllers.forgotpassword);
router.post ('/changepasswordapi',userControllers.changepassword);


//product

//vendor
router.post('/productuploadsapi',auth,upload.single('image'),productController.productuploads);
router.get('/fetchproductapi',auth,productController.fetchProduct);



router.get('/allproductapi',productController.allProduct);



//cart

router.post('/addcartapi',auth,cartController.add_cart);
router.get('/fetchcartapi',auth,cartController.fetch_cart);
router.delete('/deletecartapi/:id',auth,cartController.delete_cart);
//deleteandadd cart quantity
router.put('/increasequantity/:id',auth,cartController.increasequantity);
router.put('/decreasequantity/:id',auth,cartController.decreasequantity);

//profile
router.post('/profileapi',auth,profileController.profile);
router.post('/addesewaapi',auth,profileController.addesewa);
router.put('/updateesewaapi',auth,profileController.updateesewa);

//orderplace
router.post('/orderplaceapi',auth,orderplaceController.orderplace);
router.get('/fetchorderapi',auth,orderplaceController.fetchorder);
router.get('/esewapaymentverifyapi',orderplaceController.EsewaPaymentVerify);
router.delete('/deleteorderapi/:id',auth,orderplaceController.deleteorder);


//adminbank
router.post('/addbankapi',adminbankController.addbank);





module.exports = router;
