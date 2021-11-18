import React, { useState } from 'react';
import './App.css';

import Header from './Header/Header';
import Main from './Main/Main';
import Live from './Live/Live';
import Motivator from './Motivator/Motivator';
import Category from './Category/Category';
import Single from './Single/Single';

import { AppContext } from './app-context';

function App() {

  const [page, setPage] = useState('MAIN');

  const changePage = (page:string) => {
    setPage(page);
  }

  const renderSwitch = (page:string) => {
    console.log(page);
    switch(page){
      case 'LIVE' :
        return  <Live />
      case 'MOTIVATOR' :
        return <Motivator />
      case 'CATEGORY' :
        return <Category />
      case 'SINGLE' :
        return <Single />
      default :
        return <Main />
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={{changePage: changePage}}>
        <Header />
        <div className="Content">
          {renderSwitch(page)}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
