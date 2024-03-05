import { useEffect, useState } from "react"
import ReviewModel from "../../../models/ReviewModel"

export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isloading, setIsloading] = useState(true);
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

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responsDate){
                loadedReviews.push({
                    id:responsDate[key].id,
                    userEmail:responsDate[key].userEmail,
                    date:responsDate[key].date,
                    rating:responsDate[key].rating,
                    book_id:responsDate[key].bookId,
                    reviewDescription:responsDate[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responsDate[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };
        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    },[isReviewLeft]);



    return():
}