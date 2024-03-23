import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWedget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { Messagespage } from './layouts/MessagesPage/Messagespage';



const oktaAuth = new OktaAuth(oktaConfig);

export const App = () =>{

  const customAuthHandler = () => {
    history.push('/login');
  }
  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  };


  return (

    //D-flex: يشير إلى استخدام CSS Flexbox لترتيب عناصر الواجهة أفقيًا أو رأسيًا. Flexbox هو نمط تخطيط مرن يسمح بترتيب وتنظيم عناصر الواجهة بطريقة سهلة ومرنة.
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage/>
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage/>
            </Route>
            <Route path='/login'
              render={() => <LoginWedget config={oktaConfig}/>}
              />
              <Route path='/login/callback' component={LoginCallback}/>
              <SecureRoute path='/shelf'><ShelfPage/></SecureRoute>
              <SecureRoute path='/message'><Messagespage/></SecureRoute>
          </Switch>
        </div>
        <Footer/>
      </Security>
    </div>
    
  );
}

