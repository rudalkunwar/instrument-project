
const Order = require('../models/OrderModel');
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

const uploadproduct = async (req, res) => {
    try {
        console.log("Product update initiated");

        const id = req.params.id; // Get product ID from request params
        const {
            product_name,
            title,
            regular_price,
            sales_price,
            stock,
            category,
            visibility,
            description,
            warrenty_year,
            warrenty_month
        } = req.body;
        const user_id = req.user.id;

        // Find product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Handle file upload (image)
        let image;
        if (req.file) {
            if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg') {
                if (req.file.size <= 1 * 1024 * 1024) { // Check if file size is less than 1MB
                    image = req.file.path; // Get the uploaded image path
                } else {
                    return res.status(400).json({ message: "Image size is too large" });
                }
            } else {
                return res.status(400).json({ message: "Unsupported image format" });
            }
        }

        // Update product fields
        product.user = user_id;
        product.product_name = product_name || product.product_name;
        product.title = title || product.title;
        product.price.regular_price = regular_price || product.price.regular_price;
        product.price.sales_price = sales_price || product.price.sales_price;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.visibility = visibility || product.visibility;
        product.description = description || product.description;
        product.warrenty_year = warrenty_year || product.warrenty_year;
        product.warrenty_month = warrenty_month || product.warrenty_month;

        // Update the image only if a new one is uploaded
        product.image = image ? image : product.image;

        // Save the updated product
        await product.save();

        return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: "Server error" });
    }
};


const deleteproduct = async (req, res) => {
    const id = req.params.id;

    try {
        // Find product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if product has been ordered
        const order = await Order.findOne({ 'items.product': id });
        
        if (order) {
            return res.status(400).json({ message: "Product cannot be deleted as it has been ordered" });
        }

        // If not ordered, delete the product
        await Product.findByIdAndDelete(id);

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: "Server error" });
    }
};









module.exports = {
    productuploads, allProduct,fetchproductbyvendor,fetchproductbyid,uploadproduct,deleteproduct
};