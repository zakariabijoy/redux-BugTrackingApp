import configureStore from './store/configureStore';
import { projectAdded } from './store/projects';
import { bugResolved, bugAdded, getUnresolvedBugs } from './store/bugs';



const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});
store.dispatch(bugAdded({ description: 'Bug 1' }));
store.dispatch(bugAdded({ description: 'Bug 2' }));
store.dispatch(bugAdded({ description: 'Bug 3' }));
store.dispatch(bugAdded({ description: 'Bug 4' }));

store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: 'project 1' }));

unsubscribe();

// store.dispatch({
//     type: actions.BUG_Removed,
//     payload: {
//         id: 1
//     }
// });



const unresolvedBugs = getUnresolvedBugs(store.getState());

console.log(unresolvedBugs);