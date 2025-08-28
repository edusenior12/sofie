// App.js
import { Routes, Route } from 'react-router';
import styles from './App.module.css';

// Components and Pages
import OrderForm from './pages/OrderForm/OrderForm';
import ModMedAssist from './pages/ModMedAssist/ModMedAssist';
import Navigation from './components/Navigation/Navigation';


function App() {

    return (
        <div className={styles.App}>
            <Navigation />
            <Routes>
                <Route path='/' element={<OrderForm />} />
                <Route path='/assist' element={<ModMedAssist />} />
            </Routes>
        </div>
    );
}

export default App;

