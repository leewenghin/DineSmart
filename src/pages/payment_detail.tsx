import {
  faAnglesRight,
  faCartShopping,
  faCircleCheck,
  faMinus,
  faPlus,
  faUserGroup,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Order_modal from "../components/order_modal";
import React from "react";

const items = [
  { label: "Subtotal", amount: "RM 20.99" },
  { label: "Service Charge 10%", amount: "RM 0.01" },
  { label: "Processing Fee 3%", amount: "RM 0.63" },
  { label: "Rounding Adj", amount: "RM 0.01" },
];

function menu() {
  var orderStep = true;
  var paymentStep = false;
  var doneStep = false;

  // const [isConditionTrue, setIsConditionTrue] = useState(false);

  // const toggleCondition = () => {
  //   setIsConditionTrue(isConditionTrue);
  // };

  const numClass = (status: boolean) =>
    status
      ? "border-primaryColor text-primaryColor"
      : "border-darkGreyColor text-darkGreyColor";

  const lineClass = (status: boolean) =>
    status ? "bg-primaryColor" : "bg-darkGreyColor";

  const textClass = (status: boolean) =>
    status ? "text-black" : "text-darkGreyColor";

  return (
    <>
      <div className=" mx-1440">
        <div className="bg-white flex items-center justify-between py-3 shadow-md pe-4">
          <div></div>
          <div className="flex items-center justify-center py-2 pe-5">
            {/* Order Section */}
            <span
              className={`${numClass(
                orderStep
              )} step_num border-2 rounded-full flex w-7 h-7 justify-center`}
            >
              1
            </span>
            <p
              className={`${textClass(orderStep)} ps-3 text-xl text-greyColor`}
            >
              Order
            </p>
            <div
              className={`${lineClass(
                paymentStep
              )} horizontal-line flex w-vw-21 bg-primaryColor mx-4`}
            ></div>

            {/* Payment Section */}
            <span
              className={`${numClass(
                paymentStep
              )} step_num border-2 rounded-full flex w-7 h-7 justify-center`}
            >
              2
            </span>
            <p
              className={`${textClass(
                paymentStep
              )} ps-3 text-xl text-greyColor`}
            >
              Payment
            </p>
            <div
              className={`${lineClass(
                doneStep
              )} horizontal-line flex w-vw-21 bg-primaryColor mx-4`}
            ></div>

            {/* Done Section */}
            <span
              className={`${numClass(
                doneStep
              )} border-2 rounded-full flex w-7 h-7 justify-center`}
            >
              3
            </span>
            <p className={`${textClass(doneStep)} ps-3 text-xl text-greyColor`}>
              Done
            </p>
          </div>

          <a className="py-2 px-4" href="#">
            <FontAwesomeIcon icon={faX} style={{ color: "#505153" }} />{" "}
          </a>
        </div>
        <div className="max-w-screen-lg mx-auto mb-2 mt-4 w-full ">
          <div className="p-3 bg-white sm:flex block text items-center justify-center">
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#eda345" }}
              className="fa-7x me-4"
            />
            <div className="">
              <p className="">Payment Successfully!</p>
              <p className="text-gray-400">
                Your order will be ready within - 15 min
              </p>
            </div>
          </div>
        </div>
        <div className="md:px-20 px-3 py-4 bg-white max-w-screen-lg mx-auto w-full">
            <div className=" flex items-center ">
              <p className="font-medium text-lg ">Table 1</p>
              <FontAwesomeIcon
                icon={faUserGroup}
                style={{ color: "#eda345" }}
                className="mx-2"
              />
              3 pax
            </div>
            <div className=" md:flex block justify-between gap-4">
              <div>
                <table className="w-full">
                  <tbody>
                    <tr className="">
                      <td className="w-1/2 py-2">
                        <span className="font-bold">1.</span> Ultimate Beef
                        Bliss Burger
                      </td>
                      <td className="w-1/4 text-right py-2">x1</td>
                      <td className="w-1/4 text-right py-2">RM 17.99</td>
                    </tr>
                    <tr>
                      <td className="w-1/2 py-2">
                        <span className="font-bold">2.</span> Coca Cola
                      </td>
                      <td className="w-1/4 text-right py-2">x1</td>
                      <td className="w-1/4 text-right py-2">RM 5.99</td>
                    </tr>
                  </tbody>
                </table>
                <div className="border-b-2 border-t-2 grid grid-cols-2 gap-4 py-3">
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <p>{item.label}</p>
                      <p className="text-end">{item.amount}</p>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-between font-semibold border-double border-b-4 py-3">
                  <p>Total</p>
                  <p>RM 25.21</p>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4 py-3">
                  <div>
                    <p>Order ID</p>
                    <p>Order Type</p>
                    <p>Payment method</p>
                    <p>Table number</p>
                    <p>Date</p>
                  </div>
                  <div>
                    <p>WOCSBL</p>
                    <p>Table order as soon as possible</p>
                    <p>Debit / Credit Card</p>
                    <p>12</p>
                    <p>05/10/2023</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default menu;
