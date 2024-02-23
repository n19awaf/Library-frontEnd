
import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    return (
        /**col-xs-6: تحدد أن يشغل العنصر 6 أعمدة على الأجهزة الصغيرة جدًا (الهواتف). */
        /**mb-3: يضيف هامشًا سفليًا بمقدار 3 وحدات (مثل وحدات البكسل أو وحدات rem) إلى العنصر. */
        //mt: اختصار لـ margin-top.
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div className="text-center">
            {props.book.img ?
            <img
            src={props.book.img}
            width="151"
            height="233"
            alt="book"
            />
            :
            <img
                src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                width="151"
                height="233"
                alt="book"
            />
            }
            
            <h6 className="mt-2">{props.book.title}</h6>
            <p>{props.book.author}</p>
            <Link to={`/checkout/${props.book.id}`} className="btn main-color text-white">
            Reserve
            </Link>
        </div>
        </div>
    );
};
