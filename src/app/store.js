//imported configureStore and flashcardReducer
import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer  from "../features/flashCardSlice";

//created redux state for flashcard in store
const store = configureStore({
    reducer: {
    flashcard: flashcardReducer,
 },

})

export default store;