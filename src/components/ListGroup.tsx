import { useState } from "react";

//  { items: [], heading: string }
interface Props {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  // State variable
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {/* fasle && 'Mosh' = false */}
      {items.length === 0 && <p>No item found</p>}{" "}
      <ul className="list-group">
        {items.map(
          (
            item,
            index //mapping
          ) => (
            <li
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {item}
            </li> // mapping each item to list item
            // should have key property that uniquely identifies that item
          )
        )}
        {/* isn't allowed in the middle of a jsx markup, only use html element or other react components. */}
      </ul>
    </>
  );
}

export default ListGroup;
