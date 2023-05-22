import { useDispatch, useSelector } from 'react-redux';
import { addToBasket as dispatchAddToBasket, removeFromBasket } from '../store/basket/actions/basket';

const useNextId = (model,dispatch,useSelector,useEffect) => {
    const categories = useSelector(getData(model).value);
    useEffect(() => {
        dispatch(action(model).fetch());
    })
    let maxId=0;
    Object.keys(categories).forEach((id) => {
        maxId = Math.max(id, maxId);
    });

    return ;
};

export default useNextId;
