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
  list,
  fileInputRef,
  handleInputChange,
  handleTagChange = () => {},
  isChecked,
  handleCancel,
  handleSubmit,
  handleSave = () => {},
  nameAlert,
  priceAlert = false,
}: any) => {
  return (
    <div
      id="updateProductModal"
      data-modal-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
      className="flex flex-col overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl">
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
          {/* <!-- Modal body --> */}
          <form action="#" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div
                className={`${
                  page === "Menu" || page === "Category"
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white select-none"
                >
                  Name
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

              {page === "Item" && (
                <div className="col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    pattern="[0-9]+(\.[0-9]{2})?"
                    value={list.price ? list.price : ""}
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
                  value={list.description !== null ? list.description : ""}
                  onChange={handleInputChange}
                  rows={5}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write a description..."
                ></textarea>
              </div>

              {page === "Item" && (
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
                            name === "Create"
                              ? list.tag.includes(item.id)
                              : list.tag.toString().includes(item.id)
                          } // checks if item.label inside newItem.tag, if not then uncheck
                          onChange={
                            name === "Create"
                              ? () => handleTagChange(item.id)
                              : () => handleTagChange(item.id)
                          }
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

              {(page === "Category" || page === "Item") && (
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
                  page === "Category" || page === "Item"
                    ? "col-span-1"
                    : "col-span-2"
                }`}
              >
                {page === "Menu" ? (
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
                    page === "Category" || page === "Item" ? "mt-1 sm:mt-0" : ""
                  }`}
                >
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
                {page === "Menu" || name === "Edit" ? (
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
        </div>
      </div>
    </div>
  );
};

export default CU_Modal;
