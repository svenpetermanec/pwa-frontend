import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsThunk } from 'redux/actions/friendsAction';
import { Friend } from 'redux/models/friendModel';
import { AppDispatch, RootState } from 'redux/store';
import { Socket } from 'socket.io-client';
import { FaWindowClose } from 'react-icons/fa';

const CFaWindowClose = chakra(FaWindowClose);
interface Props {
  socket: Socket;
}

export const FriendsContainer = ({ socket }: Props) => {
  const [display, setDisplay] = useState<'none' | 'inherit'>('none');
  const [currentChat, setCurrentChat] = useState<number>();
  const [messages, setMessages] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();

  const friends: Friend[] = useSelector(
    (state: RootState) => state.friend.friends
  );

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getFriends = async () => {
      dispatch(getFriendsThunk());
    };
    getFriends();
  }, [dispatch]);

  const openChat = (e: any, id: number) => {
    setCurrentChat(id);
    setDisplay('inherit');
  };

  const closeChat = () => {
    setMessages([]);
    setDisplay('none');
  };

  const sendMessage = (message: any) => {
    socket.emit('dm', message.message, currentChat);
    messages.push(message.message);
    reset();
  };

  socket.on('dm', (arg) => {
    messages.push(arg);
    reset();
  });

  return (
    <Box
      flex='1'
      backgroundColor='white'
      boxShadow='rgba(0, 0, 0, 0.25) -2px 0px 4px'
    >
      {friends.length === 0 && <Center>Add friends to start messaging</Center>}

      {friends.map((friend: Friend) => (
        <HStack
          key={friend.id}
          p={3}
          onClick={(e) => {
            openChat(e, friend.id);
          }}
        >
          <Center fontWeight='semibold'>
            <Avatar mr={3} />
            {friend.username}
          </Center>
        </HStack>
      ))}
      <Box h='100vh' bg='teal.500' display={display}>
        <Button borderRadius={8} colorScheme='white' onClick={closeChat}>
          <CFaWindowClose />
        </Button>
        {messages.map((message: string, index: number) => (
          <Text
            m={3}
            p={1}
            key={index}
            color='white'
            bg='gray.400'
            borderRadius={50}
          >
            {message}
          </Text>
        ))}
        <form onSubmit={handleSubmit(sendMessage)}>
          <Input
            bg='white'
            type='text'
            {...register('message')}
            position='fixed'
            bottom={0}
            borderRadius={0}
          />
        </form>
      </Box>
    </Box>
  );
};
