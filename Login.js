import { Button, Card, Checkbox, CircularProgress, FormControlLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useHistory } from 'react-router-dom';

import { ReactIcon } from '../components/svg/svg'
import { auth } from '../firebase';
import { useStateValue } from '../store/StateProvider';

import "./Login.scss";

function Login( ) {
    const [loading, setLoading] = useState(false);
    
    const [{ user }, dispatch] = useStateValue();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
      });

      const history = useHistory();


      const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo };
        temp[name] = value;
        setUserInfo(temp);
      };

      const handleFormSubmit = async (event) => {
        setLoading(true);
        // console.log(userInfo);
        try {
          
            auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(({ user }) => {
              if (user) {
                dispatch({
                  type: "SET_USER",
                  user: user
                })
                history.push("/admin");
                
              }
            });
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };

      console.log("user>>" , user);
      

    return (

        <div className="login">
            <Card  className="login-card">
                <div className="login-logo">
                 <ReactIcon className="login-icon" />
                </div>
                <div className="login-container">
                <ValidatorForm onSubmit={handleFormSubmit}>
                    <TextValidator
                    variant="outlined"
                    className="login-email"
                    size="small"
                    name="email"
                    type="email"
                    label="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    validators={["required", "isEmail"]}
                     errorMessages={["this field is required", "email is not valid"]} />

                   <TextValidator
                      className="login-password"
                      variant="outlined"
                      size="small"
                      label="password"
                      onChange={handleChange}
                      type="password"
                      name="password"
                      value={userInfo.password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      />

                <FormControlLabel
                       className="login-checkbox"
                       name="agreement"
                        onChange={handleChange}
                    control={
                       <Checkbox
                       size="small"
                          onChange={({ target: { checked } }) =>
                          handleChange({
                             target: { name: "agreement", value: checked },
                               })
                                }
                         checked={userInfo.agreement || true}
                      />
                      }
                       label="Remeber me"
                      />

                    <div className="login-button">
                    <Button variant="contained"
                        fullWidth
                        disabled={loading}
                        type="submit"
                        color="primary"
                        > 
                         Sign In
                        </Button>
                    </div>
                    {loading && (
                          <CircularProgress
                          size={24}
                           className="login-button-progress"
                          />
                           )}
                </ValidatorForm>
                </div>
            </Card>
        </div>
    )
}

export default Login
