import * as Yup from 'yup';

const ProductSchema = () => {
  return Yup.object().shape({
    product_name: Yup.string().required('Product name is required'),
    title: Yup.string().required('Title is required'),
    regular_price: Yup.number().required('Regular price is required').min(0, 'Regular price must be a positive number'),
    sales_price: Yup.number().required('Sales price is required').min(0, 'Sales price must be a positive number'),
    stock: Yup.number().required('Stock is required').min(0, 'Stock must be a non-negative number'),
    category: Yup.string().required('Category is required'),
    visibility: Yup.string().required('Visibility is required'),
    description: Yup.string().required('Description is required'),
    warranty_year: Yup.number().integer('Warranty year must be a whole number').min(0, 'Warranty year must be non-negative').nullable(),
    warranty_month: Yup.number().integer('Warranty month must be a whole number').min(0, 'Warranty month must be non-negative').nullable(),
    image: Yup.mixed()
            
          
            .required('Image is required')
  });
};

export default ProductSchema;
