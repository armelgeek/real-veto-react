import selectReducer from '../frommagasin';
describe('testing reducer from magasin', () => {
    it.skip('is correct',()=>{
        const action = { type : 'test_dummy'};
        expect(selectReducer(undefined,action)).toMatchSnapshot();
    })
});