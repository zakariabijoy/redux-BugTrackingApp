import { createAction } from "@reduxjs/toolkit";




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

export default function reducer(state = [], action) {
    switch (action.type) {
        case bugAdded.type:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

            break;

        case bugRemoved.type:
            return state.filter(bug => bug.id !== action.payload.id);
            break;

        case bugResolved.type:
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });
            break;

        default:
            return state;
            break;
    }
    // if (action.type === 'bugAdded')
    //     return [
    //         ...state,
    //         {
    //             id: ++lastId,
    //             description: action.payload.description,
    //             resolved: false
    //         }
    //     ];
    // else if (action.type === 'bugRemoved')
    //     return state.filter(bug => bug.id !== action.payload.id);

    // return state;
}