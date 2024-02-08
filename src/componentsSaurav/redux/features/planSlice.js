import { createSlice,} from "@reduxjs/toolkit"

let initialState = { plan: [] }

const planSlice = createSlice({
    name: 'plans', //ignore this
    initialState,
    reducers: {

        addToPlan: (state, action) => {


            const { name, location } = action.payload

            const existingElement = state.plan.find(item => item.name == name)

            if (!existingElement) {
                const newPlace = {
                    name,
                    location,
                }
                state.plan.push(newPlace)
                console.log(`element with cn ${name} and location ${location.latitude} ${location.longitude} is added`)
            } else {
                // If the element already exists, you might handle it in some way (e.g., update, ignore, etc.)
                console.log(`Element with name ${name} already exists in the plan.`);
            }
        },



        removeFromPlan: (state, action) => {
            state.plan = state.plan.filter((item) => item.name !== action.payload)
        },

        loadExistingPlan: (state, action) => {
            console.log('plan ma  ayo hai')
            state.plan = state.plan.concat(action.payload);
            console.log(`/n loaded existing value: ${action.payload}\n new value is: \n${state.plan}`)
        }
    }
})

export const { addToPlan, removeFromPlan, loadExistingPlan } = planSlice.actions;
export default planSlice.reducer;