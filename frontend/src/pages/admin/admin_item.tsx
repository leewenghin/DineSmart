import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertModal from "../../components/admin/alert_modal";
import CU_Modal from "../../components/admin/cu_modal";
import DeleteModal from "../../components/admin/delete_modal";

type TField = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number | null;
  tag: number[];
  published: boolean;
  foodcategory_id: number;
};

// Define the Item type
type TCategory = Pick<TField, "id" | "name">;
type TItem = Omit<TField, "foodcategory_id">;
type TSubmitItem = Omit<TField, "id">;

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
    <div className="dine-method text-xl relative" key={index}>
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

      <div className="card rounded overflow-hidden shadow-md border-1 border-gray-300 h-full max-w-sm relative">
        <div className="image relative">
          <div className="flex w-full justify-center items-center p-3">
            <img
              className={`image-img w-full h-36 cursor-pointer rounded-md ${
                item.image ? "bg-transparent" : "bg-imageColor"
              }`}
              src={
                item.image
                  ? item.image.toString()
                  : "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={item.name}
            />
          </div>
          <div className="image-overlay absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center opacity-0 duration-300">
            <button
              type="button"
              onClick={toggleUpdateModal}
              className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm w-28 py-2.5 text-center dark:focus:ring-orange-900"
            >
              Edit
            </button>
          </div>
        </div>
        <div id="card-text" className="card-text px-3 pb-12">
          <div className="w-full flex">
            <div className="w-full">
              <p className="mr-2 mb-1 break-words capitalize">{item.name}</p>
              <p className="mr-2 mb-2 text-base w-full">
                {item.description} items
              </p>
              {item.published.toString()}

              <div className="absolute bottom-5 right-5 form-check form-switch flex justify-end text-2xl">
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
    </div>
  );
};

