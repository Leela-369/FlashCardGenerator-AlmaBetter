// Import the 'createSlice' function from the '@reduxjs/toolkit' package.
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the flashcard slice.
const initialState = {
  flashcards: [],
};

// Created 'flashcardSlice' slice.
const flashcardSlice = createSlice({
  name: "flashcard", // Name of the slice, used in actions and reducers.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer function to add a new flashcard to the state.
    addFlashcard: (state, action) => {
      // When the 'addFlashcard' action is dispatched, this reducer is called.
      // It receives the 'state' and the 'action' payload as arguments.
      // The new flashcard object is pushed to the 'flashcards' array in the state.
      state.flashcards.push(action.payload);
    },
  },
});


// This function is used to access the 'flashcards' array from the Redux store.
export const selectAll = (state) => state.flashcard.flashcards;


// This action can be dispatched to add a new flashcard to the state.
export const { addFlashcard } = flashcardSlice.actions;


export default flashcardSlice.reducer;
