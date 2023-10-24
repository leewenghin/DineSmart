import {
  faAngleRight,
  faUserGroup,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../assets/css/card_payment.css";

const items = [
  { label: "Subtotal", amount: "RM 20.99" },
  { label: "Service Charge 10%", amount: "RM 0.01" },
  { label: "Processing Fee 3%", amount: "RM 0.63" },
  { label: "Rounding Adj", amount: "RM 0.01" },
];

const card_payment = () => {
  return (
    <>
      <div className="full-content">
        <div className="bg-white flex items-center justify-between py-3 shadow-md px-2 md:px-4">
          {/* Progress bar */}
          <section className="step-wizard">
            <ul className="step-wizard-list">
              <li className="step-wizard-item">
                <span className="progress-count">1</span>
                <span className="progress-label">Order</span>
              </li>
              <li className="step-wizard-item current-item">
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
        <div className="my-1 flex lg:block justify-center items">
          <div className="px-3 lg:flex justify-between w-full md:w-auto pt-4 pb-28 xl:mx-12 2xl:mx-44">
            <div className="progress-title"></div>
            <div className="bg-white col-span-8 px-2 sm:!px-3 md:!px-8 py-3 md:w-142 rounded overflow-hidden shadow-sm">
              <p className="py-2 mb-1 font-medium text-lg">
                Payment Information
              </p>

              <form>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-x-1 gap-y-1 mb-6">
                  <label
                    htmlFor="email"
                    className="block col-span-2 mb-1 text-sm text-gray-900 dark:text-white"
                  >
                    Card Information
                  </label>
                  <input
                    type="number"
                    id="email"
                    className="col-span-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                  <input
                    type="number"
                    id="email"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                    placeholder="MM / YY"
                    required
                  />
                  <input
                    type="number"
                    id="cvc"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                    placeholder="CVC"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-6 md:gap-x-5 gap-y-5 mb-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Cardholder name
                      {/* (Full name as displayed on card)* */}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                      placeholder="Elon Musk"
                      required
                    />
                  </div>

                  <div className="col-span-4 md:col-span-2">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm text-gray-900 dark:text-white"
                    >
                      Select an option
                    </label>
                    <select
                      id="countries"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
                    >
                      <option defaultValue={""}>Choose a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end lg:pt-20 xl:pt-5">
                  <button
                    type="submit"
                    className="flex items-center bg-primaryColor hover:bg-darkOrangeColor px-3 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
                  >
                    <p>Pay</p>
                    <div className="ps-2">
                      <img
                        className="w-4 h-4"
                        src="./src/assets/img/pay.png"
                        alt=""
                      />
                    </div>
                    <div className="ps-4">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:!ms-5 w-full md:w-142 lg:w-1/3 mt-4 lg:!mt-0 md:block">
              <div className="bg-white px-2 sm:!px-3 md:!px-8 py-3 overflow-hidden shadow-sm">
                <div className=" flex items-center ">
                  <p className="font-medium text-lg ">Table 1</p>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "#eda345" }}
                    className="mx-2"
                  />
                  3 pax
                </div>
                <div className=" block justify-between gap-4 border-t-2   ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default card_payment;
