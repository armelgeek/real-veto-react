import * as selectActions from "../frommagasin";
import configureStore from "redux-mock-store";
const mockStore = configureStore();
const store = mockStore();
describe("testing actions from magasin", () => {
  beforeEach(() => {
    store.clearActions();
  });
  it.skip("should set quantity product from magasin to orders", () => {
    store.dispatch(selectActions.setQtyFromMagasinItem(1, 1));
    expect(store.getActions()).toMatchSnapshot();
  });
});
