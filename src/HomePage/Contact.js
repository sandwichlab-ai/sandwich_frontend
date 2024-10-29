import { useState } from 'react';
import './contact.css';

function Contact() {

    const [testData, setTestData] = useState([["First name", "Last name"], ["Country"], ["Occupation"], ["Email Address"]]);
 
    return (
        <div className="contact__container">
            {/* <h1>Contact</h1> */}
            <h2 className="contact_title">Lets Have a Chat</h2>
       
            {/* div.contact__form
            form
                input(type="text", placeholder="Your Name")
                input(type="email", placeholder="Your Email")
                textarea(placeholder="Your Message")
                button(type="submit") Submit */}

            <div className="contact__form">
                <form>
                    {testData.map((row) => {
                        return(
                            <div className="row">
                                {row.map((col) => {
                                    return(
                                        // <div className="col">
                                        <span>
                                        <label style={{color:"white"}}>{col}</label>
                                        <input type="text" placeholder={col}/>
                                         </span>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;