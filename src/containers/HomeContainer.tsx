import { Flex } from '@chakra-ui/react';
import { Header } from 'components/Header/Header';
import { FriendsContainer } from './FriendsContainer';
import { PostsContainer } from './PostsContainer';

export const HomeContainer = () => {
  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      overflow={'hidden'}
    >
      <Header />
      <Flex height='100vh'>
        <PostsContainer />
        <FriendsContainer />
      </Flex>
    </Flex>
  );
};
