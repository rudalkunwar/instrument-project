import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../api/api'
import { toast, ToastContainer } from 'react-toastify';


export default function GlobalProfile() {
    const [esewa, setEsewa] = useState(null);
    const [profile, setProfile] = useState({});
    const [isClick, setIsClick] = useState(false);
    const sessionData = useSelector(state => state.authenticate);
    const userType = sessionData.userInfo.usertype;
    const email = sessionData.userInfo.email;

    const ClickHandler = () => {
        setIsClick(!isClick);
    }


    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const profileimage = document.getElementsByName('profileimage')[0].files[0];

        if (!profileimage) {
            console.error('No file selected.');
            return;
        }

        // Create a new FormData object and append the file
        const formData = new FormData();
        formData.append('profileimage', profileimage);



        try {
            const response = await axios.post('/vendorprofileapiimage', formData, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data' // Set content type for file upload
                }
            });
            console.log(response.data);
            setIsClick(!isClick);
            toast.success(response.data.message);
            // Update profile picture if needed
        } catch (err) {
            console.log(err);
        }
    };

    const passwordChangeHandler = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const oldpassword = e.target.oldpassword.value;
        const newpassword = e.target.newpassword.value;
        const confirmpassword = e.target.confirmpassword.value;

        if (newpassword !== confirmpassword) {
            toast.error('Passwords do not match.');
            return;
        }

        if (newpassword.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await axios.post('/vendorpasswordchangeapi', {
                oldpassword,
                newpassword
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log(response.data);
            toast.success(response.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    const getProfile = async () => {
        try {
            const response = await axios.post('/profileapi', { email: email, usertype: userType }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log(response);
            setProfile(response.data);




        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    useEffect(() => {


        getProfile();

    }, [userType, email, esewa, isClick]);


    const { vendor } = profile;


    if (!vendor) {
        return <div>Loading...</div>;
    }





    const changeesewaid = async (data) => {
        console.log(data + "this is esewa foar change");

        try {
            const response = await axios.post('/updateesewaapi', { email: email, usertype: userType, esewaid: data }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log(response);

            setEsewa('')
            alert(`Esewa ${response.data.vendor.esewaid} Id changed successfully`)
        } catch (error) {
            console.error('Error changing password:', error);
        }
    }

    const esewaidchangevalidator = (e) => {
        e.preventDefault()
        const esewaid = e.target[0].value;
        console.log(esewaid + "yo data ligeko");



        if (esewaid.length < 10) {
            alert('Esewa Id should be 10 digit');
            return;


        }

        else if (isNaN(esewaid)) {
            alert('Esewa Id should be number');
            return;

        }

        else {

            setEsewa(esewaid);

            changeesewaid(esewaid);

        }



    }


    const esewaposter = async (esewa) => {
        console.log(esewa);


        try {

            const response = await axios.post('/addesewaapi', { email: email, esewaid: esewa, usertype: userType }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log(response);

            setEsewa('')


        } catch (error) {
            console.error('Error updating esewa id:', error);
        }

    }

    const esewaidpost = (e) => {
        e.preventDefault()
        const esewaid = e.target[0].value;



        if (esewaid.length < 10) {
            alert('Esewa Id should be 10 digit');
            return;


        }

        else if (isNaN(esewaid)) {
            alert('Esewa Id should be number');
            return;

        }

        else {


            setEsewa(esewaid);
            esewaposter(esewa);
        }



    }



    const databaseImage = null;


    return (
        <div>
            <ToastContainer />
            <div>



                <div class="bg-gray-300">

                    <div class="">
                        <div className="w-48 flex items-center justify-center m-auto border-gray-700 border-4 rounded-full h-48">
                            <img className="w-full h-full rounded-full p-1" src={`http://localhost:5000/${profile.vendor.profileimage}`} alt="" />
                        </div>
                        <div>
                            <h2 class="font-bold text-2xl text-gray-700 text-center my-2">{profile.vendor.name}</h2>
                        </div>

                        {isClick ? (
                            <div className="w-9/12 my-5 m-auto text-center">
                                <form onSubmit={submitHandler} encType="multipart/form-data">
                                    <input type="file" name="profileimage" className="text-white bg-purple-700 mx-4 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" />
                                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                                        Upload Photo
                                    </button>
                                </form>
                                <button type="button" onClick={ClickHandler} className="text-gray-700 bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 mx-4 text-center mb-2">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="w-9/12 my-5 m-auto text-center">
                                {
                                    profile.profileimage === null ? (
                                        <button type="button" onClick={ClickHandler} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                            Add Photo
                                        </button>
                                    ) : (
                                        <button type="button" onClick={ClickHandler} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                            Change Photo
                                        </button>
                                    )
                                }
                            </div>
                        )}

                    </div>

                    <div>
                        <div class="font-bold text-white text-gray-800 bg-gray-800  w-9/12 m-auto my-7 py-1 px-2 rounded">Vendor Info</div>


                        <div class="grid grid-cols-2 gap-4  w-9/12 m-auto">
                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800">Email:</div>
                                <input type="text" class="font-semibold text-gray-700 w-full text-end bg-transparent outline-none" value={profile.vendor.email} readonly />
                            </div>

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800">Phone:</div>
                                <input type="text" class="font-semibold text-gray-700 w-full text-end bg-transparent outline-none" value={profile.vendor.phone} readonly />
                            </div>

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800 w-4/12">PAN Number:</div>
                                <input type="text" class="font-semibold text-gray-700 w-full text-end bg-transparent outline-none" value={profile.vendor.panno} readonly />
                            </div>

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800">Address:</div>
                                <input type="text" class="font-semibold text-gray-700 w-full text-end bg-transparent outline-none" value={`${profile.vendor.address.state},${profile.vendor.address.district}`} readonly />
                            </div>

                        </div>

                        {/* <div class=" w-9/12 my-5 m-auto text-center"><button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit</button></div> */}

                        <div class="font-bold text-white text-gray-800 bg-gray-800  w-9/12 m-auto my-7 py-1 px-2 rounded">Payment Details</div>

                    </div>

                    {
                        profile.vendor.esewaid == null || undefined ? (
                            null
                        ) : (
                            <div class="flex   w-9/12 m-auto rounded-xl p-2">
                                <div class="font-bold text-gray-800 w-2/12">Esewa Id:</div>
                                <input
                                    type="text"
                                    value={profile.vendor.esewaid}
                                    onChange={(e) => { setEsewa(e.target.value) }}
                                    readOnly className="font-semibold text-gray-700 ml-5 w-full text-end bg-transparent outline-none"
                                />

                            </div>
                        )
                    }

                    {profile.vendor.esewaid == null ? (

                        <form onSubmit={esewaidpost}>
                            <div class="flex  bg-gray-200 w-9/12 m-auto rounded-xl p-2">
                                <div class="font-bold text-gray-800 w-2/12"> Add Esewa Id:</div>
                                <input
                                    type="text"
                                    value={esewa}
                                    onChange={(e) => { setEsewa(e.target.value) }}
                                    className="font-semibold text-gray-700 ml-5 w-full text-end bg-transparent outline-none"
                                />

                            </div>
                            <div class=" w-9/12 my-5 m-auto text-end"><button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Add Esewa Id</button></div>

                        </form>
                    ) :
                        (
                            <form onSubmit={esewaidchangevalidator}>
                                <div class="flex  bg-gray-200 w-9/12 m-auto rounded-xl p-2">
                                    <div class="font-bold text-gray-800 w-2/12">Change Esewa Id:</div>
                                    <input type="text" value={esewa} onChange={(e) => { setEsewa(e.value) }} class="font-semibold text-gray-700 ml-5 w-full text-end bg-transparent outline-none" />
                                </div>
                                <div class=" w-9/12 my-5 m-auto text-end"><button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Change Esewa Id</button></div>

                            </form>
                        )}
                    <div class="font-bold text-white text-gray-800 bg-gray-800  w-9/12 m-auto my-7 py-1 px-2 rounded">Change Password</div>
                    <form onSubmit={passwordChangeHandler}>
                        <div class="grid grid-cols-3 gap-4  w-9/12 m-auto">

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800 w-6/12">Old Password:</div>
                                <input type="text" name="oldpassword" class="font-semibold text-gray-700 w-full text-end  outline-none" />
                            </div>

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2">
                                <div class="font-bold text-gray-800 w-6/12">New Password:</div>
                                <input type="text" name="newpassword" class="font-semibold text-gray-700 w-full text-end  outline-none" />
                            </div>

                            <div class="flex  justify-between bg-gray-200  rounded-xl p-2 ">
                                <div class="font-bold text-gray-800 w-11/12">Confirm Password:</div>
                                <input type="text" name="confirmpassword" class="font-semibold text-gray-700 w-full text-end  outline-none" />
                            </div>
                            <div class=""><button type="submit" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Change Password</button></div>





                        </div>
                    </form>


                </div>



            </div>

        </div>
    )
}
