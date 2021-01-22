import { Button, Hidden, IconButton, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useState } from 'react'
import { Menu, Clear } from "@material-ui/icons";
import { Link as Scroll } from "react-scroll";
import clsx from "clsx";

import "./Header.css"
import { Link } from 'react-router-dom';
import { useStateValue } from '../../store/StateProvider';


const fixedTopbarHeight = 64;
const normalTopbarHeight = 128;
const sidenavWidth = 260;

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topbarHolder: {
    paddingTop: normalTopbarHeight,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  topbarNormal: {
    height: normalTopbarHeight,
    display: "flex",
    alignItems: "center",
    background: "transparent",
    color: palette.primary.contrastText,
    transition: "height 250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
  },
  topbarFixed: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    color: palette.text.primary,
    height: fixedTopbarHeight,
    background: palette.background.paper,
    boxShadow: theme.shadows[3],
    zIndex: 999,
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      bottom: 0,
      right: "unset",
      width: sidenavWidth,
      left: (props) => (props.isSidebarOpen ? 0 : -sidenavWidth),
      alignItems: "flex-start",
      overflow: "auto",
      transition: "all 250ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
    },
  },
  topbarContent: {
    maxWidth: 1170,
    margin: "0 auto",
    padding: "0 1rem",
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "100vh",
      padding: 0,

      "& .logo": {
        paddingLeft: "1.25rem",
        margin: "1.25rem 0 !important",
        "& h4": {
          fontSize: "1rem !important",
        },
      },
      "& a": {
        width: "100%",
      },
      "& [class^='MuiButtonBase-']": {
        display:"flex",
        justifyContent: "flex-start",
        margin: "0 !important",
        padding: "1rem 1.25rem !important",
        color:"red",
      },
    },
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.54)",
    zIndex: 998,
  },
  menuButton: {
    position: "fixed",
    top: 14,
    left: 16,
    background: palette.background.paper,
    boxShadow: theme.shadows[6],
    zIndex: 997,
  },
}));


export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  };
  

function Header() {
    const theme = useTheme();
    const [{user},] = useStateValue();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isTopbarFixed, setTopbarFixed] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isSidebarOpen });
  
  let scrollableElement =
    document.querySelector(".scrollable-content") || window;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollListener = useCallback(
    debounce(({ target: { scrollTop } }) => {
      let scrollY = scrollTop || window.scrollY;
      scrollY > 128 ? setTopbarFixed(true) : setTopbarFixed(false);
    }, 18),
    []
  );



  const toggleSidenav = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    scrollableElement.addEventListener("scroll", scrollListener);
    return () => {
      scrollableElement.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener, scrollableElement]);

  useEffect(() => {
    if (isMobile) {
      setTopbarFixed(true);
      scrollableElement.removeEventListener("scroll", scrollListener);
    } else scrollableElement.addEventListener("scroll", scrollListener);
  }, [isMobile, scrollListener, scrollableElement]);


    return (
      <div className={isTopbarFixed ? classes.topbarHolder : ""}>
      <div
        className={clsx({
          [classes.topbarNormal]: true,
          [classes.topbarFixed]: isTopbarFixed,
        })}
      >
        <div className={classes.topbarContent}>
          <div
            className={clsx({
              "header-logo": true,
              "w-full": isMobile,
            })}
          >
            <Scroll
              to="intro1"
              duration={400}
              smooth={true}
              onClick={toggleSidenav}
              className="logo header-image"
            >
             <img src="https://shahhridoy.web.app/logo192.png" alt="" />
             <h4>Akkytalk</h4>
             </Scroll>

             <Hidden smUp>
              <IconButton onClick={toggleSidenav}>
                <Clear className="text-error" />
              </IconButton>
              </Hidden>
           </div>

            <div
            className={clsx({
              "flex  items-center": true,
              "flex-column items-start w-full": isMobile,
            })}
          > 
          
          <Scroll
          to="intro1"
          smooth={true}
          duration={400}
          onClick={toggleSidenav}
          
          >
              <Button className="header-nav-button" >Home</Button>
              </Scroll>

              <Scroll
              to="services"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              
              >

              <Button className="header-nav-button">Services</Button>
              </Scroll>
              <Scroll
              to="projects"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              
              >

              <Button className="header-nav-button">Projects</Button>
              </Scroll>

              <Scroll
              to="reviews"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              
              >

              <Button className="header-nav-button">Reviews</Button>
              </Scroll>
              <Scroll
              to="contact"
              smooth={true}
              duration={400}
              onClick={toggleSidenav}
              offset={
                isTopbarFixed
                  ? isMobile
                    ? -80
                    : -(fixedTopbarHeight + 80)
                  : -145
              }>

              <Button className="header-nav-button">Contact</Button>
              </Scroll>

              <Link to={!user ? "/login" : "/admin"}>
              <Button className="header-nav-button">Login</Button>
              </Link>
              </div>
              </div>
            </div>
           
          <Hidden smUp>
               <IconButton className={classes.menuButton} onClick={toggleSidenav}>
            <Menu className="text-black" />
               </IconButton>
           </Hidden>
            {isMobile && isSidebarOpen && (
            <div onClick={toggleSidenav} className={classes.overlay} />
              )}
          </div>
             );
}
export default Header
