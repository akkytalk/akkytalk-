
import React from 'react'
import Header from '../Header/Header'
import business from "../../Assets/Images/business.svg"
import { Link as Scroll } from "react-scroll";

import "./Intro1.css"
import { Button, Grid } from '@material-ui/core'

function Intro1() {
    return (
        <div className="intro1" id="intro1">
            <Header />
            <div className="intro1-containter">
            <Grid container spacing={3} alignItems="center">
            <Grid item sm={6} xs={12}>
            

             <div className="intro1-container-text">
               <h1>Fullstack Web Developer</h1>
               <div className="intro1-container-text-line"></div>
             </div>
               <p className="intro-container-p">I develop performant website. Provide me your design or any sample of your desired website, I will make it live. It's my main goal to evaluate your trust.</p>
               
               <div className="intro1-container-buttons">
               <Scroll
              to="contact"
              smooth={true}
              duration={400}
              >
                <Button variant="contained" className="intro1-container-button1">Get Service</Button>
                </Scroll>

                <a className="intro1-link"
                href="https://www.fiverr.com/users/akkytalk"
                rel="noopener noreferrer"
                target="_blank"
                >

                <Button variant="outlined"  className="intro1-container-button2">Fiverr</Button>
                </a>
               </div>
               
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div>
                  <img className="intro1-business-image" src={business} alt="" />
                  </div>
                </Grid>
                  </Grid>
            
            </div>

        </div>
    )
}

export default Intro1
 