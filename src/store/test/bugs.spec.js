// solitary tests

// import { addBug, bugAdded } from "../bugs";
// import { apiCallBegan } from './../api';

// describe("bugSlice", () => {
//     describe("action Creators", () => {
//         it('addBug', () => {
//             const bug = { description: 'a' };
//             const result = addBug(bug);
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected);
//         });
//     });
// });


// Social tests
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug } from '../bugs';
import configureStore from '../configureStore';

describe("bugSlice", () => {
    it("should handle the addBug action", async () => {
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };

        const fakeAxios = new MockAdapter(axios);
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        const store = configureStore();
        await store.dispatch(addBug());

        expect(store.getState().entities.bugs.list).toContainEqual(savedBug);

    });
});
