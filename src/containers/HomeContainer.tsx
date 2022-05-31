import { Flex } from '@chakra-ui/react';
import { Header } from 'components/Header/Header';
import { FriendsContainer } from './FriendsContainer';
import { PostsContainer } from './PostsContainer';
import socketClient from 'socket.io-client';
import { getLocalStorageJwt } from 'utils/localStorage';

export const HomeContainer = () => {
  const socket = socketClient('http://localhost:4200', {
    query: { jwt: getLocalStorageJwt() },
  });

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
        <FriendsContainer socket={socket} />
      </Flex>
    </Flex>
  );
};
