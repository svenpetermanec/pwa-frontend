import { Box } from '@chakra-ui/react';
import { PostAddition } from 'components/Post/PostAddition';
import { SinglePost } from 'components/Post/SinglePost';
import { useEffect, useState } from 'react';
import { Post } from 'redux/models/postModel';
import { executeHttpGetAuthorized } from 'redux/services/requests';

export const PostsContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //not to stay
      const response = await executeHttpGetAuthorized('/post');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

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

      {posts.map((post: Post, index: number) => (
        <SinglePost key={index} post={post} />
      ))}
    </Box>
  );
};
