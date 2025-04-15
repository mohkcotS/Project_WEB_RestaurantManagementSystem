import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Manager } from './features/manager/pages/Manager'
import { ManagerHome} from "./features/manager/pages/ManagerHome";
import { ManagerDish} from "./features/manager/pages/ManagerDish";
import { ManagerTable} from "./features/manager/pages/ManagerTable";
import { ManagerUser} from "./features/manager/pages/ManagerUser";
import { ManagerOrder} from "./features/manager/pages/ManagerOrder";

import { Customer } from './features/customer/pages/Customer'
import { CustomerTable} from "./features/customer/pages/CustomerTable";
import { CustomerUser} from "./features/customer/pages/CustomerUser";
import { CustomerOrder} from "./features/customer/pages/CustomerOrder.jsx";

import { Cashier } from './features/cashier/pages/Cashier'
import { Chef } from './features/chef/pages/Chef'

import { Home } from './pages/Home'



function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> 

          <Route path='/customer/' element={<Customer />}>
            <Route path='user' element={<CustomerUser />} />
            <Route path='table' element={<CustomerTable />} />
            <Route path='order' element={<CustomerOrder />} />
          </Route>

          <Route path='/manager' element={<Manager />}>
            <Route path='home' element={<ManagerHome />} />
            <Route path='user' element={<ManagerUser />} />
            <Route path='table' element={<ManagerTable />} />
            <Route path='order' element={<ManagerOrder />} />
            <Route path='dish' element={<ManagerDish />} />
          </Route>

          <Route path="/chef/" element={<Chef />} />

          <Route path="/cashier/" element={<Cashier />} />
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App
