import {
  faAnglesRight,
  faCreditCard,
  faMinus,
  faPlus,
  faUserGroup,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RadioGroup, Radio } from "../components/radio_button";
import "../assets/css/order_detail.css";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

const data = [
  {
    orderstep: false,
    paymentStep: false,
    doneStep: false,
  },
];

type OrderDetailProps = {
  orderId: string;
  quantity: number;
  // other prop types...
};

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

const OrderDetailPage = () => {
  const location = useLocation();
  const orderData: any[] = location.state;

  // Create a set to keep track of displayed item ids
  const displayedItems = new Set();

  // Create an array to store filtered and mapped data
  const filteredData: any[] = [];

  // Iterate through orderData
  orderData.forEach((orderItem) => {
    // Iterate through dataArray categories
    for (let category in dataArray[0]) {
      // Find the corresponding item in the category based on id
      const foundItem = dataArray[0][category].find(
        (item: { id: any }) => item.id === orderItem.id
      );

      // If the item is found and not already displayed, add it to filteredData with quantity information
      if (foundItem && !displayedItems.has(foundItem.id)) {
        filteredData.push({
          ...foundItem,
          quantity: orderItem.quantity,
          category: category,
        });

        // Add the displayed item id to the set
        displayedItems.add(foundItem.id);
      }
    }
  });


    // Count Order Items 
    const [orderedItems, setOrderedItems] = useState<any[]>(filteredData);
  
    // When click one of the items then add new label (quantity) and output to order list 
    const handleOrderClick = (filteredData: any) => {
      const existingItemIndex = orderedItems.findIndex(
        (orderedItem) => orderedItem.id === filteredData.id
      );
      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity by adding 1
        const updatedItems = [...orderedItems];
        updatedItems[existingItemIndex].quantity += 1;
        setOrderedItems(updatedItems);
      } else {
        // If the item doesn't exist, add it to the orderedItems array with a quantity of 1
        setOrderedItems([...orderedItems, { ...filteredData, quantity: 1 }]);
      }
    };
  
    // Minus quantity 
    const handleMinusClick = (filteredData: any) => {
      const existingItemIndex = orderedItems.findIndex(
        (orderedItem) => orderedItem.id === filteredData.id
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
  
    // Cancel order items
    const handleCancelClick = (filteredData: any) => {
      // Remove the item from the orderedItems array
      const updatedItems = orderedItems.filter(
        (orderedItem) => orderedItem.id !== filteredData.id
      );
      setOrderedItems(updatedItems);
    };
  
    // Count all order items
    const totalPrice = orderedItems.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.quantity;
    }, 0);

  // Now filteredData contains unique items with their quantities from dataArray
  return (
    <>
      <div className="full-content flex flex-col">
        <div className="bg-white flex items-center justify-between py-3 shadow-md px-2 md:px-4">
          {/* Progress bar */}
          <section className="step-wizard">
            <ul className="step-wizard-list">
              <li className="step-wizard-item current-item">
                <span className="progress-count">1</span>
                <span className="progress-label">Order</span>
              </li>
              <li className="step-wizard-item">
                <span className="progress-count">2</span>
                <span className="progress-label">Payment</span>
              </li>
              <li className="step-wizard-item">
                <span className="progress-count">3</span>
                <span className="progress-label">Completed</span>
              </li>
            </ul>
          </section>

          <a className="py-2 px-4" href="#">
            <FontAwesomeIcon icon={faX} style={{ color: "#505153" }} />{" "}
          </a>
        </div>
        {/* Payment Section */}
        <div className="container-fluid md:container my-1 flex lg:block justify-center items mx-auto">
          <div className="lg:flex justify-between w-full md:w-auto pt-4 pb-28 xl:mx-12 2xl:mx-44">
            <div className="progress-title"></div>
            <div className="bg-white col-span-8 px-2 sm:!px-3 md:!px-8 py-3 md:w-142 overflow-hidden shadow-sm">
              <div className="sm:mb-3">
                <h2 className="text-lg font-medium my-2">Payment Method</h2>
                {/* Payment Method */}
                <div className="payment-method">
                  <RadioGroup>
                    <Radio id="basic" name="radio" defaultChecked>
                      <img
                        className="card-payment w-12 h-12"
                        src="../src/assets/img/card-payment.png"
                      />
                      <h3>Debit / Credit Card</h3>
                    </Radio>
                    <Radio id="advanced" name="radio" defaultChecked={false}>
                      <img
                        className="online-payment w-12 h-12"
                        src="../src/assets/img/online-payment.png"
                      />
                      <h3>Online Banking</h3>
                    </Radio>
                    <Radio id="nice" name="radio" defaultChecked={false}>
                      <img
                        className="cash-payment w-12 h-12"
                        src="../src/assets/img/cash-payment.png"
                      />
                      <h3>Cash</h3>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className="order md:flex justify-between md:py-5">
                <div className="py-3 md:!py-0 w-full md:me-2.5">
                  <p className="text-lg font-medium">Order Type</p>
                  <RadioGroup>
                    <Radio id="table-order" name="order-type" defaultChecked>
                      <h3>Table Order</h3>
                    </Radio>
                  </RadioGroup>
                </div>
                <div className="pb-3 lg:pb-0 w-full md:ms-2.5">
                  <p className="text-lg font-medium">Order Time</p>
                  <RadioGroup>
                    <Radio id="soon" name="order-time" defaultChecked>
                      <h3>As soon as possible</h3>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="lg:!ms-5 w-full md:w-142 lg:w-1/3 mt-4 lg:!mt-0 md:block">
              <div className="flex flex-col pt-3 pb-5 px-3 md:!px-8 md:py-3 lg:p-3 bg-white overflow-hidden shadow-sm">
                <p className="text-lg font-medium">Table 1</p>
                <div className="my-1 border-b-2 pb-2">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "#eda345" }}
                    className="me-2"
                  />
                  3 pax
                </div>
                {orderedItems.map((item: any, itemIndex: any) => (
                  <div className="border-b-2 pb-2" key={itemIndex}>
                    <div className="flex items-center justify-between">
                      <p>{item.foodTitle}</p>
                      <p className="whitespace-nowrap">{`RM ${item.price}`}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>{}</p>
                      <div className="quantity flex flex-1 items-center justify-end">
                      <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer"
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleMinusClick(item);
                            } else {
                              handleCancelClick(item);
                            }
                          }}
                        />
                        <div className="border-solid flex justify-center items-center border-2 rounded-full w-2 h-auto mx-3 px-3 m-auto">
                          {orderedItems && <p>{item.quantity}</p>}
                        </div>
                        <FontAwesomeIcon
                        className="cursor-pointer"
                          icon={faPlus}
                          style={{ color: "#eda345" }}
                          onClick={() => {
                            handleOrderClick(item);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <div className="flex justify-between">
                    <p className="font-medium">Subtotal</p>
                    <p className="font-medium">RM {totalPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-primaryColor md:flex hidden items-center justify-between mt-12 px-2 py-2">
                  <p className="text-white text-lg">Create order</p>
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
        <div className="bg-white fixed md:hidden bottom-0 w-full p-3">
          <div className="bg-primaryColor flex items-center justify-between w-full px-3 py-2 mt-2">
            <p className="text-white text-lg">Create order</p>
            <FontAwesomeIcon
              icon={faAnglesRight}
              size="lg"
              className=" text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// export default product_detail;

// const Order_detail: React.FC<OrderDetailProps> = ({ orderId, quantity }) => {

//   const { items } = useParams();

//   // Parse the JSON string from the query parameter
//   const orderedItems = JSON.parse(decodeURIComponent(items));
//   // Your Order_detail component logic
//   return <div>Order Detail for Order ID: {orderId}</div>;
// };

// const OrderDetailPage: React.FC = () => {
// const queryParams = new URLSearchParams(location.search);
// const idList = queryParams.get("id");
// const quantityList = queryParams.get("quantity");

// let items:any[] = [];
// if (idList && quantityList) {
//   const ids = idList.split('-');
//   const quantities = quantityList.split('-');

//   items = ids.map((id, index) => ({ id: id, quantity: quantities[index] }));
// }

// // Rest of your component logic using items...

// return (
//   <div>
//     {items.map((item, index) => (
//       <div key={index}>
//         <p>ID: {item.id}</p>
//         <p>Quantity: {item.quantity}</p>
//       </div>
//     ))}
//   </div>
// );

// return (
//   <div>
//     <h2>Order Detail Page</h2>
//       <ul>
//         {orderData.map(order => (
//           <li key={order.id}>
//             <p>ID: {order.id}</p>
//             <p>Quantity: {order.quantity}</p>
//           </li>
//         ))}
//       </ul>
//   </div>
// );
// };

// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const OrderDetailPage = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const itemsJSON = queryParams.get("items");

//     if (itemsJSON) {
//       const items = JSON.parse(decodeURIComponent(itemsJSON));
//       // Use the items data
//     }

//     // Rest of your component logic...
//   }, [location.search]);

//   // Rest of your component logic...
// };

export default OrderDetailPage;
