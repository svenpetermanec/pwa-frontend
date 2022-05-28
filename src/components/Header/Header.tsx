import {
  Box,
  chakra,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/reducers/authReducer';
import { AppDispatch } from 'redux/store';
import { deleteLocalStorageJwt } from 'utils/localStorage';
import { HeaderFlex } from './HeaderFlex';
import { SearchBar } from './SearchBar';

const CFaAngleDown = chakra(FaAngleDown);

export const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    deleteLocalStorageJwt();
    navigate('/login');
  };

  return (
    <Flex bg='teal.500'>
      <Box w='10%' display={{ sm: 'none', lg: 'inherit' }}>
        <HeaderFlex color='white'>LOGO</HeaderFlex>
      </Box>
      <Spacer display={{ sm: 'none', lg: 'block' }} />
      <Box w={{ sm: '90%', lg: '40%' }} h='50px'>
        <HeaderFlex>
          <SearchBar />
        </HeaderFlex>
      </Box>
      <Spacer display={{ sm: 'none', lg: 'block' }} />
      <Box w='10%'>
        <HeaderFlex>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<CFaAngleDown />}
              colorScheme='teal'
            >
              <Text display={{ sm: 'none', lg: 'inherit' }}>Profile</Text>
            </MenuButton>
            <MenuList>
              <MenuItem>Change avatar</MenuItem>
              <MenuItem onClick={onLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </HeaderFlex>
      </Box>
    </Flex>
  );
};
