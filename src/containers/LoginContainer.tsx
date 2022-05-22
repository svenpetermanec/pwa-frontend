import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/actions/authAction';
import { LoggedInStateEnum } from 'redux/reducers/authReducer';

const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const linkStyle = {
  color: '#319795',
};

export const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const loggedInState: LoggedInStateEnum = useSelector(
    (state: RootState) => state.auth.loggedInState
  );

  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginInfo: any) => {
    dispatch(loginUserThunk(loginInfo));
  };

  if (loggedInState === LoggedInStateEnum.LoggedIn)
    return <Navigate to={'/home'} />;

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      backgroundColor='gray.200'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading color='teal.400'>Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl isInvalid={errors.email}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaEnvelope color='gray.300' />}
                  />
                  <Input
                    type='email'
                    placeholder='email address'
                    {...register('email')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<CFaLock color='gray.300' />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='password'
                    {...register('password')}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
                isLoading={loggedInState === LoggedInStateEnum.Pending}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Not a member?{' '}
        <Link style={linkStyle} to={'/register'}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};
