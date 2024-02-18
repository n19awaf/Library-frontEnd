import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        //rounded: يضيف هذا النمط حواف مستديرة للعنصر لجعله أكثر نعومة.
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            {/**g-0: يزيل جميع المسافات بين عناصر الصف. */}
            <div className="row g-0">
                {/**justify-content-center: هذه الفئة تُستخدم لتوسيط العناصر في اتجاه الرأسي (أفقيًا) داخل عنصر Flexbox. 
                /// align-items-center: هذه الفئة تُستخدم لتوسيط العناصر في اتجاه العمود (عموديًا) داخل عنصر Flexbox.  */}
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <div className="d-none d-lg-block">
                        {props.book.img ?
                            <img   src={props.book.img} 
                                width="123" 
                                height="196" 
                                alt="Book" />
                        :
                        <img 
                            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                            width="123"
                            height="196"
                            alt="Book"
                        />
                        }
                    </div>
                    {/**Mobile */}
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.img ?
                            <img  src={props.book.img} 
                                width="123" 
                                height="196" 
                                alt="Book" />
                        :
                        <img 
                            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                            width="123"
                            height="196"
                            alt="Book"
                        />
                        } 
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.book.author}
                        </h5>
                        <h4>
                            {props.book.title}
                        </h4>
                        <p className="card-text">
                            {props.book.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <Link to="#" className="btn btn-md main-color text-white">View Details</Link>
                    </div>
            </div>
        </div>
    );
};
