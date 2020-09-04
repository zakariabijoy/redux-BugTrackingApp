import configureStore from './store/configureStore';
import * as actions from './store/projects';


const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});
// store.dispatch(actions.bugAdded({ description: 'Bug 1' }));
// store.dispatch(actions.bugAdded({ description: 'Bug 2' }));
// store.dispatch(actions.bugAdded({ description: 'Bug 3' }));
// store.dispatch(actions.bugAdded({ description: 'Bug 4' }));

// store.dispatch(actions.bugResolved({ id: 1 }));

store.dispatch(actions.projectAdded({ name: 'project 1' }));

unsubscribe();

// store.dispatch({
//     type: actions.BUG_Removed,
//     payload: {
//         id: 1
//     }
// });



console.log(store.getState());