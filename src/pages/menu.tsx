import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const categories = ['Appetizers', 'Main Course', 'Drinks', 'Sandwiches'];
function menu() {

    const [activeCategory, setActiveCategory] = useState<number>(0);

    const handleCategoryClick = (index: number) => {
      setActiveCategory(index);
    };
  
  return (
    <>
      <div className="flex container px-3 py-4 border-b-2 items-center justify-center relative">
        <div className="flex-none absolute left-5">
          <div className="flex items-center ">
            <FontAwesomeIcon icon={faUserGroup} style={{ color: "#eda345" }} />
            <p className="font-medium"> pax</p>
          </div>
        </div>
        <div className="flex items-center  ">
          <h1 className="text-xl font-bold text-center">Table 1</h1>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold py-3 container">DineSmart</h1>
      </div>

      <div className="flex container ">
        <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
          <button
            aria-current="true"
            type="button"
            className="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
          >
            Profile
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            Settings
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            Messages
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 font-medium text-left bg-gray-100 rounded-b-lg cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
          >
            Download
          </button>
        </div>
        <div></div>
      </div>

      <div className="flex container">
        <div className="w-35 bg-lightOrangeColor ">
          <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer h-14 px-1 flex justify-center items-center text-center ${
                activeCategory === index ? 'bg-orangeColor' : 'bg-lightOrangeColor'
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </li>
          ))}
          </ul>
        </div>

        <div className="w-60 ">
            
        </div>
      </div>
    </>
  );
}

export default menu;