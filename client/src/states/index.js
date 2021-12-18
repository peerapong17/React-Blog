import { combineReducers } from 'redux';

import blogs from './reducers/blogs';
import auth from './reducers/auth';

export const reducers = combineReducers({ blogs, auth });
