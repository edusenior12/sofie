import React from 'react'
import styles from './Header.module.css'
import CustomerSelect from '../CustomerSelect/CustomerSelect';


function Header ({ dispatch }) {
    
    function handleCustomerSelection(e) {
        // e.preventDefault();
        console.log(`Target is: ${e.value}`)
        dispatch({
            type: 'selected',
            id: e.value,
        })
    };

    return (
        <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>Bricklyn</div>
            <div className={styles.chatHeaderMiddle}>
                <CustomerSelect onSelect={handleCustomerSelection}/>
            </div>
            <div className={styles.chatHeaderRight}>ES</div>
        </div>
    )
}

export default Header