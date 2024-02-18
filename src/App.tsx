import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';

export const App = () =>{
  return (

    //D-flex: يشير إلى استخدام CSS Flexbox لترتيب عناصر الواجهة أفقيًا أو رأسيًا. Flexbox هو نمط تخطيط مرن يسمح بترتيب وتنظيم عناصر الواجهة بطريقة سهلة ومرنة.
    <div className='d-flex flex-column min-vh-100'>
      <Navbar/>
      {/* هذا يعني أن العنصر سينمو ليملأ المساحة المتاحة */}
      <div className='flex-grow-1'>
          <Switch>
          <Route path='/' exact>
          <Redirect to='/home'/>
          </Route>
          <Route path='/home'>
            <HomePage/>
          </Route>
          <Route path='/search'>
          <SearchBooksPage/>
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </div>
    
  );
}

