import {
  chakra,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendThunk, searchUsersThunk } from 'redux/actions/friendsAction';
import { AppDispatch, RootState } from 'redux/store';

const CFaSearch = chakra(FaSearch);

interface SearchResults {
  id: number;
  username: string;
}

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const loadingState = useSelector((state: RootState) => state.friend.loading);

  const onSearch = async (e: any) => {
    if (e.key === 'Enter') {
      const results = await dispatch(
        searchUsersThunk({ username: e.currentTarget.value })
      );

      if (results.payload) {
        setSearchResults(results.payload as SearchResults);
        setIsOpen(true);
      }
    }
  };

  const onAddFriend = async () => {
    dispatch(addFriendThunk({ userId: searchResults!.id }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex>
              <Avatar mr={3} />
              <Center>{searchResults?.username}</Center>
              <Spacer />
              <Center>
                <Button
                  colorScheme='teal'
                  borderRadius={50}
                  onClick={onAddFriend}
                  isLoading={loadingState}
                >
                  Add
                </Button>
              </Center>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <InputGroup ml='1'>
        <InputLeftElement
          pointerEvents='none'
          children={<CFaSearch color='white' />}
        />
        <Input
          type='text'
          placeholder='search users'
          _placeholder={{ color: 'white' }}
          color='white'
          focusBorderColor='white'
          onKeyDown={onSearch}
        />
      </InputGroup>
    </>
  );
};
