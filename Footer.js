import { Grid } from '@material-ui/core'
import TouchRipple from '@material-ui/core/ButtonBase'
import { Facebook, Instagram, LinkedIn, Twitter } from '@material-ui/icons';
import React from 'react'

import "./Footer.scss"

function Footer() {

   
    const productLink = ["feature", "use cases", "pricing"];
    const supportLink = ["Blog", "FAQ", "Support"];
    const companyLink = ["About", "Privacy Policy", "Terms of Service"];
    
    
    return (
        <section className="footer" id="footer">
           <div className="container">

          <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={6}>
            <h5 className="footer-item">PRODUCT</h5>
            {productLink.map((item, ind) => (
              <TouchRipple
                className="footer-button"
                key={ind}
              >
                <span className="footer-span">{item}</span>
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <h5 className="footer-item">SUPPORT</h5>
            {supportLink.map((item, ind) => (
              <TouchRipple
                className="footer-button"
                key={ind}
              >
                <span className="footer-span">{item}</span>
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <h5 className="footer-item">COMPANY</h5>
            {companyLink.map((item, ind) => (
              <TouchRipple
                className="footer-button"
                key={ind}
              >
                <span className="footer-span">{item}</span>
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <h5 className="footer-item">FEATURES</h5>
            {productLink.map((item, ind) => (
              <TouchRipple
                className="footer-button"
                key={ind}
              >
                <span className="footer-span">{item}</span>
              </TouchRipple>
            ))}
          </Grid>
          <Grid item md={2} xs={6}>
            <h5 className="footer-item">FREQUENT LINKS</h5>
            {supportLink.map((item, ind) => (
              <TouchRipple
                className="footer-button"
                key={ind}
              >
                <span className="footer-span">{item}</span>
              </TouchRipple>
            ))}
          </Grid>
      
          <Grid item md={2} xs={6} justify="center">
              <div className="footer-logo">
                  akkytalk
                  </div>
                  <div className="footer-links">
                      <a href="https://www.facebook.com/aakash.prajapati.7796/"
                      target="_blank"
                      rel="noopener noreferrer">
                          <Facebook  className="footer-icons" />
                      </a>
                      <a href="https://www.linkedin.com/in/akky-talk-1b042b190/" 
                      target="_blank"
                      rel="noopener noreferrer">
                          <LinkedIn className="footer-icons" />
                      </a>
                      <a href="https://twitter.com/akkytalk"
                      target="_blank"
                      rel="noopener noreferrer">
                          <Twitter className="footer-icons" />
                      </a>

                      <a href="https://www.instagram.com/aakash9126/"
                      target="_blank"
                      rel="noopener noreferrer">
                          <Instagram className="footer-icons" />
                      </a>
                  </div>

          </Grid>
          </Grid>
           </div>
            </section>
    )
}

export default Footer
