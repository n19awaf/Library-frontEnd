import { useState } from "react";
import { HistoryPage } from "./componesnts/HistoryPage";
import { Loans } from "./componesnts/Loans";

export const ShelfPage = () => {

    //going to force a new use effect upload each time the history page opens up
    const [historyClick, setHistoryClick] = useState(false);


    return(
        <div className="container">
            <div className="mt-3">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => setHistoryClick(false)} className="nav-link active" id="nav-loans-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-loans" type="button" role="tab" aria-controls="nav-loans"
                                aria-selected="true">
                                    Loans
                        </button>
                        <button onClick={() => setHistoryClick(true)} className="nav-link" id="nav-history-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-loans"
                                aria-selected="true">
                                    Your History
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-loans" role="tabpanel" 
                        aria-labelledby="nav-loans-tab">
                            <Loans/>
                    </div>
                    <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                        { historyClick ? <HistoryPage/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}