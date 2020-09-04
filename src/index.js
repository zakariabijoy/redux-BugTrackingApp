import store from './store';
import { bugAdded } from './actions';


const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});
store.dispatch(bugAdded('Bug 1'));

unsubscribe();

store.dispatch({
    type: actions.BUG_Removed,
    payload: {
        id: 1
    }
});

console.log(store.getState());