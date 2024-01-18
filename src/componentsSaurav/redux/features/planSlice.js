import { createSlice,} from "@reduxjs/toolkit"

let initialState = { plan: [] }

const planSlice = createSlice({
    name: 'plans', //ignore this
    initialState,
    reducers: {

        addToPlan: (state, action) => {


            const { classNumber, location } = action.payload

            const existingElement = state.plan.find(item => item.classNumber == classNumber)

            if (!existingElement) {
                const newPlace = {
                    classNumber,
                    location,
                }
                state.plan.push(newPlace)
            } else {
                // If the element already exists, you might handle it in some way (e.g., update, ignore, etc.)
                console.log(`Element with classNumber ${classNumber} already exists in the plan.`);
            }
        },



        removeFromPlan: (state, action) => {
            state.plan = state.plan.filter((item) => item.classNumber !== action.payload)
        },

        loadExistingPlan: (state, action) => {
            // console.log('plan ma  ayo hai')
            state.plan = state.plan.concat(action.payload);
            // console.log(`/n loaded existing value: ${action.payload}\n new value is: \n${state.plan}`)
        }
    }
})

export const { addToPlan, removeFromPlan, loadExistingPlan } = planSlice.actions;
export default planSlice.reducer;