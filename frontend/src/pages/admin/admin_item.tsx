import { ChangeEvent, Component, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const items = [
  { label: "black pepper prawn", items: "20" },
  { label: "butter prawn", items: "50" },
  { label: "cereal prawn", items: "100" },
  { label: "kam heong prawn", items: "100" },
  { label: "kung po prawn", items: "100" },
  { label: "salted egg prawn", items: "100" },
  { label: "sambal prawn", items: "100" },
  { label: "sweet & sour prawn", items: "100" },
];

const tags = [
  { id: "spicy", label: "spicy", icon: "/src/assets/img/admin/chili.png" },
  { id: "vegan", label: "vegan", icon: "/src/assets/img/admin/vegan.png" },
  { id: "halal", label: "halal", icon: "/src/assets/img/admin/halal.png" },
  { id: "new", label: "new", icon: "/src/assets/img/admin/new.png" },
  {
    id: "signature",
    label: "signature",
    icon: "/src/assets/img/admin/signature.png",
  },
  {
    id: "promotion",
    label: "promotion",
    icon: "/src/assets/img/admin/promotion.png",
  },
  { id: "hot", label: "hot", icon: "/src/assets/img/admin/hot.png" },
];

// Define the Item type
interface Category {
  id: number;
  name: string;
}

// Define the Item type
interface Item {
  id: number;
  name: string;
  description: string;
  image: File | null;
  price: number;
  tag: string;
  published: boolean;
}

// Define the submitItem type
interface submitItem {
  name: string;
  description: string;
  image: File | null;
  price: number;
  tag: string;
  published: boolean;
  foodcategory_id: number;
}

const admin_item = ({ changeIP }: { changeIP: string }) => {
  const { foodmenu_id } = useParams();

  const { foodcategory_id } = useParams();
  const FoodCategoryId = foodcategory_id ? parseInt(foodcategory_id) : 0; // Provide a default value, 0 in this case

  const getMenuLink = `http://${changeIP}:8000/api/foodmenus/?id=${foodmenu_id}`;
  const getCategoryLink = `http://${changeIP}:8000/api/foodcategories/?id=${foodcategory_id}`;
  const getItemLink = `http://${changeIP}:8000/api/fooditems/?foodcategory_id=${foodcategory_id}`;
  const setItemLink = `http://${changeIP}:8000/api/fooditems/`;

  const [menuList, setMenuList] = useState<Category[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]); // Provide type annotation for taskList
  const [newItem, setNewItem] = useState<submitItem>({
    // For reset the field
    name: "",
    description: "",
    image: null,
    price: 0,
    tag: "",
    published: false,
    foodcategory_id: FoodCategoryId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // For toggle modal purpose
  const [isChecked, setIsChecked] = useState(false); // For modal published checkbox purpose
  const [image, setImage] = useState<File | null>(null); // For modal image purpose
  const [formAlert, setFormAlert] = useState(null); // For form warning message
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success alert message
  const [isSave, setSave] = useState(false); // To detect whether press save button

  // ==================== Toggle Method ====================
  // Modal toggler
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  // Fetch data array from table method
  const fetchList = (getLink: string, setList: any) => {
    fetch(getLink)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  // Fetch & set data array from category table method
  const fetchSetItemList = (event: FormEvent) => {
    return new Promise((resolve, reject) => {
      event.preventDefault();

      const formData = new FormData();
      if (image) {
        // Ensure that the 'image' field is a valid File
        if (image instanceof File) {
          formData.append("image", image);
          console.log("Success image file");
        } else {
          console.error("Invalid image file");
          return;
        }
      } else {
        formData.append("image", "");
      }

      formData.append("name", newItem.name);
      formData.append("price", newItem.price.toString());
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
            console.log("This is image: ", image);
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
          fetchList(getItemLink, setItemList);
          setNewItem({
            name: "",
            description: "",
            image: null,
            price: 0,
            tag: "",
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
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================
  // Function to hide the alert message
  const hideFormAlert = () => {
    setFormAlert(null);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };

  // const handlePublished = (categoryId: number, index: number) => {
  //   const updatedCategoryList = [...itemList];
  //   updatedCategoryList[index].published =
  //     !updatedCategoryList[index].published;

  //   // Call the fetchSetCategoryIDList method to perform the PATCH request
  //   fetchSetCategoryIDList(categoryId, index, updatedCategoryList);
  // };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Set as checked
    setIsChecked(e.target.checked);

    setNewItem((prevMenu) => ({
      ...prevMenu,
      published: !prevMenu.published, // Toggle the "published" property
    }));
  };

  // Submit form changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleCancel = () => {
    // Clear the form data by setting it to its initial state
    setNewItem({
      name: "",
      description: "",
      image: null,
      price: 0,
      tag: "",
      published: false,
      foodcategory_id: FoodCategoryId,
    });

    toggleModal();
    hideFormAlert();
  };

  // Submit form logic
  const handleSubmit = async (event: React.FormEvent) => {
    try {
      await fetchSetItemList(event); // Wait for fetchSetCategoryList to complete
      if (!formAlert) {
        if (isSave) {
          handleCancel(); // Reset the field list and exit modal
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

  const handleSave = () => {
    setSave(true);
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
  // ==================== Handle Method ====================

  // Use useEffect to trigger modal open when the component is mounted
  useEffect(() => {
    fetchList(getMenuLink, setMenuList);
    fetchList(getCategoryLink, setCategoryList);
    fetchList(getItemLink, setItemList);
  }, []);

  return (
    <div className="content px-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="title text-2xl font-bold my-2">Catering Categories</p>
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
                    <a
                      href={`/admin_panel/category/${foodmenu_id}`}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                      key={index}
                    >
                      {item.name}
                    </a>
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
          onClick={toggleModal}
          className="text-white bg-gradient-to-br from-orange-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center"
        >
          Add Item
        </button>
      </div>
      <div className="content-box w-full py-8 px-8 shadow-sm rounded-xl">
        {/* <p className="subtitle pb-3 text-2xl font-bold  ">Dine Method</p> */}
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 font-medium">
          {itemList.map((item, index) => (
            <div className="dine-method text-xl" key={index}>
              <div className="card rounded overflow-hidden shadow-md border-1 border-gray-300 h-full max-w-sm relative">
                <div className="image relative">
                  <div className="flex w-full justify-center items-center p-3 pb-0">
                    <img
                      className={`image-img w-full h-36 cursor-pointer rounded-md ${
                        item.image ? "bg-transparent" : "bg-imageColor"
                      }`}
                      src={
                        item.image
                          ? item.image.toString()
                          : "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt="Sunset in the moufntains"
                    />
                  </div>
                  <div className="image-overlay absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center opacity-0 duration-300">
                    <button
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm w-28 py-2.5 text-center mb-2 dark:focus:ring-orange-900"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div id="card-text" className="card-text px-3 pt-2 pb-12">
                  <div className="w-full flex">
                    <div className="w-full">
                      <p className="mr-2 mb-1 break-words capitalize">
                        {item.name}
                      </p>
                      <p className="mr-2 mb-2 text-base w-full">
                        {item.description} items
                      </p>
                      <div className="absolute bottom-5 right-5 form-check form-switch flex justify-end text-2xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
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
          ))}
        </div>
      </div>

      {/* <!-- Main modal --> */}
      {isModalOpen && (
        <div
          id="updateProductModal"
          data-modal-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          className="flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Item
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form action="#" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      id="name"
                      // value="iPad Air Gen 5th Wi-Fi"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Apple iMac 27&ldquo;"
                    />
                  </div>

                  {/* <div>
                          <label
                            htmlFor="brand"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Brand
                          </label>
                          <input
                            type="text"
                            name="brand"
                            id="brand"
                            // value="Google"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ex. Apple"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            // value="399"
                            name="price"
                            id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="$299"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                            <option selected={true}>Electronics</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                          </select>
                        </div> */}

                  <div className="col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      // value="399"
                      name="price"
                      id="price"
                      pattern="[0-9]+(\.[0-9]{2})?"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="RM299"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newItem.description}
                      onChange={handleInputChange}
                      rows={5}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tags
                    </label>

                    <ul className="grid w-full gap-2 md:grid-cols-5">
                      {tags.map((item, index) => (
                        <li key={index}>
                          <input
                            type="checkbox"
                            id={item.id}
                            value=""
                            className="hidden peer"
                            required={false}
                          />
                          <label
                            htmlFor={item.id}
                            className="inline-flex justify-center items-center w-full p-3 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-orange-500 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <div className="flex flex-col items-center text-center capitalize">
                              <img
                                className="mb-2 w-7 h-7 text-sky-500 select-none"
                                src={item.icon}
                                alt="Chili"
                              />
                              <div className="w-full text-sm font-semibold select-none">
                                {item.label}
                              </div>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative col-span-2 sm:col-span-1">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="small_size"
                    >
                      Upload Image
                    </label>
                    <input
                      name="image"
                      onChange={handleImageChange}
                      className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="small_size"
                      type="file"
                    />
                    <p
                      className="block sm:absolute sm:bottom-0 mt-1 sm:mt-0 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>

                  <div className="col-span-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2 sm:mb-3.5">
                      Published
                    </p>
                    <div className="max-w-max">
                      <label className="items-center sm:mb-4 cursor-pointer select-none">
                        <div className="relative mb-3 ">
                          <input
                            id="modal-published"
                            name="modal-published"
                            type="checkbox"
                            defaultChecked={newItem.published}
                            onChange={handleCheckboxChange}
                            value=""
                            className="toggle-switch sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                        </div>
                      </label>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                      <div className={`${isChecked ? "hidden" : ""}`}>
                        Your item are only visible to administrators.
                      </div>
                      <div className={`${isChecked ? "" : "hidden"}`}>
                        Your item will be publicly visible on your site.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create Item
                  </button>
                  <button
                    data-modal-hide="updateProductModal"
                    onClick={toggleModal}
                    type="button"
                    className="text-red-600 inline-flex items-center hover:text-white border !border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default admin_item;
