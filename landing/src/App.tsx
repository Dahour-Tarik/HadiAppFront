/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

 import Container from '@material-ui/core/Container';
 import React from 'react';
 import { Demo } from './sections/Demo';
 import Form from './components/auth/Form';
 import { BrowserRouter as Router, Route} from "react-router-dom";
 import Homepage from './components/Homepage';
 import Profil from './components/users/Profil';
 import Recherche from './components/recherche/Recherche'
 import Sidebar from "./Sidebar";
 import History from "./components/history/History"
 import styled from "styled-components";
import { Provider } from 'react-redux';
import store from './store';

 
 
 const Pages = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   h1 {
     font-size: calc(2rem + 2vw);
     background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
 `;
 
 
 export const App: React.FC = () => {
  
     return (
      <Provider store={store}>
         <Router>
         <Sidebar/>
 
         <div className='pages'>
                 <Route exact path='/' component={Homepage}/>
                 <Route exact path='/profil' component={Profil}/>
                 <Route exact path='/login' component={Form}/>
                 <Route exact path='/history' component={History}/>
                 <Route exact path='/recherche' component={Recherche}/>
                 <Route exact path='/boxFile' component={Demo}/>
         
             
         </div>
         </Router>
         </Provider>
     );
 };
 export default App
 /*<Container maxWidth="md">
                 <Demo />
             </Container>   */
 