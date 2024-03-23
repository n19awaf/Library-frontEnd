import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const Messages = () => {

    const {authState} = useOktaAuth();
    const [isLoadingMessage, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages
    const [messagesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);



    return();
}