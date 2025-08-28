// ModMedAssist.js
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import styles from './ModMedAssist.module.css';
import { initialCustomer, customerReducer } from '../../reducers/customerReducer';

// components
import Header from '../../components/Header/Header';
import Messages from '../../components/Messages/Messages';
import TextBox from '../../components/TextBox/TextBox';
import SupportModal from '../../components/SupportModal/SupportModal';


function ModMedAssist() {

    const [sessionId, setSessionId] = useState(null);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        {"role": "user", "content": "How do I allow an employee to receive release updates?"},
        {"role": "assistant", "content": "To allow an employee to receive release updates, you need to set up staff users to receive notifications from the Kiosk, Patient Portal, and APPatient™. Here are the steps:\n\n1. Navigate to Practice Settings and select Manage Staff Groups from Staff Groups.\n2. Create a new group by selecting New Group.\n3. Enter a group name and add the staff users you would like to include in the group. Ensure the group is set to active.\n4. Once you have saved the group and added it to the staff groups available within the system, scroll down to the bottom of the Staff Group Management page and locate the Additional Settings section.\n5. Add the staff group into the drop-down list, so each user within this group will receive notifications/updates from the Patient Portal, APPatient, and the Kiosk.\n\nFor more information, refer to the following URL: https://modmed.my.site.com/"}
    ])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [autofillValues, setAutofillValues] = useState({});
    const [customer, dispatch] = useReducer(customerReducer, initialCustomer);

    useEffect(() => {
        if (customer.id) {
            axios.post("http://localhost:3001/chat/session", { customer_id: customer.id })
                .then(res => {
                    setSessionId(res.data.session_id);
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
        };
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

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsLoading(true);
        axios.post('http://localhost:3001/case/autofill', { messages })
            .then((response) => {
                console.log(response);
                setAutofillValues(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                openModal={handleOpenModal}
                modalState={isModalOpen}
            />
            <SupportModal 
                isOpen={isModalOpen} 
                isLoading={isLoading} 
                formValues={autofillValues}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default ModMedAssist;