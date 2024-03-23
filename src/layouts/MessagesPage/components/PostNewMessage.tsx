import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const PostNewMessage = () => {

    const {authState} = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    return(
        <div className="card mt-3">
            {displaySuccess && 
                <div className="alert alert-success" role="alert">
                    Question added successfully
                </div>
            }
            <div className="card-header">
                Ask question to luv 2 Read Admin
            </div>
            <div className="card-body">
                <form method="Post">
                    {displayWarning &&
                        <div className="alert alert-danger">
                            All fields must be filled out
                        </div>
                    }
                    <div className="mt-3">
                        <label htmlFor="" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title"
                            onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>
                    <div className="mp-3">
                    <label htmlFor="" className="form-label">Question</label>
                    <textarea className="form-control" id="exampleFormControlInput1" rows={3} onChange={e => setQuestion(e.target.value)} value={question}>
                        
                    </textarea>
                    </div>
                </form>
            </div>
        </div>
    );
}