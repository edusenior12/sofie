import React from 'react'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>Sofie</div>
            <div className={styles.chatHeaderRight}>ES</div>
        </div>
    )
}

export default Header