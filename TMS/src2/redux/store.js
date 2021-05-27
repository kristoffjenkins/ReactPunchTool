import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//reducers
import reducers from './reducers/index';

const store = createStore(reducers, 
    compose(
        applyMiddleware(
            compose(
                thunk
            )
        )
    )
);

export default store;
