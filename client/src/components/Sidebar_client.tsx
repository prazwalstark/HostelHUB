import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import Logo from "../assets/logo.png";

interface MenuItem {
    url: string;
    text: string;
    Icon: React.ElementType;
}

const ClientSidebar: React.FC = () => {
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false); // State variable to track logout loading state

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true); // Set loading state to true when logging out
            const response = await fetch("https://prajjwal-bhai-test-be.asaurav.com.np/user/auth/logout", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Logout successful');
                window.location.href = "/login";
            } else {
                console.log('Logout failed error:', response.status);
            }
        } catch (error) {
            console.log('Error logging out:', error);
        } finally {
            setIsLoggingOut(false); // Reset loading state regardless of success or failure
        }
    };

    const menuItemsDashboard: MenuItem[] = [
        {
            url: "/client/dashboard",
            text: "Profile",
            Icon: RiDashboardFill
        },
        {
            url: "/client/registerroom",
            text: "Register Room",
            Icon: SiGoogleclassroom
        },
        {
            url: "/client/complains",
            text: "Complains",
            Icon: IoIosPeople
        },
        {
            url: "/client/notices",
            text: "Notices",
            Icon: AiFillFileText
        }
    ];

    return (
        <aside>
            <div style={{ height: "100%", padding: "0" }}>
                <div className="topper" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "50%" }}>
                    <div className="logo-container">
                        <img src={Logo} alt="Logo" className="logo" />
                    </div>
                    <h5>Dashboard</h5>
                    <ul>
                        {menuItemsDashboard.map(({ url, text, Icon }) => (
                            <li
                                key={text}
                                style={{
                                    backgroundColor: location.pathname.includes(url)
                                        ? "rgba(0, 115, 255, 0.1)"
                                        : "white",
                                }}
                            >
                                <Link
                                    to={url}
                                    style={{
                                        color: location.pathname.includes(url)
                                            ? "rgb(0, 115, 255)"
                                            : "black",
                                    }}
                                >
                                    <Icon className="listIcon" />
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lower" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "50%" }}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-small py-1 px-1 rounded flex justify-center mt-4"
                        style={{ width: "auto"}}
                        onClick={() => { window.location.href="/client/clientchangepassword"; }}
                    >
                        Change Password
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-small py-1 px-1 rounded flex justify-center mt-4"
                        style={{ width: "auto" }}
                        onClick={handleLogout}
                        disabled={isLoggingOut} 
                    >
                        {isLoggingOut ? "Logging out..." : "Log Out"} {/* Change button text based on loading state */}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ClientSidebar;
