import React, { useState, useEffect } from 'react';
import styles from './SupportModal.module.css';
import { SyncLoader } from 'react-spinners';

const SupportModal = ({ isOpen, isLoading, formValues, onClose }) => {
    const [form, setForm] = useState({
        system: '',
        caseReason: '',
        description: '',
        subject: ''
    });

    // Update form state when formValues change
    useEffect(() => {
        if (formValues) {
        setForm({
            system: formValues.system || '',
            caseReason: formValues.case_reason || '',
            description: formValues.description || '',
            subject: formValues.subject || ''
        });
        }
    }, [formValues]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted:", form);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <h2>Contact Customer Support</h2>
                {isLoading ? <SyncLoader /> : 
                <form onSubmit={handleSubmit} className={styles.formContainer} >
                    <label className={styles.label}>
                        <p className={styles.labelText}>System</p>
                        <select name="system" value={form.system} onChange={handleChange} required className={styles.select}>
                            <option value="">Select an Option</option>
                            <option value="APPatient">APPatient</option>
                            <option value="ASC">ASC</option>
                            <option value="EMA">EMA</option>
                            <option value="Exscribe">Exscribe</option>
                            <option value="Eyefinity EHR">Eyefinity EHR</option>
                            <option value="Inventory Management">Inventory Management</option>
                            <option value="Inventory Management (LEGACY)">Inventory Management (LEGACY)</option>
                            <option value="Klara">Klara</option>
                            <option value="ModMed AMP">ModMed AMP</option>
                            <option value="ModMed KioskApp">ModMed KioskApp</option>
                            <option value="ModMed Pathology">ModMed Pathology</option>
                            <option value="ModMed Pa">ModMed Pa</option>
                            <option value="ModMed PM">ModMed PM</option>
                            <option value="ModMed Pocket Practice">ModMed Pocket Practice</option>
                            <option value="ModMed Procure">ModMed Procure</option>
                            <option value="ModMed Telehealth">ModMed Telehealth</option>
                            <option value="ModMed Xtract">ModMed Xtract</option>
                            <option value="Patient Reminders">Patient Reminders</option>
                            <option value="Patient Self Scheduling">Patient Self Scheduling</option>
                            <option value="Patient Surveys">Patient Surveys</option>
                            <option value="PocketPatient">PocketPatient</option>
                            <option value="Premium Patient Connect">Premium Patient Connect</option>
                            <option value="RCM">RCM</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        <p>Case Reason</p>
                        <select name="caseReason" value={form.caseReason} onChange={handleChange} required className={styles.select}>
                            <option value="">Select an Option</option>
                            <option value="Administrative">Administrative</option>
                            <option value="Analytics/Reports">Analytics/Reports</option>
                            <option value="API Appointment Cancellations">API Appointment Cancellations</option>
                            <option value="Appointment/Schedule">Appointment/Schedule</option>
                            <option value="Bi-Directional HIE (Carequality) Sales Request">Bi-Directional HIE (Carequality) Sales Request</option>
                            <option value="Billing/Coding">Billing/Coding</option>
                            <option value="Boost">Boost</option>
                            <option value="Bridging/Integration">Bridging/Integration</option>
                            <option value="Compliance">Compliance</option>
                            <option value="Direct Messaging">Direct Messaging</option>
                            <option value="Documentation/Workflow">Documentation/Workflow</option>
                            <option value="Faxing">Faxing</option>
                            <option value="Financials">Financials</option>
                            <option value="Image/Device Management">Image/Device Management</option>
                            <option value="Invoice Inquiry">Invoice Inquiry</option>
                            <option value="modmed Pay - Payments">modmed Pay - Payments</option>
                            <option value="modmed Pay - Performance/Slowness">modmed Pay - Performance/Slowness</option>
                            <option value="modmed Pay - Terminal">modmed Pay - Terminal</option>
                            <option value="ModMed Procure">ModMed Procure</option>
                            <option value="ModMed Scribe AI Solution">ModMed Scribe AI Solution</option>
                            <option value="Patient Intake">Patient Intake</option>
                            <option value="Patient Reminders">Patient Reminders</option>
                            <option value="Patient Self Scheduling">Patient Self Scheduling</option>
                            <option value="Performance/Slowness">Performance/Slowness</option>
                            <option value="Practice Relief Program">Practice Relief Program</option>
                            <option value="Premium Data Delivery">Premium Data Delivery</option>
                            <option value="Script Request">Script Request</option>
                            <option value="SynapseSYS">SynapseSYS</option>
                            <option value="Train">Train</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        <p>Description</p>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className={styles.textarea}
                        />
                    </label>

                    <label className={styles.label}>
                        <p className={styles.labelText}>Subject</p>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>

                    <div className={styles.modalFooter}>
                        <div className={styles.closeButton} onClick={() => onClose()}>Close</div>
                        <div className={styles.submitButton} onClick={() => alert("Submitting..")}>Submit</div>
                    </div>
                </form>
                }
            </div>
        </div>
    );
};

export default SupportModal;