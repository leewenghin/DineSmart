import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function product_detail() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <img
          src="./src/assets/img/beef-bliss.jpg"
          className="object-fill w-64"
        />
      </div>
      <div>
        <h1 className="text-primaryColor">Ultimate Beef Bliss Burger</h1>
      </div>
    </>
  );
}

export default product_detail;
