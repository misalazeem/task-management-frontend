import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from "./routes/Home";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Signup from "./routes/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./routes/Logout";
import NoMatch from "./routes/NoMatch";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route element={ <ProtectedRoute /> } >
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/logout' element={ <Logout /> } />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
