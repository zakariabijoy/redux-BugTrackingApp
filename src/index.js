import configureStore from './store/configureStore';
import { projectAdded } from './store/projects';
import { bugResolved, bugAdded, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from './store/bugs';
import { userAdded } from './store/users';
import * as actions from './store/api';



const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("store changed!", store.getState());
});

store.dispatch(actions.apiCallBegan({
    url: "/bugs",
    onSuccess: actions.apiCallSuccess.type
}));

// store.dispatch({
//     type: 'error',
//     payload: {
//         message: "error notifiaction message"
//     }
// });

// store.dispatch((dispatch, getState) => {
//     // call api
//     //when promise is resolved => dispatch()
//     dispatch({ type: "bugsRecived", bugs: [1, 2, 3] })
//     console.log(getState());
//     // if the promise is reject => dispatch();
// });
//store.dispatch(userAdded({ name: "user 1" }));
// store.dispatch(userAdded({ name: "user 2" }));
// store.dispatch(projectAdded({ name: 'project 1' }));
// store.dispatch(bugAdded({ description: 'Bug 1' }));
// store.dispatch(bugAdded({ description: 'Bug 2' }));
// store.dispatch(bugAdded({ description: 'Bug 3' }));
// store.dispatch(bugAdded({ description: 'Bug 4' }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

// store.dispatch(bugResolved({ id: 1 }));


unsubscribe();

// store.dispatch({
//     type: actions.BUG_Removed,
//     payload: {
//         id: 1
//     }
// });



const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);