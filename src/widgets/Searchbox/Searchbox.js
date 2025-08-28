import { useState } from "react";
import styles from "./Searchbox.module.css";

const SearchBox = ({ searchicon, placeholder, type,width }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchbox} style={{width:width}}>
      <div className={styles.searchicon}>{searchicon}</div>
      <input
        className={`${styles.input} ${type === 'round' ? styles.round : styles.rectangle}`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBox;
