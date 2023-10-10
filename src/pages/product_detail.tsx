import {
  faCreditCard,
  faMinus,
  faPlus,
  faUserGroup,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./product_detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="full-content flex flex-col">
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

        {/* Payment Section */}
        <div className="container-xl">
          <div className="flex justify-between py-4">
            <div className="bg-white col-span-8 px-9 py-3 w-142">
              <div>
                <p className="title-label mb-2 font-medium">Payment</p>
                {/* Payment Method */}
                <section className="radio-section">
                  <div className="radio-list w-full">
                    {/* Radio */}
                    <div className="radio-item">
                      <input
                        type="radio"
                        name="radio"
                        id="bank-card"
                        defaultChecked
                      />
                      <label htmlFor="bank-card">
                        <div className="flex items-center justify-between font-medium">
                          Debit / Credit Card
                          <img
                            className="w-7 h-7 ml-2"
                            src="./src/assets/img/card-payment.png"
                            alt=""
                          />
                        </div>
                      </label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" name="radio" id="cash" />
                      <label htmlFor="cash">
                        <div className="flex items-center justify-between font-medium">
                          Cash
                          <img
                            className="w-7 h-7 ml-2"
                            src="./src/assets/img/online-banking.png"
                            alt=""
                          />
                        </div>
                      </label>
                    </div>
                    <div className="radio-item">
                      <input type="radio" name="radio" id="online-banking" />
                      <label htmlFor="online-banking">
                        <div className="flex items-center justify-between font-medium">
                          Online Banking
                          <img
                            className="w-7 h-7 ml-2"
                            src="./src/assets/img/cash-payment.png"
                            alt=""
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
              <div className="flex justify-between py-5">
                <div>
                  <p className="title-label font-medium">Order Type</p>
                  <div className="radio-item pt-2">
                    <input type="radio" name="radio" id="table-order" />
                    <label htmlFor="table-order">
                      <div className="flex items-center justify-between font-medium">
                        Table Order
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="title-label font-medium">When</p>
                  <div className="radio-item pt-2">
                    <input type="radio" name="radio" id="soon" />
                    <label htmlFor="soon">
                      <div className="flex items-center justify-between font-medium">
                        As Soon As Possible
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ms-0 md:!ms-5 bg-white w-1/3 me-28">
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
    </>
  );
}

export default product_detail;
