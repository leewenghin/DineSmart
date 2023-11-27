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

export default Badge;
