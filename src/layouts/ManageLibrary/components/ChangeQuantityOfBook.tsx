import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { ChangeQuantityOfBooks } from "./ChangeQuantityOfBooks";

export const ChangeQuantityOfBook = () => {


    //read Book part
    const [book, setBooks] = useState<BookModel[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    //pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() =>{
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/books?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(baseUrl);
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBook: BookModel[] = [];
            for (const key in responseData) {
                loadedBook.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author:responseData[key].author,
                    description:responseData[key].description,
                    copies:responseData[key].copies,
                    copiesAvailable:responseData[key].copiesAvailable,
                    category:responseData[key].category,
                    img:responseData[key].img,
                });
            }
            setBooks(loadedBook);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[currentPage]);


    //pagination part
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isloading) {
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


    return(
        <div className="container mt-5">
            {totalAmountOfBooks > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Number of results: ({totalAmountOfBooks})</h3>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {book.map(book => (
                        <ChangeQuantityOfBooks book={book} key={book.id}/>
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}