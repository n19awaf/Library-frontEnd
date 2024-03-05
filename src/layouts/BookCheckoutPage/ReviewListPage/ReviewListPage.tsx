import { useEffect, useState } from "react"
import ReviewModel from "../../../models/ReviewModel"

export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(1);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage -1}&size=${reviewsPerPage}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok) {
                throw new Error('Something went wrong');
            }
            const responseJsonReviews = await responseReviews.json();

            const responsDate = responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);

            const loadedReviews: ReviewModel[] = [];

            for (const key in responsDate){
                loadedReviews.push({
                    id:responsDate[key].id,
                    userEmail:responsDate[key].userEmail,
                    date:responsDate[key].date,
                    rating:responsDate[key].rating,
                    book_id:responsDate[key].bookId,
                    reviewDescription:responsDate[key].reviewDescription,
                });
            }

            setReviews(loadedReviews);
            setIsLoading(false);
        };
        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[currentPage]);



    return():
}