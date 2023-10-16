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
        <div className="container-fluid md:container my-1 flex lg:block justify-center items">
          <div className="lg:flex justify-between w-full md:w-auto pt-4 pb-28 xl:mx-12 2xl:mx-44">
            <div className="progress-title"></div>
            <div className="bg-white col-span-8 px-2 sm:!px-3 md:!px-8 py-3 md:w-142 rounded overflow-hidden shadow-sm">
              <form>
                <p className="py-2 font-medium text-lg">Payment Information</p>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label text-sm"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control text-sm"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label text-sm"
                  >
                    Card Information
                  </label>
                  <input
                    type="email"
                    className="form-control text-sm mb-1"
                    id="exampleFormControlInput1"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>

                <div className="input-group mb-3 text-sm">
                  <input
                    type="text"
                    className="form-control text-sm"
                    placeholder="MM / YY"
                    aria-label="Username"
                  />
                  <input
                    type="text"
                    className="form-control text-sm"
                    placeholder="CVC"
                    aria-label="Server"
                  />
                </div>

                <div className="input-group mb-3 flex">
                  <div className="w-full sm:w-2/3 sm:pe-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label text-sm"
                    >
                      Cardholder name
                    </label>
                    <input
                      type="email"
                      className="form-control text-sm"
                      id="exampleFormControlInput1"
                      placeholder="Lee Mui Ju"
                    />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label text-sm"
                    >
                      Country or region
                    </label>
                    <select
                      className="form-select text-sm"
                      aria-label="Default select example"
                    >
                      <option selected>Malaysia</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </form>
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
