import { useState } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/admin/admin_menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const links = [
  { label: "Home", url: "#", icon: "home", status: "" },
  { label: "Menu", url: "/admin_menu", icon: "menu_book", status: "active" },
];

const admin_menu = () => {
  const sidebar = document.querySelector(".sidebar");
  const [isClose, setIsClose] = useState(false);

  const themeToggler = document.querySelector(".theme-toggler");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log("Before state change - isDarkMode:", isDarkMode);
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode); // Use the previous state

    document.body.classList.toggle("dark-theme-variables");

    themeToggler
      ?.querySelector("span:nth-child(1)")
      ?.classList.toggle("active");
    themeToggler
      ?.querySelector("span:nth-child(2)")
      ?.classList.toggle("active");

    console.log("After state change - isDarkMode:", isDarkMode);
  };

  const toggleNav = () => {
    setIsClose((prevIsClose) => !prevIsClose); // Use the previous state

    sidebar?.classList.toggle("close");
  };

  return (
    <div id="admin-panel">
      <nav className="sidebar fixed top-0 left-0 h-full">
        <header className="relative">
          <div className="image-text flex items-center">
            <span className="image min-w-60 flex items-center">
              <img
                className="w-14 h-14"
                src="src/assets/img/logo.png"
                alt="Logo"
              />
            </span>

            <div className="text header-text font-medium flex flex-col">
              <span className="name font-medium">
                Dine<span className="text-primaryColor">Smart</span>
              </span>
              <p className="permission">Admin</p>
            </div>

            <FontAwesomeIcon
              icon={faChevronRight}
              className="toggle absolute -right-3 w-3 h-3 px-1.5 py-1.5 flex items-center justify-center rounded-full text-white select-none"
              onClick={toggleNav}
            />
          </div>
        </header>

        <div className="menu-bar text-sidebarTextColor px-3">
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
              {links.map((items, index) => (
                <li
                  className="nav-link flex items-center mt-2 h-12"
                  key={index}
                >
                  <Link
                    className={`flex items-center w-full h-full delay-75 ${items.status}`}
                    to={items.url}
                  >
                    <span className="material-symbols-outlined ms-3 me-3 flex items-center justify-center">
                      {items.icon}
                    </span>
                    <span className="text nav-text">{items.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="pt-4">
        <div className="flex justify-end gap-7 me-4">
          <div
            className="theme-toggler flex w-20 h-7 rounded-md bg-gray-300 select-none"
            onClick={toggleDarkMode}
          >
            <span className="material-icons flex justify-center items-center w-full h-full rounded-md text-xl active">
              light_mode
            </span>
            <span className="material-icons flex justify-center items-center w-full h-full rounded-md text-xl">
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
    </div>
  );
};

export default admin_menu;
