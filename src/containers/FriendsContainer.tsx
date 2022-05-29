import { Avatar, Box, Center, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsThunk } from 'redux/actions/friendsAction';
import { Friend } from 'redux/models/friendModel';
import { AppDispatch, RootState } from 'redux/store';

export const FriendsContainer = () => {
  const dispatch: AppDispatch = useDispatch();

  const friends = useSelector((state: RootState) => state.friend.friends);

  useEffect(() => {
    const getFriends = async () => {
      dispatch(getFriendsThunk());
    };
    getFriends();
  }, [dispatch]);

  return (
    <Box
      flex='1'
      backgroundColor='white'
      boxShadow='rgba(0, 0, 0, 0.25) -2px 0px 4px'
    >
      {friends.length === 0 && <Center>Add friends to start messaging</Center>}

      {friends.map((friend: Friend, index: number) => (
        <HStack key={index} p={3}>
          <Center
            fontWeight='semibold'
            //onclick open chat
          >
            <Avatar mr={3} />
            {friend.username}
          </Center>
        </HStack>
      ))}
    </Box>
  );
};
