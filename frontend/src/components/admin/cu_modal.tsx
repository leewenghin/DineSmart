import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import Dropdown_modal from "./dropdown_modal";

const tags = [
  { id: 1, label: "spicy", icon: "/src/assets/img/admin/chili.png" },
  { id: 2, label: "new", icon: "/src/assets/img/admin/new.png" },
  { id: 3, label: "vegan", icon: "/src/assets/img/admin/vegan.png" },
  { id: 4, label: "halal", icon: "/src/assets/img/admin/halal.png" },
  {
    id: 5,
    label: "signature",
    icon: "/src/assets/img/admin/signature.png",
  },
  {
    id: 6,
    label: "promotion",
    icon: "/src/assets/img/admin/promotion.png",
  },
  { id: 7, label: "hot", icon: "/src/assets/img/admin/hot.png" },
];

const tabs = [
  { id: 1, label: "Item Details" },
  { id: 2, label: "Variant", className: "cursor-not-allowed" },
];

const lists = [["hello"], ["hello"], ["hello"], ["hello"]];

const ErrorMessage = ({ message }: any) => {
  return (
    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
      <span className="font-medium">{message}</span>
    </p>
  );
};

const CU_Modal = ({
  page,
  name,
  list = "",
  variantGroupList = "",
  variantGroup = "",
  matchVariant = "",
  selectedOption = "",
  fileInputRef,
  handleInputChange,
  handleTagChange = () => {},
  handleSelectChange = () => {},
  handleVariantChange = () => {},
  handleRadioChange = () => {},
  handleCancel,
  handleSubmit,
  handleSave = () => {},
  nameAlert = false,
  priceAlert = false,
}: any) => {
  console.log("List: ", list ?? 0);
  console.log(variantGroupList);
  console.log("Variant Group", variantGroup);

  const [toggleTab, setToggleTab] = useState(1);
  const [toggleSave, setToggleSave] = useState(1);
  const [isValidateSuccess, setValidateSuccess] = useState(false);
  // Create a mapping from variantGroup id to index
  // const variantGroupIndexMap: Record<number, number> = {};
  // variantGroup.forEach((group, index) => {
  //   variantGroupIndexMap[group.id] = index;
  // });

  // // Map allCombinations to match the order of variantGroup
  // const reorderedCombinations = allCombinations.map((item) =>
  //   variantGroup.map((group) => item[variantGroupIndexMap[group.id]])
  // );
  function generateCombinations(
    arrays: any,
    index: any,
    currentCombination: any,
    result: any
  ) {
    if (index === arrays.length) {
      if (currentCombination.length > 0) {
        // Add the combination only if it's not empty
        result.push(currentCombination.slice());
      }
      return;
    }

    // Add a check here
    if (arrays[index] && arrays[index].length > 0) {
      for (let i = 0; i < arrays[index].length; i++) {
        currentCombination.push(arrays[index][i]);
        generateCombinations(arrays, index + 1, currentCombination, result);
        currentCombination.pop();
      }
    } else {
      // If the array is empty, proceed to the next index without multiplying
      generateCombinations(arrays, index + 1, currentCombination, result);
    }
  }

  function getAllCombinations(arrays: any) {
    const result: any[] = [];
    generateCombinations(arrays, 0, [], result);
    return result;
  }

  const allCombinations = getAllCombinations(selectedOption);
  console.log("Selected option: ", selectedOption);
  console.log("All combination: ", allCombinations);
  console.log("length: ", allCombinations);

  const handleToggleTab = (id: number) => {
    if (isValidateSuccess) {
      setToggleTab(id);
    }
  };

  const validateContinue = (event: React.FormEvent) => {
    event.preventDefault();
    setToggleTab(2);
    setValidateSuccess(true);
  };

  const saveAdd = () => {
    setToggleSave((prevValue) => prevValue + 1);
  };

  const saveExit = () => {
    handleSave();
    setToggleSave((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    if (nameAlert || priceAlert) {
      setToggleTab(1);
    }
  }, [nameAlert, priceAlert, toggleSave]);

  return (
    <div
      id="updateProductModal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className={`flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-full bg-black bg-opacity-50 ${
        page == "Item" ? "" : "justify-center"
      }`}
    >
      <div
        className={`relative p-4 w-full ${
          page == "Item" ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name} {page}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
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

          {page == "Item" && (
            <div>
              <ul className="flex mb-4 text-sm font-medium text-center text-gray-500 rounded-lg shadow dark:divide-gray-700 dark:text-gray-400">
                {tabs.map((item, index) => (
                  <li key={index} className="w-full">
                    <a
                      href="#"
                      onClick={() => handleToggleTab(item.id)}
                      className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${
                        !isValidateSuccess ? item.className : ""
                      } ${
                        toggleTab == item.id
                          ? "bg-gray-100"
                          : "hover:text-gray-700 hover:bg-gray-50"
                      }`}
                      aria-current="page"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page !== "Item" && (
            <form action="#" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {page == "Variant" && (
                  <div className="col-span-2">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <select
                      id="countries"
                      name="title"
                      defaultValue={name == "Edit" ? list.title : 0}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value={0} disabled>
                        Choose a variant group
                      </option>
                      {variantGroupList.map(
                        (
                          {
                            id,
                            name,
                            published,
                          }: { id: number; name: string; published: boolean },
                          index: number
                        ) =>
                          published && (
                            <option key={index} value={id}>
                              {name}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                )}
                <div
                  className={`${
                    page == "Menu" ||
                    page == "Category" ||
                    page == "Variant" ||
                    page == "Variant Group"
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={list.name}
                    onChange={handleInputChange}
                    // value="iPad Air Gen 5th Wi-Fi"f
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                      nameAlert ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ex. Apple iMac 27&ldquo;"
                    autoFocus
                    required
                  />
                  {nameAlert && <ErrorMessage message={nameAlert} />}
                </div>

                {page == "Item" && (
                  <div className="col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      value={list.price || list.price == 0 ? list.price : ""}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                        priceAlert ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="RM299"
                      required
                    />
                    {priceAlert && <ErrorMessage message={priceAlert} />}
                  </div>
                )}

                {page == "Menu" ||
                  page == "Categories" ||
                  (page == "Item" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={
                          list.description !== null ? list.description : ""
                        }
                        onChange={handleInputChange}
                        rows={5}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write a description..."
                      ></textarea>
                    </div>
                  ))}

                {page == "Item" && (
                  <div className="col-span-2">
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tags
                    </p>

                    <ul className="grid w-full gap-2 md:grid-cols-5">
                      {tags.map((item, index) => (
                        <li key={index}>
                          <input
                            id={item.label}
                            type="checkbox"
                            value={list.tag}
                            checked={
                              name == "Create"
                                ? list.tag.toString().includes(item.id)
                                : list.tag.toString().includes(item.id)
                            } // checks if item.label inside newItem.tag, if not then uncheck
                            onChange={() => handleTagChange(item.id)}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={item.label}
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
                )}

                {/* Modal Layout */}
                {(page == "Category" || page == "Item") && (
                  <div className="relative col-span-2 sm:col-span-1">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="small_size"
                    >
                      Upload Image
                    </label>
                    <input
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      ref={fileInputRef}
                      onChange={handleInputChange}
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
                )}

                <div
                  className={`${
                    page == "Category" || page == "Item"
                      ? "col-span-1"
                      : "col-span-2"
                  }`}
                >
                  {page == "Menu" ? (
                    <label className="inline-flex items-center mb-4 cursor-pointer select-none">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        Published
                      </span>
                      <div className="relative ml-3">
                        <input
                          name="published"
                          type="checkbox"
                          checked={list.published}
                          onChange={handleInputChange}
                          value=""
                          className="toggle-switch sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                      </div>
                    </label>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2 sm:mb-3.5">
                        Published
                      </p>
                      <div className="max-w-max">
                        <label className="items-center sm:mb-4 cursor-pointer select-none">
                          <div className="relative mb-3 ">
                            <input
                              name="published"
                              type="checkbox"
                              checked={list.published}
                              onChange={handleInputChange}
                              value=""
                              className="toggle-switch sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                          </div>
                        </label>
                      </div>
                    </>
                  )}

                  <div
                    className={`text-sm text-gray-500 ${
                      page == "Category" || page == "Item" ? "mt-1 sm:mt-0" : ""
                    }`}
                  >
                    <div className={`${list.published ? "hidden" : ""}`}>
                      Your item are only visible to administrators.
                    </div>

                    <div className={`${list.published ? "" : "hidden"}`}>
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
                  {page == "Menu" || name == "Edit" ? (
                    <>
                      {name} {page}
                    </>
                  ) : (
                    "Save and add another"
                  )}
                </button>

                {page !== "Menu" && name !== "Edit" && (
                  <>
                    <button
                      onClick={handleSave}
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                  </>
                )}
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
          )}

          {/* Item Modal Layout */}
          {page == "Item" && (
            <>
              {toggleTab == 1 ? (
                <div>
                  <form action="#" onSubmit={validateContinue}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div className="col-span-1">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={list.name}
                          onChange={handleInputChange}
                          // value="iPad Air Gen 5th Wi-Fi"f
                          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                            nameAlert ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Ex. Apple iMac 27&ldquo;"
                          autoFocus
                          required
                        />
                        {nameAlert && <ErrorMessage message={nameAlert} />}
                      </div>

                      {page == "Item" && (
                        <div className="col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            value={
                              list.price || list.price == 0 ? list.price : ""
                            }
                            onChange={handleInputChange}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                              priceAlert ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="RM299"
                            required
                          />
                          {priceAlert && <ErrorMessage message={priceAlert} />}
                        </div>
                      )}

                      {page == "Menu" ||
                        page == "Categories" ||
                        (page == "Item" && (
                          <div className="col-span-2">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                            >
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={
                                list.description !== null
                                  ? list.description
                                  : ""
                              }
                              onChange={handleInputChange}
                              rows={5}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Write a description..."
                            ></textarea>
                          </div>
                        ))}

                      {page == "Item" && (
                        <div className="col-span-2">
                          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tags
                          </p>

                          <ul className="grid w-full gap-2 md:grid-cols-5">
                            {tags.map((item, index) => (
                              <li key={index}>
                                <input
                                  id={item.label}
                                  type="checkbox"
                                  value={list.tag}
                                  checked={
                                    name == "Create"
                                      ? list.tag.toString().includes(item.id)
                                      : list.tag.toString().includes(item.id)
                                  } // checks if item.label inside newItem.tag, if not then uncheck
                                  onChange={() => handleTagChange(item.id)}
                                  className="hidden peer"
                                />
                                <label
                                  htmlFor={item.label}
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
                      )}

                      {(page == "Category" || page == "Item") && (
                        <div className="relative col-span-2 sm:col-span-1">
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="small_size"
                          >
                            Upload Image
                          </label>
                          <input
                            name="image"
                            accept=".jpg, .jpeg, .png"
                            ref={fileInputRef}
                            onChange={handleInputChange}
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
                      )}

                      <div
                        className={`${
                          page == "Category" || page == "Item"
                            ? "col-span-1"
                            : "col-span-2"
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2 sm:mb-3.5">
                          Published
                        </p>
                        <div className="max-w-max">
                          <label className="items-center sm:mb-4 cursor-pointer select-none">
                            <div className="relative mb-3 ">
                              <input
                                name="published"
                                type="checkbox"
                                checked={list.published}
                                onChange={handleInputChange}
                                value=""
                                className="toggle-switch sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                            </div>
                          </label>
                        </div>

                        <div
                          className={`text-sm text-gray-500 ${
                            page == "Category" || page == "Item"
                              ? "mt-1 sm:mt-0"
                              : ""
                          }`}
                        >
                          <div className={`${list.published ? "hidden" : ""}`}>
                            Your item are only visible to administrators.
                          </div>

                          <div className={`${list.published ? "" : "hidden"}`}>
                            Your item will be publicly visible on your site.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {page !== "Item" && (
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {page == "Menu" || name == "Edit" ? (
                            <>
                              {name} {page}
                            </>
                          ) : (
                            "Save and add another"
                          )}
                        </button>
                      )}

                      {page !== "Menu" && page !== "Item" && name !== "Edit" ? (
                        <>
                          <button
                            onClick={handleSave}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Save
                          </button>
                        </>
                      ) : page == "Item" ? (
                        <>
                          <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Continue
                          </button>
                        </>
                      ) : (
                        ""
                      )}

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
              ) : (
                <>
                  <div>
                    {/* <!-- Modal body --> */}
                    <form action="#" onSubmit={handleSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2 mb-5">
                        <div className="col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                          >
                            Variant Group{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Select
                            primaryColor={"orange"}
                            value={variantGroup}
                            onChange={handleSelectChange}
                            options={variantGroupList}
                            isClearable={true}
                            isMultiple={true}
                            isSearchable={true}
                          />
                        </div>
                        {variantGroup && (
                          <div className="col-span-2">
                            {" "}
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                            >
                              Variant <span className="text-red-500">*</span>
                            </label>
                            {variantGroup &&
                              variantGroup.map(
                                ({ id, label }: any, index: number) => (
                                  <Dropdown_modal
                                    key={index}
                                    variantgroupID={id}
                                    variantgroupIndex={index}
                                    variantGroup={variantGroup}
                                    label={label}
                                    matchVariant={matchVariant}
                                    selectedOption={selectedOption}
                                    handleVariantChange={handleVariantChange}
                                    handleRadioChange={handleRadioChange}
                                  ></Dropdown_modal>
                                )
                              )}
                          </div>
                        )}
                        {allCombinations.length > 0 &&
                          allCombinations.map(
                            (item: any, combinationIndex: number) => (
                              <div
                                key={combinationIndex}
                                className="overflow-x-auto col-span-2 p-0.5"
                              >
                                <div className="">
                                  <table className="text-sm text-left text-gray-500 dark:text-gray-400 col-span-2">
                                    <thead>
                                      <tr>
                                        {variantGroup &&
                                          variantGroup.map(
                                            (
                                              { id, label }: any,
                                              index: number
                                            ) =>
                                              Array.isArray(
                                                selectedOption[index]
                                              ) &&
                                              selectedOption[index].length >
                                                0 ? (
                                                <th key={id}>{label}</th>
                                              ) : null
                                          )}
                                        <th>Price</th>
                                        <th>Sku</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        {/* {variantGroup &&
                                        variantGroup.map(
                                          ({ id, label }: any, index: number) =>
                                            Array.isArray(selectedOption[id]) &&
                                            selectedOption[id].length > 0 ? (
                                              <td>
                                                <input
                                                  type="text"
                                                  // value="iPad Air Gen 5th Wi-Fi"f
                                                  className={`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                  placeholder={`${item[0][0]}`}
                                                  disabled
                                                />
                                                {combinationIndex} And {index}
                                              </td>
                                            ) : null
                                        )} */}

                                        {item.map(
                                          (value: any, innerIndex: number) => (
                                            <td key={innerIndex}>
                                              <input
                                                type="text"
                                                // value="iPad Air Gen 5th Wi-Fi"f
                                                className={`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                placeholder={`${value}`}
                                                disabled
                                              />
                                              {/* {combinationIndex} And {index} */}
                                            </td>
                                          )
                                        )}
                                        <td>
                                          <input
                                            type="text"
                                            // value="iPad Air Gen 5th Wi-Fi"f
                                            className={`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            placeholder="Ex. RM 100"
                                          />
                                        </td>
                                        <td>
                                          <input
                                            type="text"
                                            // value="iPad Air Gen 5th Wi-Fi"f
                                            className={`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            placeholder="Ex. 10"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={saveAdd}
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          {page == "Menu" || name == "Edit" ? (
                            <>
                              {name} {page}
                            </>
                          ) : (
                            "Save and add another"
                          )}
                        </button>

                        {page !== "Menu" && name !== "Edit" && (
                          <>
                            <button
                              onClick={saveExit}
                              type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Save
                            </button>
                          </>
                        )}
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CU_Modal;
