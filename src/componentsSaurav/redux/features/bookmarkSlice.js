import { createSlice, nanoid } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"

let localBookmark = null;
let initialState= {bookmark:[]}


// async function loadFromLocal() {
//     localBookmark = await AsyncStorage.getItem('bookmark'); //upon boot load from local storage if present
    
//     if (localBookmark !== null) {
//         console.log('\n\nchecking if there are old value')
//         previousValue = JSON.parse(localBookmark)
//         initialState = {bookmark: previousValue}
//         console.log('\n\ncheck finished if there are old value')
//         console.log(`previous state was : ${initialState}`)
//     }else {
//         initialState = {bookmark:[]};
//     }
// }

// loadFromLocal();

// async function updateBookmarks (newValue) {
//     console.log('\n\ninside update bookmark')
//     await AsyncStorage.setItem('bookmark', JSON.stringify(newValue)) // save on local storage
//     console.log('\n\nfinished update bookmark')
//     await AsyncStorage.getItem('bookmark')
//     .then(res => console.log(`The updated value on local storage is ${res}`))

// }

const bookmarkSlice = createSlice({
    name: 'bookmarks', //ignore this
    initialState,
    reducers: {

        addToBookmark: (state, action) => {

            const newPlace = {
                id: nanoid(),
                classNumber: action.payload.classNumber,
                location: action.payload.location,
            }

            const newBookmarks = state.bookmark.push(newPlace)
            // console.log(`\nADD TO BOOKMARK \nbookmarks on local storage is  updated with status \n${newBookmarks} \nalso value may be \n ${state.bookmark}`)
            // updateBookmarks(state.bookmark)
            
        },
        
        removeFromBookmark: (state, action) => {
            
            state.bookmark = state.bookmark.filter((item) => item.classNumber !== action.payload)
            // console.log(`\nRemove FROM BOOKMARK\nbookmarks on local storage is being updated with value \n${state.bookmark} `)
            // updateBookmarks(state.bookmark)
        },

        loadExistingBookmark: (state, action)=> {
            console.log('yeta ayo hai')
            state.bookmark = state.bookmark.concat(action.payload);
            console.log(`/n loaded existing value: ${action.payload}\n new value is: \n${state.bookmark}`)
        }   
    }
})

export const { addToBookmark, removeFromBookmark,loadExistingBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;