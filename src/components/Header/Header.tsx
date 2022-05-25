import {
  Box,
  chakra,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from '@chakra-ui/react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';
import { HeaderFlex } from './HeaderFlex';

const CFaSearch = chakra(FaSearch);
const CFaAngleDown = chakra(FaAngleDown);

export const Header = () => {
  return (
    <Flex bg='teal.500'>
      <Box w='10%' display={{ sm: 'none', lg: 'inherit' }}>
        <HeaderFlex color='white'>LOGO</HeaderFlex>
      </Box>
      <Spacer display={{ sm: 'none', lg: 'block' }} />
      <Box w={{ sm: '90%', lg: '40%' }} h='50px'>
        <HeaderFlex>
          <InputGroup ml='1'>
            <InputLeftElement
              pointerEvents='none'
              children={<CFaSearch color='white' />}
            />
            <Input
              type='text'
              placeholder='search'
              _placeholder={{ color: 'white' }}
              color='white'
              focusBorderColor='white'
              //add search
            />
          </InputGroup>
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
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </HeaderFlex>
      </Box>
    </Flex>
  );
};
