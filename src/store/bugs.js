// action types
const BUG_Added = "bugAdded";
const BUG_Removed = "bugRemoved";
const BUG_Resolved = "bugResolved";


// action creators
export const bugAdded = description => ({
    type: BUG_Added,
    payload: {
        description
    }
});

export const bugresolved = id => ({
    type: BUG_Resolved,
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



// reducer

let lastId = 0;

export default function reducer(state = [], action) {
    switch (action.type) {
        case BUG_Added:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

            break;

        case BUG_Removed:
            return state.filter(bug => bug.id !== action.payload.id);
            break;

        case BUG_Resolved:
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