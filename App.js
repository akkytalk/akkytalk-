
import { Route, Switch } from 'react-router-dom';
import Admin from "./Login/admin/Admin"
import './App.css';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import Intro1 from './components/Introduction/Intro1';
import Intro2 from './components/Introduction/Intro2';
import Projects from './components/Projects/Projects';
import Services from './components/Services/Services';
import Login from './Login/Login';
import Requests from './Requests/Requests';

import { useStateValue } from './store/StateProvider';

function App() {
  const [{user},] = useStateValue();
  return (
    <div className="app">

     <Switch>
          {user ? 
          <>
          <Route path="/requests" >
              <Requests />
             </Route>
           <Route path="/admin" >
            <Admin />
            </Route>
            </> : 
            <Route path="/login" exact>
            <Login />
            </Route>
       }
        
           

    <Route path="/" >
     <Intro1 />
      <Intro2 />
      <Services />
      <Projects />
      <Contact />
      <Footer />
       </Route>
       </Switch>

    </div>
  );
} 

export default App;
 