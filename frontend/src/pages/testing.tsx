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
  const categoryHeight = 60; // Set your category height

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const activeIndex = Math.floor(scrollY / categoryHeight);
    setActiveCategory(activeIndex);
    listRef.current?.scrollTo({ top: activeIndex * categoryHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategoryItemClick = (index:any) => {
    // Handle category item click logic here
    // For example, update state or perform an action based on the selected category
  };


  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white shadow mb-3 md:static sticky top-16">
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
  );
};

export default Testing;
