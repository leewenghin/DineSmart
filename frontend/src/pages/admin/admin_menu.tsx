import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import AlertModal from "../../components/admin/alert_modal";
import CU_Modal from "../../components/admin/cu_modal";
import DeleteModal from "../../components/admin/delete_modal";

const cards = [
  { label: "Dine In", items: "20" },
  { label: "Delivery", items: "50" },
  { label: "Take Away", items: "100" },
  { label: "DineConnect Alah hua gua", items: "100" },
];

interface Menu {
  id: number;
  name: string;
  description: string;
  published: boolean;
}

interface submitMenu {
  name: string;
  description: string;
  published: boolean;
}

const Card = ({
  item,
  index,
  toggleUpdateModal,
  toggleDeleteModal,
  handlePublished,
}: any) => {
  const options = [
    { name: "Edit", clickEvent: toggleUpdateModal },
    // { name: "Clone", clickEvent: () => toggleUpdateModal },
    { name: "Delete", clickEvent: toggleDeleteModal },
  ];

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false); // For toggle modal purpose

  const toggleModal = () => {
    setIsOptionModalOpen(!isOptionModalOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (event: React.MouseEvent | MouseEvent) => {
      if (isOptionModalOpen) {
        const targetElement = event.target as HTMLElement;
        if (
          !targetElement ||
          !targetElement.closest(`#dropdownBottomButton${index}`)
        ) {
          setIsOptionModalOpen(false);
        }
      }
    };

    if (isOptionModalOpen) {
      // Add a click event listener to the document
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      // Clean up the event listener when the component unmounts or the modal closes
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOptionModalOpen]);

  return (
    <div className="dine-method text-xl relative">
      <div className="absolute top-0 right-0 z-20">
        <div className="w-24 flex justify-end">
          <button
            id={`dropdownBottomButton${index}`}
            data-dropdown-toggle="dropdownBottom"
            data-dropdown-placement="bottom"
            type="button"
            onClick={toggleModal}
            className="material-symbols-outlined w-10 h-10 rounded-full cursor-pointer flex justify-center content-center flex-wrap select-none"
          >
            more_vert
          </button>
        </div>

        {/* <!-- Dropdown menu --> */}
        {isOptionModalOpen && (
          <div
            id="dropdownBottom"
            key={item.id}
            className="modal w-24 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownBottomButton"
            >
              {options.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={item.clickEvent}
                    className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card rounded overflow-hidden shadow-md border-1 border-gray-300 h-full max-w-full xl:max-w-sm">
        <div className="image relative">
          <img
            className="image-img w-full p-4 cursor-pointer bg-imageColor"
            src="../src/assets/img/admin/tableware.png"
            alt="Sunset in the mountains"
          />
          <div className="image-overlay absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center opacity-0 duration-300">
            <Link to={`/admin_panel/category/${item.id}`}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm w-28 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Enter
              </button>
            </Link>

            <button
              type="button"
              onClick={toggleUpdateModal}
              className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm w-28 py-2.5 text-center dark:focus:ring-orange-900"
            >
              Edit
            </button>
          </div>
        </div>
        <div id="card-text" className="card-text px-6 pt-4 pb-2">
          <div className="w-full flex">
            <div className="w-full">
              <p className="mr-2 mb-1 break-words">{item.name}</p>
              <p className="mr-2 mb-2 text-base w-full break-all">
                {item.description} items
              </p>
              {item.published.toString()}
            </div>
            <div className="flex flex-col items-center justify-center text-2xl pl-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  name="published"
                  type="checkbox"
                  key={item.id}
                  checked={item.published}
                  onChange={handlePublished}
                  value=""
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const dineMethod = ({ changeIP }: { changeIP: string }) => {
  const getMenuLink = `http://${changeIP}:8000/api/foodmenus/`;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // For create toggle modal purpose
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For update toggle modal purpose
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For Delete toggle modal purpose
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [menuList, setMenuList] = useState<Menu[]>([]); // List for store data from menu table
  const [newMenu, setNewMenu] = useState<submitMenu>({
    name: "",
    description: "",
    published: false,
  });
  const [updateMenu, setUpdateMenu] = useState<submitMenu[]>([]);
  const [menuID, setMenuID] = useState<number | null>(null); // Keep the menuID when press edit button
  const [menuIndex, setMenuIndex] = useState<number | null>(null); // Keep the menuIndex when press edit button
  const [isChecked, setIsChecked] = useState(false); // For modal published checkbox purpose
  const [formAlert, setFormAlert] = useState(null); // For form warning message
  const [nameAlert, setNameAlert] = useState<string | null>(null); // For form warning message
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success alert message

  // ==================== Toggle Method ====================
  const toggleModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleIDModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    menuID: number,
    index: number
  ) => {
    setIsModalOpen(!isModalOpen);
    setSelectedItemIndex(index);
    setMenuID(menuID);
    setMenuIndex(index);
  };

  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  const fetchList = (getLink: string, setList: any) => {
    fetch(getLink)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        console.log("Execute times: ", +1);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const fetchSetMenuList = (event: FormEvent) => {
    return new Promise((resolve, reject) => {
      event.preventDefault();

      fetch(getMenuLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenu),
      })
        .then((response) => {
          if (response.ok) {
            // return response.json(); // Parse the JSON data if the response is valid
            const data = response.json();
            resolve(data); // Resolve the Promise with the fetched data
          } else {
            return response.json().then((errorData) => {
              if (errorData.name) {
                const errorMessage = errorData.name[0];
                console.error("Error (Name):", errorMessage);

                // Show an alert message
                setFormAlert(errorMessage);
              }
              throw new Error(`Response not OK. Status: ${response.status}`);
            });
          }
        })
        .then(() => {
          fetchList(getMenuLink, setMenuList);
          fetchList(getMenuLink, setUpdateMenu);
          setNewMenu({
            name: "",
            description: "",
            published: false,
          }); // Clear the input fields
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const fetchSetMenuPublishedIDList = (
    menuID: number,
    index: number,
    updatePublishedList: Menu[]
  ) => {
    fetch(`${getMenuLink}${menuID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: updatePublishedList[index].published }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON data if the response is valid
        } else {
          throw new Error(`Response not OK. Status: ${response.status}`);
        }
      })
      .then(() => {
        fetchList(getMenuLink, setMenuList);
        fetchList(getMenuLink, setUpdateMenu);
      })
      .catch((error) => console.error("Error updating status: ", error));
  };

  const fetchUpdateMenuIDList = (event: FormEvent) => {
    return new Promise((resolve, reject) => {
      event.preventDefault();

      fetch(`${getMenuLink}${menuID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateMenu[menuIndex ?? 0]),
      })
        .then((response) => {
          if (response.ok) {
            // return response.json(); // Parse the JSON data if the response is valid
            const data = response.json();
            resolve(data); // Resolve the Promise with the fetched data
          } else {
            return response.json().then((errorData) => {
              if (errorData.name) {
                const errorMessage = errorData.name[0];
                console.error("Error (Name):", errorMessage);

                // Show an alert message
                setFormAlert(errorMessage);
              }
              throw new Error(`Response not OK. Status: ${response.status}`);
            });
          }
        })
        .then(() => {
          fetchList(getMenuLink, setMenuList);
          fetchList(getMenuLink, setUpdateMenu);
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const fetchDeleteMenuIDList = (menuID: number) => {
    return new Promise((resolve, reject) => {
      fetch(`${getMenuLink}${menuID}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Check if the response has data before parsing it as JSON
          if (response.status === 204) {
            // A 204 response indicates a successful DELETE request with no content.
            resolve(true);
            return;
          }
          return response.json(); // Parse the response if it's not empty
        })
        .then(() => {
          fetchList(getMenuLink, setMenuList);
          fetchList(getMenuLink, setUpdateMenu);
        })
        .catch((error) => {
          console.error("Error deleting task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================
  const hideFormAlert = () => {
    setFormAlert(null);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  const handleInputChangeCreate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = event.target;

    setIsChecked(event.target.checked);

    if (name == "name" || "description") {
      if (value !== null || value !== "") {
        setNewMenu({ ...newMenu, [name]: value });
        hideFormAlert(); // Remove alert when there's a value
      }
    }
    if (name === "published") {
      // Handle the "published" property separately
      setNewMenu({ ...newMenu, [name]: checked });
      console.log("Form Published:", newMenu.published.toString());
    }
  };

  const handleInputChangeEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, checked } = event.target;

    setIsChecked(event.target.checked);

    const assignInput = (valueType: string | boolean) => {
      updatedInputValues[index] = {
        ...updatedInputValues[index],
        [name]: valueType,
      };
    };

    const updatedInputValues = [...updateMenu];
    if (name === "name" || name === "description") {
      if (value !== null || value !== "") {
        assignInput(value);
        hideFormAlert();
      }
    } else {
      assignInput(checked);
    }
    setUpdateMenu(updatedInputValues);
  };

  const handlePublished = (menuID: number, index: number) => {
    const updatePublishedList = [...menuList];
    updatePublishedList[index].published =
      !updatePublishedList[index].published;

    // Call the fetchSetMenuPublishedIDList method to perform the PATCH request
    fetchSetMenuPublishedIDList(menuID, index, updatePublishedList);
  };

  const handleCancel = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    resetNewMenu?: boolean,
    resetUpdateMenu?: boolean
  ) => {
    // Clear the form data by setting it to its initial state
    if (resetNewMenu) {
      setNewMenu({
        name: "",
        description: "",
        published: false,
      });
    }
    // Clear the form data by setting it to its initial state
    if (resetUpdateMenu) {
      fetchList(getMenuLink, setUpdateMenu);
    }

    toggleModal(isModalOpen, setIsModalOpen);
    hideFormAlert();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      await fetchSetMenuList(event); // Wait for fetchSetMenuList to complete
      if (!formAlert) {
        handleCancel(isCreateModalOpen, setIsCreateModalOpen, true); // Reset the field list and exit modal
        console.log(alertMessage);
        setAlertMessage("Successful Created"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetMenuList operation
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    try {
      await fetchUpdateMenuIDList(event); // Wait for fetchSetMenuList to complete
      if (!formAlert) {
        handleCancel(isUpdateModalOpen, setIsUpdateModalOpen); // Reset the field list and exit modal
        console.log(alertMessage);
        setAlertMessage("Successful Updated"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetMenuList operation
      console.error("Error:", error);
    }
  };

  const handleDelete = async (menuID: number) => {
    try {
      await fetchDeleteMenuIDList(menuID); // Wait for fetchSetMenuList to complete
      if (!formAlert) {
        handleCancel(isDeleteModalOpen, setIsDeleteModalOpen);
        // Exit modal
        console.log(alertMessage);
        setAlertMessage("Successful Deleted"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetMenuList operation
      console.error("Error:", error);
    }
  };

  const handleOverflow = () => {
    if (isCreateModalOpen || isUpdateModalOpen || isDeleteModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  };
  // ==================== Handle Method ====================

  // ==================== Alert Method ====================
  const alertMessageTime = () => {
    if (alertMessage) {
      const timeout = setTimeout(hideAlert, 2000); // 5000 milliseconds (5 seconds)

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }
  };
  // ==================== Alert Method ====================

  // ==================== Use Effect ====================
  useEffect(() => {
    fetchList(getMenuLink, setMenuList);
  }, []);

  useEffect(() => {
    fetchList(getMenuLink, setUpdateMenu);
  }, []);

  useEffect(() => {
    alertMessageTime();
  }, [alertMessage]);

  useEffect(() => {
    handleOverflow();
  }, [isCreateModalOpen, isUpdateModalOpen, isDeleteModalOpen]);
  // ==================== Use Effect ====================

  return (
    <div className="content px-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="title text-2xl font-bold my-2">Catering Menus</p>
        </div>

        {/* <!-- Modal toggle --> */}
        <button
          id="updateProductButton"
          onClick={() => toggleModal(isCreateModalOpen, setIsCreateModalOpen)}
          type="button"
          className="text-white bg-gradient-to-br from-orange-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center"
        >
          Add Menu
        </button>
      </div>

      <div className="content-box w-full py-8 px-8 shadow-sm rounded-xl">
        {/* <p className="subtitle pb-3 text-2xl font-bold  ">Dine Method</p> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 font-medium">
          {menuList.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              index={index}
              toggleUpdateModal={() =>
                toggleIDModal(
                  isUpdateModalOpen,
                  setIsUpdateModalOpen,
                  item.id,
                  index
                )
              }
              toggleDeleteModal={() =>
                toggleIDModal(
                  isDeleteModalOpen,
                  setIsDeleteModalOpen,
                  item.id,
                  index
                )
              }
              handlePublished={() => handlePublished(item.id, index)}
            ></Card>
          ))}
        </div>
      </div>

      {/* <!-- Create modal --> */}
      {isCreateModalOpen && (
        <CU_Modal
          page="Menu"
          name={"Create"}
          list={newMenu}
          handleCancel={() =>
            handleCancel(isCreateModalOpen, setIsCreateModalOpen, true)
          }
          handleSubmit={handleSubmit}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeCreate(event)
          }
          isChecked={isChecked}
          nameAlert={formAlert}
        ></CU_Modal>
      )}

      {/* <!-- Update modal --> */}
      {isUpdateModalOpen && (
        <CU_Modal
          page="Menu"
          name={"Edit"}
          list={updateMenu[selectedItemIndex ?? 0]}
          handleCancel={() =>
            handleCancel(isUpdateModalOpen, setIsUpdateModalOpen, false, true)
          }
          handleSubmit={handleUpdate}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeEdit(event, menuIndex ?? 0)
          }
          isChecked={isChecked}
          nameAlert={formAlert}
        ></CU_Modal>
      )}

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          handleCancel={() =>
            handleCancel(isDeleteModalOpen, setIsDeleteModalOpen)
          }
          handleDelete={() => handleDelete(menuID ?? 0)}
        ></DeleteModal>
      )}

      {/* Alert Message */}
      {alertMessage && (
        <AlertModal
          hideAlert={hideAlert}
          alertMessage={alertMessage}
        ></AlertModal>
      )}
    </div>
  );
};

export default dineMethod;
