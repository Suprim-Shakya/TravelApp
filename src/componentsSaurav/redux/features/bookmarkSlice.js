import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = { bookmark: [] }

const bookmarkSlice = createSlice({
    name: 'bookmarks', //ignore this
    initialState,
    reducers: {

        addToBookmark: (state, action) => {

            const newPlace = {
                // id: nanoid(),
                classNumber: action.payload.classNumber,
                location: action.payload.location,
            }
            const newBookmarks = state.bookmark.push(newPlace)


        },

        removeFromBookmark: (state, action) => {
            state.bookmark = state.bookmark.filter((item) => item.classNumber !== action.payload)
        },

        loadExistingBookmark: (state, action) => {
            console.log('yeta ayo hai')
            state.bookmark = state.bookmark.concat(action.payload);
            console.log(`/n loaded existing value: ${action.payload}\n new value is: \n${state.bookmark}`)
        }
    }
})

export const { addToBookmark, removeFromBookmark, loadExistingBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;