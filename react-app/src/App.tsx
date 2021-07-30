import React, {useEffect, useState} from 'react';
import './App.css';

import SheetPageOne from './pages/player/SheetPageOne';

const App: React.FC = () => {
  const [transformScale, setTransformScale] = useState(1.0);

  const scaleForMobile = () => {
    if(window.innerWidth > 1330 && transformScale === 1.0){ 
      return;
    } else if (window.innerWidth > 1330){
      setTransformScale(1.0);
      return;
    }
    setTransformScale(window.innerWidth / 1330);
  }

  useEffect(() => {
    window.addEventListener('resize', scaleForMobile);
    scaleForMobile();
    return () => {
      window.removeEventListener('resize', scaleForMobile);
    }
  }, []);

  return (
    <div style={{transform: 'scale(' + transformScale +')'}} className="App">
      <SheetPageOne />
    </div>
  );
}

export default App;
