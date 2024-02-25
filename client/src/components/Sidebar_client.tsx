// import { IconType } from "react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { IoIosPeople } from "react-icons/io";
import Logo from "../assets/logo.png";

const ClientSidebar = () => {

    const navigate = useNavigate();
    const location= useLocation();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/logout', {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Logout Successful');
                navigate('/');
            } else {
                console.log('Logout failed:', response.statusText);
            }
        }
        catch (error) {
            console.log('Logout failed:', error);
        }
    };
    
    const menuItemsDashboard = [
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
            <div>
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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-small py-1 px-1 rounded flex justify-center mt-4"
                    style={{ width: "auto",marginTop: "220px"}}
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>
        </aside>
    )
};

export default ClientSidebar;
