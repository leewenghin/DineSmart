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
 
  const elementRef = useRef<HTMLFormElement | null>(null);

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
  <form
            action="#"
            encType="multipart/form-data"
            ref={elementRef}
            className=""
          >
            {sortedMenuList.map((item) => {
              if (item.id === 1) {
                return (
                  <div key={item.id}>
                    {/* Render content specific to the selected item */}
                    <img src={item.image} alt="" />
                  </div>
                );
              }
              return null;
            })}
          </form>
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
