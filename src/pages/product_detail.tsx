import {
  faAnglesRight,
  faCreditCard,
  faMinus,
  faPlus,
  faUserGroup,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/product_detail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  {
    orderstep: false,
    paymentStep: false,
    doneStep: false,
  },
];

function product_detail() {
  return (
    <>
      <div className="full-content flex flex-col">
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
            <div className="bg-white col-span-8 px-2 sm:!px-3 md:!px-8 py-3 md:w-142">
              <div>
                <p className="title-label mb-2">Payment Method</p>
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
                        <div className="flex items-center justify-between">
                          <p>Debit / Credit Card</p>
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
                        <div className="flex items-center justify-between">
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
                        <div className="flex items-center justify-between">
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
              <div className="md:flex justify-between md:py-5">
                <div className="py-3 md:!py-0">
                  <p className="title-label">Order Type</p>
                  <div className="radio-item pt-2">
                    <input
                      type="radio"
                      name="table-order"
                      id="table-order"
                      defaultChecked
                    />
                    <label htmlFor="table-order">
                      <div className="flex items-center justify-between">
                        Table order
                      </div>
                    </label>
                  </div>
                </div>
                <div className="pb-3 lg:pb-0">
                  <p className="title-label">Order Time</p>
                  <div className="radio-item pt-2">
                    <input type="radio" name="time" id="soon" defaultChecked />
                    <label htmlFor="soon">
                      <div className="flex items-center justify-between">
                        As soon as possible
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:!ms-5 w-full md:w-142 lg:w-1/3 mt-4 lg:!mt-0 md:block">
              <div className="flex flex-column pt-3 pb-5 px-3 md:!px-8 md:py-3 lg:p-3 bg-white">
                <p className="text-lg ">Table 1</p>
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
}

export default product_detail;
