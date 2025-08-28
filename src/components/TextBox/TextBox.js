import React from 'react'
import styles from './TextBox.module.css'
import { BsFillSendFill } from "react-icons/bs";
import { useLocation } from 'react-router';

const TextBox = (props) => {

    let { pathname } = useLocation();

    console.log(pathname);

    return (
        <div className={styles.main}>

            <div className={styles.textInputContainer}>
                <input
                    type='text'
                    name='prompt'
                    className={styles.textInput}
                    placeholder='Ask Sofie a question about this customer.'
                    value={props.question}
                    onChange={(e) => props.setQuestion(e.target.value)}
                    onKeyDown={props.handleKeyPress}
                />
            </div>

            <div className={styles.submitButtonContainer}>
                <div 
                    className={styles.submitButton} 
                    onClick={props.handleSubmit}
                >
                    <BsFillSendFill />
                </div>
            </div>
            
            {pathname === '/assist' ? 
                <div className={styles.createCaseButtonContainer} onClick={() => props.openModal(!props.modalState)}>
                    <p>Create Case</p>
                </div> :
                null
            }

        </div>
    )
}

export default TextBox