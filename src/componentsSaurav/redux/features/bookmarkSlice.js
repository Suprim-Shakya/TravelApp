import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = { bookmark: [] }

const bookmarkSlice = createSlice({
    name: 'bookmarks', //ignore this
    initialState,
    reducers: {

        addToBookmark: (state, action) => {

            // const newPlace = {
            //     // id: nanoid(),
            //     classNumber: action.payload.classNumber,
            //     location: action.payload.location,
            // }
            // const newBookmarks = state.bookmark.push(newPlace)

            const { classNumber, location } = action.payload

            const existingElement = state.bookmark.find(item => item.classNumber == classNumber)

            if (!existingElement) {
                const newPlace = {
                    classNumber,
                    location,
                }
                state.bookmark.push(newPlace)
            } else {
                // If the element already exists, you might handle it in some way (e.g., update, ignore, etc.)
                console.log(`Element with classNumber ${classNumber} already exists.`);
            }
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