import  Button from '@material-ui/core/Button';
import  Card from '@material-ui/core/Card';

import  LinearProgress  from '@material-ui/core/LinearProgress';
import  Fab from '@material-ui/core/Fab';
import React, { useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import db, { storage } from '../../firebase';

import "./Admin.scss"
import { Link } from 'react-router-dom';
import { Camera } from '@material-ui/icons';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

function Admin() {

    const [state, setState] = useState(initialState);
    const [imageFileList, setImageFileList] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.value,
        })
    }

    const handleProjectImageSelect = (event) => {
        let files = event.target.files;

        if(event.target.name === "cover") {
            setCoverImageFile(files[0]);
        }
        else {
            setImageFileList(files);
        }
    }

    const handleProjectSave = async () => {
        setLoading(true);
        let promiseList = [];
        let coverImage = "";

        if (coverImageFile) {
           coverImage = await uploadFile(coverImageFile, state.title)
        }

        for (const file of imageFileList) {
            promiseList.push(uploadFile(file, state.title))
        }

        let imgList = await Promise.all(promiseList);

        saveProjectData(coverImage, imgList);
    }

    const uploadFile = (file, path) => {
        if (!file) return Promise.resolve();
        return new Promise((resolve, reject) => {
          let uploadTask = storage
            .ref(path)
            .child(file.name)
            .put(file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              reject(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((imgUrl) => {
                resolve(imgUrl);
              });
            }
          );
        });
      };
 

      const saveProjectData = (coverImage = "", imageList = []) => {
        db
          .collection("projects")
          .add({
            title: state.title,
            subtitle: state.subtitle,
            description: state.description,
            coverImage,
            imageList,
          })
          .then(() => {
            setState(initialState);
            setLoading(false);
          });
      };

      const saveReview = async () => {
        setLoading(true);
    
        db
          .collection("reviews")
          .add({
            name: state.name,
            designation: state.designation,
            photoUrl: state.photoUrl,
            comment: state.comment,
          })
          .then(() => {
            setState(initialState);
            setLoading(false);
          });
      };
    
      let {
        title,
        subtitle,
        description,
        name,
        photoUrl,
        designation,
        comment,
      } = state;
    return (
        <div className="admin">
            <Link to="/requests">
            <Button variant="contained" className="admin-request-button" type="submit">
                Check Requests
            </Button>
            </Link>
            {loading && <LinearProgress />}

            <Card className="admin-card" >
                <h3>Mange Projects</h3>
                <ValidatorForm onSubmit={handleProjectSave} >
                    <TextValidator
                    className="admin-input"
                    size="small"
                    variant="outlined"
                    label="Title"
                    name="title"
                    fullWidth
                    value={title}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    onChange={handleChange} />

              <TextValidator
                 className="admin-input"
                   size="small"
                   variant="outlined"
                   label="Subtitle"
                   name="subtitle"
                    fullWidth
                   value={subtitle}
                   validators={["required"]}
                   errorMessages={["this field is required"]}
                  onChange={handleChange}
              
              />

                      <TextValidator
                       size="small"
                     variant="outlined"
                    label="Description"
                         multiline={true}
                       fullWidth
                       rows={5}
                    name="description"
                        value={description}
                         validators={["required"]}
                       errorMessages={["this field is required"]}
                         onChange={handleChange}
                          />

                          <div className="admin-upload">
                          <label htmlFor="upload-cover-image">
                                 <Fab
                                    className="admin-upload-image"
                                    color="secondary"
                                        component="span"
                                    variant="extended"
                                     size="small"
                                  >
                                      <CameraAltIcon className="pr-2" />
                              <span>upload cover image</span>
                                 </Fab>
                              </label>

                              <input
                              name="cover"
                               className="hidden"
                                accept="image/*"
                                   onChange={handleProjectImageSelect}
                                    id="upload-cover-image"
                                   type="file"
                                />

                       <label htmlFor="upload-image">
                       <Fab
                             className="admin-upload-image"
                          color="secondary"
                          component="span"
                        variant="extended"
                       size="small"
                         >
                        <Camera className="pr-2" />
                        <span>upload image</span>
                         </Fab>
                        </label>
                      <input
                      className="hidden"
                      name="project"
                        accept="image/*"
                          onChange={handleProjectImageSelect}
                         id="upload-image"
                         type="file"
                        multiple
                            />
                             </div>
                              <Button
                        className="px-6"
                         variant="contained"
                         color="primary"
                        type="submit"
                        >
                        <span>Save</span>
                        </Button>
                            </ValidatorForm>
                      </Card>

            {/* =============================================================== */}
                   <div className="py-3"></div>

                       {loading && <LinearProgress color="primary" />} 
                       <Card className="admin-card">
                         <h3 className="mb-6">Add Review</h3>
                       <ValidatorForm onSubmit={saveReview}>
                       <TextValidator
                      className="admin-input"
                         size="small"
                    variant="outlined"
                         label="Client Name"
                         name="name"
                          fullWidth
                       value={name}
                    validators={["required"]}
                     errorMessages={["this field is required"]}
                  onChange={handleChange}
                   />

                          <TextValidator
                           className="admin-input"
                              size="small"
                              variant="outlined"   
                                label="Client Designation"
                                  name="designation" 
                                   fullWidth
                                  
                                value={designation}
                             validators={["required"]}
                              errorMessages={["this field is required"]}
                               onChange={handleChange}
                                   />

                              <TextValidator
                               className="admin-input"
                                size="small"
                               variant="outlined"
                            label="Client Photo Url"
                              name="photoUrl"      
                                    fullWidth
                               value={photoUrl}   
                          validators={["required"]}
                                    errorMessages={["this field is required"]}
                            onChange={handleChange }
                                />

                          <TextValidator
                             className="mb-8"
                                size="small"
                              variant="outlined"
                              label="Review"
                            multiline={true}   
                                fullWidth
                               name="comment"
                                value={comment}
                             validators={["required"]}
                                errorMessages={["this field is required"]}
                           onChange={handleChange}
                           />
                          <Button
                               type="submit"
                                className="ml-6 px-6"
                                 variant="contained"
                                    color="primary"
                                       >
                               <span>Save</span>  
                            </Button>
                     </ValidatorForm>
               
               </Card>
                        
                         </div>
    )
}

const initialState = {
    title: "",
    subtitle: "",
    description: "",
    name: "",
    designation: "Developer",
    photoUrl: "",
    comment: "",
    id: "",
  };

export default Admin
