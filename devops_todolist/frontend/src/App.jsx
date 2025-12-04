import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotesDetailsPage from "./pages/NotesDetailsPage";
import Footer from "./Components/Footer";   

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
      />

      <div className="min-h-screen flex flex-col">
        {/* Pages */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/note/:id" element={<NotesDetailsPage />} />
          </Routes>
        </div>

        {/* Footer always visible */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