const admin_item = ({ changeIP }: { changeIP: string }) => {
  const { foodmenu_id } = useParams();

  const { foodcategory_id } = useParams();
  const FoodCategoryId = foodcategory_id ? parseInt(foodcategory_id) : 0; // Provide a default value, 0 in this case

  const getMenuLink = `http://${changeIP}:8000/api/foodmenus/?id=${foodmenu_id}`;
  const getCategoryLink = `http://${changeIP}:8000/api/foodcategories/?id=${foodcategory_id}`;
  const getItemLink = `http://${changeIP}:8000/api/fooditems/?foodcategory_id=${foodcategory_id}`;
  const setItemLink = `http://${changeIP}:8000/api/fooditems/`;

  const [menuList, setMenuList] = useState<TCategory[]>([]);
  const [categoryList, setCategoryList] = useState<TCategory[]>([]);
  const [itemList, setItemList] = useState<TItem[]>([]); // Provide type annotation for taskList
  const [newItem, setNewItem] = useState<TSubmitItem>({
    // For reset the field
    name: "",
    description: "",
    image: null,
    price: null,
    tag: [],
    published: false,
    foodcategory_id: FoodCategoryId,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // For toggle modal purpose
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For toggle modal purpose
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For toggle modal purpose
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [updateItem, setUpdateItem] = useState<TSubmitItem[]>([]);
  const [itemID, setItemID] = useState<number | null>(null); // Keep the menuID when press edit button
  const [itemIndex, setItemIndex] = useState<number | null>(null); // Keep the menuIndex when press edit button
  const [isChecked, setIsChecked] = useState(false); // For modal published checkbox purpose
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Specify the type as HTMLInputElement | null and initialize it with null

  const [image, setImage] = useState<File | null>(null); // For modal image purpose
  const [nameAlert, setNameAlert] = useState<string | null>(null); // For form warning message
  const [priceAlert, setPriceAlert] = useState<string | null>(null); // For form warning message
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success alert message
  const [isSave, setSave] = useState(false); // To detect whether press save button

  // ==================== Toggle Method ====================
  // Modal toggler
  const toggleModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleIDModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    itemID: number,
    index: number
  ) => {
    setIsModalOpen(!isModalOpen);
    setSelectedItemIndex(index);
    setItemID(itemID);
    setItemIndex(index);
  };
  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  // Fetch data array from table method
  const fetchList = (
    getLink: string,
    setList: any,
    setList2?: (data: any) => void
  ) => {
    fetch(getLink)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        if (setList2) {
          setList2(data);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  // Fetch & set data array from category table method
  const fetchSetItemList = (event: FormEvent) => {
    return new Promise((resolve, reject) => {
      event.preventDefault();

      const formData = new FormData();
      if (newItem.image) {
        // Ensure that the 'image' field is a valid File
        if (newItem.image instanceof File) {
          formData.append("image", newItem.image);
          console.log("Success image file");
        } else {
          console.error("Invalid image file");
          return;
        }
      } else {
        formData.append("image", "");
      }

      formData.append("name", newItem.name);
      formData.append(
        "price",
        (newItem.price !== null && !Number.isNaN(newItem.price)) ||
          newItem.price == 0
          ? newItem.price.toString()
          : ""
      );

      newItem.tag.forEach((tag) => {
        formData.append("tag", tag.toString());
        console.log("Tags: ", tag);
      });

      console.log("This is price: ", newItem.price);
      console.log("This is tags : ", newItem.tag);
      console.log("This is published: ", newItem.published);
      formData.append("description", newItem.description);
      formData.append("published", newItem.published.toString());
      formData.append("foodcategory_id", newItem.foodcategory_id.toString());

      fetch(setItemLink, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // return response.json(); // Parse the JSON data if the response is valid
            const data = response.json();
            resolve(data); // Resolve the Promise with the fetched data
          } else {
            // console.log("This is image: ", image);
            return response.json().then((errorData) => {
              if (errorData.name) {
                const errorMessage = errorData.name[0];
                console.error("Error (Name):", errorMessage);

                // Show an alert message
                setNameAlert(errorMessage);
              }
              if (errorData.price) {
                const errorMessage = errorData.price[0];
                console.error("Error (price):", errorMessage);

                // Show an alert message
                setPriceAlert(errorMessage);
              }
              throw new Error(`Response not OK. Status: ${response.status}`);
            });
          }
        })
        .then(() => {
          fetchList(getItemLink, setItemList);
          fetchList(getItemLink, setUpdateItem);
          setNewItem({
            name: "",
            description: "",
            image: null,
            price: null,
            tag: [],
            published: false,
            foodcategory_id: FoodCategoryId,
          }); // Clear the input fields
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const fetchSetItemIDList = (
    itemID: number,
    index: number,
    updatedCategoryList: TItem[]
  ) => {
    fetch(`${setItemLink}${itemID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: updatedCategoryList[index].published }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON data if the response is valid
        } else {
          throw new Error(`Response not OK. Status: ${response.status}`);
        }
      })
      .then(() => {
        fetchList(getItemLink, setItemList);
        fetchList(getItemLink, setUpdateItem);
      })
      .catch((error) => console.error("Error updating status: ", error));
  };

  const fetchUpdateItemIDList = (event: FormEvent) => {
    console.log("Fetch id: ", itemID);
    console.log("Fetch index: ", itemIndex);

    return new Promise((resolve, reject) => {
      const updateItemList = updateItem[itemIndex ?? 0];

      event.preventDefault();

      const formData = new FormData();
      if (updateItemList.image) {
        // Ensure that the 'image' field is a valid File
        const image = updateItemList.image;

        if (image instanceof File) {
          formData.append("image", image);
          console.log("Success image file");
          console.log("This is image: ", image);
        }
      } else {
        formData.append("image", "");
      }

      formData.append("name", updateItemList.name);
      formData.append("description", updateItemList.description);
      formData.append(
        "price",
        updateItem?.[itemIndex ?? 0]?.price?.toString() ?? ""
      );

      updateItemList.tag.forEach((tag) => {
        formData.append("tag", tag.toString());
        console.log("Tags: ", tag);
      });

      console.log("This is tags: : ", updateItemList.tag);
      console.log("Test2", updateItemList);
      console.log("Test3", formData);

      formData.append("published", updateItemList.published.toString());
      formData.append(
        "foodcategory_id",
        updateItemList.foodcategory_id.toString()
      );

      console.log("Name: ", updateItemList.name);
      console.log("description: ", updateItemList.description);
      console.log("Price: ", updateItem?.[itemIndex ?? 0]?.price?.toString());
      console.log("published: ", updateItemList.published.toString());
      console.log(
        "foodcategory_id: ",
        updateItemList.foodcategory_id.toString()
      );

      fetch(`${setItemLink}${itemID}/`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // return response.json(); // Parse the JSON data if the response is valid
            console.log("This is image: ", image);

            const data = response.json();
            resolve(data); // Resolve the Promise with the fetched data
          } else {
            return response.json().then((errorData) => {
              if (errorData.name) {
                const errorMessage = errorData.name[0];
                console.error("Error (Name):", errorMessage);

                // Show an alert message
                setNameAlert(errorMessage);
              }
              if (errorData.price) {
                const errorMessage = errorData.price[0];
                console.error("Error (price):", errorMessage);

                // Show an alert message
                setPriceAlert(errorMessage);
              }
              throw new Error(`Response not OK. Status: ${response.status}`);
            });
          }
        })
        .then(() => {
          fetchList(getItemLink, setItemList);
          fetchList(getItemLink, setUpdateItem);
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================
  // Method to hide the alert message
  const hideFormAlert = (setFormAlert: (value: string | null) => void) => {
    setFormAlert(null);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  const handlePublished = (itemID: number, index: number) => {
    const updatedCategoryList = [...itemList];
    updatedCategoryList[index].published =
      !updatedCategoryList[index].published;

    // Call the fetchSetItemIDList method to perform the PATCH request
    fetchSetItemIDList(itemID, index, updatedCategoryList);
  };

  const handleTagChangeWithParameter = (tagValue: number) => {
    handleTagChange(tagValue);
  };

  const handleTagChangeWithParameterEdit = (tagValue: number) => {
    handleTagChangeEdit(tagValue);
  };

  const handleTagChange = (tagValue: number) => {
    const { tag } = newItem;
    let createdArray = { ...newItem };

    if (tag.includes(tagValue)) {
      // If the tag is already in the list, remove it
      createdArray = {
        ...newItem,
        tag: tag.filter((item) => item !== tagValue),
      };
    } else {
      // If the tag is not in the list, add it
      createdArray = {
        ...newItem,
        tag: [...tag, tagValue],
      };
    }
    setNewItem(createdArray);
  };

  const handleTagChangeEdit = (tagValue: number) => {
    const index = itemIndex ?? 0;
    const updatedArray = [...updateItem];
    const existingTags = updatedArray[index].tag;

    // Check if the tagValue is not already in the existing tags
    if (existingTags.includes(tagValue)) {
      updatedArray[index] = {
        ...updatedArray[index],
        tag: existingTags.filter((item) => item !== tagValue),
      };
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        tag: [...existingTags, tagValue],
      };

      console.log("index:", index);
      console.log("tagValue:", tagValue);
      console.log("updatedArray:", updatedArray);
    }

    // Update the state with the new array
    setUpdateItem(updatedArray);
  };

  const handleInputChangeCreate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = event.target;

    setIsChecked(event.target.checked);

    if (name == "name" && value !== null) {
      setNewItem({ ...newItem, [name]: value });
      hideFormAlert(setNameAlert); // Remove alert when there's a value
      console.log("name: ", value);
    }
    if (name == "description") {
      setNewItem({ ...newItem, [name]: value });
    }
    if (name == "price" && value !== null) {
      try {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          setNewItem({ ...newItem, [name]: numericValue });
          hideFormAlert(setPriceAlert);
          console.log("price: ", value);
        } else {
          setNewItem({ ...newItem, [name]: null });
          console.error("Invalid numeric value:", value);
        }
      } catch (error) {
        console.error("Error while parsing numeric value:", error);
      }
    }
    if (name == "published") {
      // Handle the "published" property separately
      setNewItem({ ...newItem, [name]: checked });
    }
    if (name == "image") {
      if (event.target && event.target.files) {
        const selectedImage = event.target.files[0];
        setNewItem({ ...newItem, [name]: selectedImage });
      } else {
        // Handle the case when the user canceled the file selection
        console.log("File selection canceled");
      }
    }
  };

  const handleInputChangeEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, checked } = event.target;

    setIsChecked(event.target.checked);

    const assignInput = (valueType: string | number | boolean | File) => {
      updatedInputValues[index] = {
        ...updatedInputValues[index],
        [name]: valueType,
      };
    };

    const updatedInputValues = [...updateItem];
    if (name === "name" || name === "description") {
      if (value !== null || value !== "") {
        assignInput(value);
        hideFormAlert(setNameAlert);
      }
    }
    if (name === "price" && value !== null) {
      const numericValue = parseFloat(value);
      assignInput(numericValue);
      hideFormAlert(setPriceAlert); // Remove alert when there's a value
    }
    if (name === "published") {
      assignInput(checked);
    }

    if (name === "image") {
      if (event.target && event.target.files) {
        const selectedImage = event.target.files[0];
        assignInput(selectedImage);
        console.log("Image:", selectedImage.name);
      } else {
        // Handle the case when the user canceled the file selection
        console.log("File selection canceled");
      }
    }
    setUpdateItem(updatedInputValues);
  };

  const handleCancel = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    resetNewItem?: boolean,
    resetUpdateItem?: boolean
  ) => {
    // Clear the form data by setting it to its initial state
    if (resetNewItem) {
      setNewItem({
        name: "",
        description: "",
        image: null,
        price: null,
        tag: [],
        published: false,
        foodcategory_id: FoodCategoryId,
      });
    }
    if (resetUpdateItem) {
      fetchList(getItemLink, setUpdateItem);
    }

    toggleModal(isModalOpen, setIsModalOpen);
    hideFormAlert(setNameAlert);
    hideFormAlert(setPriceAlert);
  };

  // Submit form logic
  const handleSubmit = async (event: React.FormEvent) => {
    try {
      await fetchSetItemList(event); // Wait for fetchSetCategoryList to complete
      if (!nameAlert) {
        if (isSave) {
          handleCancel(isCreateModalOpen, setIsCreateModalOpen, true); // Reset the field list and exit modal
          setSave(false);
        }
        console.log(alertMessage);
        setAlertMessage("Successful Created"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetCategoryList operation
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    try {
      await fetchUpdateItemIDList(event); // Wait for fetchSetMenuList to complete
      if (!nameAlert || !priceAlert) {
        handleCancel(isUpdateModalOpen, setIsUpdateModalOpen); // Reset the field list and exit modal
        console.log(alertMessage);
        setAlertMessage("Successful Updated"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetMenuList operation
      console.error("Error:", error);
    }
  };

  const fetchDeleteItemIDList = (itemID: number) => {
    return new Promise((resolve, reject) => {
      fetch(`${setItemLink}${itemID}/`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          if (response.status === 204) {
            resolve(true);
            return;
          }
          return response.json;
        })
        .then(() => {
          fetchList(getItemLink, setItemList);
          fetchList(getItemLink, setUpdateItem);
        })
        .catch((error) => {
          console.error("Error deleting task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const handleDelete = async (itemID: number) => {
    try {
      await fetchDeleteItemIDList(itemID); // Wait for fetchSetMenuList to complete
      if (!nameAlert && !priceAlert) {
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

  const handleSave = () => {
    setSave(true);
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

  // Use useEffect to trigger modal open when the component is mounted
  useEffect(() => {
    fetchList(getMenuLink, setMenuList);
  }, []);

  useEffect(() => {
    fetchList(getCategoryLink, setCategoryList);
  }, []);

  useEffect(() => {
    fetchList(getItemLink, setItemList, setUpdateItem);
  }, []);

  // useEffect(() => {
  //   fetchList(getItemLink, setUpdateItem);
  // }, [getItemLink, setUpdateItem]);

  useEffect(() => {
    alertMessageTime();
  }, [alertMessage]);

  useEffect(() => {
    handleOverflow();
  }, [isCreateModalOpen, isUpdateModalOpen, isDeleteModalOpen]);

  return (
    <div className="content px-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="title text-2xl font-bold my-2">Catering Items</p>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to={"/admin_panel/menu"}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Menus
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  {menuList.map((item, index) => (
                    <Link
                      to={`/admin_panel/category/${foodmenu_id}`}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                      key={index}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  {categoryList.map((item, index) => (
                    <span
                      className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                      key={index}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <button
          type="button"
          onClick={() => toggleModal(isCreateModalOpen, setIsCreateModalOpen)}
          className="text-white bg-gradient-to-br from-orange-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center"
        >
          Add Item
        </button>
      </div>
      <div className="content-box w-full py-8 px-8 shadow-sm rounded-xl">
        {/* <p className="subtitle pb-3 text-2xl font-bold  ">Dine Method</p> */}
        <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 font-medium">
          {itemList.map((item, index) => (
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

      {/* <!-- Main modal --> */}
      {isCreateModalOpen && (
        <CU_Modal
          page="Item"
          name="Create"
          list={newItem}
          fileInputRef={fileInputRef}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeCreate(event)
          }
          handleTagChange={handleTagChangeWithParameter}
          isChecked={isChecked}
          handleCancel={() =>
            handleCancel(isCreateModalOpen, setIsCreateModalOpen, true)
          }
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          nameAlert={nameAlert}
          priceAlert={priceAlert}
        ></CU_Modal>
      )}

      {isUpdateModalOpen && (
        <CU_Modal
          page="Item"
          name="Edit"
          list={updateItem[itemIndex ?? 0]}
          fileInputRef={fileInputRef}
          handleCancel={() =>
            handleCancel(isUpdateModalOpen, setIsUpdateModalOpen, false, true)
          }
          handleSubmit={handleUpdate}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeEdit(event, itemIndex ?? 0)
          }
          handleTagChange={handleTagChangeWithParameterEdit}
          isChecked={isChecked}
          nameAlert={nameAlert}
          priceAlert={priceAlert}
        ></CU_Modal>
      )}

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          handleCancel={() =>
            handleCancel(isDeleteModalOpen, setIsDeleteModalOpen)
          }
          handleDelete={() => handleDelete(itemID ?? 0)}
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

export default admin_item;
