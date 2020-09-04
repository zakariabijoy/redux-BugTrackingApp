import store from './store';
import { bugAdded, bugresolved } from './actions';


const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});
store.dispatch(bugAdded('Bug 1'));
store.dispatch(bugAdded('Bug 2'));
store.dispatch(bugAdded('Bug 3'));
store.dispatch(bugAdded('Bug 4'));

store.dispatch(bugresolved(1));

unsubscribe();

// store.dispatch({
//     type: actions.BUG_Removed,
//     payload: {
//         id: 1
//     }
// });



console.log(store.getState());