import { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const AdminMessage: React.FC<{meesage: MessageModel, submitResponseToQuestion: any}> = (props, key) => {

    const [displayWarning, setDisplayWarning] = useState(false);
    const [response, setResponse] = useState('');

    function submitBtn() {
        if (props.meesage.id !==null && response !== '') {
            props.submitResponseToQuestion(props.meesage.id, response);
            setDisplayWarning(false);
        }else{
            setDisplayWarning(true);
        }
    }


    return(
        <div key={props.meesage.id}>
            <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>Case #{props.meesage.id}: {props.meesage.title}</h5>
                <h6>{props.meesage.userEmail}</h6>
                <p>{props.meesage.question}</p>
                <hr />
                <div>
                    <h5>Response:</h5>
                    <form action="PUT">
                        {displayWarning &&
                            <div className="alert alert-danger" role="alert">
                                All fields must be filled out.
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextareal"  rows={3} onChange={e => setResponse(e.target.value)} value={response}></textarea>
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary mt-3" onClick={submitBtn}>Submit Response</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}