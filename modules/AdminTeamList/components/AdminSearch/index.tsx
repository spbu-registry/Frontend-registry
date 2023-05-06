import React, { FC, useEffect, useState } from "react";
import styles from "./AdminSearch.module.sass";
import { useDebounce } from "../../../shared";

interface AdminSearchProps {
  onChange: (value: string) => any;
}

const AdminSearch: FC<AdminSearchProps> = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) setValue(e.target.value);
  };

  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={styles.searchContainer}>
      <input className={styles.search} onChange={handleChange} placeholder="" />
    </div>
  );
};

export default AdminSearch;
