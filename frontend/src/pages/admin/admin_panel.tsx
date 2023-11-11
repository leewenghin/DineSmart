import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/admin/admin_panel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
  { label: "Dashboard", url: "#", icon: "home", status: "" },
  { label: "Dashboard", url: "#", icon: "home", status: "" },
  {
    label: "Table List",
    url: "/admin_panel/qrtable",
    icon: "table_restaurant",
    status: "",
  },
  {
    label: "Menu",
    url: "/admin_panel/menu",
    icon: "menu_book",
    status: "",
  },
  {
    label: "Variant Group",
    url: "/admin_panel/variant_group",
    icon: "home",
    status: "",
  },
  {
    label: "Variant Value",
    url: "/admin_panel/variant_value",
    icon: "home",
    status: "",
  },
  { label: "Dashboard", url: "#", icon: "home", status: "" },
];

interface AdminPanelProps {
  changeIP: string;
}

const admin_menu: React.FC<AdminPanelProps> = ({ changeIP }) => {
  // const [isClose, setIsClose] = useState(false);

  // const toggleNav = () => {
  //   setIsClose(!isClose); // Use the previous state
  // };

  const [isClose, setIsClose] = useState(window.innerWidth < 1024);

  const toggleNav = () => {
    setIsClose(!isClose);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set the state accordingly
      if (window.innerWidth < 1024 && !isClose) {
        setIsClose(true);
      } else if (window.innerWidth >= 1024 && isClose) {
        setIsClose(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClose]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Use the previous state

    document.body.classList.toggle("dark-theme-variables");
  };

  return (
    <div id="admin-panel">
      <nav
        className={`sidebar fixed top-0 left-0 h-full hidden sm:block ${
          isClose ? "close" : ""
        }`}
      >
        <header className="relative">
          <div className="image-text flex items-center">
            <span className="image min-w-60 flex items-center">
              <img
                className="w-14 h-14"
                src="/src/assets/img/logo.png  "
                alt="Logo"
              />
            </span>

            <div className="text header-text font-medium flex flex-col whitespace-nowrap">
              <span className="name font-medium">
                Dine<span className="text-primaryColor">Smart</span>
              </span>
            </div>

            <FontAwesomeIcon
              icon={faChevronRight}
              className="toggle absolute -right-3 w-3 h-3 px-1.5 py-1.5 flex items-center justify-center rounded-full text-white select-none cursor-pointer"
              onClick={toggleNav}
            />
          </div>
        </header>

        <div className="menu-bar px-3">
          <div className="menu">
            {/* <li className="search-box flex items-center bg-bodyColor mt-3 h-12">
              <span className="material-symbols-outlined min-w-60 flex items-center justify-center">
                menu_book
              </span>
              <input
                className="w-full bg-bodyColor text-gray-700 focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Search..."
              />
            </li> */}

            <ul className="menu-links">
              {links.map((item, index) => (
                <li
                  className="nav-link flex items-center mt-2 h-12"
                  key={index}
                >
                  <Link
                    className={`flex items-center w-full h-full delay-75 ${item.status}`}
                    to={item.url}
                  >
                    <span className="material-symbols-outlined ms-3 me-3 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="text nav-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="py-4">
        <div className="flex justify-end gap-7 me-4">
          <div
            className="theme-toggler flex w-20 h-7 rounded-md bg-gray-300 select-none cursor-pointer"
            onClick={toggleDarkMode}
          >
            <span
              className={`material-icons flex justify-center items-center w-full h-full rounded-md text-xl ${
                isDarkMode ? "" : "active"
              }`}
            >
              light_mode
            </span>
            <span
              className={`material-icons flex justify-center items-center w-full h-full rounded-md text-xl ${
                isDarkMode ? "active" : ""
              }`}
            >
              dark_mode
            </span>
          </div>
          <div className="profile flex gap-7">
            <div className="info text-end">
              <p>
                Hey, <b>Michael</b>
              </p>
              <small className="text-muted">Admin</small>
            </div>
            <span className="material-icons text-5xl">account_circle</span>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default admin_menu;
