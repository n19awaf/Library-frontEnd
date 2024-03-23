import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";
import { useEffect, useState } from "react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import MessageModel from "../../../models/MessageModel";

export const Messages = () => {

    const {authState} = useOktaAuth();
    const [isLoadingMessage, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages
    const [messages, setMessages] = useState<MessageModel[]>([])
    //Pagination
    const [messagesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUseMessages = async () => {
            if(authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/messages/search/findByUserEmail/?userEmail=${authState?.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method:'GET',
                    headers:{
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-type':'application/json'
                    },
                };
                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error("Something went Wrong");
                }
                const messagesResponseJson = await messagesResponse.json();
                setMessages(messagesResponseJson._embedded.message);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);

        }
        fetchUseMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scroll(0, 0);
    },[authState, currentPage])

    if (isLoadingMessage) {
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



    return();
}