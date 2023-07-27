import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  flashcards:  [],
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
    }
    
  },
});

export const selectAll = (state) => state.flashcard.flashcards

export const { addFlashcard} =
  flashcardSlice.actions;

export default flashcardSlice.reducer; 
