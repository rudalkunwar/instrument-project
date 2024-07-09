import * as Yup from "yup";

 const Confirmpassvalidate=new Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Please enter your password"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Please confirm your password"),

});

export default Confirmpassvalidate;