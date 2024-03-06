import styles from "@/styles/properties.module.css";

function CategoryBar({ all_properties, dropDownNames, setDropDownNames }) {
  function dropDownNamesFunc(price, bed, bath, type) {
    setDropDownNames({
      price,
      bed,
      bath,
      type,
    });
  }

  const uniquePrices = Array.from(
    new Set(all_properties.map((property) => property.price))
  );
  const uniqueBeds = Array.from(
    new Set(all_properties.map((property) => property.beds))
  );
  const uniqueBaths = Array.from(
    new Set(all_properties.map((property) => property.baths))
  );
  const uniqueTypes = Array.from(
    new Set(all_properties.map((property) => property.type))
  );

  return (
    <>
      <div className={styles.dropdown_container}>
        <div>
          <p>{dropDownNames.price}</p>
          <ul>
            {uniquePrices &&
              uniquePrices.map((value, key) => (
                <li
                  key={key}
                  onClick={() =>
                    dropDownNamesFunc(
                      value,
                      dropDownNames.bed,
                      dropDownNames.bath,
                      dropDownNames.type
                    )
                  }
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p>{dropDownNames.bed}</p>
          <ul>
            {uniqueBeds &&
              uniqueBeds.map((value, key) => (
                <li
                  key={key}
                  onClick={() =>
                    dropDownNamesFunc(
                      dropDownNames.price,
                      value,
                      dropDownNames.bath,
                      dropDownNames.type
                    )
                  }
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p>{dropDownNames.bath}</p>
          <ul>
            {uniqueBaths &&
              uniqueBaths.map((value, key) => (
                <li
                  key={key}
                  onClick={() =>
                    dropDownNamesFunc(
                      dropDownNames.price,
                      dropDownNames.bed,
                      value,
                      dropDownNames.type
                    )
                  }
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p>{dropDownNames.type}</p>
          <ul>
            {uniqueTypes &&
              uniqueTypes.map((value, key) => (
                <li
                  key={key}
                  onClick={() =>
                    dropDownNamesFunc(
                      dropDownNames.price,
                      dropDownNames.bed,
                      dropDownNames.bath,
                      value
                    )
                  }
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoryBar;
