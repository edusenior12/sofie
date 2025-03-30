import React from 'react'
import styles from './TextBox.module.css'
import { BsFillSendFill } from "react-icons/bs";

const TextBox = (props) => {
    return (
        <div className={styles.textInputContainer}>

            <div className={styles.textInputContainerLeft}>
                <input
                    type='text'
                    className={styles.textInput}
                    placeholder='Ask Sofie a question about this customer.'
                    value={props.question}
                    onChange={(e) => props.setQuestion(e.target.value)}
                    onKeyDown={props.handleKeyPress}
                />
            </div>

            <div className={styles.textInputContainerRight}>
                <div 
                    className={styles.submitButton} 
                    onClick={props.handleSubmit}
                >
                    <BsFillSendFill />
                </div>
            </div>

        </div>
    )
}

export default TextBox