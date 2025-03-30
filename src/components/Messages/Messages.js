import React from 'react'
import styles from './Messages.module.css'

function formatLLMResponse(response) {
    // Replace line breaks with HTML <br> tags
    let formattedResponse = response.replace(/\n/g, '<br>');

    // Handle lists (simple bullet points, e.g., starting with "-")
    formattedResponse = formattedResponse.replace(/^- (.*)/gm, '<li>$1</li>');

    // Wrap bullet points in an unordered list
    formattedResponse = formattedResponse.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');

    // Convert double asterisks (**) into bold (<b>)
    // formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Return as HTML-safe content
    return formattedResponse;
}


const UserMessage = (props) => {
  return (
    <div className={styles.userInput}>
        <div className={styles.userMessage}>
            {props.children}
        </div>
        <div className={styles.userAvatar}>
                <div className={styles.avatarUser}>ES</div>
        </div>
    </div>
  )
}

const AssistantMessage = (props) => {
    const formattedResponse = formatLLMResponse(props.children)
    console.log(formattedResponse)
    return (
        <div className={styles.assistantResponse}>
            <div className={styles.responseAvatar}>
                <div className={styles.avatarAssistant}>S</div>
            </div>
            <div className={styles.responseMessage} dangerouslySetInnerHTML={{ __html: formattedResponse }} >
                {/* {props.children} */}
            </div>
        </div>
    )
}

const Messages = (props) => {
    return (
        <div className={styles.messagesContainer}>
            {props.messages && props.messages.map((message, index) => (
                message.role ==='user' ? 
                <UserMessage key={index}>{message.content}</UserMessage> : 
                <AssistantMessage key={index}>{message.content}</AssistantMessage>
            ))}
        </div>
    )
}

export default Messages