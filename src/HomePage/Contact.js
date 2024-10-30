import { useState } from 'react';
import './contact.css';

function Contact() {

    const [testData, setTestData] = useState([["First name", "Last name"], ["Country"], ["Occupation"], ["Email Address"]]);
    const [formData, setFormData] = useState([["", ""], [""], [""], [""]]);
 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted", formData);
    }

    const handleFormChange = (rowIndex, index, value) => {
        console.log(rowIndex, index);
        const newFormData = [...formData];
        newFormData[rowIndex][index] = value;
        setFormData(newFormData);
    }

    return (
        <div className="contact__container">
            <h2 className="contact_title">Lets Have a Chat</h2>
            <div className='content__container'>        
            <div className="contact__form">
                <form>
                    {testData.map((row, rowIndex) => {
                        return(
                            <div className="row" key={rowIndex}>
                                {row.map((col, index) => {
                                    return(

                                        <div className="form-item" key={index}>
                                            <label style={{ color: "white" }}>{col}</label>
                                            <input type="text" placeholder={col} onChange={(e) =>handleFormChange(rowIndex, index, e.target.value)}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="btn__group">
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Contact;