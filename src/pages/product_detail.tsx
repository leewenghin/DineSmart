import {
  faMinus,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from "react-bootstrap/Accordion";

import "./product_detail.css";

const quantity = ["None", "1", "2", "3", "4", "5"];

interface Quantity {
  quantity: string[];
}

function product_detail() {
  return (
    <>
      <div className="container mx-auto sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex items-center flex-col">
        <div className="object-fill max-w-sm flex flex-col">
          <img src="./src/assets/img/beef-bliss.jpg" className="object-fill" />

          <div className="name-quantity flex max-w-sm justify-between my-4">
            <div className="font-medium text-2xl flex-1">
              Ultimate Beef Bliss Burger
            </div>

            <div className="quantity flex flex-1 items-center justify-end">
              <FontAwesomeIcon icon={faMinus} />
              <div className="border-solid flex justify-center items-center border-2 rounded-full w-2 h-9 mx-3 px-3 m-auto">
                1
              </div>

              <FontAwesomeIcon icon={faPlus} style={{ color: "#eda345" }} />
            </div>
          </div>

          <div className="bg-primaryColor font-medium py-1 ps-2">
            Change from Ultimate Beef Bliss
          </div>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Beef Bliss Sauce</Accordion.Header>
              <Accordion.Body>
                <div className="grid grid-cols-5 gap-4">
                  {quantity.map((name, index) => (
                    <button key={index}>{name}</button>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Lettuce</Accordion.Header>
              <Accordion.Body>
                <div className="grid grid-cols-5 gap-4">
                  <button>None</button>
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default product_detail;
