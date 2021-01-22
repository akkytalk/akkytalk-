import { Card, Grid } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import db from '../firebase';

import "../Login/admin/Admin.scss"

function Requests() {

    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
       db.collection("requests").onSnapshot((snapshot) => {
           setRequestList(snapshot.docs.map(doc => ( {
               id: doc.id,
               ...doc.data()
           })))
       })
    },[])

    const deleteRequest = async(id) => {
        db.collection("requests").doc(id).delete()
        .then(() => setRequestList(requestList.filter((req) => req.id !== id )))
    }


    return (
        <div className="requests">
            <Grid container spacing={3}  >
                {requestList.map((req) => (
                    <Grid  item md={4} sm={6} xs={12} key={req.date}>
                        <Card className="requests-card" elevation={3}>
    
                  <Close style={{ position: "absolute", right: 0, top: 0 , cursor: "pointer"}}
                    onClick={() => deleteRequest(req.id)} />
                  
                  <div className="mb-2">
                <b>Name:</b> {req.name}
              </div>
              <div className="mb-2">
                <b>Email:</b> {req.email}
              </div>
              <div className="mb-2">
                <b>Contact:</b> {req.contact}
              </div>
              <div className="mb-2">
                <b>Company:</b> {req.company}
              </div>
              <div className="mb-2">
                <b>Date:</b>{" "}
                {new Date(req.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
              <div className="request-details">
                <b>Details:</b> {req.details}
              </div>
                        </Card>
                        </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Requests
