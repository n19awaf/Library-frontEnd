import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";

export const AddNewBook = () => {

    const {authState} = useOktaAuth();

    //New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [Description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<any>(null);
    
    //Display
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }


    return(
        <div className="container mt-5 mb-5">
            { displaySuccess && 
                <div className="alert alert-success" role="alert">
                    Book added successfully
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger">
                    All field must be filled out
                </div>
            }
            <div className="card">
                <div className="card-header">
                    Add a new book
                </div>
                <div className="card-body">
                    <form action="POST">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="" className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" required onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="" className="form-label">Author</label>
                                <input type="text" className="form-control" name="author" required onChange={e => setAuthor(e.target.value)} value={author} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="" className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {category} Category
                                    </button>
                                    <ul id="addNewBookId" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a href="##" onClick={() => categoryField("FE")} className="dropdown-item">Front End</a></li>
                                        <li><a href="##" onClick={() => categoryField("BE")} className="dropdown-item">Back End</a></li>
                                        <li><a href="##" onClick={() => categoryField("Date")} className="dropdown-item">Data</a></li>
                                        <li><a href="##" onClick={() => categoryField("DevOps")} className="dropdown-item">DevOps</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="form-label">Description</label>
                            <textarea className="form-control"  id="exampleFormControlTextareal" rows={3} 
                                onChange={e => setDescription(e.target.value)} value={Description}></textarea>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="" className="form-label">Copies</label>
                            <input type="number" name="Copies" className="form-control" required onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type="file"/>
                        <div>
                            <button type="button" className="btn btn-primary mt-3">
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}