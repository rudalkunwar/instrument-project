import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from '../state/action/SessionData';
import { useDispatch, useSelector } from 'react-redux';

const UserNavbar = () => {
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

    const logouthandler = () => {
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
    let slug = ""; // Initialize slug variable outside the conditional
    const name = sessiondata.userInfo.name;
 
    if (name != null) {
        
        slug = name.replace(" ", "-");
    }



    return (
        <div
            className="bg-green-900 w-14 h-screen py-10 overflow-hidden fixed z-10"
            onMouseOver={() => smoothTransition(element.current, '360px', 300)}
            onMouseOut={() => smoothTransition(element.current, '50px', 300)}
            onFocus={() => smoothTransition(element.current, '360px', 300)}
            onBlur={() => smoothTransition(element.current, '50px', 300)}
            ref={element}
        >
            <div>
                <ul class="list-none">
                <li>
                        <Link to={`/users/${slug}`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Home
                            </div>

                        </Link>
                    </li>
                    <li>
                        <Link to={`/users/${slug}/shop`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                shop
                            </div>

                        </Link>
                    </li>
                    
                    <li>
                        <Link to={`/users/${slug}/addtocart`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Cart
                            </div>

                        </Link>
                    </li>

                    <li>
                        <Link to={`/users/${slug}/order`} class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                                Order
                            </div>

                        </Link>
                    </li>
                    <li
                        class=" text-white hover:bg-white hover:text-black py-2 my-2 flex">
                        <div> <ion-icon class="text-2xl px-4" name="chatbubble-outline"></ion-icon></div>
                        <div class=" cursor-pointer w-full"><a class="text-xl mx-3 font-bold" Link="">
                            Message</a></div>
                    </li>

                    <li>
                        <Link to="" class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                               Notification
                            </div>

                        </Link>
                    </li>


                    <li>
                        <Link to="" class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                              Profile
                            </div>

                        </Link>
                    </li>

                    <li>
                        <Link to="" class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                               Help
                            </div>

                        </Link>
                    </li>

                 


                    <li>
                        <Link to="" class="text-xl  font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex" >


                            <div>
                            <ion-icon class="text-2xl px-4" name="add-circle-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full"  >
                            <button class="text-xl mx-3 font-bold" onClick={logouthandler} >Logout</button>
                            </div>

                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    );
}
export default UserNavbar;