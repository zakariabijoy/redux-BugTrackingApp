import * as actions from './actionTypes';

export const bugAdded = description => ({
    type: actions.BUG_Added,
    payload: {
        description
    }
});

export const bugresolved = id => ({
    type: actions.BUG_Resolved,
    payload: {
        id
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