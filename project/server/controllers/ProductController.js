
const Product = require('../models/ProductModel')



const productuploads = async (req, res) => {


    if (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg') {
        if (req.file.size <= 1 * 1024 * 1024) {
            var image = req.file.path;
        }
        else {
            return res.status(400).json({ message: "Too large size image" })
        }

    }
    else {
        return res.status(400).json({ message: "unsupported format" });
    }

    if (req.body) {
        const { product_name, title, regular_price, sales_price, stock, category, visibility, description } = req.body;
        const { warrenty_year, warrenty_month } = req.body;
        const user_id = req.user.id;
        const newProduct = new Product({
            user: user_id,
            product_name,
            title,
            price:
            {
                regular_price,
                sales_price

            },
            stock,
            category,
            visibility,
            description,
            warrenty:
            {
                warrenty_year,
                warrenty_month
            },
            image
        });

        await newProduct.save();

        return res.status(200).json({status:"success" ,message: "Successfully add product" });
    }

}

const allProduct = async (req, res) => {

    
    try {
        const userData = await Product.find();
        return res.status(200).json({ products: userData });

    } catch (error) {
        return res.status(400).json("unbale to fetch data");
    }
}

//fetch product by user id
const fetchproductbyid= async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    try {
        const productdata = await Product.findById(id);
        console.log(productdata);
        return res.status(200).json({ products: productdata });
    } catch (error) {
        return res.status(400).json("unbale to fetch data");
    }
}







//vendor

const fetchproductbyvendor = async (req, res) => {
    const user=req.user.id;
   
      try{
        const userData = await Product.find({user:user}).populate('user');
        return res.status(200).json({ products: userData });
      }
        catch(error){
            return res.status(400).json("unbale to fetch data");
        }
}








module.exports = {
    productuploads, allProduct,fetchproductbyvendor,fetchproductbyid
};