import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { error } from "console";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const HistoryPage = () => {

    const { authState } = useOktaAuth();
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //History
    const [histories, setHistories] = useState<HistoryModel[]>([]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUserHistory = async () => {

        }
        fetchUserHistory().catch((error: any) => {
            setIsLoadingHistory(false);
            setHttpError(error.message);
        })
    },[authState, currentPage]);

    if(isLoadingHistory) {
        return(
            <SpinnerLoading/>
        )
    }

    if(httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    




    return();
}