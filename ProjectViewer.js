import {  IconButton } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import React from 'react'
import ReactLinkify from 'react-linkify'
import CustomImageGallery from './CustomImageGallery/CustomImageGallery'

import "../Project.scss"

function ProjectViewer({ project, closeDialog }) {
    return (
        <div className="project-viewer">
            <IconButton className="project-view-close-button" onClick={closeDialog}>
                <Cancel />
            </IconButton>
            <CustomImageGallery imageList={project?.imageList} />
            <div className="project-viewer-title">
             <h4>
                 {project ? project.title : ""}
             </h4>
             
             <ReactLinkify>
                 <p className="project-viewer-description">
                 {project ? project.description : ""}
                 </p>
             </ReactLinkify>
            </div>
        </div>
    )
}

export default ProjectViewer