import './App.css';
import React, {useState } from 'react';
import FilterList from './components/FilterList.tsx';

function App() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="App">
            <FilterList/>
    </div>
  );
}

export default App;
