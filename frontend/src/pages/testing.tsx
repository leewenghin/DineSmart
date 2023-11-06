import { faEllipsisVertical, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState, HtmlHTMLAttributes } from 'react';
import htmlToImage from 'html-to-image';
import { toPng } from "html-to-image";

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

  interface Menu {
    id: number;
    name: string;
    image: string;
    published: boolean;
  }
  const Testing = () => {
  const categories = Object.keys(dataArray[0]);
  const categoryRefs: React.RefObject<HTMLDivElement>[] = categories.map(() =>
    useRef(null)
  );
    const listRef = useRef<HTMLUListElement   | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryItemClick = (index:any) => {
    setActiveCategory(index);

    categoryRefs[index].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  };
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  const handleOrderClick = (item: any) => {
    const existingItemIndex = orderedItems.findIndex(
      (orderedItem) => orderedItem.id === item.id
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


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryIndex = categoryRefs.findIndex((ref) => ref.current === entry.target);
          console.log('Current Category:', categories[categoryIndex]);
        }
      });
    },
    {
      threshold: 1, // Trigger when 50% of the element is visible
    }
  );
  useEffect(() => {
    // Observe category elements when the component mounts
    categoryRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Clean up: disconnect the observer when the component unmounts
    return () => {
      categoryRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []); 

  const elementRef = useRef<HTMLTableElement | null>(null);

  const htmlToImageConvert = (id:any) => {
    const element = elementRef.current;
    if (element) {
      toPng(element, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("Element is null. It might not be rendered yet.");
    }
  };


  const [menuList, setMenuList] = useState<Menu[]>([]); // List for store data from menu table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_category = await fetch(
          `http://127.0.0.1:8000/api/ordertables/`
        );
        if (response_category.ok) {
          const data_category = await response_category.json();
          setMenuList(data_category);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortedMenuList = menuList.sort((a, b) => a.id - b.id);
  return (
    <>
{/* 
    <div ref={elementRef}>
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white shadow mb-3  sticky top-16">
        <ul className="flex -mb-px md:text-base text-sm items-center font-medium text-center text-gray-500 dark:text-gray-400 overflow-x-auto no-scrollbar cursor-grabbing" ref={listRef}>
          {categories.map((category, index) => (
            <li key={index} className={`mr-2`} onClick={() => handleCategoryItemClick(index)}>
              <p
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group whitespace-nowrap ${
                  activeCategory === index ? "text-primaryColor !border-primaryColor" : "hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {category.replace(/_/g, " ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
                    {Object.keys(dataArray[0]).map((category, index) => (
                      <div key={index} ref={categoryRefs[index]}>
                        <div className="p-3 mt-2 flex items-center justify-center w-auto">
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#eda345" }}
                          />
                          <hr className="w-1/6 mx-3 h-1 bg-gradient-to-r from-goldColor from-10% to-goldColor/[.5] rounded-full" />
                          <p className="text-lg text-center font-semibold text-transparent bg-clip-text bg-gradient-to-t from-goldColor from-10% to-goldColor/[.5]">
                            {category.replace(/_/g, " ")}
                          </p>
                          <hr className="w-1/6 mx-3 h-1  bg-gradient-to-l from-goldColor from-10% to-goldColor/[.5]" />
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#eda345" }}
                            />
                        </div>
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:!mx-0 m-2">
                          {dataArray[0][category].map((item: any, index: any) => (
                            <div
                              key={index}
                              className="bg-white sm:!p-2 p-0 sm:!rounded rounded-none shadow-md flex sm:flex-col  "
                            >
                              <div className="sm:!w-full xs:!w-1/3 w-2/5  sm:h-auto h-28  my-auto">
                                <img
                                  src={item.imageSrc}
                                  alt=""
                                  className="w-full sm:!mb-2 mb-0 sm:!h-40  h-full object-cover"
                                />
                              </div>
                              <div className="sm:!p-1 xs:p-4 p-3 sm:!w-full truncate xs:w-2/3 w-3/5  flex flex-col justify-between food-item-container ">
                                <div className="truncate line-clamp-4 mb-2  whitespace-normal sm:!leading-none leading-none sm:!text-lg xs:!text-base text-sm  food-item-container">
                                  {item.foodTitle}
                                  <br />
                                  <div className="xs:text-sm text-xs">
                                    {item.description}
                                  </div>
                                </div>
                                <div className="flex justify-end sm:justify-between items-center ">
                                  <p className=" sm:!text-base xs:text-sm text-xs font-bold sm:!pe-0 pe-2 ">
                                    RM {item.price}
                                  </p>
                                  <button
                                    className="bg-primaryColor rounded "
                                    onClick={() => handleOrderClick(item)}
                                  >
                                    <p className="text-white sm:!text-base xs:text-sm text-xs font-bold hover:bg-black/[.10] py-1 xs:!px-4 px-2 rounded">
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
        {/* <table
      
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tr>
            <th
              style={{
                backgroundColor: "#04AA6D",
                padding: "12px 8px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}
            >
              Company
            </th>
            <th
              style={{
                backgroundColor: "#04AA6D",
                padding: "12px 8px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}
            >
              Contact
            </th>
            <th
              style={{
                backgroundColor: "#04AA6D",
                padding: "12px 8px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}
            >
              Country
            </th>
          </tr>
          <tr>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Alfreds Futterkiste
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Maria Anders
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Germany
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Berglunds snabbköp
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Christina Berglund
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Sweden
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Centro comercial Moctezuma
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Francisco Chang
            </td>
            <td
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Mexico
            </td>
          </tr>
        </table>
    </div> */}
      {/* <button onClick={htmlToImageConvert}>Download Image</button> */}
      {sortedMenuList.map((items, index) => (
            <div
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              key={index}
            >
              <div className="object-cover w-1/6 rounded-l-lg  h-full bg-primaryColor flex items-center justify-center">
                <p className="text-2xl font-semibold ">{items.id}</p>
              </div>
              <div className="flex flex-col justify-between p-3 leading-relaxed  w-5/6">
                <div className="flex justify-between items-center">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Table
                  </h5>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="pe-3 text-primaryColor fa-lg "
                  />
                </div>
                <div className="flex items-center justify-end gap-4">
                  <span className="material-symbols-outlined text-primaryColor">
                    captive_portal
                  </span>
                  <button
                    onClick={() => htmlToImageConvert(items.id)}
                    className="flex items-center"
                  >
                    <span className="material-symbols-outlined text-primaryColor">
                      print
                    </span>
                  </button>
                  <span className="material-symbols-outlined text-primaryColor">
                    refresh
                  </span>
                </div>
              </div>
            </div>
          ))}

                                </> 
  );
};

export default Testing;
