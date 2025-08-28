import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    const sidebartabs = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Students', path: '/students' },
        { label: 'Application', path: '/application' },
        { label: 'Employee', path: '/employee' },
        { label: 'Fleet', path: '/fleet' },
        { label: 'Warehouse', path: '/warehouse' },
        { label: 'SMS', path: '/sms' },
        { label: 'Question Bank', path: '/questionbank' },
        { label: 'Assets Management', path: '/assetsmanagement' },
        { label: 'Payments Service', path: '/paymentsservice' },
        { label: 'CCTV', path: '/cctv' },
        { label: 'HRMS', path: '/hrms' },
        { label: 'Masters', path: '/masters' },
    ];

    return (
        <nav className={styles.nav}>
            <ul className={styles.nav_bar}>
                {sidebartabs.map((tab) => (
                    <li className={styles.nav_item} key={tab.path}>
                        <NavLink
                            to={tab.path}
                            className={({ isActive }) =>
                                `${styles.nav_link} ${isActive ? styles.active : ''}`
                            }
                        >
                            {tab.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;