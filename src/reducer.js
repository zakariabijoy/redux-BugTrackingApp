let lastId = 0;
import * as actions from './actionTypes';

export default function reducer(state = [], action) {
    switch (action.type) {
        case actions.BUG_Added:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

            break;

        case actions.BUG_Removed:
            return state.filter(bug => bug.id !== action.payload.id);
            break;

        case actions.BUG_Resolved:
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