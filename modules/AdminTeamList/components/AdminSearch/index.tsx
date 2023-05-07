import React, { FC, useContext, useEffect, useState } from "react";
import styles from "./AdminSearch.module.sass";
import { useDebounce } from "../../../shared";
import { TeamsContext } from "../../context/teams";
import { allTeams } from "../../static/teams";

interface AdminSearchProps {}

const AdminSearch: FC<AdminSearchProps> = () => {
  const [value, setValue] = useState("");

  const { setTeams } = useContext(TeamsContext);

  const handleChange = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) setValue(e.target.value);
  };

  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setTeams(
      allTeams.filter((team) => {
        return (
          team.id.toString().includes(value) ||
          team.members.find(
            (member) =>
              member.name.includes(value) || member.role.includes(value)
          ) !== undefined
        );
      })
    );
  }, [debouncedValue]);

  return (
    <div className={styles.searchContainer}>
      <input className={styles.search} onChange={handleChange} placeholder="" />
    </div>
  );
};

export default AdminSearch;
