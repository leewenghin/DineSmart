import { useEffect, useState } from "react";

const Badge = ({ item, index }: { item: string; index: number }) => {
  return (
    <span
      key={index}
      className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-orange-400 border border-orange-400"
    >
      {item} {index}
    </span>
  );
};

const Dropdown_modal = ({
  variantgroupID,
  variantgroupIndex,
  variantGroup,
  label,
  matchVariant,
  selectedOption,
  handleVariantChange,
  handleRadioChange,
  children,
}: any) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
    handleVariantChange(variantgroupID);
  };

  useEffect(() => {
    const handleDocumentClick = (event: React.MouseEvent | MouseEvent) => {
      if (isDropdown) {
        const targetElement = event.target as HTMLElement;
        if (
          !targetElement ||
          !targetElement.closest(`#dropdownBottomButton${variantgroupIndex}`)
        ) {
          setIsDropdown(false);
        }
      }
    };

    if (isDropdown) {
      // Add a click event listener to the document
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      // Clean up the event listener when the component unmounts or the modal closes
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDropdown]);

  return (
    <div
      key={variantgroupIndex}
      className={`col-span-2 ${
        variantgroupIndex + 1 == variantGroup.length ? "" : "mb-4"
      }`}
    >
      <button
        id={`dropdownBottomButton${variantgroupIndex}`}
        onClick={toggleDropdown}
        type="button"
        // onClick={() => handleVariantChange(id)}
        className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
      >
        <div className="flex justify-center items-center">
          {label}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
      </button>
      {/* <!-- Dropdown menu --> */}{" "}
      {selectedOption[variantgroupIndex] &&
        selectedOption[variantgroupIndex].map((item: any, index: number) => (
          <Badge key={index} item={item} index={variantgroupID}></Badge>
        ))}
      {isDropdown && (
        <div
          id={`dropdownBottomButton${variantgroupIndex}`}
          className="absolute z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
        >
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search value"
              />
            </div>
          </div>
          <ul
            className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {matchVariant.length ? (
              matchVariant.map(({ title, name }: any, index: number) => (
                <li key={index}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id={`checkbox-item${index}`}
                      type="checkbox"
                      value={name}
                      // checked={}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleRadioChange(event, variantgroupIndex)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`checkbox-item${index}`}
                      className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {name} {index} {variantgroupIndex}
                    </label>
                  </div>
                </li>
              ))
            ) : (
              <li key={variantgroupIndex}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  No results
                </div>
              </li>
            )}
          </ul>
          <a
            href="#"
            className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
            </svg>
            Delete user
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown_modal;
