import {
  faMinus,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const categories = [
  "Appetizers",
  "Main Course",
  "Drinks",
  "Sandwiches",
  "Dessets",
];
function menu() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <>
      <div className="bg-bgPrimaryColor mx-1440">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="py-2 container md:container mx-auto font-semibold">DineSmart</h1>
          <div className="flex mx-auto container ">
            <div className="w-2/3">
              <ul className=" bg-white px-2 py-2 ">
                <div className="flex justify-between overflow-x-auto overflow-hidden">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer w-28 h-10 px-2 mx-1 flex font-semibold justify-center items-center text-center whitespace-normal min-w-fit ${
                        activeCategory === index
                          ? "bg-primaryColor"
                          : "bg-lightOrangeColor"
                      }`}
                      onClick={() => handleCategoryClick(index)}
                    >
                      {category}
                    </li>
                  ))}
                </div>
              </ul>
              <div className="p-3 bg-white mt-2">
                <p >Appetizer</p>
              </div>
              <div className=" bg-white mt-2 flex ">
                <img src="../src/assets/img/potato.png" alt="" className="w-2/6 "/>
                <div className="flex flex-column justify-between p-3 w-full truncate ">
                      <p className="truncate line-clamp-2 whitespace-normal" style={{WebkitLineClamp: 2}}>
                        Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes  Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed PotatoesMashed Potatoes Mashed Potatoes Mashed Potatoes</p>
                      <div className="flex justify-end items-center">
                          <p className="me-2 text-md">RM 5.99</p>
                          <button className="bg-primaryColor hover:bg-lightOrangeColor text-white hover:text-dark font-bold py-1 px-3 rounded">
                            Order
                          </button>
                      </div>
                </div>
              </div>
              <div className=" bg-white mt-2 flex ">
                <img src="../src/assets/img/potato.png" alt="" className="w-2/6 "/>
                <div className="flex flex-column justify-between p-3 w-full truncate ">
                      <p className="truncate line-clamp-2 whitespace-normal" style={{WebkitLineClamp: 2}}>
                        Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes  Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed PotatoesMashed Potatoes Mashed Potatoes Mashed Potatoes</p>
                      <div className="flex justify-end items-center group ">
                          <p className="me-2 text-md">RM 5.99</p>
                          <button className="bg-primaryColor rounded">
                            <p className="  text-white  font-bold hover:bg-black/[.10] py-1 px-3 rounded">
                            Order
                              </p>
                          </button>
                      </div>
                </div>
              </div>
            </div>
            <div className=" ms-0 md:!ms-5 bg-white w-1/3">
              <div className="flex flex-column p-3">
                <p className="font-medium text-lg ">Table 1</p>
                <div className="my-1 border-b-2 pb-2">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "#eda345" }}
                    className="me-2"
                  />
                  3 pax
                </div>
                <div className="border-b-2 pb-2">
                  <div className="flex items-center justify-between">
                    <p>Ultimate Beef Biss Burger</p>
                    <p className="whitespace-nowrap">RM 123,234</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>{}</p>
                    <div className="quantity flex flex-1 items-center justify-end">
                      <FontAwesomeIcon icon={faMinus} />
                      <div className="border-solid flex justify-center items-center border-2 rounded-full w-2 h-9 mx-3 px-3 m-auto">
                        1
                      </div>
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: "#eda345" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <p className="font-medium">Subtotal</p>
                    <p className="font-medium">RM 20.99</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex container px-3 py-4 border-b-2 items-center justify-center relative">
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

      

      <div className="flex container justify-between">
        <div className="wx-auto">
          <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer h-14 px-1 flex font-semibold justify-center items-center text-center whitespace-normal ${
                activeCategory === index ? 'bg-primaryColor' : 'bg-lightOrangeColor'
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </li>
          ))}
          </ul>
        </div>
              
        <div className="w-3/4">
            <p className="bg-primaryColor font-semibold text-center rounded py-1">Appetizers</p>
            <div className="flex py-2 border-b-2">
              <img src="../src/assets/img/beef-bliss.jpg" alt="" className="w-24 object-scale-down"/>
              <div className="truncate flex flex-col px-1 justify-between">
                <div className="truncate font-semibold">Ultimate Beef Bliss Burger</div>
                <div className="flex justify-between">
                  <div className="font-semibold">
                    RM 17.99
                  </div>
                  <button className="rounded-full bg-primaryColor px-2 font-semibold">
                    Select
                  </button>
                </div>


              </div>
            </div>
        </div>
      </div> */}
    </>
  );
}

export default menu;
