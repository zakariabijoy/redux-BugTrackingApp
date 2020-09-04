import * as actions from './actionTypes';

export const bugAdded = description => ({
    type: actions.BUG_Added,
    payload: {
        description: "bug1"
    }
});



// export function bugAdded(description) {
//     return {
//         type: actions.BUG_Added,
//         payload: {
//             description: "bug1"
//         }
//     };
// }