import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const AdminMessages = () => {


    const {authState} = useOktaAuth();

    //Normal Loading Pices
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method:'GET',
                    headers:{
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-type':'application/json'
                    }
                };
                const messageResponse = await fetch(url,requestOptions);
                if (!messageResponse.ok) {
                    throw new Error("Something went wrong");
                }
                const messagesResponseJson = await messageResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);

        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scroll(0,0);
    },[authState,currentPage]);

    if (isLoadingMessages) {
        return(
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    
    
    return(
        <div className="mt-3">
            {messages.length > 0 ?
                <>
                    <h5>Pending Q/A:</h5>
                    {messages.map(message => (
                        <AdminMessage meesage={message} key={message.id}/>
                    ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}