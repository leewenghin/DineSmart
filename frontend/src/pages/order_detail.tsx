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
import { useParams, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { OrderContextProps, OrderList, useOrderContext } from "./context";

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

interface DataItem {
  [x: string]: any;
}

const OrderDetailPage = ({ changeIP }: { changeIP: string }) => {

  const { orderList, setOrderList } = useOrderContext();
  console.log(orderList?.timestamp);
  const location = useLocation();

  const time = orderList?.timestamp;

  // const data = location.state?.orderlist;
  
  const [orderedItems, setOrderedItems] = useState<any[]>([]); // show data
  const [orderData, setOrderData] = useState<any[]>(() => {
    const storedOrderData = localStorage.getItem('orderData');
    const parsedOrderData = storedOrderData ? JSON.parse(storedOrderData) : null;
    if(orderList){
      return orderList?.items;
    }else{
      return parsedOrderData?.items
    }
  });
  // Get items from API
  const [foodItems, setFoodItems] = useState<any>([]);
  const [foodCategory, setFoodCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_category = await fetch(
          `http://${changeIP}:8000/api/foodcategories/`
        );
        const response_items = await fetch(
          `http://${changeIP}:8000/api/fooditems/`
        );
        if (response_items.ok && response_category.ok) {
          const data_items = await response_items.json();
          const data_category = await response_category.json();
          setFoodItems(data_items);
          setFoodCategory(data_category);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    // Function to combine orderData with itemData based on matching IDs
    const combineOrderAndItemData = () => {
      if (orderData && orderData.length > 0) {
        const combinedItems: any[] = [];
        orderData.forEach((orderItem) => {
          const matchingItem = foodItems.find(
            (item: { id: any }) => item.id === orderItem.id
          );
          if (matchingItem) {
            combinedItems.push({
              ...matchingItem,
              quantity: orderItem.quantity,
            });
          }
        });
        setOrderedItems(combinedItems);
      }
    };

    // Call the function when itemData or orderData changes
    if (foodItems.length > 0) {
      combineOrderAndItemData();
    }
  }, [foodItems, orderData]);

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
      setOrderData(updatedItems);
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

      // Filter out items with quantity zero before updating the state
      const filteredItems = updatedItems.filter((item) => item.quantity > 0);
      setOrderedItems(filteredItems);
      setOrderData(filteredItems);
    }
  };

  // Cancel order items
  const handleCancelClick = (filteredData: any) => {
    // Remove the item from the orderedItems array
    const updatedItems = orderedItems.filter(
      (orderedItem) => orderedItem.id !== filteredData.id
    );
    setOrderedItems(updatedItems);
    setOrderData(updatedItems);
  };

  // Count all order items
  const totalPrice = orderedItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0);
  
  useEffect(()=>{
    const timestamp = new Date().toISOString();
    const transformedData = orderData.map(item => ({
      id: item.id,
      quantity: item.quantity,
    }));
  // console.log()
    const dataWithTimestamp:OrderList= {
      timestamp,
      items: transformedData,
    };
    console.log(dataWithTimestamp);
    setOrderList(dataWithTimestamp);
    const handleBeforeUnload = () => {
      localStorage.setItem('orderData', JSON.stringify(dataWithTimestamp));
    };
    console.log("asd");

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    
  },[orderData,setOrderList])
  
  const { tableqrid } = useParams();
  const navigate = useNavigate();
  // const handleCheckOut = () => {
  //   const orderlistWithTimestamp = orderedItems.map((item) => ({
  //     id: item.id,
  //     quantity: item.quantity
  //   }));
  
  //   const timestamp = new Date().toISOString();
  
  //   const orderlist = {
  //     timestamp,
  //     items: orderlistWithTimestamp
  //   };
  //   navigate(`/table/${tableqrid}/order_detail`, {
  //     state: {orderlist},
  //   });
  // };



  const handlePopState = () => {
    // Check if the user has navigated back
    if (window.history.state === null) {
      console.log('User navigated back to the previous page');
      // Perform additional actions as needed
    }
  };
  // console.log("testing")
  useEffect(() => {
    // console.log("testing")
    // Add event listener for the popstate event
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
                        src="../../src/assets/img/card-payment.png"
                      />
                      <h3>Debit / Credit Card</h3>
                    </Radio>
                    <Radio id="advanced" name="radio" defaultChecked={false}>
                      <img
                        className="online-payment w-12 h-12"
                        src="../../src/assets/img/online-payment.png"
                      />
                      <h3>Online Banking</h3>
                    </Radio>
                    <Radio id="nice" name="radio" defaultChecked={false}>
                      <img
                        className="cash-payment w-12 h-12"
                        src="../../src/assets/img/cash-payment.png"
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
            <div className="lg:!ms-5 w-full lg:w-1/3 mt-4 lg:!mt-0 md:block">
              <div className="flex flex-col pt-3 pb-5 px-3 md:!p-6 bg-white overflow-hidden shadow-sm">
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
                      <p>{item.name}</p>
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
