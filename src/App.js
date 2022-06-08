import React from "react";
// import "./App.css";
//import Nav from './components/Nav.js';
import Home from './page/Home';
import ExpensesPage from "./page/ExpensesPage";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SummaryPage from "./page/SummaryPage";


const App = () => {
  return (
    <Router>
      <div>
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-slate-900">Split Bill App</h1>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/expenses" element={<ExpensesPage/>} />
                  <Route path="/summary-page" element={<SummaryPage/>} />
              </Routes>
            </main>
          </div>
    </Router>
    
  );
};
export default App;