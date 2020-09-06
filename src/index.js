import configureStore from './store/configureStore';
import * as projectsActions from './store/projects';
import * as bugsActions from './store/bugs';



const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});
store.dispatch(bugsActions.bugAdded({ description: 'Bug 1' }));
store.dispatch(bugsActions.bugAdded({ description: 'Bug 2' }));
store.dispatch(bugsActions.bugAdded({ description: 'Bug 3' }));
store.dispatch(bugsActions.bugAdded({ description: 'Bug 4' }));

store.dispatch(bugsActions.bugResolved({ id: 1 }));

store.dispatch(projectsActions.projectAdded({ name: 'project 1' }));

unsubscribe();

// store.dispatch({
//     type: actions.BUG_Removed,
//     payload: {
//         id: 1
//     }
// });



console.log(store.getState());