import './App.css';
import React, {useState } from 'react';
import FilterList from './components/FilterList.tsx';
import { Dialog, DialogPanel, DialogTitle} from '@headlessui/react'

function App() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="App">
      <button className='openDialog' onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="dialogBox">
          <DialogPanel className="dialogPanel">
            <DialogTitle className="font-bold">Select Filters</DialogTitle>
            <FilterList/>
              <button onClick={() => setIsOpen(false)}>Close filter selection</button>
          </DialogPanel>
        </div>
      </Dialog>
      
    </div>
  );
}

export default App;
