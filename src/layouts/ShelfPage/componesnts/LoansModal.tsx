import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal: React.FC<{shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean}> = (props) => {
    return(
        <div className="modal fade" id={props.mobile ? `mobilemodal${props.shelfCurrentLoan.book.id}` :
            `modal${props.shelfCurrentLoan.book.id}`} data-bs-backdrop="static" data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel" aria-hidden="true" key={props.shelfCurrentLoan.book.id}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                    Loan Option
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="mt-3">
                                        <div className="row">
                                            <div className="col-2">
                                                {props.shelfCurrentLoan.book?.img ?
                                                    <img src={props.shelfCurrentLoan.book?.img} alt="Book" width="56" height="87" />
                                                    :
                                                    <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} alt="Book" width="56" height="87" />
                                                }
                                            </div>
                                            <div className="col-10">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}