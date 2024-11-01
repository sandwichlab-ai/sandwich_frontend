import { useEffect, useState } from 'react';
import image from '../assets/images/image.png';
import axios from 'axios';
import './contact.css';

function Contact() {
    // eslint-disable-next-line
    const [testData, setTestData] = useState([["First name", "Last name"], ["Country"], ["Occupation"], ["Email Address"]]);
    const [formDataType, setFormDataType] = useState([["input", "input"], ["select"], ["select"], ["input"]])
    const [formData, setFormData] = useState([["", ""], ["China"], ["Student"], [""]]);
    const [errorData, setErrorData] = useState([["First name is required", "Last name is required"], [""], [""], ["Email Address is required"]])
    const [selectedInput, setSelectedInput] = useState([0, 0])
    const [submitEnable, setSubmitEnable] = useState(false)
    const countryOpts = [
        ["China", "China"],
        ["United States", "United States"],
        ["United Kingdom", "United Kingdom"],
        ["Japan", "Japan"],
        ["Australia", "Australia"],
        ["Canada", "Canada"],
        ["Germany", "Germany"],
        ["France", "France"],
        ["Italy", "Italy"],
        ["Spain", "Spain"]
    ]

    const occupationOpts = [
        ["Student", "Student"],
        ["Engineer", "Engineer"],
        ["Doctor", "Doctor"],
        ["Teacher", "Teacher"],
        ["Lawyer", "Lawyer"],
        ["Other", "Other"]
    ]

    const postData = (data) => {
        console.log("submited data: ", data)
        const inputData = {
            "first_name": data[0][0],
            "last_name": data[0][1],
            "country": data[1][0],
            "occupation": data[2][0],
            "email": data[3][0]
        }
        axios.post("http://service1.my-namespace:8080/submit", inputData).then((res) => {
            console.log("request result",res);
        }).catch((err) => {
            console.log("request error",err);
        })
        console.log("postData");
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted", formData);
        const newErrorData = [...errorData];
        for(let i = 0; i < formData.length; ++i) {
           for(let j = 0; j < formData[i].length; ++j) {
            newErrorData[i][j] = formData[i][j] === "" ? `'${testData[i][j]}' is required` : "";
           }
        }
        console.log("error", newErrorData)
        postData(formData)
        setErrorData(newErrorData)
    }

    const handleSelect = (rowIndex, index, value) => {
        console.log("selected...", rowIndex, index, value);
        setSelectedInput([rowIndex, index]);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleFormChange = (rowIndex, index, target) => {
        console.log("target name", target.style)
        console.log(rowIndex, index);
        const newFormData = [...formData];
        newFormData[rowIndex][index] = target.value;
        setFormData(newFormData);
        const newErrorData = [...errorData];
        newErrorData[rowIndex][index] = target.value === "" ? `'${testData[rowIndex][index]}' is required` : "";
        if(rowIndex === 3 && index === 0) {
            console.log("check email format", validateEmail(target.value))
            newErrorData[rowIndex][index] = target.value.length === 0 ? `'${testData[rowIndex][index]}' is required` : validateEmail(target.value)? "" : `'${testData[rowIndex][index]}' is invalid`;
        }
        setErrorData(newErrorData)

        for(let el of newFormData) {
            for(let element of el) {
                if(element.length === 0) {
                    setSubmitEnable(false);
                    return;
                }
            }
        }

        setSubmitEnable(true)
    }

    return (
        <div className="contact__container">
            <h2 className="contact_title">
                <span>Lets Have a Chat</span>
                <img src={image} alt="contact_image" className="contact__chat" width={54} height={54}/>
            </h2>
            
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
                                            {formDataType[rowIndex][index] === 'input' && <input 
                                                type="text" 
                                                placeholder={col} 
                                                style={
                                                    errorData[rowIndex][index].length > 0 ? {borderColor:'rgba(255, 0, 0, 0.8)'} :
                                                    selectedInput[0] === rowIndex && selectedInput[1] === index? {borderColor: 'rgba(140, 104, 255, 0.8)'} : {borderColor: 'rgba(140, 104, 255, 0.2)'}
                                                }
                                                onChange={(e) => handleFormChange(rowIndex, index, e.target)}
                                                onSelect={(e) => handleSelect(rowIndex, index, e.target.value)} 
                                                />
                                                }

                                            {formDataType[rowIndex][index] === 'select' && <select 
                                                type="text" 
                                                placeholder={col} 
                                                style={
                                                    errorData[rowIndex][index].length > 0 ? {borderColor:'rgba(255, 0, 0, 0.8)'} :
                                                    selectedInput[0] === rowIndex && selectedInput[1] === index? {borderColor: 'rgba(140, 104, 255, 0.8)'} : {borderColor: 'rgba(140, 104, 255, 0.2)'}
                                                }

                                                onChange={(e) => handleFormChange(rowIndex, index, e.target)}
                                                onSelect={(e) => handleSelect(rowIndex, index, e.target.value)} 
                                                >
                                                    {
                                                        rowIndex === 1 && countryOpts.map((country, index) => {
                                                            return(
                                                                <option key={index} value={country[1]}>{country[0]}</option>
                                                            )
                                                        })
                                                    }

                                                    {
                                                        rowIndex === 2 && occupationOpts.map((occupation, index) => {
                                                            return(
                                                                <option key={index} value={occupation[1]}>{occupation[0]}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            }

                                            <label style={{ color: "red", minHeight: "20px", 
    display: "inline-block" }}>{errorData[rowIndex][index]}</label>    
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="btn__group">
                        <button 
                            type="submit" 
                            disabled={!submitEnable} 
                            onClick={handleSubmit}
                            style={{cursor: submitEnable? "pointer" : "not-allowed"}}
                            >Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Contact;