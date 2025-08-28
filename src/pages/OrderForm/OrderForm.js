// OrderForm.js
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import styles from './OrderForm.module.css';
import { initialCustomer, customerReducer } from '../../reducers/customerReducer';

// components
import Header from '../../components/Header/Header';
import Messages from '../../components/Messages/Messages';
import TextBox from '../../components/TextBox/TextBox';


function OrderForm() {

    const [sessionId, setSessionId] = useState(null)
    const [question, setQuestion] = useState("");
    // const [response, setResponse] = useState("");
    const [messages, setMessages] = useState([])
    // const [isLoading, setIsLoading] = useState(false);

    const [customer, dispatch] = useReducer(customerReducer, initialCustomer);

    useEffect(() => {
        if (customer) {
            axios.post("http://localhost:3001/chat/session", { customer_id: customer })
                .then(res => {
                    setSessionId(res.data.session_id);
                    // console.log("New session ID obtained from backend: ", sessionId)
                    setMessages([]);
                });
        }
    }, [customer]);


    const handleSubmit = async () => {
        // Text input must not be blank
        if (!question) {
            alert('Please select a customer and enter a question.');
            return;
        }

        // Add user message to list
        setMessages((prevMessages) => [...prevMessages, {"role": "user", "content": question}]);
        // setIsLoading(true);

        // Send question and customer id to LLM
        try {
            const res = await axios.post('http://localhost:3001/query', {
                sessionId: sessionId,
                customerId: customer.id,
                query: question,
            });
            setMessages((prevMessages) => [...prevMessages, {"role": "assistant" , "content": res.data.answer}])
        } catch (error) {
            console.error(error);
        } finally {
            // setIsLoading(false);
        }
    };

    // const handleSubmit = () => {
    //     const payload = {
    //         sessionId: sessionId,
    //         customerId: customer,
    //         query: question
    //     }
    //     axios.post('http://localhost:3001/query', payload)
    //         .then((response) => {})
    //         .catch((error) => {})
    // }

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
        <div className={styles.main}>
            <Header dispatch={dispatch} />
            <Messages messages={messages}/>
            <TextBox 
                question={question}
                setQuestion={setQuestion}
                handleSubmit={handleSubmit}
                handleKeyPress={handleKeyPress}
                customer={customer}
            />
        </div>
    );
}

export default OrderForm;