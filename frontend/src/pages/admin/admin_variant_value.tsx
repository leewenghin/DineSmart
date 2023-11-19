import { FormEvent, HtmlHTMLAttributes, useEffect, useState } from "react";
import CU_Modal from "../../components/admin/cu_modal";
import DeleteModal from "@/components/admin/delete_modal";

type TField = {
  id: number;
  name: string;
  published: boolean;
};

type TSubmitVariant = Omit<TField, "id">;

const variant = ({ changeIP }: { changeIP: string }) => {
  const getVariantGroupLink = `http://${changeIP}:8000/api/variantgroup/`;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variantGroupList, setVariantGroupList] = useState<TField[]>([]);
  const [query, setQuery] = useState("");
  const [newVariantGroup, setNewVariantGroup] = useState<TSubmitVariant>({
    name: "",
    published: false,
  });
  const [updateVariantGroup, setUpdateVariantGroup] = useState<TField[]>([]);
  const [variantGroupID, setVariantGroupID] = useState<number | null>(null);
  const [variantGroupIndex, setVariantGroupIndex] = useState<number | null>(
    null
  );
  const [isSave, setSave] = useState(false);

  const filteredVariantGroup = variantGroupList.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  // ==================== Toggle Method ====================

  const toggleModal = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    itemID?: number,
    index?: number
  ) => {
    setIsModalOpen(!isModalOpen);
    setVariantGroupID(itemID ?? null);
    setVariantGroupIndex(index ?? null);
  };
  // ==================== Toggle Method ====================

  // ==================== Fetch Method ====================
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

  const fetchSetVariantGroupList = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://${changeIP}:8000/api/variantgroup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVariantGroup),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }
      setNewVariantGroup({
        name: "",
        published: false,
      });
      fetchList(
        getVariantGroupLink,
        setVariantGroupList,
        setUpdateVariantGroup
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchSetVariantGroupIDList = async (
    variantGroupID: number,
    isChecked: boolean
  ) => {
    try {
      const response = await fetch(
        `http://${changeIP}:8000/api/variantgroup/${variantGroupID}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ published: isChecked }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }
      setNewVariantGroup({
        name: "",
        published: false,
      });
      fetchList(
        getVariantGroupLink,
        setVariantGroupList,
        setUpdateVariantGroup
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchUpdateVariantGroupIDList = async (event: FormEvent) => {
    event.preventDefault();
    console.log(updateVariantGroup[variantGroupID ?? 0]);

    try {
      const response = await fetch(`${getVariantGroupLink}${variantGroupID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateVariantGroup[variantGroupIndex ?? 0]),
      });

      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }

      fetchList(
        getVariantGroupLink,
        setVariantGroupList,
        setUpdateVariantGroup
      );
    } catch (error) {
      console.log("Error update data: ", error);
    }
  };

  const fetchDeleteVariantGroupList = async (variantGroupID: number) => {
    try {
      const response = await fetch(`${getVariantGroupLink}${variantGroupID}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to update data: ${response.statusText}`);
      }

      fetchList(
        getVariantGroupLink,
        setVariantGroupList,
        setUpdateVariantGroup
      );
    } catch (error) {
      console.log("Error delete data: ", error);
    }
  };
  // ==================== Fetch Method ====================

  // ==================== Handle Method ====================
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Your click handling logic here
  };

  const handleCancel = (
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    resetNewVariantGroup?: boolean,
    resetUpdateVariantGroup?: boolean
  ) => {
    // Clear the form data by setting it to its initial state
    if (resetNewVariantGroup) {
      setNewVariantGroup({
        name: "",
        published: false,
      });
    }

    if (resetUpdateVariantGroup) {
      setUpdateVariantGroup(variantGroupList);
    }

    toggleModal(isModalOpen, setIsModalOpen);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    action?: "Create" | "Edit",
    index?: number
  ) => {
    const { name, value, checked } = event.target;

    const updatedInputValues = [...updateVariantGroup];

    const assignInput = (valueType: string | boolean) => {
      if (index || index == 0) {
        updatedInputValues[index] = {
          ...updatedInputValues[index],
          [name]: valueType,
        };
      }
    };

    if (name == "name" || value !== null) {
      if (action == "Create") {
        setNewVariantGroup({ ...newVariantGroup, [name]: value });
      } else {
        assignInput(value);
      }
      console.log("name: ", value);
    }

    if (name == "published") {
      // Handle the "published" property separately
      if (action == "Create") {
        setNewVariantGroup({ ...newVariantGroup, [name]: checked });
      } else {
        assignInput(checked);
      }
    }

    if (action == "Edit") {
      setUpdateVariantGroup(updatedInputValues);
    }
  };

  const handleSave = () => {
    setSave(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    await fetchSetVariantGroupList(event);

    if (isSave) {
      handleCancel(isCreateModalOpen, setIsCreateModalOpen);
    }
  };

  const handlePublished = (variantGroupID: number, isChecked: boolean) => {
    // Call the fetchSetItemIDList method to perform the PATCH request
    fetchSetVariantGroupIDList(variantGroupID, isChecked);
  };

  const handleUpdate = (event: React.FormEvent) => {
    fetchUpdateVariantGroupIDList(event);

    handleCancel(isUpdateModalOpen, setIsUpdateModalOpen);
  };

  const handleDelete = async (variantGroupID: number) => {
    console.log(variantGroupID);
    try {
      await fetchDeleteVariantGroupList(variantGroupID);
      handleCancel(isDeleteModalOpen, setIsDeleteModalOpen);
    } catch (error) {
      console.log("Failed to delete data: ", error);
    }
  };
  // ==================== Handle Method ====================

  useEffect(() => {
    fetchList(getVariantGroupLink, setVariantGroupList, setUpdateVariantGroup);
  }, []);

  return (
    <div className="content px-10">
      <div className="flex justify-between items-center">
        {" "}
        <p className="title text-2xl font-bold my-2">Variant</p>
      </div>
      {/* <!-- Start block --> */}
      <section className="antialiased mt-4">
        <div className="mx-auto max-w-screen-2xl">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search for products"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="createProductButton"
                  onClick={() =>
                    toggleModal(isCreateModalOpen, setIsCreateModalOpen)
                  }
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-1.5 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add product
                </button>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    id="actionsDropdownButton"
                    data-dropdown-toggle="actionsDropdown"
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    Actions
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  <div
                    id="actionsDropdown"
                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Mass Edit
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete all
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="p-4 ">
                      ID
                    </th>
                    <th scope="col" className="p-4 ">
                      Title
                    </th>
                    <th scope="col" className="p-4 ">
                      Active
                    </th>
                    <th scope="col" className="p-4 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVariantGroup.length ? (
                    filteredVariantGroup.map((item, index) => (
                      <tr
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={index}
                      >
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              onClick={handleClick}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="checkbox-table-search-1"
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center">{item.id}</div>
                        </th>
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.name}
                        </td>
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              name="published"
                              type="checkbox"
                              checked={item.published}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handlePublished(item.id, event.target.checked)
                              }
                              value=""
                              className="sr-only peer"
                            />

                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                            {item.published.toString()}
                          </label>
                        </td>
                        <td className="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              onClick={() =>
                                toggleModal(
                                  isUpdateModalOpen,
                                  setIsUpdateModalOpen,
                                  item.id,
                                  item.id - 1
                                )
                              }
                              data-drawer-target="drawer-update-product"
                              data-drawer-show="drawer-update-product"
                              aria-controls="drawer-update-product"
                              className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 -ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              type="button"
                              data-drawer-target="drawer-read-product-advanced"
                              data-drawer-show="drawer-read-product-advanced"
                              aria-controls="drawer-read-product-advanced"
                              className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 mr-2 -ml-0.5"
                              >
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                />
                              </svg>
                              Preview
                            </button>
                            <button
                              type="button"
                              data-modal-target="delete-modal"
                              data-modal-toggle="delete-modal"
                              onClick={() =>
                                toggleModal(
                                  isDeleteModalOpen,
                                  setIsDeleteModalOpen,
                                  item.id
                                )
                              }
                              className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 -ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="p-4 w-4" colSpan={5}>
                          <div className="flex items-center justify-center h-24">
                            No results
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {`Showing` + " "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {`1-${filteredVariantGroup.length}` + " "}
                </span>
                {`of` + " "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredVariantGroup.length}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {isCreateModalOpen && (
        <CU_Modal
          page="Variant"
          name="Create"
          list={newVariantGroup}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event, "Create");
          }}
          handleCancel={() =>
            handleCancel(isCreateModalOpen, setIsCreateModalOpen, true)
          }
          handleSubmit={handleSubmit}
          handleSave={handleSave}
        ></CU_Modal>
      )}

      {isUpdateModalOpen && (
        <CU_Modal
          page="Variant"
          name="Edit"
          list={updateVariantGroup[variantGroupIndex ?? 0]}
          handleInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(event, "Edit", variantGroupIndex ?? 0);
          }}
          handleSubmit={handleUpdate}
          handleCancel={() =>
            handleCancel(isUpdateModalOpen, setIsUpdateModalOpen, false, true)
          }
        ></CU_Modal>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          handleCancel={() =>
            handleCancel(isDeleteModalOpen, setIsDeleteModalOpen)
          }
          handleDelete={() => handleDelete(variantGroupID ?? 0)}
        ></DeleteModal>
      )}
    </div>
  );
};

export default variant;
