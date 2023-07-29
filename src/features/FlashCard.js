import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CreateNewFlashCard from "../components/CreateNewFlashCard";
import { MainGroup } from "../components/myflashcards_components/MainGroup";
import './flashCard.css';

const FlashCard = () => {
  const location = useLocation();

  return (
    <div>
      <div className="flex flex-col  w-3/4 p-2 mx-auto overflow-x-hidden Container">
        <h1 className="text-[18px] font-bold mb-1">CreateFlashcard</h1>
        <div className="border-b  border-black">
          <nav className="my-1">
            <NavLink to="/" className="mr-6 text-[15px] font-semibold under-line">
              Create new
            </NavLink>
            <NavLink to="/mainGroup" className="text-[15px] font-semibold under-line">
              MyFlashCards
            </NavLink>
          </nav>
        </div>

        <AnimatePresence >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <motion.div
                  key="flashcardForm"
                  initial={{ opacity: 0, x: -100}}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{opacity: 0}}
                  transition={{ duration: 1}}
                >
                  <CreateNewFlashCard />
                </motion.div>
              }
            />

            <Route
              path="/mainGroup"
              element={
                <motion.div
                  key="mainGroup"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0}}
                  transition={{type: "spring", stiffness: 20}}
                >
                  <MainGroup />
                </motion.div>
              }
            />

            
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashCard;
