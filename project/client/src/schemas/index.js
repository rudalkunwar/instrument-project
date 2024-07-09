import * as Yup from 'yup';

export const usersignUpSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(25, "Name cannot exceed 25 characters").required("Please enter your name"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Please enter your phone number"),
    email: Yup.string().email("Invalid email address").required("Please enter your email"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Please enter your password"),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Please confirm your password"),
    date: Yup.date().required("Please enter your date of birth"),
    gender: Yup.string().required("Please select your gender"),
    state: Yup.string().required("Please select your state"),
    district: Yup.string().required("Please select your district"),
    city_area: Yup.string().required("Please enter your city area"),
});
