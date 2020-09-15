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
import { addBug, getUnresolvedBugs, resolveBug } from '../bugs';
import configureStore from '../configureStore';



describe("bugSlice", () => {

    let fakeAxios, store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    const createState = () => ({
        entities: {
            bugs: {
                list: []
            }
        }
    });

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

    it("should mark the bug as resolved  if it's resolved to the server", async () => {
        fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugsSlice().list[0].resolved).toBe(true);
    });


    it("should not mark the bug as resolved  if it's not resolved to the server", async () => {
        fakeAxios.onPatch("/bugs/1").reply(500, { id: 1, resolved: true });
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugsSlice().list[0].resolved).not.toBe(true);
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

    describe('selectors', () => {
        it("getUnresolvedBugs", () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 1 }, { id: 1 }];

            const result = getUnresolvedBugs(state);

            expect(result).toHaveLength(2);
        });
    });
});
