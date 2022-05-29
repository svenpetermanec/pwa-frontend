import { getPostsRoute } from './posts.service.routes';
import { executeHttpGetAuthorized } from './requests';

export const getPosts = () => {
  return executeHttpGetAuthorized(getPostsRoute);
};
