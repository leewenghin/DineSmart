import {
  faAnglesRight,
  faCartShopping,
  faEllipsisVertical,
  faGrip,
  faGripVertical,
  faList,
  faMinus,
  faPlus,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Order_modal from "../components/order_modal";
import "./menu.css";
import { Link, useNavigate  } from "react-router-dom";
const categories = [
  "Appetizers",
  "Main Course",
  "Drinks",
  "Sandwiches",
  "Dessets",
];

const menuItems = [
  {
    itemName: "Mashed Potatoes",
    price: "5.99",
    description: "",
    quantity: "1",
  },
];

const dataArray: any[] = [
  {
    Appetizer: [
      {
        id: 1,
        categories: "Appetizer",
        imageSrc: "../src/assets/img/potato.png",
        foodTitle: "Mashed Potatoes",
        description:
          "Mashed potatoes are potatoes that have been boiled and crushed into a soft mass, often with butter and milk.",
        price: "5.99",
      },
    ],
    Main_Course: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
    dinner: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
    roti: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
  },
];

const menu = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const categories = Object.keys(dataArray[0]);
  const categoryRefs: React.RefObject<HTMLDivElement>[] = categories.map(() => useRef(null));

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    categoryRefs[index].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [orderedItems, setOrderedItems] = useState<any[]>([]);

  const handleOrderClick = (item: any) => {
    const existingItemIndex = orderedItems.findIndex(
      (orderedItem) => orderedItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity by adding 1
      const updatedItems = [...orderedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderedItems(updatedItems);
    } else {
      // If the item doesn't exist, add it to the orderedItems array with a quantity of 1
      setOrderedItems([...orderedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleMinusClick = (item: any) => {
    const existingItemIndex = orderedItems.findIndex(
      (orderedItem) => orderedItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity by subtracting 1
      const updatedItems = [...orderedItems];
      updatedItems[existingItemIndex].quantity = Math.max(
        0,
        updatedItems[existingItemIndex].quantity - 1
      );
      setOrderedItems(updatedItems);
    }
  };

  const handleCancelClick = (item: any) => {
    // Remove the item from the orderedItems array
    const updatedItems = orderedItems.filter(
      (orderedItem) => orderedItem.id !== item.id
    );
    setOrderedItems(updatedItems);
  };

  const totalPrice = orderedItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0);
  const navigate  = useNavigate();
  const handleCheckOut = () => {
    // Create an array of objects with id and quantity properties
    const idList = orderedItems.map(item => item.id).join('-');
    const quantityList = orderedItems.map(item => item.quantity).join('-');
    const queryString = `?id=${idList}&quantity=${quantityList}`;
    // const queryString = itemsToOrder ? `?id=${encodeURIComponent(itemsToOrder)}` : '';

    // // Navigate to the "order_detail" page with item IDs and quantities as a query parameter
    // navigate({
    //   pathname: "/order_detail",
    //   search: `?items=${JSON.stringify(itemsToOrder)}`,
    // });
    // Convert itemsToOrder to a JSON string
    // const itemsJSON = JSON.stringify(itemsToOrder);

    // // Navigate to the "order_detail" page with item IDs and quantities as query parameters
    // navigate(`/order_detail?items=${encodeURIComponent(itemsJSON)}`);
    // const queryString = itemsToOrder.length > 0 ? `?items=${encodeURIComponent(JSON.stringify(itemsToOrder))}` : '';
    


    // Navigate to the "order_detail" page with item IDs and quantities as a query parameter
    navigate(`/order_detail${queryString}`);
  };


  return (
    <>
      <div className=" mx-1440">
        <div className=" max-w-screen-lg mx-auto mb-16">
          <div className="flex justify-between items-center">
            <h1 className="py-2 container font-semibold">DineSmart</h1>
            {/* <div className="flex ">
            <span className="material-symbols-outlined">
apps
</span>
              <button className="bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5] w-8 rounded">
              <FontAwesomeIcon icon={faGrip} className="text-white"/>
              </button>
              <button>
                <FontAwesomeIcon icon={faList} />
              </button>
            </div> */}
          </div>
          <div className="flex mx-auto md:container">
            <div className=" md:w-2/3 w-full">
              <ul className=" bg-white px-2 py-2">
                <div className="flex overflow-x-auto  ">
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
                      {/* {category} */}
                      {category.replace(/_/g, " ")}
                    </li>
                  ))}
                </div>
              </ul>
              {/* Grid layout  */}
              {Object.keys(dataArray[0]).map((category, index) => (
                <div key={category}  ref={categoryRefs[index]}>
                  <div className="p-3 bg-white mt-2 sm:flex block">
                    <p>{category.replace(/_/g, " ")}</p>
                  </div>
                  <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:!mx-0 m-2 ">
                    {dataArray[0][category].map((item: any, index: any) => (
                      <div
                        key={index}
                        className="bg-white sm:!p-2 p-0 sm:!rounded rounded-none shadow-md flex sm:flex-col  "
                      >
                        <div className="sm:!w-full xs:!w-1/3 w-2/5  sm:h-auto h-28  my-auto">
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="w-full sm:!mb-2 mb-0 sm:!h-40  h-full object-cover"
                          />
                        </div>
                        <div className="sm:!p-1 xs:p-4 p-3 sm:!w-full truncate xs:w-2/3 w-3/5  flex flex-col justify-between food-item-container ">
                          <p className="truncate line-clamp-4 mb-2  whitespace-normal sm:!leading-none leading-none sm:!text-lg xs:!text-base text-sm  food-item-container">
                            {item.foodTitle}
                            <br />
                            <div className="xs:text-sm text-xs">
                              {item.description}
                            </div>
                          </p>
                          <div className="flex justify-end sm:justify-between items-center ">
                            <p className=" sm:!text-base xs:text-sm text-xs font-bold sm:!pe-0 pe-2 ">
                              RM {item.price}
                            </p>
                            <button
                              className="bg-primaryColor rounded "
                              onClick={() => handleOrderClick(item)}
                            >
                              <p className="text-white sm:!text-base xs:text-sm text-xs font-bold hover:bg-black/[.10] py-1 xs:!px-4 px-2 rounded">
                                Order
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* horizontal layout */}
              {/* {Object.keys(dataArray[0]).map((category) => (
                <div key={category}>
                  <div className="p-3 bg-white mt-2 sm:flex block">
                    <p>{category.replace(/_/g, " ")}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:!mx-0 m-2">
                    {dataArray[0][category].map((item: any, index: any) => (
                      <div
                        key={index}
                        className="bg-white sm:!p-0 p-2 sm:!rounded-none rounded shadow-md sm:flex block"
                      >
                        <div className="sm:w-1/3">
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="w-full object-cover sm:!mb-0 mb-2 sm:!h-50 xs:h-40 h-28"
                          />
                        </div>
                        <div className="sm:flex flex-column sm:block justify-between sm:!p-4 p-1 w-full truncate ">
                          <p className="truncate line-clamp-2 mb-2 sm:h-auto h-[2.5rem] whitespace-normal sm:!text-base text-sm">
                            {item.foodTitle}
                          </p>{" "}
                          <div className="flex sm:justify-end justify-between items-center ">
                            <p className=" sm:!text-base text-sm font-bold sm:!pe-2 pe-0">
                              RM {item.price}
                            </p>
                            <button className="bg-primaryColor rounded ">
                              <p className="text-white sm:!text-base text-sm font-bold hover:bg-black/[.10] py-1 sm:!px-4 px-2 rounded">
                                Order
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))} */}
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
                {orderedItems.map((menuItem, index) => (
                  <div key={index} className="border-b-2 pb-2">
                    <div className="flex items-center justify-between">
                      <p>{menuItem.foodTitle}</p>
                      <p className="whitespace-nowrap">RM {menuItem.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="quantity flex flex-1 items-center justify-end">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer"
                          onClick={() => {
                            if (menuItem.quantity > 1) {
                              handleMinusClick(menuItem);
                            } else {
                              handleCancelClick(menuItem);
                            }
                          }}
                        />
                        <div className="border-solid flex justify-center items-center border-2 rounded-full w-2 h-9 mx-3 px-3 m-auto">
                          {menuItem.quantity}
                        </div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#eda345" }}
                          className="cursor-pointer"
                          onClick={() => {
                            handleOrderClick(menuItem);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">RM {totalPrice.toFixed(2)}</p>
                </div>
                
                  <button className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2 w-full" onClick={handleCheckOut}>
                    <p className="text-white font-medium sm:!text-lg xs:text-base text-sm">
                      Check Out
                    </p>
                    <FontAwesomeIcon
                      icon={faAnglesRight}
                      size="lg"
                      className=" text-white"
                    />
                  </button>
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
            <p className="md:text-lg text-sm font-medium ">
              RM {totalPrice.toFixed(2)}
            </p>
          </button>
          <Link to="/order_detail" className="basis-1/2 sm:basis-1/3">
            <button className="bg-primaryColor px-4 py-3 flex items-center justify-between w-full">
              <p className="text-white md:text-lg text-sm">Create Order</p>
              <FontAwesomeIcon
                icon={faAnglesRight}
                className="sm:fa-2x text-white"
              />
            </button>
          </Link>
        </div>
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
                <div className="flex cursor-pointer  " onClick={toggleModal}>
                  <FontAwesomeIcon icon={faXmark} className=" " />
                </div>
              </div>
              <div
                className="border-b-2 scroll-container px-4 py-2"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {orderedItems.map((menuItem, index) => (
                  <div className="pb-2" key={index}>
                    <div className="flex items-center justify-between sm:text-base text-sm">
                      <p>{menuItem.foodTitle}</p>
                      <p className="whitespace-nowrap">RM {menuItem.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>{}</p>
                      <div className="quantity flex flex-1 items-center justify-end">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer"
                          onClick={() => {
                            if (menuItem.quantity > 1) {
                              handleMinusClick(menuItem);
                            } else {
                              handleCancelClick(menuItem);
                            }
                          }}
                        />
                        <div className="border-solid flex justify-center items-center border-2 rounded-full sm:!w-9 sm:!h-9 w-6 h-6 sm:!mx-3 sm:!px-3 mx-2 px-2 m-auto">
                          <p className="sm:text-base text-sm">
                            {menuItem.quantity}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#eda345" }}
                          className="cursor-pointer"
                          onClick={() => {
                            handleOrderClick(menuItem);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2">
                <div className="flex justify-between ">
                  <p className="font-medium xs:!text-base text-sm">Subtotal</p>
                  <p className="font-medium xs:!text-base text-sm">RM 20.99</p>
                </div>
              </div>
              <Link to="/order_detail" className="mx-4  mb-4">
                <button className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2 w-full rounded">
                  <p className="text-white font-medium sm:!text-lg xs:!text-base text-sm">
                    Check Out
                  </p>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    size="lg"
                    className=" text-white"
                  />
                </button>
              </Link>
            </div>
          </div>
        </Order_modal>
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
};

export default menu;
