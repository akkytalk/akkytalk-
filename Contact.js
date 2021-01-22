import { Button, Card, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import db, { firebaseAnalytics } from '../../firebase';

import './Contact.scss';

function Contact() {

    const [state, setState] = useState({});

    const handleChange = async ({target: { name, value}}) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async () => {
        
        db.collection("requests")
        .add({ ...state, date: new Date().toISOString() })
        .then(() => {
        setState({});
        firebaseAnalytics.logEvent("generate_lead", { email: state.email });
      });
  };

    
    return (
        <section className="contact" id="contact">
         <div className="contact-container">
           <Card elevation={6} className="contact-card">
               <p className="contact-text">Contact Us</p>
               <h2>Let's Talk</h2>
               <div className="services-line"></div>
 
            <ValidatorForm onSubmit={handleFormSubmit}>
               <div className="contact-form">
                   <Grid container spacing={3} justify="center">
                     <Grid item sm={6} xs={12}>
                         <TextValidator 
                         label="name"
                         name="name"
                         value={state.name || ""}
                         fullWidth
                         onChange={handleChange}
                         validators={["required"]}
                         errorMessages={["this field is required"]}
                         />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                  <TextValidator
                    label="Email"
                    name="email"
                    value={state.email || ""}
                    fullWidth
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextValidator
                    label="Contact Number"
                    name="contact"
                    value={state.contact || ""}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextValidator
                    label="Company"
                    name="company"
                    value={state.company || ""}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    label="Question to Us"
                    name="details"
                    value={state.details || ""}
                    multiline
                    rows={8}
                    fullWidth
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                  className="contact-button"
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Send Message
                  </Button>
                </Grid>
                   </Grid>

               </div>
            </ValidatorForm>
           </Card>
         </div>
         
        </section>
    )
}

export default Contact
