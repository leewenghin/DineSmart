import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertModal from "../../components/admin/alert_modal";
import CU_Modal from "../../components/admin/cu_modal";
import DeleteModal from "../../components/admin/delete_modal";
import variant from "./admin_variant_value";

type TField = {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number | null;
  tag: number[];
  published: boolean;
  foodcategory: number;
};

// Define the Item type
type TCategory = Pick<TField, "id" | "name">;
type TItem = TField;
type TSubmitItem = Omit<TField, "id">;

type TVariantGroup = {
  id: number;
  name: string;
  published: boolean;
};

type TVariantValue = {
  id: number;
  title: number;
  name: string;
  published: boolean;
};

type TSubmitVariant = {
  variants: number | null;
  fooditems: number | null;
  price: number | null;
  sku: number | null;
};

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

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false); // htmlFor toggle modal purpose

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
              {item.published}

              <div className="absolute bottom-5 right-5 form-check form-switch flex justify-end text-2xl">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked={item.published}
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
  const getVariantGroupLink = `http://${changeIP}:8000/api/variantgroup/`;
  const getVariantValueLink = `http://${changeIP}:8000/api/variantvalue/`;
  const setVariantPriceLink = `http://${changeIP}:8000/api/variantprices/`;

  const [menuList, setMenuList] = useState<TCategory[]>([]);
  const [categoryList, setCategoryList] = useState<TCategory[]>([]);
  const [variantGroupList, setVariantGroupList] = useState<TVariantGroup[]>([]);
  const [variantValueList, setVariantValueList] = useState<TVariantValue[]>([]);
  const [itemList, setItemList] = useState<TItem[]>([]); // Provide type annotation htmlFor taskList
  const [newItem, setNewItem] = useState<TSubmitItem>({
    // For reset the field
    name: "",
    description: "",
    image: null,
    price: null,
    tag: [],
    published: false,
    foodcategory: FoodCategoryId,
  });
  const [updateItem, setUpdateItem] = useState<TSubmitItem[]>([]);
  const [newVariant, setNewVariant] = useState<TSubmitVariant[]>([
    {
      // For reset the field
      variants: null,
      fooditems: null,
      price: null,
      sku: null,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // htmlFor toggle create modal purpose
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // htmlFor toggle update modal purpose
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // htmlFor toggle delete modal purpose

  const [isVariantUpdated, setIsVariantUpdated] = useState(false);
  const [isItemUpdated, setIsItemUpdated] = useState(false);
  const [itemID, setItemID] = useState<number | null>(null); // Keep the itemID when press edit button
  const [itemIndex, setItemIndex] = useState<number | null>(null); // Keep the itemIndex when press edit button
  const [variantIndex, setVariantIndex] = useState<number | null>(null); // Keep the itemIndex when press edit button
  const [isChecked, setIsChecked] = useState(false); // htmlFor modal published checkbox purpose
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Specify the type as HTMLInputElement | null and initialize it with null

  const [image, setImage] = useState<File | null>(null); // htmlFor modal image purpose
  const [nameAlert, setNameAlert] = useState<string | null>(null); // htmlFor form warning message
  const [priceAlert, setPriceAlert] = useState<string | null>(null); // htmlFor form warning message
  const [variantPriceAlert, setVariantPriceAlert] = useState<string | null>(
    null
  ); // htmlFor form warning message
  const [variantSkuAlert, setVariantSkuAlert] = useState<string | null>(null); // htmlFor form warning message
  const [variantAlert, setVariantAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // htmlFor success alert message
  const [isSave, setSave] = useState(false); // To detect whether press save button
  const [variantGroup, setVariantGroup] = useState(null);
  const [variantGroupID, setVariantGroupID] = useState(0);
  const [matchVariant, setMatchVariant] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any[]>([]);

  const [isValidateSuccess, setValidateSuccess] = useState(false);
  const [allCombinations, setAllCombinations] = useState<any[]>([]);

  // // Add value and label field htmlFor react-tailwind-select library purpose
  // const newVariantGroupList = variantGroupList
  //   .filter((item) => item.published) // Filter out items where published is false
  //   .map((item) => ({
  //     ...item,
  //     value: item.name,
  //     label: item.name,
  //   }));

  const newVariantGroupList = variantGroupList.map(
    ({ id, name, published }) => ({
      id: id,
      value: name,
      label: name,
      disabled: !published,
    })
  );

  // ==================== Toggle Method ====================
  // Modal toggler
  const toggleModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    itemID?: number,
    index?: number
  ) => {
    setIsModalOpen(!isModalOpen);
    setItemID(itemID ?? null);
    setItemIndex(index ?? null);
  };
  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  // Fetch data array from table method
  const fetchList = (getLink: string, setList: any, setList2?: any) => {
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
      });

      formData.append("description", newItem.description);
      formData.append("published", newItem.published.toString());
      formData.append("foodcategory", newItem.foodcategory.toString());

      fetch(setItemLink, {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
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
          fetchList(getItemLink, setItemList, setUpdateItem);

          setNewItem({
            name: "",
            description: "",
            image: null,
            price: null,
            tag: [],
            published: false,
            foodcategory: FoodCategoryId,
          }); // Clear the input fields
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const fetchSetItemIDList = (itemID: number, isCardchecked: boolean) => {
    fetch(`${setItemLink}${itemID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ published: isCardchecked }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON data if the response is valid
        } else {
          throw new Error(`Response not OK. Status: ${response.status}`);
        }
      })
      .then(() => {
        fetchList(getItemLink, setItemList, setUpdateItem);
      })
      .catch((error) => console.error("Error updating status: ", error));
  };

  const fetchSetVariantList = async () => {
    console.log("Submitted Variant: ", newVariant);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(setVariantPriceLink, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVariant),
        });
        if (response.ok) {
          resolve(response);
        } else {
          return response.json().then((errorDataArray) => {
            console.log("ERROR --------------------------", errorDataArray);
            if (Array.isArray(errorDataArray) && errorDataArray.length > 0) {
              errorDataArray.forEach((errorData) => {
                if (errorData.price) {
                  const errorMessage = errorData.price[0];
                  console.error("Error (price):", errorMessage);
                  // Show an alert message
                  setVariantPriceAlert(errorMessage);
                  console.log("inside priceeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                }
                if (errorData.sku) {
                  const errorMessage = errorData.sku[0];
                  console.error("Error (sku):", errorMessage);
                  // Show an alert message
                  setVariantSkuAlert(errorMessage);
                }
                // Add more conditions for other error fields as needed
              });
            }
            throw new Error(`Response not OK. Status: ${response.status}`);
          });
        }
      } catch (error) {
        console.error("Error:", error);
        reject(error); // Reject the Promise with the error
      }
    });
  };

  const fetchUpdateItemIDList = (event: FormEvent) => {
    console.log("Fetch id: ", itemID);
    console.log("Fetch index: ", itemIndex);

    return new Promise((resolve, reject) => {
      event.preventDefault();

      const updateItemList = updateItem[itemIndex ?? 0];

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
      formData.append("foodcategory", updateItemList.foodcategory.toString());

      console.log("Name: ", updateItemList.name);
      console.log("description: ", updateItemList.description);
      console.log("Price: ", updateItem?.[itemIndex ?? 0]?.price?.toString());
      console.log("published: ", updateItemList.published.toString());
      console.log("foodcategory: ", updateItemList.foodcategory.toString());

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
          fetchList(getItemLink, setItemList, setUpdateItem);
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
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
          fetchList(getItemLink, setItemList, setUpdateItem);
        })
        .catch((error) => {
          console.error("Error deleting task: ", error);
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

  const handlePublished = (itemID: number, isCardchecked: boolean) => {
    // Call the fetchSetItemIDList method to perform the PATCH request]
    fetchSetItemIDList(itemID, isCardchecked);
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

  const handleVariantInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    variants_id?: number
  ) => {
    const { name, value } = event.target;

    const updatedInputValues = [...newVariant];

    const assignInput = (valueType: number) => {
      updatedInputValues[index] = {
        ...updatedInputValues[index],
        [name]: valueType,
      };
    };

    if (name == "price" && value !== null) {
      const numericValue = parseFloat(value);
      console.log("Index -------------", index);
      if (!isNaN(numericValue)) {
        assignInput(numericValue);
        hideFormAlert(setPriceAlert);
        hideFormAlert(setVariantPriceAlert);
      } else {
        assignInput(numericValue);
        console.error("Invalid numeric value:", value);
      }
    }

    if (name == "sku" && value !== null) {
      const numericValue = parseFloat(value);
      console.log("Index -------------", index);
      if (!isNaN(numericValue)) {
        assignInput(numericValue);
        hideFormAlert(setPriceAlert);
        hideFormAlert(setVariantSkuAlert);
      } else {
        assignInput(numericValue);
        console.error("Invalid numeric value:", value);
      }
    }

    if (variants_id) {
      updatedInputValues[index] = {
        ...updatedInputValues[index],
        variants: variants_id, // Update variants_id directly
      };
    }
    console.log("Variants ID ----------------------- ", variants_id);
    setNewVariant(updatedInputValues);
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

      if (value == "") {
        setValidateSuccess(false);
      }
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
          setValidateSuccess(false);
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

    const updatedInputValues = [...updateItem];

    const assignInput = (valueType: string | number | boolean | File) => {
      updatedInputValues[index] = {
        ...updatedInputValues[index],
        [name]: valueType,
      };
    };

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

  const handleSelectChange = (value: any) => {
    console.log("value:", value);
    setVariantGroup(value);
  };

  const handleMatchVariant = (variantGroupID: number) => {
    const variantValueTitle = variantValueList
      .filter(({ published }) => published !== false)
      .map(({ id, title, name }) => ({
        id: id,
        title: title,
        name: name,
      }));

    const matchVariant = variantValueTitle.filter(
      (item) => variantGroupID == item.title
    );

    setMatchVariant(matchVariant);

    console.log("Match variants: ", matchVariant);
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: number,
    title: number
  ) => {
    console.log("Index ", index);
    const value = event.target.value;

    // Create a copy of the selectedOptions array
    const updatedOptions = [...selectedOption];

    // Check if the sub-array for the current index already exists
    if (!updatedOptions[index]) {
      // If it doesn't exist, create an empty array for the current index
      updatedOptions[index] = [];
    }

    // Check if the option is already selected in the current index
    const isSelected = updatedOptions[index].some(
      (option: any) => option.id === id && option.title === title
    );

    // Update the state based on whether the checkbox is checked or unchecked
    if (isSelected) {
      // If already selected, remove from the array
      updatedOptions[index] = updatedOptions[index].filter(
        (option: any) => !(option.id === id && option.title === title)
      );

      // Check if the sub-array becomes empty after removing the option
      if (updatedOptions[index].length === 0) {
        // If empty, remove the sub-array from the main array
        updatedOptions.splice(index, 1);
      }
    } else {
      // If not selected, add to the array
      updatedOptions[index] = [
        ...updatedOptions[index],
        { id, title, name: value },
      ];
    }

    // Now updatedOptions contains the modified array without empty sub-arrays

    // Update the state with the new array of arrays
    setSelectedOption(updatedOptions);
    setNewVariant([
      {
        // For reset the field
        variants: null,
        fooditems: null,
        price: null,
        sku: null,
      },
    ]);

    console.log("Selected ", selectedOption);
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
        foodcategory: FoodCategoryId,
      });
    }
    if (resetUpdateItem) {
      setUpdateItem(itemList);
    }

    toggleModal(isModalOpen, setIsModalOpen);
    hideFormAlert(setNameAlert);
    hideFormAlert(setPriceAlert);
  };

  // useEffect(() => {
  //   if (variantGroup && selectedOption.length == 0) {
  //     setVariantAlert(true);
  //   } else {
  //     setVariantAlert(false);
  //   }
  // }, [variantGroup, selectedOption]);

  // Submit form logic

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (variantGroup) {
        // If variant group has been selected
        if (selectedOption.length == 0) {
          // If no variant value has been selected
          setVariantAlert(true);
        } else {
          // If variant value has been selected
          if (allCombinations.length > 0) {
            const data: any = await fetchSetItemList(event); // Wait for fetchSetCategoryList to complete
            const fooditemsID = newVariant.map((item) => ({
              ...item,
              fooditems: data.id /* your desired value for fooditems */,
            }));
            setNewVariant(fooditemsID);
            setIsVariantUpdated(true);
            setIsItemUpdated(true);
            console.log("Submitted Variant: ", fooditemsID, newVariant);
          }
        }
      } else {
        // If no variant group has been selected
        const data: any = await fetchSetItemList(event); // Wait for fetchSetCategoryList to complete
      }

      if (!nameAlert && !priceAlert && !variantAlert) {
        setIsItemUpdated(true);
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetCategoryList operation
      console.error("Error submitting data:", error);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    try {
      await fetchUpdateItemIDList(event); // Wait htmlFor fetchSetMenuList to complete
      if (!nameAlert && !priceAlert) {
        handleCancel(isUpdateModalOpen, setIsUpdateModalOpen); // Reset the field list and exit modal
        console.log(alertMessage);
        setAlertMessage("Successful Updated"); // Make sure this code is executed
      }
    } catch (error) {
      // Handle any errors that occur during the fetchSetMenuList operation
      console.error("Error:", error);
    }
  };

  const handleDelete = async (itemID: number) => {
    try {
      await fetchDeleteItemIDList(itemID); // Wait htmlFor fetchSetMenuList to complete
      handleCancel(isDeleteModalOpen, setIsDeleteModalOpen);
      // Exit modal
      console.log(alertMessage);
      setAlertMessage("Successful Deleted"); // Make sure this code is executed
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
    fetchList(getItemLink, setItemList, setUpdateItem);
    fetchList(getCategoryLink, setCategoryList);
    fetchList(getVariantGroupLink, setVariantGroupList);
    fetchList(getVariantValueLink, setVariantValueList);
  }, []);

  useEffect(() => {
    alertMessageTime();
  }, [alertMessage]);

  useEffect(() => {
    console.log("Useeffect -----------------", newVariant);

    if (isVariantUpdated) {
      console.log("RUN ======================================");
      fetchSetVariantList();
      setIsVariantUpdated(false);
    }
  }, [newVariant, isVariantUpdated]);

  useEffect(() => {
    handleOverflow();
  }, [isCreateModalOpen, isUpdateModalOpen, isDeleteModalOpen]);

  useEffect(() => {
    if (isItemUpdated && !variantAlert) {
      if (isSave) {
        handleCancel(isCreateModalOpen, setIsCreateModalOpen, true); // Reset the field list and exit modal
        setSave(false);
      }
      console.log(alertMessage);
      setAlertMessage("Successful Created"); // Make sure this code is executed
    }
  }, [isItemUpdated]);

  useEffect(() => {
    if (allCombinations) {
      setVariantAlert(false);
      console.log("Run");
    }
  }, [allCombinations]);

  useEffect(() => {
    if (!variantGroup) {
      // if variantgroup is empty
      setVariantAlert(false); // Reset variant alert
      setSelectedOption([]); // Reset selected value
      setAllCombinations([]); // Reset combinations
    }
  }, [variantGroup]);

  useEffect(() => {
    console.log("Variant price alert:", variantPriceAlert);
    console.log("Variant sku alert:", variantSkuAlert);
  }, [variantPriceAlert, variantSkuAlert]);

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
                toggleModal(
                  isUpdateModalOpen,
                  setIsUpdateModalOpen,
                  item.id,
                  index
                )
              }
              toggleDeleteModal={() =>
                toggleModal(
                  isDeleteModalOpen,
                  setIsDeleteModalOpen,
                  item.id,
                  index
                )
              }
              handlePublished={(event: ChangeEvent<HTMLInputElement>) =>
                handlePublished(item.id, event.target.checked)
              }
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
          variantList={newVariant}
          variantGroup={variantGroup}
          variantGroupList={newVariantGroupList}
          matchVariant={matchVariant}
          selectedOption={selectedOption}
          fileInputRef={fileInputRef}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeCreate(event)
          }
          handleVariantInputChange={handleVariantInputChange}
          handleTagChange={handleTagChangeWithParameter}
          handleSelectChange={handleSelectChange}
          handleMatchVariant={handleMatchVariant}
          handleRadioChange={handleRadioChange}
          isChecked={isChecked}
          handleCancel={() =>
            handleCancel(isCreateModalOpen, setIsCreateModalOpen, true)
          }
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          nameAlert={nameAlert}
          priceAlert={priceAlert}
          variantAlert={variantAlert}
          variantPriceAlert={variantPriceAlert}
          variantSkuAlert={variantSkuAlert}
          isValidateSuccess={isValidateSuccess}
          setValidateSuccess={setValidateSuccess}
          allCombinations={allCombinations}
          setAllCombinations={setAllCombinations}
        ></CU_Modal>
      )}

      {isUpdateModalOpen && (
        <CU_Modal
          page="Item"
          name="Edit"
          list={updateItem[itemIndex ?? 0]}
          variantGroup={variantGroup}
          variantGroupList={newVariantGroupList}
          fileInputRef={fileInputRef}
          handleCancel={() =>
            handleCancel(isUpdateModalOpen, setIsUpdateModalOpen, false, true)
          }
          handleSubmit={handleUpdate}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeEdit(event, itemIndex ?? 0)
          }
          handleTagChange={handleTagChangeWithParameterEdit}
          // handleSelectChange={handleSelectChange}
          isChecked={isChecked}
          nameAlert={nameAlert}
          priceAlert={priceAlert}
        ></CU_Modal>
      )}

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          page={"Item"}
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
