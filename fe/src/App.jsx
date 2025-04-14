import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Manager} from './features/manager/pages/Manager'
import { Customer } from './features/customer/pages/Customer'
import { Cashier } from './features/cashier/pages/Cashier'
import { Chef } from './features/chef/pages/Chef'

import  {Home } from './pages/Home'



function App() {
  

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Home/>} />
            <Route path='/customer/' element={<Customer/>} />
            <Route path="/manager/" element={<Manager />} />
            <Route path="/chef/" element={<Chef/>} />
            <Route path="/cashier/" element={<Cashier/>} />
          </Routes> 
      </BrowserRouter>
    </div>
      
    
  )
}

export default App
