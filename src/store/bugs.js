import { createAction, createReducer } from "@reduxjs/toolkit";




// action creators
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");


// export function bugAdded(description) {
//     return {
//         type: actions.BUG_Added,
//         payload: {
//             description: "bug1"
//         }
//     };
// }



// reducer

let lastId = 0;
export default createReducer([], {
    [bugAdded.type]: (bugs, action) => {
        bugs.push({
            id: ++lastId,
            description: action.payload.description,
            resolved: false
        });
    },
    [bugResolved.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id);
        bugs[index].resolved = true;
    }

});

