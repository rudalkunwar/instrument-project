
import * as Yup from "yup";
    
     const Checkoutvalidate=new Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters").required("Please enter your name"),
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        street: Yup.string().min(3, "Street must be at least 3 characters").required("Please enter your street"),
        city: Yup.string().min(3, "City must be at least 3 characters").required("Please enter your city"),
        state: Yup.string().min(3, "State must be at least 3 characters").required("Please enter your state"),
        postal: Yup.string().min(3, "Postal must be at least 3 characters").required("Please enter your postal"),
     remember: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required')

    });
    export default Checkoutvalidate;
//
