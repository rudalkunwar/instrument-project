
const Product = require('../models/ProductModel')



const productuploads = async (req, res) => {

    console.log(req.user);


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
        console.log(user_id);
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
        console.log(userData);
        return res.status(200).json({ products: userData });

    } catch (error) {
        return res.status(400).json("unbale to fetch data");
    }
}





//admin

const fetchProduct = async (req, res) => {
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
    productuploads, allProduct,fetchProduct
};