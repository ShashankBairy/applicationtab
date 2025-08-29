import React, { useState,useEffect } from "react";
import styles from "./DistributeTab.module.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import applicationnavtabsicon from "../../../assets/applicationnavtabsicon";
import ZoneForm from "./ZoneComponent/ZoneForm";
import DgmForm from "./DGMComponent/DgmForm";
import CampusForm from "./CampusComponent/CampusForm";
import DistributeTable from "./DistributeTable";
import Button from "../../../widgets/Button/Button";
import plusicon from "../../../assets/plusicon";

const DistributeTab = () => {
  const [isInsertClicked, setIsInsertClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsInsertClicked(false);
  }, [location.pathname]);

  const distributeNavTabs = [
    { label: "Zone", path: "/application/distribute/zone" },
    { label: "DGM", path: "/application/distribute/dgm" },
    { label: "Campus", path: "/application/distribute/campus" },
  ];
  const buttonName = () => {
    if (location.pathname.includes("/zone")) {
      return "Distribute New to Zone";
    }
    if (location.pathname.includes("/dgm")) {
      return "Distribute New to DGM";
    }
    if (location.pathname.includes("/campus")) {
      return "Distribute New to Campus";
    }
    return "Distribute New to Zone";
  };

  const handleDistributeButton = () =>{
    setIsInsertClicked(false);
  }

  

  return (
    <>
      {isInsertClicked && (
        <div className={styles.distribute_button}>
          <Button
            buttonname={buttonName()}
            type={"button"}
            righticon={plusicon}
            onClick={handleDistributeButton}
            margin={"0"}
          />
        </div>
      )}
      {!isInsertClicked && (
        <div className={styles.distribute_tab_form_graph}>
          <div className={styles.distribute_tab_form}>
            <div className={styles.distribute_tab_top}>
              <div className={styles.distribute_tab_top_left}>
                {applicationnavtabsicon}
                <div className={styles.distribute_content_heading}>
                  <p className={styles.heading}>Distribute Applications</p>
                  <p className={styles.sub}>
                    Distribute Applications to all Zones, DGM, and Campuses
                  </p>
                </div>
              </div>
              <nav className={styles.nav}>
                <ul className={styles.nav_bar}>
                  {distributeNavTabs.map((tab) => (
                    <li key={tab.path} className={styles.nav_list}>
                      <NavLink
                        to={tab.path}
                        className={({ isActive }) =>
                          `${styles.nav_link} ${isActive ? styles.active : ""}`
                        }
                      >
                        {tab.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className={styles.distribute_nav_content}>
              <Routes>
                <Route path="" element={<Navigate to="zone" replace />} />
                <Route path="/zone" element={<ZoneForm setIsInsertClicked={setIsInsertClicked}/>} />
                <Route path="/dgm" element={<DgmForm setIsInsertClicked={setIsInsertClicked}/>} />
                <Route path="/campus" element={<CampusForm setIsInsertClicked={setIsInsertClicked}/>} />
              </Routes>
            </div>
          </div>
          <div className={styles.distribute_tab_graph}>
            <p>graph</p>
          </div>
        </div>
      )}
      <div className={styles.distribute_tab_table}>
        <DistributeTable />
      </div>
    </>
  );
};

export default DistributeTab;
