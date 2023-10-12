import {
  faAnglesRight,
  faCircleCheck,
  faCreditCard,
  faMinus,
  faPlus,
  faUserGroup,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/product_detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const items = [
  { label: "Subtotal", amount: "RM 20.99" },
  { label: "Service Charge 10%", amount: "RM 0.01" },
  { label: "Processing Fee 3%", amount: "RM 0.63" },
  { label: "Rounding Adj", amount: "RM 0.01" },
];

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
      : "border-darkGreyColor text-darkGreyColor";

  const lineClass = (status: boolean) =>
    status ? "bg-primaryColor" : "bg-darkGreyColor";

  const textClass = (status: boolean) =>
    status ? "text-black" : "text-darkGreyColor";

  return (
    <>
      <div className="full-content flex flex-col container">
        <div className="md:flex justify-center block">
          <div className="lg:!px-20 px-3 py-4 bg-white  md:w-3/5 ">
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
                      <span className="font-bold">1.</span> Ultimate Beef Bliss
                      Burger
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
          <div className="md:bg-gradient-to-t sm:bg-gradient-to-r bg-gradient-to-t from-primaryColor from-50% to-lightOrangeColor  md:w-2/5 sm:flex md:!flex-col sm:flex-row-reverse block items-center">
            <img
              src="../src/assets/img/money.png"
              alt=""
              className="p-3 sm:w-full h-2/3 object-scale-down mx-auto"
            />
            <p className="text-white font-medium sm:text-lg text-basic p-4 h-1/3 sm:!text-start text-center">
              Thanks for ordering. Please pay at the counter to complete your
              order.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default product_detail;
