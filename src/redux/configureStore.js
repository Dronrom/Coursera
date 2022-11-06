import { combineReducers, createStore } from 'redux';
import { Dishes } from './dishes';
import { Promotions } from './promtions';
import { Comments } from './comments';
import { Leaders } from './leaderss';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );
    
    return store;
}