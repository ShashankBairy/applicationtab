import styles from "./Application.module.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import applicationmoduleicon from "../../assets/Group 1171277290.svg";
import searchicon from "../../assets/searchicon";
import randomicon from "../../assets/Group 15.svg";
import AnalyticsTab from "./AnalyticsComponent/AnalyticsTab";
import DistributeTab from "./DistributeComponent/DistributeTab";
import ApplicationStatus from "./StatusComponent/ApplicationStatus";
import Button from "../../widgets/Button/Button";

const ApplicationTab = () => {
  const location = useLocation();
  const showTopSection = location.pathname.includes("/analytics");
  const applicationtabs = [
    { label: "Analytics", path: "/application/analytics" },
    { label: "Distribute", path: "/application/distribute" },
    { label: "Application Status", path: "/application/status" },
  ];

  return (
    <div className={styles.application_module}>
      {showTopSection && (
        <div className={styles.application_module_top}>
          <figure>
            <img src={applicationmoduleicon} />
          </figure>
          <div className={styles.application_module_heading}>
            <p className={styles.application_heading}>Application Module</p>
            <p className={styles.application_sub}>
              Access and manage comprehensive student details seamlessly. View
              personalized profiles tailored to your campus
            </p>
          </div>
          <figure>
            <img src={randomicon} />
          </figure>
          <div className={styles.application_module_searchbox}>
            <div className={styles.application_search_icon}>{searchicon}</div>
            <input placeholder="Search for Application" />
          </div>
        </div>
      )}
      <div className={styles.application_nav_distribute_button}>
        <nav className={showTopSection ? styles.nav : styles.nav_top}>
          <ul className={styles.nav_bar}>
            {applicationtabs.map((tab) => (
              <li className={styles.nav_list}>
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    `${styles.nav_link} ${isActive ? styles.active : ""}`
                  }
                >
                  {" "}
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={
            showTopSection
              ? styles.application_module_nav_content
              : styles.application_module_nav_content_2
          }
        >
          <Routes>
            <Route path="" element={<Navigate to="analytics" replace />} />
            <Route path="/analytics" element={<AnalyticsTab />} />
            <Route path="/distribute/*" element={<DistributeTab />} />
            <Route path="/status" element={<ApplicationStatus />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default ApplicationTab;
