import { Grid } from '@material-ui/core'
import React from 'react'
import { FirebaseIcon, MuiIcon, ReactIcon, ReduxIcon } from '../svg/svg'


import "./Services.sass"

function Services() {

    const servicesList = [
        {
            title: "React.Js",
            icon: ReactIcon,
          },
          {
            title: "Material-UI",
            icon: MuiIcon,
          },
        //   {
        //     title: "Next.Js",
        //     icon: NextJsIcon,
        //   },
          {
            title: "Redux",
            icon: ReduxIcon,
          },
          // {
          //   title: "Sass",
          //   icon: SassIcon,
          // },
        //   {
        //     title: "Node.Js",
        //     icon: NodeIcon,
        //   },
        //   {
        //     title: "Mongo DB",
        //     icon: MongodbIcon,
        //   },
        //   {
        //     title: "GraphQL",
        //     icon: GraphQlIcon,
        //   },
          {
            title: "Firebase",
            icon: FirebaseIcon,
          },
    ]
    return (
      
        <div className="services"  >
          
            <span>What I offer?</span>
            <h2>My Specialities</h2>
             <div className="services-line"></div>

           <Grid  container  spacing={3}> 
           {servicesList.map((item, ind) => (
               <Grid key={ind} item md={3} sm={6} xs={12} >
                   <div className="services-text">
                        <div className="services-item">
                            <div className="serives-rotated-rectangle">
                                <item.icon className="serivices-icons" />
                            </div>
                        </div>
                        <h4>{item.title}</h4>
                   </div>
               </Grid>
           ))}
            </Grid>

        </div>
       
    )
}

export default Services
