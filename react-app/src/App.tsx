import React, { useReducer } from 'react';
import './App.css';
import Footer from './components/Footer';

import SheetPageOne from './pages/player/SheetPageOne';
import SheetPageTwo from './pages/player/SheetPageTwo';

const App: React.FC = () => {


  return (
    <div className="App">
      <SheetPageOne />
      <SheetPageTwo />
      <Footer />
    </div>
  );
}

export default App;
