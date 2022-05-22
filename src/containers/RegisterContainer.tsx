import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { registerUserThunk } from 'redux/actions/authAction';
import { LoggedInStateEnum } from 'redux/reducers/authReducer';
import { AppDispatch, RootState } from 'redux/store';
import * as yup from 'yup';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Password is required'),
});

export const RegisterContainer = () => {
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
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (registerInfo: any) => {
    dispatch(registerUserThunk(registerInfo));
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
        <Heading color='teal.400'>Register</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl isInvalid={errors.username}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<CFaUserAlt color='gray.300' />}
                  />
                  <Input
                    type='text'
                    placeholder='username'
                    {...register('username')}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
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
                Create account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
