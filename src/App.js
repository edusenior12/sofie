// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import { BsFillSendFill } from "react-icons/bs";

// components
import Header from './components/Header/Header';
import Messages from './components/Messages/Messages';
import TextBox from './components/TextBox/TextBox';

function App() {
    // const [customers] = useState([ // Replace with dynamic fetch later
    //     { id: 'cust1', name: 'Customer 1' },
    //     { id: 'cust2', name: 'Customer 2' },
    //     { id: 'cust3', name: 'Customer 3' },
    // ]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        console.log('messages updated:', messages);
      }, [messages]); // Runs whenever `messages` changes
      

    const handleSubmit = async () => {

        if (!question) {
            alert('Please select a customer and enter a question.');
            return;
        }

        console.log("Sending out user request")

        setMessages((prevMessages) => [...prevMessages, {"role": "user", "content": question}]);
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/query', {
                customerId: '123',
                query: question,
            });
            setResponse(res.data.answer);
            setMessages((prevMessages) => [...prevMessages, {"role": "assistant" , "content": res.data.answer}])
            // console.log(messages);
        } catch (error) {
            console.error(error);
            setResponse('Error: Unable to fetch response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default form submission behavior
            if (question.trim()) {
                handleSubmit(); // Call the submit function
                setQuestion(''); // Clear the input field
            }
        }
    };

    return (
        <div className={styles.App}>

            <div className={styles.side}></div>

            <div className={styles.main}>
                <Header />
                <Messages messages={messages}/>
                <TextBox 
                    question={question}
                    setQuestion={setQuestion}
                    handleSubmit={handleSubmit}
                    handleKeyPress={handleKeyPress}
                />
            </div>

        </div>
    );
}

export default App;

