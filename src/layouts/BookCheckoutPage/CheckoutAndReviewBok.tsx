import BookModel from "../../models/BookModel";

export const CheckoutAndReviewBok: React.FC<{book:BookModel | undefined, mobile: boolean}> = (props) => {

    return(
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5</b>
                        Books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">Available</h4>
                        :
                        <h4 className="text-danger">Wait List</h4>
                    }
                </div>
            </div>
        </div>
    );

}