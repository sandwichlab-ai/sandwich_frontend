import { useEffect, useState } from 'react';
import image from '../assets/images/image.png';
import vector from '../assets/images/Vector.png'
import Navigate from '../components/Navigate.js';
import axios from 'axios';
import { Dropdown, Menu, Button, Select } from 'antd';
// import { Auth } from 'aws-amplify';
import './contact.css';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const menu = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
    </Menu>
  );

function Contact(props) {
    // eslint-disable-next-line
    const [testData, setTestData] = useState([["First name", "Last name"], ["Country"], ["Occupation"], ["Email Address"]]);
    const [formDataType, setFormDataType] = useState([["input", "input"], ["select"], ["select"], ["input"]])
    const [formData, setFormData] = useState([["", ""], ["China"], ["Student"], [""]]);
    const [errorData, setErrorData] = useState([["First name is required", "Last name is required"], [""], [""], ["Email Address is required"]])
    const [selectedInput, setSelectedInput] = useState([0, 0])
    const [submitEnable, setSubmitEnable] = useState(false)
    const [sumbitBtnPressed, setSubmitBtnPrssed] = useState(false)
    // const countryOpts = [
    //     ["China", "China"],
    //     ["United States", "United States"],
    //     ["United Kingdom", "United Kingdom"],
    //     ["Japan", "Japan"],
    //     ["Australia", "Australia"],
    //     ["Canada", "Canada"],
    //     ["Germany", "Germany"],
    //     ["France", "France"],
    //     ["Italy", "Italy"],
    //     ["Spain", "Spain"]
    // ]

    const countryOpts = [
        { label: "China", value: "China"},
        { label: "United States", value:"United States"},
        { label:"United Kingdom", value:"United Kingdom"},
        { label:"Japan", value:"Japan"},
        { label:"Australia", value:"Australia"},
        { label:"Canada", value:"Canada"},
        { label:"Germany", value:"Germany"},
        { label:"France", value:"France"},
        { label:"Italy", value:"Italy"},
        { label:"Spain", value:"Spain"}
    ]

    // const occupationOpts = [
    //     ["Student", "Student"],
    //     ["Engineer", "Engineer"],
    //     ["Doctor", "Doctor"],
    //     ["Teacher", "Teacher"],
    //     ["Lawyer", "Lawyer"],
    //     ["Other", "Other"]
    // ]

    const occupationOpts = [
        { label: "Student", value: "Student"},
        { label: "Engineer", value: "Engineer"},
        { label: "Doctor", value: "Doctor"},
        { label: "Teacher", value: "Teacher"},
        { label: "Lawyer", value: "Lawyer"},
        { label: "Other", value: "Other"}
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
        axios.post("https://api.sandwichlab.ai/submit", inputData).then((res) => {   
            console.log("request result",res);
        }).catch((err) => {
            console.log("request error",err);
        })
        console.log("postData");
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitBtnPrssed(true)
        if(!submitEnable) {
            return;
        }
        console.log("Submitted", formData);
        const newErrorData = [...errorData];
        for(let i = 0; i < formData.length; ++i) {
           for(let j = 0; j < formData[i].length; ++j) {
            newErrorData[i][j] = formData[i][j] === "" ? `'${testData[i][j]}' is required` : "";
            if(i === 3 && j === 0) {
                console.log("check email format", validateEmail(formData[i][j]))
                newErrorData[i][j] = formData[i][j].length === 0 ? `'${testData[i][j]}' is required` : validateEmail(formData[i][j])? "" : `'${testData[i][j]}' is invalid`;
            }
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

    const handleSelectChange = (value, rowIndex, index) => {
       console.log("value is: ",rowIndex, index, value)
       setSelectedInput([rowIndex, index])
       handleFormChange(rowIndex, index, value)
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleFormChange = (rowIndex, index, value) => {
        console.log("target name", value)
        console.log(rowIndex, index, value);
        const newFormData = [...formData];
        newFormData[rowIndex][index] = value;
        setFormData(newFormData);
        const newErrorData = [...errorData];
        newErrorData[rowIndex][index] = value === "" ? `'${testData[rowIndex][index]}' is required` : "";
        if(rowIndex === 3 && index === 0) {
            console.log("check email format", validateEmail(value))
            newErrorData[rowIndex][index] = value.length === 0 ? `'${testData[rowIndex][index]}' is required` : validateEmail(value)? "" : `'${testData[rowIndex][index]}' is invalid`;
        }
        setErrorData(newErrorData)

        // check if all input is valid
        for(let i = 0; i < newFormData.length; ++i) {
            for(let j = 0; j < newFormData[i].length; ++j) {
                if(newFormData[i][j].length === 0 || (i === 3 && j === 0 && validateEmail(newFormData[i][j]) === false)) {
                    setSubmitEnable(false);
                    return;
                }
            }
        }

        setSubmitEnable(true)
    }

    return (

        <div className="contact__container">
             <Navigate 
        isHome = {props.isHome}
        setIsHome = {props.setIsHome}
    />
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
                                            <label style={{ color :  (sumbitBtnPressed && errorData[rowIndex][index].length > 0) ? "red" : "white" }}>{col}</label>
                                    
                                            {formDataType[rowIndex][index] === 'input' && <input 
                                                type="text" 
                                                placeholder={col} 
                                                style={
                                                    (sumbitBtnPressed && errorData[rowIndex][index].length > 0) ? {borderColor:'rgba(255, 0, 0, 0.8)'} :
                                                    selectedInput[0] === rowIndex && selectedInput[1] === index? {borderColor: 'rgba(140, 104, 255, 0.8)'} : {borderColor: 'rgba(140, 104, 255, 0.2)'}
                                                }
                                                onChange={(e) => handleFormChange(rowIndex, index, e.target.value)}
                                                onSelect={(e) => handleSelect(rowIndex, index, e.target.value)} 
                                                />
                                                }

                                            {(formDataType[rowIndex][index] === 'select' && rowIndex === 1) && 

                                            <Select 
                                               className="contact__select"
                                               options = {countryOpts}
                                               defaultValue={countryOpts[0].value}
                                               onChange={(value) => handleSelectChange(value, rowIndex, index)}
                                               />

                                              

                                             

                                            // <select 
                                            //     type="text" 
                                            //     placeholder={col} 
                                            //     style={
                                            //         (sumbitBtnPressed && errorData[rowIndex][index].length > 0) ? {borderColor:'rgba(255, 0, 0, 0.8)'} :
                                            //         selectedInput[0] === rowIndex && selectedInput[1] === index? {borderColor: 'rgba(140, 104, 255, 0.8)'} : {borderColor: 'rgba(140, 104, 255, 0.2)'}
                                            //     }

                                            //     onChange={(e) => handleFormChange(rowIndex, index, e.target)}
                                            //     onSelect={(e) => handleSelect(rowIndex, index, e.target.value)} 
                                            //     >
                                            //         {
                                            //             rowIndex === 1 && countryOpts.map((country, index) => {
                                            //                 return(
                                            //                     <option key={index} value={country[1]}>{country[0]}</option>
                                            //                 )
                                            //             })
                                                      
                                            //         }

                                            //         {
                                            //             rowIndex === 2 && occupationOpts.map((occupation, index) => {
                                            //                 return(
                                            //                     <option key={index} value={occupation[1]}>{occupation[0]}</option>
                                            //                 )
                                            //             })
                                            //         }
                                            //     </select>      
                                             
                                           }

                                           {
                                            (formDataType[rowIndex][index] === 'select' && rowIndex === 2) && 
                                             <Select 
                                             className="contact__select"
                                             options = {occupationOpts}
                                             defaultValue={occupationOpts[0].value}
                                             onChange={(value) => handleSelectChange(value, rowIndex, index)}
                                             /> 
                                           }

                                           {sumbitBtnPressed && <label style={{ color: "red", minHeight: "20px", 
    display: "inline-block", lineHeight:"20px" }}>{errorData[rowIndex][index].length > 0 && <img src={vector} width="19" height="19"/>} <span>{errorData[rowIndex][index]}</span> </label>  } 

    {!sumbitBtnPressed && <label style={{ color: "red", minHeight: "20px", 
    display: "inline-block" }}></label> }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="btn__group">
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            style={{cursor: "pointer"}}
                            >Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Contact;