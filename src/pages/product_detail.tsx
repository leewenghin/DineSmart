import { faCreditCard, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./product_detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function product_detail() {
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
      : "border-greyColor text-greyColor";

  const lineClass = (status: boolean) =>
    status ? "bg-primaryColor" : "bg-greyColor";

  const textClass = (status: boolean) =>
    status ? "text-black" : "text-greyColor";

  return (
    <>
      <div className="flex items-center justify-between py-3 shadow-md pe-4">
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
          <p className={`${textClass(orderStep)} ps-3 text-xl text-greyColor`}>
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
            className={`${textClass(paymentStep)} ps-3 text-xl text-greyColor`}
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
        {/* <FontAwesomeIcon className="" icon={faX} /> */}
        <a className="py-2 px-4" href="#">
          <FontAwesomeIcon icon={faX} style={{ color: "#505153" }} />{" "}
        </a>
      </div>
      {/* Payment Option */}
      <div className="content">
        <div className="left-box">
          <p>Payment</p>
          <div className="payment-method flex justify-between">
            <div className="left-payment flex">
              svg
              <p>Debit / Credit Card</p>
            </div>
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
        </div>
      </div>
    </>
  );
}

export default product_detail;
