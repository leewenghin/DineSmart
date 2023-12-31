import {
  faAnglesRight,
  faCartShopping,
  faEllipsisVertical,
  faGrip,
  faGripVertical,
  faList,
  faMinus,
  faPlus,
  faStar,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Order_modal from "../components/order_modal";
import "./menu.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import qrtable from "./admin/admin_qrtable";
import {
  OrderProvider,
  useOrderContext,
  OrderContextProps,
  OrderList,
} from "./context";
import { RadioGroup, Radio } from "../components/radio_button";
import variant from "./admin/admin_variant_value";
// import { OrderList } from "./context";
const categories = [
  "Appetizers",
  "Main Course",
  "Drinks",
  "Sandwiches",
  "Dessets",
];

const menuItems = [
  {
    itemName: "Mashed Potatoes",
    price: "5.99",
    description: "",
    quantity: "1",
  },
];

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  published: boolean;
  tag: string[];
  foodcategory: number;
}

interface VariantPrice {
  id: number;
  variants: number[];
  fooditems: number;
  price: string;
  sku: number;
}

type OptionOrderType = {
  id: any;
  value: string;
  // items: FoodItem[];
};

const dataArray: any[] = [
  {
    Appetizer: [
      {
        id: 1,
        categories: "Appetizer",
        imageSrc: "../src/assets/img/potato.png",
        foodTitle: "Mashed Potatoes",
        description:
          "Mashed potatoes are potatoes that have been boiled and crushed into a soft mass, often with butter and milk.",
        price: "5.99",
      },
    ],
    Main_Course: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
    dinner: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
    roti: [
      {
        id: 2,
        categories: "Main Course",
        imageSrc: "../src/assets/img/beef-bliss.jpg",
        foodTitle: "Ultimate Beef Bliss Burger",
        description: "Description for the Ultimate Beef Bliss Burger",
        price: "17.99",
      },
      {
        id: 3,
        categories: "Main Course",
        imageSrc: "../src/assets/img/fishstew.png",
        foodTitle:
          "Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish Stew Fish StewFish Stew",
        description: "Description for the Fish Stew",
        price: "12.99",
      },
    ],
    rice: [],
    combo: [],
    family: [],
    tin: [],
    price: [],
    test: [],
    yahaha: [],
  },
];

const data1 = [
  {
    id: 1,
    name: "Apple",
    description: "A basket of apple ",
    price: 0.0,
    image:
      "http://127.0.0.1:8000/media/admin/item/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996_LhBIQYM.jpg",
    tag: null,
    foodcategory_id: 1,
  },
  {
    id: 2,
    name: "basketball",
    description: "A  basketball",
    price: 10.0,
    image: "http://127.0.0.1:8000/media/admin/item/basketball.jpg",
    tag: null,
    foodcategory_id: 2,
  },
];

const data2 = [
  {
    id: 2,
    name: "Fish",
    description: "A nice fish\r\n",
    image: null,
    published: false,
    foodmenu_id: 1,
  },
  {
    id: 1,
    name: "Main Food",
    description: "food",
    image: null,
    published: true,
    foodmenu_id: 2,
  },
];

interface MenuProps {
  changeIP: string;
}

const RadioButton = ({ label, value, onChange }: any) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

