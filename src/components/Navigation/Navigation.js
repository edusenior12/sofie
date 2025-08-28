import { NavLink } from "react-router";
import styles from './Navigation.module.css';
import { BsFiletypePdf, BsChatRightDots, BsEmojiFrown, BsLayoutSidebar } from 'react-icons/bs';
import logo from '../../assets/bricklyn-avatar-logo.png';

function Navigation() {
    return (
        <div className={styles.side}>
            <div className={styles.topContainer}>
                <div className={styles.logoContainer}><img src={logo} alt='logo' className={styles.logo}/> </div>
                <div className={styles.logoContainer}><BsLayoutSidebar size={22}/></div>
            </div>
            <NavLink to='/' className={({ isActive }) => isActive ? styles.navItemActive : styles.navItem}>
                <div style={{ padding: 10 }}><BsFiletypePdf size={22} /></div>
                <div style={{ padding: 0 }}>Order Form</div>
            </NavLink>
            <NavLink to='/assist' className={({ isActive }) => isActive ? styles.navItemActive : styles.navItem}>
                <div style={{ padding: 10 }}><BsChatRightDots size={22} /></div>
                <div style={{ padding: 0 }}>ModMed Assist</div>
            </NavLink>
            <NavLink to='/nps' className={({ isActive }) => isActive ? styles.navItemActive : styles.navItem}>
                <div style={{ padding: 10 }}><BsEmojiFrown size={22} /></div>
                <div style={{ padding: 0 }}>NPS Comments</div>
            </NavLink>
        </div>
    )
}

export default Navigation;