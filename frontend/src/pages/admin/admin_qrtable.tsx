import { faEllipsisVertical, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  FormEvent,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import QRModal from "../../components/qr_modal";
import * as htmlToImage from "html-to-image";
import imageCompression from "browser-image-compression";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import "../../assets/css/admin/admin_panel.css";
const cards = [
  { label: "Dine In", items: "20" },
  { label: "Delivery", items: "50" },
  { label: "Take Away", items: "100" },
  { label: "DineConnect Alah hua gua", items: "100" },
];

interface Menu {
  id: number;
  name: string;
  image: string;
  published: boolean;
}

interface submitMenu {
  name: string;
  status: string;
  published: boolean;
}

const qrtable = ({ changeIP }: { changeIP: string }) => {
  const getMenuLink = `http://${changeIP}:8000/api/ordertables/`;

  const [isModalOpen, setIsModalOpen] = useState(false); // For toggle modal purpose
  const [menuList, setMenuList] = useState<Menu[]>([]); // List for store data from menu table
  const [newMenu, setNewMenu] = useState<submitMenu>({
    // For save input value
    // Initiate value
    // Reset the field
    name: "",
    status: "",
    published: false,
  });
  const [isChecked, setIsChecked] = useState(false); // For modal published checkbox purpose
  const [formAlert, setFormAlert] = useState(null); // For form warning message
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For success alert message
  const [isSave, setSave] = useState(false); // To detect whether press save button

  const [isQRModalOpen, setIsQRModalOpen] = useState(false); // For toggle modal purpose
  const [selectedItemId, setSelectedItemId] = useState<any>([]);
  const [ImageResponsive, setImageResponsive] = useState<any>([]);
<<<<<<< HEAD

=======
  const navigate = useNavigate();
  
>>>>>>> 72fc3b9ed70df33193a3d6832b7415c7a5cf9c44
  // ==================== Toggle Method ====================
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const QRModal = (id: any) => {
  //   setIsQRModalOpen(!isQRModalOpen);
  //   setSelectedItemId(id);
  // };

  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  const fetchList = (getLink: string, setList: any) => {
    fetch(getLink)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
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
          setNewMenu({
            name: "",
            status: "",
            published: false,
          }); // Clear the input fields
        })
        .catch((error) => {
          console.error("Error creating task: ", error);
          reject(error); // Reject the Promise with the error
        });
    });
  };

  const fetchSetMenuIDList = (
    menuId: number,
    index: number,
    updatedCategoryList: Menu[]
  ) => {
    fetch(`${getMenuLink}${menuId}/`, {
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
        fetchList(getMenuLink, setMenuList);
      })
      .catch((error) => console.error("Error updating status: ", error));
  };
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================
  const hideFormAlert = () => {
    setFormAlert(null);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Set as checked
    setIsChecked(e.target.checked);

    //
    setNewMenu((prevMenu) => ({
      ...prevMenu,
      published: !prevMenu.published, // Toggle the "published" property
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        if (value == null || value == "") {
          setNewMenu({ ...newMenu, [name]: value });
        } else {
          hideFormAlert(); // Remove alert when have value
        }
      default:
        setNewMenu({ ...newMenu, [name]: value });
    }
  };

  const handlePublished = (menuId: number, index: number) => {
    const updatedCategoryList = [...menuList];
    updatedCategoryList[index].published =
      !updatedCategoryList[index].published;

    // Call the fetchSetmenuIdList method to perform the PATCH request
    fetchSetMenuIDList(menuId, index, updatedCategoryList);
  };

  const handleCancel = () => {
    // Clear the form data by setting it to its initial state
    setNewMenu({
      name: "",
      status: "",
      published: false,
    });

    toggleModal();
    hideFormAlert();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      await fetchSetMenuList(event); // Wait for fetchSetCategoryList to complete
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
  // ==================== Handle Method ====================

  useEffect(() => {
    fetchList(getMenuLink, setMenuList);
  }, []);
  // Assuming menuList is an array of objects with 'id' property
  const sortedMenuList = menuList.sort((a, b) => a.id - b.id);

  const ShowQRModal = () => {
    return (
      // ... (your modal JSX code)
      <form action="#" onSubmit={handleSubmit} encType="multipart/form-data">
        {selectedItemId}
        {/* Other form elements go here */}
      </form>
    );
  };

  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
  const elementRef = useRef<any>([]);
  // console.log(elementRef.current[index]);
  useEffect(() => {
    console.log("sdasd");
  }, []);
  const htmlToImageConvert = (img: any) => {
    const element = elementRef.current[selectedItemId.id];
    if (element) {
<<<<<<< HEAD
      htmlToImage
        .toPng(element)
        .then(async (dataUrl) => {
          // console.log(element);
          // create Blob from node
          // const dataUrl = await htmlToImage.toPng(element);
          await delay(10);
          // console.log(dataUrl);

          // // Convert the Data URL to a Blob
          // const imageBlob = await fetch(dataUrl).then((response) => response.blob());

          // // Create a File object with additional properties
          // const compressedFile = new File([imageBlob], "my-image-name.png", {
          //   type: "image/png",
          //   lastModified: Date.now(),
          // });

          // // Create a URL from the compressed Blob
          // const imageUrl = window.URL.createObjectURL(compressedFile);

=======
      htmlToImage.toPng(element)
      .then(async(dataUrl) => {
          await delay(10);
>>>>>>> 72fc3b9ed70df33193a3d6832b7415c7a5cf9c44
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
          element.removeChild(img);
          // element.style.display = "none";
          setSelectedItemId(null);
          console.log("Downloaded the Image");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      console.error("Element is null. It might not be rendered yet.");
    }
  };

  const image = (item: any) => {
    setSelectedItemId(item);
  };

  useEffect(() => {
    const handleImageConversion = async () => {
      if (
        selectedItemId != null &&
        selectedItemId.image != undefined &&
        elementRef.current
      ) {
        const element = elementRef.current[selectedItemId.id];
        const img = document.createElement("img");
        img.src = selectedItemId.image;
        img.alt = "Dynamic Image";
        img.width = 120;
        await element!.appendChild(img);
        setImageResponsive(selectedItemId.id);
        await delay(20);
        htmlToImageConvert(img);
        console.log("Starting Covert to Image");
      } else {
        setImageResponsive(null);
      }
    };
    handleImageConversion();
  }, [selectedItemId]);

  const handleRefresh = async (itemid: number) =>{
    try {
      // Make API call to update the item (remove the 'description' property)
      const response = await fetch(`${getMenuLink}${itemid}/`, {
        method: 'PATCH', // Use the PATCH method for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: null, // or any value you want to set for the description
          link: null,
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON data if the response is valid
        } else {
          throw new Error(`Response not OK. Status: ${response.status}`);
        }
      })
      .then(() => {
        fetchList(getMenuLink, setMenuList);
      })
      console.log("Delete complete");
    } catch (error) {
      console.error('Error deleting description:', error);
    }
  }

  const towebsite = (itemid:string): void => {
    const url = `http://${changeIP}:5173/table/${itemid}?demo=true`;
    console.log(itemid)
    // Navigate to the URL
    window.location.href = url;
    }

  return (
    <div className="content px-10">
      <div className="flex justify-between items-center">
        <div>
          <p className="title text-2xl font-bold my-2">Table List</p>
        </div>

        {/* <!-- Modal toggle --> */}
        <button
          id="updateProductButton"
          onClick={toggleModal}
          type="button"
          className="text-white bg-gradient-to-br from-orange-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center"
        >
          Add Table
        </button>
      </div>
      <div className="content-box w-full py-8 px-8 shadow-sm rounded-xl">
        {/* <p className="subtitle pb-3 text-2xl font-bold  ">Dine Method</p> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 font-medium h-full">
          {sortedMenuList.map((items, index) => (
            <div
              key={index}
              className="h-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <form
                action="#"
                encType="multipart/form-data"
                ref={(el) => (elementRef.current[items.id] = el)}
                className="float-right"
              ></form>
              {/* <div className={`${ImageResponsive == true ? "block" : "hidden"}`} >
                test
              </div> */}
              <div
                className={`flex items-center md:max-w-xl h-full ${
                  ImageResponsive == items.id ? "flex-col" : "flex-row"
                }`}
              >
                <div
                  className={`object-cover h-full bg-primaryColor flex items-center justify-center ${
                    ImageResponsive == items.id
                      ? "w-full h-2/6 rounded-tl-lg"
                      : "w-1/6 rounded-l-lg"
                  }`}
                >
                  <p className="text-2xl font-semibold ">{items.name}</p>
                </div>
                <div
                  className={`flex flex-col justify-between p-3 leading-relaxed  ${
                    ImageResponsive == items.id ? "w-full h-4/6" : "w-5/6"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Table
                    </h5>
<<<<<<< HEAD
                    <label
                      className={`relative ml-3 cursor-pointer ${
                        ImageResponsive == items.id ? "hidden" : "block"
                      }`}
                    >
                      <input
                        id="modal-published"
                        name="modal-published"
                        type="checkbox"
                        // defaultChecked={true}
                        // onChange={}
                        value=""
                        className="toggle-switch sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                    </label>
=======
                    {/* <label className={`relative ml-3 cursor-pointer ${ImageResponsive == items.id ? "hidden" : "block"}`}>
                        <input
                          id="modal-published"
                          name="modal-published"
                          type="checkbox"
                          // defaultChecked={true}
                          // onChange={}
                          value=""
                          className="toggle-switch sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                      </label> */}
>>>>>>> 72fc3b9ed70df33193a3d6832b7415c7a5cf9c44
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className={`pe-3 text-primaryColor fa-lg ${
                        ImageResponsive == items.id
                          ? "md:hidden block"
                          : "block"
                      }`}
                    />
                  </div>
<<<<<<< HEAD
                  <div
                    className={`flex items-center justify-end gap-4 ${
                      ImageResponsive == items.id ? "md:hidden block" : "block"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primaryColor">
                      captive_portal
                    </span>
=======
                  <div className={`flex items-center justify-end gap-4 ${ImageResponsive == items.id ? "md:hidden block" : "block"}`}>
                    <button
                      onClick={()=>towebsite(items.name)}
                      className="flex items-center">
                      <span className="material-symbols-outlined text-primaryColor">
                        captive_portal
                      </span>
                    </button>
>>>>>>> 72fc3b9ed70df33193a3d6832b7415c7a5cf9c44
                    <button
                      onClick={() => image(items)}
                      className="flex items-center"
                    >
                      <span className="material-symbols-outlined text-primaryColor">
                        print
                      </span>
                    </button>
                    <button onClick={() => handleRefresh(items.id)}   className="flex items-center">
                      <span className="material-symbols-outlined text-primaryColor">
                        refresh
                      </span>
                    </button>
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
          className="flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Table
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
              <form
                action="#"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                    >
                      Table Number
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={newMenu.name}
                      onChange={handleInputChange}
                      autoComplete="name"
                      // value="iPad Air Gen 5th Wi-Fi"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                        formAlert ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Ex. 1"
                      required
                    />
                    {formAlert && (
                      <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        <span className="font-medium">
                          Table Number field must not be empty.
                        </span>
                      </p>
                    )}
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
                </div> */}
                  {/* <div>
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
                </div> */}
                  {/* <div>
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
                  <div className="col-span-2">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                    >
                      Status
                    </label>
                    <input
                      id="status"
                      name="status"
                      value={newMenu.status}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a status..."
                    ></input>
                  </div>
                  <div className="col-span-2">
                    <label className="inline-flex items-center mb-4 cursor-pointer select-none">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        Published
                      </span>
                      <div className="relative ml-3">
                        <input
                          id="modal-published"
                          name="modal-published"
                          type="checkbox"
                          defaultChecked={newMenu.published}
                          onChange={handleCheckboxChange}
                          value=""
                          className="toggle-switch sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                      </div>
                    </label>
                    <div className="text-sm text-gray-500">
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
                    Create New Table
                  </button>
                  <button
                    data-modal-hide="updateProductModal"
                    onClick={handleCancel}
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

export default qrtable;
