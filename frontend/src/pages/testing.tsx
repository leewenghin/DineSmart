import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, useState } from 'react';

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



  return (
    <>
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
        {/* Add your left and right scroll buttons here if needed */}
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
                  ))}
                                </>
  );
};

export default Testing;
