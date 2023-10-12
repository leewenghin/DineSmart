import {
  faAnglesRight,
  faCartShopping,
  faMinus,
  faPlus,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Order_modal from "../components/order_modal";

const categories = [
  "Appetizers",
  "Main Course",
  "Drinks",
  "Sandwiches",
  "Dessets",
];

const dataArray: any[] = [
  {
    imageSrc: "../src/assets/img/potato.png",
    foodTitle:
      "Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes Mashed Potatoes",
    price: "5.99",
  },
  {
    imageSrc: "../src/assets/img/beef-bliss.jpg",
    foodTitle: "Ultimate Beef Bliss Burger",
    price: "17.99",
  },
];

function menu() {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className=" mx-1440">
        <div className="max-w-screen-lg mx-auto mb-16">
          <h1 className="py-2 container mx-auto font-semibold">DineSmart</h1>
          <div className="flex mx-auto md:container">
            <div className=" md:w-2/3 w-full">
              <ul className=" bg-white px-2 py-2">
                <div className="flex justify-between overflow-x-auto  ">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer w-28 h-10 px-2 mx-1 flex font-semibold justify-center items-center text-center sm:text-base text-sm whitespace-normal min-w-fit ${
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
              <div className="p-3 bg-white mt-2 sm:flex block">
                <p>Appetizer</p>
              </div>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:!mx-0 m-2">
                {dataArray.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white sm:!p-2 p-0 sm:!rounded rounded-none  shadow-md flex sm:block"
                  >
                    <img
                      src={item.imageSrc}
                      alt=""
                      className="  sm:w-full w-1/3 object-cover sm:!mb-2 mb-0 w-44 sm:!h-40 w-full xs:h-28 h-auto"
                    />
                    <div className="sm:!p-1 p-4 w-full truncate ">
                      <p className="truncate line-clamp-2 mb-2 h-[2.8rem] whitespace-normal sm:!text-base text-sm">
                        {item.foodTitle}
                      </p>{" "}
                      <div className="flex justify-end sm:justify-between items-center ">
                        <p className=" sm:!text-base text-sm font-bold sm:!pe-0 pe-2">
                          RM {item.price}
                        </p>
                        <button className="bg-primaryColor rounded ">
                          <p className="text-white sm:!text-base text-sm font-bold hover:bg-black/[.10] py-1 sm:!px-2 px-4 rounded">
                            Order
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Show Customer Order Cart When table screen size*/}
            <div className=" ms-1 md:!ms-5 w-1/3 hidden md:block">
              <div className="flex flex-column p-3 bg-white">
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
                <div className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2">
                  <p className="text-white font-medium text-lg">Check Out</p>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    size="lg"
                    className=" text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Show Customer Order Cart When table screen size*/}
        <div className="fixed bottom-0 w-full flex md:hidden block ">
          <button
            className="bg-lightOrangeColor sm:px-4 sm:py-3 px-2 py-1 basis-1/2 sm:basis-2/3 flex items-center justify-start"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faCartShopping} className="sm:fa-2x pe-2" />
            <p className="md:text-lg text-sm font-medium ">RM 20.99</p>
          </button>

          <div className="bg-primaryColor basis-1/2 sm:basis-1/3 px-4 py-3 flex items-center justify-between">
            <p className="text-white md:text-lg text-sm">Create Order</p>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="sm:fa-2x text-white"
            />
            <Order_modal isOpen={isOpen} onClose={toggleModal}>
              <div className=" bg-white rounded">
                <div className="flex flex-column">
                  <div className="my-1 border-b-2 px-4 py-2 flex items-center justify-between ">
                    <div className=" flex items-center">
                      <p className="font-medium text-lg ">Table 1</p>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        style={{ color: "#eda345" }}
                        className="mx-2"
                      />
                      3 pax
                    </div>
                    <div
                      className="flex cursor-pointer  "
                      onClick={toggleModal}
                    >
                      <FontAwesomeIcon icon={faXmark} className=" " />
                    </div>
                  </div>
                  <div
                    className="border-b-2 scroll-container px-4 py-2"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    <div className="pb-2">
                      <div className="flex items-center justify-between">
                        <p>Ultimate Beef Biss Burger </p>
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
                  </div>

                  <div className="px-4 py-2">
                    <div className="flex justify-between">
                      <p className="font-medium">Subtotal</p>
                      <p className="font-medium">RM 20.99</p>
                    </div>
                  </div>
                  <div className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2 mx-4 mb-4">
                    <p className="text-white font-medium text-lg">Check Out</p>
                    <FontAwesomeIcon
                      icon={faAnglesRight}
                      size="lg"
                      className=" text-white"
                    />
                  </div>
                </div>
              </div>
            </Order_modal>
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
