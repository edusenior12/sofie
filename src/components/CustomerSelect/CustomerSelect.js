// components/PersonDropdown.js
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
// import { BsSearch } from "react-icons/bs";


const CustomerSelect = ({ onSelect }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        axios.get('http://localhost:3001/customers') // adjust if using a proxy or full URL
            .then(response => {
                const formattedOptions = response.data.data.map(item => ({
                    label: item.name, // display name
                    value: item.id     // actual ID
                }));
                setOptions(formattedOptions);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch dropdown data", error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ width: 500 }}>
            {/* <BsSearch sie={25} /> */}
            <Select
                options={options}
                isLoading={loading}
                onChange={onSelect}
                placeholder="Select a customer..."
                isClearable
                isSearchable
            />
        </div>
    );
};

export default CustomerSelect;
