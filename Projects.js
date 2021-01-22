import { Button, Dialog, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from '../../firebase'


import "./Project.scss"
import ProjectViewer from './ProjectViewer/ProjectViewer';

function Projects() {

    const [projectList, setProjectList] = useState([]);
    const [project, setProject] = useState([]);
    const [open, setOpen] = useState(false);
    const [viewCount, setViewCount] = useState(4);
    
    useEffect(() => {
     
        db.collection("projects").onSnapshot(snapshot => {
         setProjectList(snapshot.docs.map(doc => doc.data()))
     })
    },[]) 

    const closeDialog = () => {
        setOpen(false);
        setProject(null);
      };
    
      const handleProjectClick = async (project) => {
        setProject(project);
        setOpen(true);
        console.log("project >>>", project)
      };

    const handleViewMore = () => {
       setViewCount(viewCount + 4)
    }

    console.log(projectList)
    
    return (
        <div className="projects">
        <div>
            <p className="projects-text">What I have done so far?</p>
            <h2>My Projects</h2>
            <div className="services-line"></div>

            <Grid container spacing={3} >
              {projectList.slice(0, viewCount).map((item, ind) => (
                  <Grid  key={ind} item lg={6} sm={12} md={6} xs={12} >
                    <div className="projects-card-holder">
                        <img src={item.coverImage} alt="random" />
                        <div className="projects-card-overlay">
                            <Button className="projects-button" variant="contained" color="secondary"
                            onClick={() => handleProjectClick(item)}>
                                View Project
                                 </Button>   

                            <h3 className="projects-title">{item.title}</h3>
                            <p >{item.subtitle}</p>       
                        </div>
                    </div>
                      </Grid>
              ))}
            </Grid>
            {viewCount < projectList.length && (
                <Button className="projects-view-button" variant="contained" color="primary" 
                onClick={handleViewMore}>
                    VIEW MORE
                    </Button>
            )}
        </div>

        {project && (
            <Dialog open={open} scroll="body" onClose={closeDialog} >
            <ProjectViewer project={project} closeDialog={closeDialog} />  
            </Dialog>
        )}
        </div>
    )
}

export default Projects
