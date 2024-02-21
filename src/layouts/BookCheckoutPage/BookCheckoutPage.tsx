import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBok } from "./CheckoutAndReviewBok";
import ReviewModel from "../../models/ReviewModel";
import { LatesReviews } from "./LatesReviews";




export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);


    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() =>{
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            
            const response = await fetch(baseUrl);

            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id:responseJson.id,
                title:responseJson.title,
                author:responseJson.author,
                description:responseJson.description,
                copies:responseJson.copies,
                copiesAvailable:responseJson.copiesAvailable,
                category:responseJson.category,
                img:responseJson.img,
            };

            setBook(loadedBook);
            setIsLoading(false);
        };

        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[]);

    //Review useEffect 
    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

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
    },[]);

    if (isLoading || isLoadingReview) {
        return(
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return(
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                        <img src={book?.img} width='226' height='349' alt="Book"/>
                        :
                        <img
                            src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                            width="226"
                            height="349"
                            alt="Book"/>
                        }
                    </div>
                    <div className="container col-4 col-md-4">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">
                                {book?.description}
                            </p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBok book={book} mobile={false}/>
                </div>
                <hr />
                <LatesReviews reviews={reviews} bookId={book?.id} mobile={false}/> 
            </div>
            {/**Mobile */}
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-item-center">
                        {book?.img ?
                        <img src={book?.img} width='226' height='349' alt="Book"/>
                        :
                        <img
                            src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                            width="226"
                            height="349"
                            alt="Book"/>
                        }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBok book={book} mobile={true}/>
                <hr />
                <LatesReviews reviews={reviews} bookId={book?.id} mobile={true}/> 
                <hr />
            </div>
        </div>
    );

}