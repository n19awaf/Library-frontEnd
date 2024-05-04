import { Link } from "react-router-dom";

export const ExploreTopBooks = () => {
    return(
        <div className="p-5 mb-4 bg-dark header">
            {/**container-fluid: تجعل العنصر يمتد عبر العرض الكامل للشاشة دون أي هوامش جانبية.
             * py-5: تضبط الهوامش العمودية في الأعلى والأسفل للعنصر بقيمة 3*/}
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    {/**display-5: هذا يعيّن حجمًا كبيرًا للنص. يُستخدم لتحقيق تأثير العنوان الرئيسي.
                      fw-bold: هذا يعيّن وزنًا عريضًا للنص. يُستخدم لجعل النص يبدو أكثر سمكًا وبارزًا. */}
                    <h1 className="display-5 fw-bold">Find your next Adventure</h1>
                    <p className="col-md-8 fs-4">Where would you like to go next?</p>
                    
                    <Link  type="button" to="/search" className="btn main-color btn-lg main-color-dell">Explore top books</Link>
                </div>
            </div>
        </div>
    );
}