const useApiData = (url: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

interface ButtonItemOptionProps {
  variantGroup: [];
  variantValue: [];
  variantPrices: [];
  items: FoodItem[];
  index: number;
  cart: (selectedValues: any) => void;
}

const ButtonItemOption: React.FC<ButtonItemOptionProps> = ({
  variantGroup,
  variantValue,
  variantPrices,
  items,
  index,
  cart,
}: any) => {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false); // For toggle modal purpose
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [totalprice, setTotalPrice] = useState<any>();

  const handleSubmit = (event: any) => {
    // Preventing the default form submission behaviour
    event.preventDefault();
    cart(selectedValues);
    setIsOptionModalOpen(!isOptionModalOpen);
  };

  // State to track the selected radio button option

  const matchFoodItemOption = variantPrices.filter(
    // Filter food items get the variant and prices
    (item: { fooditems: string | any[] }) =>
      item.fooditems === items.id ? item : null
  );
  const uniqueVariants = [
    ...new Set(
      matchFoodItemOption.flatMap((item: { variants: any }) => item.variants) // Get variant values
    ),
  ];
  const getItemVariantValue = variantValue.filter((item: { id: any }) =>
    uniqueVariants.includes(item.id)
  );
  const uniqueTitles = [
    ...new Set(getItemVariantValue.map((item: { title: any }) => item.title)),
  ]; //Get Variant value with group title

  const getVariantGroup = variantGroup.filter(
    // get variant group info
    (item: { id: any }) => uniqueTitles.includes(item.id)
  );

  const lowestIndexByTitleData = getItemVariantValue.reduce(
    (acc: any, item: any) => {
      const { title } = item;
      if (!(title in acc) || item.id < acc[title].id) {
        acc[title] = item;
      }
      return acc;
    },
    {}
  );

  function arraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  const [check,setcheck] = useState<Boolean>() ;
  
  useEffect(() => {
    const functiontotalprice = (data:any) => {
      try {
        const arraydata = selectedValues.length === 0 ? data : selectedValues; // Handle the case when selectedValues is undefined
        console.log(arraydata);
  
        const optionid = Object.entries(arraydata)
          .filter(
            ([key, item]: [string, any]) => !isNaN(Number(key)) && item && item.id
          )
          .map(([key, item]: [string, any]) => item.id);
       
        const optionprice = variantPrices.find((item: any) =>
          arraysEqual(item.variants, optionid)
        );
        if (!optionprice) {
          // console.warn('Option price not found for selected values:', arraydata);
          return;
        }
        console.log(optionid);
  
        const sumtotalprice = (
          parseFloat(items.price) + parseFloat(optionprice.price)
        ).toFixed(2);
  
        console.log(items.price);
        console.log(sumtotalprice);

        setSelectedValues({...selectedValues , totalprice: sumtotalprice})

        setTotalPrice(sumtotalprice);
      } catch (error) {
        console.error('An error occurred in functiontotalprice:', error);
      }
    };
    
    functiontotalprice({ ...lowestIndexByTitleData});
  }, [check]);


  // Open Model Default
  const toggleModal = () => {
    const checkvariant = variantPrices.filter((variantprice:any) => variantprice.fooditems === items.id);
    console.log(checkvariant);
    if(checkvariant.length == 0){
      cart(items)
    }else{
      setIsOptionModalOpen(!isOptionModalOpen);
      setSelectedValues({ ...lowestIndexByTitleData, items });
      setcheck(!check);
    }
  };

  // Change Variant Setup
  const handleRadioChange = (groupID: any, name: any, variantID: any) => {
    setSelectedValues((prevValues: any) =>
      // console.log(typeof prevValues),
      ({
        ...prevValues,
        [groupID]: { name, id: variantID },
        items: {
          ...items,
        },
      })
    );
    setcheck(!check);
  };

  const renderTableRows = (groupID: any) => {
    const filteredVariants = getItemVariantValue.filter(
      (item: any) => item.title === groupID
    );
    const rows = [];

    // Filter variant values based on the current group name
    const itemsPerRow = Math.max(Math.ceil(filteredVariants.length / 2), 3);
    for (let i = 0; i < filteredVariants.length; i += itemsPerRow) {
      const rowItems = filteredVariants.slice(i, i + itemsPerRow);
      const rowCells = rowItems.map((item: any, index: any) => (
        <td key={item.id} className="flex items-center ms-2">
          <input
            type="radio"
            id={item.id}
            // name={item.name + groupID}
            value={item.name}
            checked={selectedValues[groupID]?.name === item.name}
            onChange={() => handleRadioChange(groupID, item.name, item.id)}
            className="!opacity-100 !relative "
          />
          <label htmlFor={item.id} className="ms-2">
            {item.name}
          </label>
        </td>
      ));
      rows.push(<tr key={i}>{rowCells}</tr>);
    }

    return <tbody className="flex">{rows}</tbody>;
  };
  return (
    <>
      <button
        className="bg-primaryColor rounded "
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        // onClick={() => handleOrderClick(item)}
        id={`itemsOption${index}`}
        onClick={toggleModal}
        type="button"
        // onClick={()=> openmodel(item.foodcategory_id)}
      >
        <p className="text-white sm:!text-base xs:text-sm text-xs font-bold hover:bg-black/[.10] py-1 xs:!px-4 px-2 rounded">
          Order
        </p>
      </button>
      {isOptionModalOpen && (
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
              <div className="flex justify-between items-center pb-2 mb-1 rounded-t border-b sm:mb-1 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {items.name}
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

              <div className="flex p-3 md:p-3 algin-center justify-between ">
                <div className="">
                  <img src="/src/assets/img/potato.png" alt="" />
                  <div className=" flex items-center mt-2 gap-5">
                    <div className="quantity flex flex-1 items-center ">
                      <FontAwesomeIcon
                        icon={faMinus}
                        className="cursor-pointer"
                        // onClick={() => {
                        //   if (menuItem.quantity > 1) {
                        //     handleMinusClick(menuItem);
                        //   } else {
                        //     handleCancelClick(menuItem);
                        //   }
                        // }}
                      />
                      <div className="border-solid flex justify-center items-center border-2 rounded-full sm:!w-9 sm:!h-9 w-6 h-6 sm:!mx-3 sm:!px-3 mx-2 px-2 m-auto">
                        <p className="sm:text-base text-sm">
                          {/* {menuItem.quantity} */}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: "#eda345" }}
                        className="cursor-pointer"
                        // onClick={() => {
                        //   handleOrderClick(menuItem);
                        // }}
                      />
                    </div>
                    <div className="bg-primaryColor rounded ">
                      <p className="text-white sm:!text-base xs:text-sm text-xs font-semibold hover:bg-black/[.10] py-3 xs:!px-4 px-2 rounded">
                        RM {totalprice}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full ps-3">
                  <div className="border-b-2 border-gray-300 mb-2">Option</div>
                  <form
                    action="#"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    {getVariantGroup.map(
                      (group: any, index: Key | null | undefined) => (
                        <div key={index}>
                          <div className="flex border-b-2 border-gray-300 mb-2 pb-2">
                            <p>{group.name} :</p>
                            <div className="">
                              <table>{renderTableRows(group.id)}</table>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className="btn btn-default bg-primaryColor rounded px-2 py-1 text-white font-medium border-2 border-primaryColor"
                        type="submit"
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-default bg-white border-red-500 border-2 hover:bg-red-500 hover:border-red-500 rounded px-2 py-1 text-red-500 hover:text-white font-medium"
                        // onClick
                        type="button"
                        onClick={() => {
                          setIsOptionModalOpen(!isOptionModalOpen);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const menu: React.FC<MenuProps> = ({ changeIP }) => {
  console.log(changeIP);
  const { tableqrid } = useParams();
  // Button and Scroll Down Category List
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const categories = Object.keys(dataArray[0]);
  const categoryRefs: React.RefObject<HTMLDivElement>[] = categories.map(() =>
    useRef(null)
  );
  const { orderList, setOrderList } = useOrderContext();
  // console.log(orderList);
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [orderData, setOrderData] = useState(() => {
    const storedOrderData = localStorage.getItem("orderData");
    const parsedOrderData = storedOrderData
      ? JSON.parse(storedOrderData)
      : null;
    if (orderList) {
      return orderList?.items;
    } else {
      return parsedOrderData?.items;
    }
  });
  // Count Order Items
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  console.log(orderedItems);
  useEffect(() => {
    const orderlistWithTimestamp = orderedItems.map((item) => ({
      id: item.id,
      option: item.option,
      quantity: item.quantity,
      totalprice: item.totalprice,
    }));

    const timestamp = new Date().toISOString();

    const currentorderlist = {
      timestamp,
      items: orderlistWithTimestamp,
    };
    // console.log(currentorderlist);
    const handleBeforeUnload = () => {
      localStorage.setItem("orderData", JSON.stringify(currentorderlist));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [orderedItems]);

  const handleCategoryItemClick = (index: any) => {
    setActiveCategory(index);

    categoryRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    
    // console.log(index);
    const listElement = listRef.current;
    if (listElement) {
      const listItem = listElement.children[index];
      const listItemRect = listItem.getBoundingClientRect();
      const listRect = listElement.getBoundingClientRect();
      const scrollLeft = listElement.scrollLeft;
      // console.log("1:" + listItemRect.right);
      // console.log("2:" + listRect.right);
      // console.log("3:" + listItemRect.left);
      // console.log("4:" + listRect.left);
      // console.log("5:" + scrollLeft);
      // console.log(listItemRect);
      // console.log(listElement.children[index]);
      // console.log(listRect);
      // console.log(index);

      // Check if the item is partially or fully hidden on the right side
      if (listItemRect.right > listRect.right) {
        // Calculate how much to scroll to fully show the item
        const scrollAmount = listItemRect.right - listRect.right - scrollLeft; // Add some extra space
        listElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else if (listItemRect.left < listRect.left) {
        const scrollAmount = listItemRect.left + listRect.left - scrollLeft;
        // If the item is hidden on the left, scroll to bring it fully into view
        listElement.scrollBy({ top: scrollAmount, behavior: "smooth" });
      } else if (index === 0) {
        listElement.scrollBy({ left: -100, behavior: "smooth" });
      }

      // Call the provided click handler
      handleCategoryClick(index);
    }
  };

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    categoryRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Open Model on medium screen size
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Get items from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_category = await fetch(
          `http://${changeIP}:8000/api/foodcategories/`
        );
        const response_items = await fetch(
          `http://${changeIP}:8000/api/fooditems/`
        );
        if (response_items.ok && response_category.ok) {
          const data_items = await response_items.json();
          const data_category = await response_category.json();
          setFoodItems(data_items);
          setFoodCategory(data_category);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const variantGroupUrl = "http://127.0.0.1:8000/api/variantgroup/";
  const variantValueUrl = "http://127.0.0.1:8000/api/variantvalue/";
  const variantPricesUrl = "http://127.0.0.1:8000/api/variantprices/";

  const {
    data: variantGroup,
    loading: variantGroupLoading,
    error: variantGroupError,
  }: any = useApiData(variantGroupUrl);
  const {
    data: variantValue,
    loading: variantValueLoading,
    error: variantValueError,
  }: any = useApiData(variantValueUrl);
  const {
    data: variantPrices,
    loading: variantPricesLoading,
    error: variantPricesError,
  }: any = useApiData(variantPricesUrl);

  useEffect(() => {
    console.log("foodItems:", foodItems);
    console.log("orderData:", orderData);
    // Function to combine orderData with itemData based on matching IDs
    const combineOrderAndItemData = () => {
      if (orderData && orderData.length > 0) {
        const combinedItems: any[] = [];
        orderData.forEach(
          (orderItem: {
            totalprice: any;
            option: any;
            id: any;
            quantity: any;
          }) => {
            const matchingItem: any = foodItems.find(
              (item: { id: any }) => item.id === orderItem.id
            );
            // console.log(matchingItem);
            if (matchingItem) {
              combinedItems.push({
                ...matchingItem,
                option: orderItem.option,
                quantity: orderItem.quantity,
                totalprice: orderItem.totalprice,
              });
            }
          }
        );
        setOrderedItems(combinedItems);
      }
    };

    // Call the function when itemData or orderData changes
    if (foodItems.length > 0) {
      combineOrderAndItemData();
    }
  }, [foodItems, orderData]);
  // console.log(orderedItems);
  // When click one of the items then add new label (quantity) and output to order list
  const handleOrderClick = (item: any) => {
    const existingItemIndex = orderedItems.findIndex(
      (orderedItem) =>
        orderedItem.id === item.id &&
        orderedItem.option.toString() === item.option.toString()
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity by adding 1
      const updatedItems = [...orderedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderedItems(updatedItems);
    } else {
      // If the item doesn't exist, add it to the orderedItems array with a quantity of 1
      setOrderedItems([...orderedItems, { ...item, quantity: 1 }]);
    }
  };
  // Minus quantity
  const handleMinusClick = (item: any) => {
    const existingItemIndex = orderedItems.findIndex(
      (orderedItem) =>
        orderedItem.id === item.id &&
        orderedItem.option.toString() === item.option.toString()
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity by subtracting 1
      const updatedItems = [...orderedItems];
      // console.log(updatedItems);
      updatedItems[existingItemIndex].quantity = Math.max(
        0,
        updatedItems[existingItemIndex].quantity - 1
      );
      setOrderedItems(updatedItems);
    }
  };

  // Cancel order items
  const handleCancelClick = (item: any) => {
    // Remove the item from the orderedItems array
    const updatedItems = orderedItems.filter(
      (orderedItem) =>
        orderedItem.id !== item.id ||
        orderedItem.option.toString() !== item.option.toString()
    );
    // console.log(updatedItems);
    setOrderedItems(updatedItems);
  };

  // Count all order items
  const totalPrice = orderedItems.reduce((acc, currentItem) => {
    return acc + currentItem.totalprice * currentItem.quantity;
  }, 0);

  // Pass data to other page
  const urlParams = new URLSearchParams(window.location.search);
  const demo = urlParams.get("demo");
  const navigate = useNavigate();
  const handleCheckOut = () => {
    const orderlistWithTimestamp = orderedItems.map((item) => ({
      id: item.id,
      option: item.option,
      quantity: item.quantity,
      totalprice: item.totalprice,
    }));
    console.log(orderlistWithTimestamp);
    const timestamp = new Date().toISOString();

    const currentorderlist = {
      // length: orderlistWithTimestamp.length,  // Add the length property
      timestamp,
      items: orderlistWithTimestamp,
    };
    // updateData(orderlist);
    console.log(tableqrid);
    setOrderList(currentorderlist);
    if (demo) {
      navigate(`/table/${tableqrid}/order_detail?demo=true`);
    } else {
      navigate(`/table/${tableqrid}/order_detail`);
    }
  };

  const listRef = useRef<HTMLUListElement | null>(null);
  const [showLeftIcon, setShowLeftIcon] = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const listElement = listRef.current;
      if (listElement) {
        const isAtStartOfContainer = listElement.scrollLeft === 0;
        const isEndOfContainer =
          listElement.scrollLeft + listElement.clientWidth >=
          listElement.scrollWidth - 1;
        setShowLeftIcon(!isAtStartOfContainer);
        setShowRightIcon(!isEndOfContainer);
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScrollRight = () => {
    const listElement = listRef.current as HTMLElement | null;
    if (listElement) {
      listElement.scrollBy({ left: 200, behavior: "smooth" }); // Adjust the scroll amount as needed
    }
  };
  const handleScrollLeft = () => {
    const listElement = listRef.current as HTMLElement | null;
    if (listElement) {
      listElement.scrollBy({ left: -200, behavior: "smooth" }); // Adjust the scroll amount as needed
    }
  };

  // const elementRef = useRef(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           console.log('Element is in the viewport!');
  //           // You can perform actions when the element is in the viewport
  //         } else {
  //           console.log('Element is out of the viewport!');
  //           // You can perform actions when the element is out of the viewport
  //         }
  //       });
  //     },
  //     {
  //       root: null, // Use the viewport as the root
  //       rootMargin: '0px', // No margin
  //       threshold: 0.5, // 50% of the element must be visible to trigger the callback
  //     }
  //   );

  //   observer.observe(elementRef.current);

  //   // Cleanup the observer when the component is unmounted
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // const sortedFoodCategory = foodCategory.sort((a, b) => a.id - b.id);
  // const [testing, setOrderData] = useState(false);

  const orderOption = (value: any) => {
    console.log(value);

    const isOptionOrderType = (item: any): item is OptionOrderType => {
      return (
        typeof item === "object" && "id" in item && typeof item.id === "number"
      );
    };
    const optionOrder = Object.values(value)
      .filter(isOptionOrderType)
      .map((item) => item.id);
    console.log(optionOrder);
    const optionprice = variantPrices.find((item: any) => item);
    console.log(optionprice);
    const sum = (
      parseFloat(value.items.price) + parseFloat(optionprice.price)
    ).toFixed(2);
    console.log(sum+ value.totalprice);
    handleOrderClick({ ...value.items, option: optionOrder, totalprice: sum });
  };

  return (
    <>
      {changeIP}
      <div className=" mx-1440 relative">
        <div className="bg-white sticky top-0 z-10 border-b-2 mb-5">
          <div className="flex justify-between items-center lg:max-w-screen-lg md:max-w-screen-md max-w-none md:mx-auto mx-3 py-3 ">
            <h1 className="py-2  font-semibold ">DineSmart</h1>
            <div className="flex align-center">
              <button className="bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5] flex justify-center items-center px-3 me-3 rounded ">
                <Link to={"/admin_panel/menu"}>
                  <p className="text-white">Login</p>
                </Link>
              </button>
              <button className="bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5] flex justify-center items-center  w-8 h-8 me-3 rounded ">
                <span className="material-symbols-outlined text-white text-center ">
                  apps
                </span>
              </button>
              <button className="bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5] flex justify-center items-center  w-8 h-8  rounded ">
                {/* <FontAwesomeIcon icon={faGrip} className="text-white" /> */}
                <FontAwesomeIcon icon={faList} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className=" max-w-screen-lg mx-auto mb-16 ">
          <div className="flex mx-auto md:container ">
            <div className=" md:w-2/3 w-full relative">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-white shadow mb-3 md:static sticky top-16 ">
                <ul
                  className="flex -mb-px md:text-base text-sm items-center font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto no-scrollbar cursor-grabbing "
                  ref={listRef}
                >
                  {foodCategory.map((category: any, index) => {
                    if (category.published == true) {
                      return (
                        <li
                          key={index}
                          className={`mr-2 `}
                          onClick={() => handleCategoryItemClick(index)}
                        >
                          <p
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group whitespace-nowrap ${
                              activeCategory === index
                                ? "text-primaryColor  !border-primaryColor"
                                : "hover:text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {category.name}
                          </p>
                        </li>
                      );
                    }
                  })}
                  {/* {showLeftIcon && (
                    <button
                      className="bg-white border-b border-gray-200 px-2 py-4 cursor-pointer absolute "
                      onClick={handleScrollLeft}
                    >
                      &lt;
                    </button>
                  )}
                  {showRightIcon && (
                    <button
                      className="bg-white border-b border-gray-200 px-2 py-4 absolute right-0 cursor-pointer "
                      onClick={handleScrollRight}
                    >
                      &gt;
                    </button>
                  )} */}
                </ul>
              </div>
              {/* <div className="border-b border-gray-200 dark:border-gray-700 bg-white shadow mb-3 md:static sticky top-16 overflow-x-auto">
                <div className="flex md:text-base text-sm font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto">
                  <div className="flex space-x-2 ">
                    <button className="px-2 py-1  rounded-l cursor-pointer ">
                      &lt;
                    </button>
                    <div className="flex space-x-2 " style={{ width: "100%" }}>
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className={`flex-none whitespace-nowrap`}
                          onClick={() => handleCategoryClick(index)}
                        >
                          <p
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group whitespace-nowrap ${
                              activeCategory === index
                                ? "text-primaryColor !border-primaryColor"
                                : "hover:text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {category.replace(/_/g, " ")}
                          </p>
                        </div>
                      ))}
                    </div>
                    <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-r cursor-pointer">
                      &gt;
                    </button>
                  </div>
                </div>
              </div> */}

              {/* Grid layout  */}
              {foodCategory.map((category: any, categoryIndex) => {
                if (category.published == true) {
                  return (
                    <div key={categoryIndex} ref={categoryRefs[categoryIndex]}>
                      <div className="p-3 mt-2 flex items-center justify-center w-auto">
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "#eda345" }}
                        />
                        <hr className="w-1/6 mx-3 h-1 bg-gradient-to-r from-goldColor from-10% to-goldColor/[.5] rounded-full" />
                        <p className="text-lg text-center font-semibold text-transparent bg-clip-text bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5]">
                          {category.name}
                        </p>
                        <hr className="w-1/6 mx-3 h-1  bg-gradient-to-l from-goldColor from-10% to-goldColor/[.5]" />
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "#eda345" }}
                        />
                      </div>
                      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:!mx-0 m-2">
                        {foodItems.map((item: any, itemIndex) => {
                          if (
                            item.foodcategory == category.id &&
                            category.published == true
                          ) {
                            return (
                              <div
                                key={itemIndex}
                                className="bg-white sm:!p-2 p-0 sm:!rounded rounded-none shadow-md flex sm:flex-col  "
                              >
                                <div className="sm:!w-full xs:!w-1/3 w-2/5  sm:h-auto h-28  my-auto">
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="w-full sm:!mb-2 mb-0 sm:!h-40  h-full object-cover"
                                  />
                                </div>
                                <div className="sm:!p-1 xs:p-4 p-3 sm:!w-full truncate xs:w-2/3 w-3/5  flex flex-col justify-between food-item-container ">
                                  <div className="truncate line-clamp-4 mb-2  whitespace-normal sm:!leading-none leading-none sm:!text-lg xs:!text-base text-sm  food-item-container">
                                    {item.name}
                                    <br />
                                    <div className="xs:text-sm text-xs">
                                      {item.description}
                                    </div>
                                  </div>
                                  <div className="flex justify-end sm:justify-between items-center ">
                                    <p className=" sm:!text-base xs:text-sm text-xs font-bold sm:!pe-0 pe-2 ">
                                      RM {item.price}
                                    </p>
                                    <ButtonItemOption
                                      variantGroup={variantGroup}
                                      variantValue={variantValue}
                                      variantPrices={variantPrices}
                                      index={itemIndex}
                                      items={item}
                                      cart={orderOption}
                                    />
                                  </div>
                                </div>
                                {/* <!-- Main modal --> */}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  );
                }
              })}
              {/* horizontal layout */}
              {/* {Object.keys(dataArray[0]).map((category) => (
                <div key={category}>
                  <div className="p-3 bg-white mt-2 sm:flex block">
                    <p>{category.replace(/_/g, " ")}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:!mx-0 m-2">
                    {dataArray[0][category].map((item: any, index: any) => (
                      <div
                        key={index}
                        className="bg-white sm:!p-0 p-2 sm:!rounded-none rounded shadow-md sm:flex block"
                      >
                        <div className="sm:w-1/3">
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="w-full object-cover sm:!mb-0 mb-2 sm:!h-50 xs:h-40 h-28"
                          />
                        </div>
                        <div className="sm:flex flex-column sm:block justify-between sm:!p-4 p-1 w-full truncate ">
                          <p className="truncate line-clamp-2 mb-2 sm:h-auto h-[2.5rem] whitespace-normal sm:!text-base text-sm">
                            {item.foodTitle}
                          </p>{" "}
                          <div className="flex sm:justify-end justify-between items-center ">
                            <p className=" sm:!text-base text-sm font-bold sm:!pe-2 pe-0">
                              RM {item.price}
                            </p>
                            <button className="bg-primaryColor rounded ">
                              <p className="text-white sm:!text-base text-sm font-bold hover:bg-black/[.10] py-1 sm:!px-4 px-2 rounded">
                                Order
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))} */}
            </div>

            {/* Show Customer Order Cart When table screen size*/}
            <div className=" ms-1 md:!ms-5 w-1/3 hidden md:block relative">
              <div className="flex flex-col p-3 bg-white sticky top-20">
                <p className="font-medium text-lg ">Table {tableqrid}</p>
                <div className="my-1 border-b-2 pb-2">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "#eda345" }}
                    className="me-2"
                  />
                  <p>3 pax</p>
                </div>
                {orderedItems.map((menuItem, index) => (
                  <div key={index} className="border-b-2 pb-2">
                    <div className="flex items-center justify-between">
                      <p>{menuItem.name}</p>
                      <p className="whitespace-nowrap">RM {menuItem.price}</p>
                      {}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="bg-orange-100 text-sm px-2">
                        {menuItem.option}
                      </div>
                      <div className="quantity flex flex-1 items-center justify-end">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer"
                          onClick={() => {
                            if (menuItem.quantity > 1) {
                              handleMinusClick(menuItem);
                            } else {
                              handleCancelClick(menuItem);
                            }
                          }}
                        />
                        <div className="border-solid flex justify-center items-center border-2 rounded-full w-2 h-7 mx-3 px-3 m-auto">
                          {menuItem.quantity}
                        </div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#eda345" }}
                          className="cursor-pointer"
                          onClick={() => {
                            handleOrderClick(menuItem);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">RM {totalPrice.toFixed(2)}</p>
                </div>

                <button
                  className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2 w-full"
                  onClick={handleCheckOut}
                >
                  <p className="text-white font-medium sm:!text-lg xs:text-base text-sm">
                    Check Out
                  </p>
                  <FontAwesomeIcon
                    icon={faAnglesRight}
                    size="lg"
                    className=" text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Show Customer Order Cart When table screen size*/}
        <div className="fixed bottom-0 w-full flex md:hidden block ">
          <button
            className="bg-lightOrangeColor sm:px-4 sm:py-3 px-2 py-1 basis-1/2 sm:basis-2/3 flex items-center justify-start"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faCartShopping} className="sm:fa-2x pe-2" />
            <p className="md:text-lg text-sm font-medium ">
              RM {totalPrice.toFixed(2)}
            </p>
          </button>
          <button
            className="bg-primaryColor px-4 py-3 flex items-center justify-between w-full basis-1/2 sm:basis-1/3"
            onClick={handleCheckOut}
          >
            <p className="text-white md:text-lg text-sm">Create Order</p>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="sm:fa-2x text-white"
            />
          </button>
        </div>
        <Order_modal isOpen={isOpen} onClose={toggleModal}>
          <div className=" bg-white rounded">
            <div className="flex flex-col">
              <div className="my-1 border-b-2 px-4 py-2 flex items-center justify-between ">
                <div className=" flex items-center">
                  <p className="font-medium text-lg ">Table {tableqrid}</p>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: "#eda345" }}
                    className="mx-2"
                  />
                  3 pax
                </div>
                <div className="flex cursor-pointer  " onClick={toggleModal}>
                  <FontAwesomeIcon icon={faXmark} className=" " />
                </div>
              </div>
              <div
                className="border-b-2 scroll-container px-4 py-2"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {orderedItems.map((menuItem, index) => (
                  <div className="pb-2" key={index}>
                    <div className="flex items-center justify-between sm:text-base text-sm">
                      <p>{menuItem.name}</p>
                      <p className="whitespace-nowrap">RM {menuItem.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>{}</p>
                      <div className="quantity flex flex-1 items-center justify-end">
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="cursor-pointer"
                          onClick={() => {
                            if (menuItem.quantity > 1) {
                              handleMinusClick(menuItem);
                            } else {
                              handleCancelClick(menuItem);
                            }
                          }}
                        />
                        <div className="border-solid flex justify-center items-center border-2 rounded-full sm:!w-9 sm:!h-9 w-6 h-6 sm:!mx-3 sm:!px-3 mx-2 px-2 m-auto">
                          <p className="sm:text-base text-sm">
                            {menuItem.quantity}
                          </p>
                        </div>
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ color: "#eda345" }}
                          className="cursor-pointer"
                          onClick={() => {
                            handleOrderClick(menuItem);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2">
                <div className="flex justify-between ">
                  <p className="font-medium xs:!text-base text-sm">Subtotal</p>
                  <p className="font-medium xs:!text-base text-sm">
                    RM {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="bg-primaryColor flex items-center justify-between mt-12 px-2 py-2 rounded mx-4 mb-4"
                onClick={handleCheckOut}
              >
                <p className="text-white font-medium sm:!text-lg xs:!text-base text-sm">
                  Check Out
                </p>
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  size="lg"
                  className=" text-white"
                />
              </button>
            </div>
          </div>
        </Order_modal>
      </div>

      {/* <div className="flex container px-3 py-4 border-b-2 items-center justify-center relative">
        <div className="flex-none absolute left-5">
          <div className="flex items-center ">
            <FontAwesomeIcon icon={faUserGroup} style={{ color: "#eda345" }} />
            <p className="font-medium"> pax</p>
          </div>
        </div>
        <div className="flex items-center  ">
          <h1 className="text-xl font-bold text-center">Table 1</h1>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold py-3 container">DineSmart</h1>
      </div>

      

      <div className="flex container justify-between">
        <div className="wx-auto">
          <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer h-14 px-1 flex font-semibold justify-center items-center text-center whitespace-normal ${
                activeCategory === index ? 'bg-primaryColor' : 'bg-lightOrangeColor'
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </li>
          ))}
          </ul>
        </div>
              
        <div className="w-3/4">
            <p className="bg-primaryColor font-semibold text-center rounded py-1">Appetizers</p>
            <div className="flex py-2 border-b-2">
              <img src="../src/assets/img/beef-bliss.jpg" alt="" className="w-24 object-scale-down"/>
              <div className="truncate flex flex-col px-1 justify-between">
                <div className="truncate font-semibold">Ultimate Beef Bliss Burger</div>
                <div className="flex justify-between">
                  <div className="font-semibold">
                    RM 17.99
                  </div>
                  <button className="rounded-full bg-primaryColor px-2 font-semibold">
                    Select
                  </button>
                </div>


              </div>
            </div>
        </div>
      </div> */}
    </>
  );
};

export default menu;
