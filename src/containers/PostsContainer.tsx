import { Box, Center, Spinner } from '@chakra-ui/react';
import { PostAddition } from 'components/Post/PostAddition';
import { SinglePost } from 'components/Post/SinglePost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from 'redux/actions/postsAction';
import { Post } from 'redux/models/postModel';
import { AppDispatch, RootState } from 'redux/store';

export const PostsContainer = () => {
  const dispatch: AppDispatch = useDispatch();

  const posts: Post[] = useSelector((state: RootState) => state.post.posts);

  const isLoading: boolean = useSelector(
    (state: RootState) => state.post.loading
  );

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(getPostsThunk());
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <Box
      borderRadius={8}
      m={{ sm: 0, lg: 10 }}
      w={{ sm: '65%', lg: '75%' }}
      backgroundColor='gray.200'
      overflow={'scroll'}
      sx={{
        '&::-webkit-scrollbar': {
          backgroundColor: `gray.200`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `gray.400`,
          borderRadius: 8,
        },
      }}
    >
      <PostAddition />

      {isLoading && (
        <Center mt={5}>
          <Spinner />
        </Center>
      )}

      {posts.map((post: Post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </Box>
  );
};
