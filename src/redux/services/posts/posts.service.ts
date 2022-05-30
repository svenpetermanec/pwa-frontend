import { addPostRoute, getPostsRoute } from './posts.service.routes';
import {
  executeHttpGetAuthorized,
  executeHttpPostAuthorized,
} from '../requests';

export const getPosts = () => {
  return executeHttpGetAuthorized(getPostsRoute);
};

export const addPost = (params?: any) => {
  return executeHttpPostAuthorized(addPostRoute, params);
};
