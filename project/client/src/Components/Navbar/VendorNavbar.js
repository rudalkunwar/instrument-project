import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from '../state/action/SessionData';
import { useDispatch, useSelector } from 'react-redux';


const VendorNavbar = () => {
    const dispatchh = useDispatch();
    const navigate = useNavigate();
    const element = useRef(null);

    const smoothTransition = (element, width, duration) => {
        const initialWidth = element.style.width || "auto";
        element.style.transition = `width ${duration}ms ease-in-out`;
        element.style.width = width;
        setTimeout(() => {

        }, duration);
    };

    const logouthandler=()=>{
        sessionStorage.removeItem('reduxState');
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            sessionStorage.removeItem(key);
          }

          for (let i = 0; i < localStorage.length; i++) {
            const keyy = localStorage.key(i);
            localStorage.removeItem(keyy);
          }
        dispatchh(userLogout());
        navigate('/')

        
        

    }

    const sessiondata = useSelector(state => state.authenticate);
    let slug = ""; 
    const name = sessiondata.userInfo.name;
 
    if (name != null) {
        
        slug = name.replace(" ", "-");
    }



    return (
        <div

        >
            <div class="">
                <ul className=" w-14 bg-slate-900  h-screen py-10 overflow-hidden  z-10 fixed"
                    onMouseOver={() => smoothTransition(element.current, '360px', 300)}
                    onMouseOut={() => smoothTransition(element.current, '50px', 300)}
                    onFocus={() => smoothTransition(element.current, '360px', 300)}
                    onBlur={() => smoothTransition(element.current, '50px', 300)}
                    onClick={() => smoothTransition(element.current, '50px', 50)}
                    ref={element}>
                    <li>
                        <Link to={`/vendors/${slug}`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="person-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Dashboard
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to={`/vendors/${slug}/addproduct`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                AddProduct
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to={`/vendors/${slug}/product`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="cube-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Product
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to={`/vendors/${slug}/order`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="archive-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Orders
                            </div>

                        </Link>
                    </li> <li>
                        <Link to={`/vendors/${slug}/addproduct`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="person-outline"></ion-icon>
                            </div>
                            <div class="cash-pointer w-full"  >
                                Payments
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to={`/vendors/${slug}/addproduct`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="person-outline"></ion-icon>
                            </div>
                            <div class="chatbubbles-pointer w-full"  >
                                Message
                            </div>

                        </Link>
                    </li>

                    <li>
                        <Link to={`/vendors/${slug}/addproduct`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="notifications-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Notification
                            </div>

                        </Link>
                    </li>


                    <li>
                        <Link to={`/vendors/${slug}/profile`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="person-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Profile
                            </div>

                        </Link>
                    </li>

                    <li>
                        <button onClick={logouthandler} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div> <ion-icon class="text-2xl px-4"
                                name="log-out-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Logout
                            </div>

                        </button>
                    </li>

                    
                </ul>

            </div>
        </div>
    );
}
export default VendorNavbar;