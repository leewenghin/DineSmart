import { ChangeEvent, Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const categories = [
  { label: "Prawn", items: "20" },
  { label: "Crab", items: "50" },
  { label: "Deep Fried Fish", items: "100" },
  { label: "Chicken", items: "100" },
  { label: "Soups", items: "100" },
  { label: "Vegetables", items: "100" },
  { label: "Milks", items: "100" },
  { label: "Appetizers", items: "100" },
];

interface Menu {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  published: boolean;
  foodmenu_id: number;
}

interface submitCategory {
  name: string;
  description: string;
  published: boolean;
  foodmenu_id: number;
}

const admin_category = () => {
  const { foodmenu_id } = useParams();
  const FoodMenuId = foodmenu_id ? parseInt(foodmenu_id) : 0; // Provide a default value, 0 in this case

  const getMenuLink = `http://127.0.0.1:8000/api/foodmenus/?id=${foodmenu_id}`;
  const getCategoryLink = `http://127.0.0.1:8000/api/foodcategories/?foodmenu_id=${foodmenu_id}`;
  const setCategoryLink = `http://127.0.0.1:8000/api/foodcategories/`;

  const [menuList, setMenuList] = useState<Menu[]>([]); // List for store data from menu table
  const [categoryList, setCategoryList] = useState<Category[]>([]); // List for store data from category table
  const [newCategory, setNewCategory] = useState<submitCategory>({
    // Initial value
    // Reset the field
    name: "",
    description: "",
    published: false,
    foodmenu_id: FoodMenuId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // ==================== Toggle Method ====================
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
  // Fetch data array from category table method
  const fetchCategoryList = () => {
    fetch(getCategoryLink)
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  // Fetch & set data array from category table method
  const fetchSetCategoryList = () => {
    fetch(setCategoryLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON data if the response is valid
        } else {
          throw new Error(`Response not OK. Status: ${response.status}`);
        }
      })
      .then((data: Category) => {
        setCategoryList([...categoryList, data]); // update the list of categories (realtime)
        setNewCategory({
          name: "",
          description: "",
          published: false,
          foodmenu_id: FoodMenuId,
        }); // Clear the input fields
        fetchCategoryList();
      })
      .catch((error) => console.error("Error creating task: ", error));
  };

  const fetchSetCategoryIDList = (
    categoryId: number,
    index: number,
    updatedCategoryList: Category[]
  ) => {
    fetch(`http://127.0.0.1:8000/api/foodcategories/${categoryId}/`, {
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
      .catch((error) => console.error("Error updating status: ", error));
  };
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================

  const handlePublishedChange = (categoryId: number, index: number) => {
    const updatedCategoryList = [...categoryList];
    updatedCategoryList[index].published =
      !updatedCategoryList[index].published;

    // Call the fetchSetCategoryIDList method to perform the PATCH request
    fetchSetCategoryIDList(categoryId, index, updatedCategoryList);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Set as checked
    setIsChecked(e.target.checked);

    //
    setNewCategory((prevMenu) => ({
      ...prevMenu,
      published: !prevMenu.published, // Toggle the "published" property
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCancel = () => {
    // Clear the form data by setting it to its initial state
    setNewCategory({
      name: "",
      description: "",
      published: false,
      foodmenu_id: FoodMenuId,
    });

    toggleModal();
  };

  const handleSave = () => {
    fetchSetCategoryList(); // Fetch and set the data through api
    handleCancel(); // Reset the field list and exit modal
  };

  const handleSaveAdd = (event: React.FormEvent) => {
    event.preventDefault();

    fetchSetCategoryList();
  };
  // ==================== Handle Method ====================

  useEffect(() => {
    fetch(getMenuLink)
      .then((response) => response.json())
      .then((data) => {
        setMenuList(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    fetchCategoryList();
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
                  {menuList.map((item, index) => (
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
          Add Category
        </button>
      </div>
      <div className="content-box w-full py-8 px-8 shadow-sm rounded-xl">
        {/* <p className="subtitle pb-3 text-2xl font-bold  ">Dine Method</p> */}
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 font-medium">
          {categoryList.map((item, index) => (
            <div className="dine-method text-xl" key={index}>
              <div className="card rounded overflow-hidden shadow-md border-1 border-gray-300 h-full max-w-sm relative">
                <div className="image relative">
                  <img
                    className="image-img w-full p-4 cursor-pointer"
                    src="/src/assets/img/admin/tableware.png"
                    alt="Sunset in the moufntains"
                  />
                  <div className="image-overlay absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center opacity-0 duration-300">
                    <Link
                      to={`/admin_panel/category/${foodmenu_id}/${item.id}`}
                    >
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm w-28 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Enter
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm w-28 py-2.5 text-center mb-2 dark:focus:ring-orange-900"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div id="card-text" className="card-text px-6 pt-4 pb-5">
                  <div className="w-full flex">
                    <div className="w-full">
                      <p className="mr-2 mb-1 break-words">{item.name}</p>
                      <p className="mr-2 mb-2 text-base w-full">
                        {item.description} items
                      </p>
                      <div className="absolute bottom-5 right-5 form-check form-switch flex justify-end text-2xl">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            name="published"
                            type="checkbox"
                            defaultChecked={item.published}
                            onClick={() =>
                              handlePublishedChange(item.id, index)
                            }
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
          className="flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Category
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
              <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={newCategory.name}
                      onChange={handleInputChange}
                      autoComplete="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Apple iMac 27&ldquo;"
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
                      value={newCategory.description}
                      onChange={handleInputChange}
                      rows={5}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                    ></textarea>
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
                          defaultChecked={newCategory.published}
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
                    onClick={handleSaveAdd}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save and add another
                  </button>
                  <button
                    type="submit"
                    onClick={handleSave}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
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

export default admin_category;
