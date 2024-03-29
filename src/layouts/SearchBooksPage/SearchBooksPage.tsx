import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {

    //read Book part
    const [book, setBooks] = useState<BookModel[]>([]);
    const [isloading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    //pagination part
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    //search by title part
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    //search by Category part
    const [categorySelection, setCategorySelection] = useState('Book category');


    useEffect(() =>{
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            let url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`; 
            if (searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }
            const response = await fetch(url);
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
        //to move up the page
        window.scrollTo(0,0);
    },[currentPage, searchUrl]);
    
    // Loading part
    if (isloading) {
        return(
            <SpinnerLoading/>
        )
    }
    // Not found Books
    if (httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    //search by title part
    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === ''){
            setSearchUrl('');
        }else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('Book category')
    }

    //search by Category part
    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'fe' ||
            value.toLowerCase() === 'be' ||
            value.toLowerCase() === 'data' ||
            value.toLowerCase() === 'devops' 
            ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>size=${booksPerPage}`)
        }else{
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
        
    }


    //pagination part
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2" placeholder="Search" aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                        {categorySelection}
                                    </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('fe')}>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('be')}>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('data')}>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('devops')}>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        {totalAmountOfBooks > 0 ?
                        <>
                        <div className="mt-3">
                            <h5>Number of results: ({totalAmountOfBooks})</h5>
                        </div>
                        <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                        {book.map(book => (
                            <SearchBook book={book} key={book.id}/>
                        ))}
                        </>
                        :
                        <div className="m-5 text-center">
                            <h3 >Can't find what you are looking for?</h3>
                            <a type="button" href="#" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Library services</a>
                        </div>
                        }
                        {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                    </div>
                </div>
            </div>
    );
}