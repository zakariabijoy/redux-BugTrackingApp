import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from './api';
import moment from "moment";


const slice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        //actions => action handlers
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        bugsRequestedFailed: (bugs, action) => {
            bugs.loading = false;
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.payload);
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugAssignedToUser: (bugs, action) => {
            const { id: bugId, userId } = action.payload;
            const index = bugs.list.findIndex(b => b.id == bugId);
            bugs.list[index].userId = userId;
        }
    }
});



export const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestedFailed } = slice.actions;

export default slice.reducer;

// Action Creators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;

    return dispatch(apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestedFailed.type
    }));
}

export const addBug = bug => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type
});

export const resolveBug = id => apiCallBegan({
    url: url + "/" + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
    url: url + "/" + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type
});

// selector
// export const getUnresolvedBugs = state => state.entities.bugs.filter(b => !b.resolved);

// Memorize selector with reselect

export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.list.filter(b => !b.resolved)
);

export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(b => b.userId === userId)
)


// Cohesion is  software design    for keep related things in one module , but we aslo can break this if our module is too big