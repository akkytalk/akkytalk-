import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import ImageGallery from "react-image-gallery";
import { IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Project.scss"

const useStyles = makeStyles(({ palette, ...theme }) => ({
  navButtons: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  right: {
    right: 0,
  },
  left: {
    left: 0,
  },
  playButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  fullscreenButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  wrapper: {
    "& img": {
      width: "100%",
      borderRadius: 4,
    },
    "& .image-gallery-thumbnail-inner > img": {
      maxHeight: 50,
      overflow: "hidden",
    },
    "& .image-gallery-thumbnail": {
      borderRadius: 6,
    },
    "& .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus": {
      border: "2px solid rgba(var(--primary), 1)",
    },
  },
}));

const CustomImageGallery = ({ imageList = [] }) => {
  const classes = useStyles();

  let images = imageList.map((item) => ({
    original: item,
    thumbnail: item,
  }));
 

  const renderLeftNav = (onClick, disabled) => (
    <IconButton
      className={clsx(classes.navButtons, classes.left)}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowBackIosRoundedIcon  className="text-white" fontSize="large" />
    
    </IconButton>
  ); 

  const renderRightNav = (onClick, disabled) => (
    <IconButton
      className={clsx(classes.navButtons, classes.right)}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowForwardIosRoundedIcon className="text-white" fontSize="large" />
        
    </IconButton>
  );

  const renderPlayPauseButton = (onClick, isPlaying) => (
    <IconButton className={classes.playButton} onClick={onClick}>
      {isPlaying ? <PauseCircleFilledIcon /> : <PlayArrowRoundedIcon /> }
    </IconButton>
  );

  const renderFullscreenButton = (onClick, isFullscreen) => (
    <IconButton className={classes.fullscreenButton} onClick={onClick}>
     
        {isFullscreen ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon /> }
      
    </IconButton>
  );

  return (
    <div className={classes.wrapper}>
      <ImageGallery
        items={images}
        lazyLoad={true}
        infinite={false}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderPlayPauseButton={renderPlayPauseButton}
        renderFullscreenButton={renderFullscreenButton}
      />
    </div>
  );
};

export default CustomImageGallery;
