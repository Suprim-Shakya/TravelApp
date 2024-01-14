// import { createSlice, nanoid } from "@reduxjs/toolkit"

// const initialState = {
//     bookmark: [{id: 1, classNumber: 10},]
// }

// const bookmarkSlice = createSlice({
//     name: 'bookmarks', //ignore this
//     initialState: {bookmark:[{id: 1, classNumber: 10},]},
//     reducers: {

//         addToBookmark: (state, action) => {

//             const newPlace = {
//                 id: nanoid(),
//                 classNumber: action.payload.classNumber,
//                 // location: {lat: 55, lng: 66},
//             }

//             state.bookmark.push(newPlace)

//         },

//         removeFromBookmark: (state,action) => {
            
//             state.bookmark = state.bookmark.filter((item)=> item.classNumber !== action.payload)
//         },

//     }
// })

// export const {addToBookmark, removeFromBookmark} = bookmarkSlice.actions;
// export default bookmarkSlice.reducer;

//above approach uses object to store data, let's try to store data using array only

import { createSlice, nanoid } from "@reduxjs/toolkit"

// const initialState = {
//     bookmark: []
// }

const bookmarkSlice = createSlice({
    name: 'bookmarks', //ignore this
    initialState: {bookmark:[{"classNumber": 26, "id": "iE4N9FmTxwMiAJQ0D7v0p", "location": {"lat": 27.70375172, "lng": 85.30796183}}, {"classNumber": 20, "id": "-8SBpuF9xVsWv7tLTdvVf", "location": {"latitude": 27.70392176, "longitude": 85.30747712}}]},
    reducers: {

        addToBookmark: (state, action) => {

            const newPlace = {
                id: nanoid(),
                classNumber: action.payload.classNumber,
                location: action.payload.location,
            }

            state.bookmark.push(newPlace)

        },

        removeFromBookmark: (state,action) => {
            
            state.bookmark = state.bookmark.filter((item)=> item.classNumber !== action.payload)
        },

    }
})

export const {addToBookmark, removeFromBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;