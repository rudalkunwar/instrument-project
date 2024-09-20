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
        setTimeout(() => {}, duration);
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
        navigate('/');
    };

    const sessiondata = useSelector(state => state.authenticate);
    let slug = "";
    const name = sessiondata.userInfo.name;

    if (name != null) {
        slug = name.replace(" ", "-");
    }

    return (
        <div
            className="bg-gray-900 w-14 h-screen py-10 overflow-hidden fixed z-10"
            onMouseOver={() => smoothTransition(element.current, '360px', 300)}
            onMouseOut={() => smoothTransition(element.current, '50px', 300)}
            onFocus={() => smoothTransition(element.current, '360px', 300)}
            onBlur={() => smoothTransition(element.current, '50px', 300)}
            ref={element}
        >
            <div>
                <ul class="list-none">
                    <li>
                        <Link to="/admin/dashboard" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="speedometer-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                Dashboard
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/product" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="cube-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                Products
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/allvendor" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="people-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                Vendors
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="person-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                Users
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="document-text-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                Orders
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="" class="text-xl font-bold flex-1 text-white hover:bg-white hover:text-black py-2 my-2 flex">
                            <div>
                                <ion-icon class="text-2xl px-4" name="log-out-outline"></ion-icon>
                            </div>
                            <div class="cursor-pointer w-full">
                                <button class="text-xl mx-3 font-bold" onClick={logouthandler}>Logout</button>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default UserNavbar;
