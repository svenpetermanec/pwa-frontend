import { Avatar, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Post } from 'redux/models/postModel';
import { PostImages } from './PostImages';

interface Props {
  post: Post;
}

const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const SinglePost = ({ post }: Props) => {
  return (
    <VStack
      mt={3}
      backgroundColor='white'
      align='stretch'
      borderRadius={8}
      key={post.id}
    >
      <Grid
        p={3}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(2, 1fr)'
        width='12%'
      >
        <GridItem rowSpan={2} mr={3}>
          <Avatar />
        </GridItem>
        <GridItem>
          <Text fontWeight='bold'>{post.username}</Text>
        </GridItem>
        <GridItem>
          <Text color='gray'>{formatDate(post.timestamp)} </Text>
        </GridItem>
      </Grid>
      <Text p={3} fontWeight='semibold'>
        {post.content}
      </Text>

      <PostImages images={post.images} />
    </VStack>
  );
};
