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

    let fakeAxios, store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it("should add the bug to the store if it's saved to the server", async () => {
        // AAA
        //Arrange
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        //act
        await store.dispatch(addBug());

        //Assert
        expect(bugsSlice().list).toContainEqual(savedBug);


    });

    it("should not add the bug to the store if it's not  saved to the server", async () => {
        // AAA
        //Arrange
        const bug = { description: 'a' };
        fakeAxios.onPost('/bugs').reply(500);

        //act
        await store.dispatch(addBug());

        //Assert
        expect(bugsSlice().list).toHaveLength(0);


    });
});
