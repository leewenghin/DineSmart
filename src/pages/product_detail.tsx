import {
  faMinus,
  faPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./product_detail.css";

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

            <div className="quantity flex items-center flex-1 justify-end">
              <FontAwesomeIcon icon={faMinus} />
              <div className="border-solid flex items-center border-2 rounded-full h-9 text-center mx-3 px-3 m-auto">
                1
              </div>

              <FontAwesomeIcon icon={faPlus} style={{ color: "#eda345" }} />
            </div>
          </div>

          <div>Remove from Ultimate Beef Bliss</div>
        </div>
      </div>
    </>
  );
}

export default product_detail;
