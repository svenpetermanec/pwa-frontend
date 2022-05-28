import { Avatar, Box, Center, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { executeHttpGetAuthorized } from 'redux/services/requests';

interface Friend {
  id: number;
  username: string;
}

export const FriendsContainer = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await executeHttpGetAuthorized('/friend');
      setFriends(response.data);
    };
    getFriends();
  }, []);

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
