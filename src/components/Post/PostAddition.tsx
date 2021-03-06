import {
  Avatar,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaImage } from 'react-icons/fa';
import { FileUpload } from './FileUpload';

import { useDispatch } from 'react-redux';
import { addPostThunk } from 'redux/actions/postsAction';
import { AppDispatch } from 'redux/store';

const CFaImage = chakra(FaImage);

const postSchema = yup.object().shape({
  content: yup.string().required('Please give your post a description'),
  image: yup.mixed().test({
    message: 'Please provide a supported file type',
    test: (file, context) => {
      if (!file.length) return true;
      const isValid = ['png', 'jpg', 'jpeg'].includes(
        file[0]?.name?.split('.').pop()
      );
      if (!isValid) context?.createError();
      return isValid;
    },
  }),
});

export const PostAddition = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data: any) => {
    const form = new FormData();
    form.append('content', data.content);

    for (let i = 0; i < data.image.length; i++) {
      form.append('image', data.image[i]);
    }

    dispatch(addPostThunk(form));
    setIsOpen(!isOpen);
  };

  return (
    <HStack
      backgroundColor='white'
      borderRadius={8}
      p={3}
      boxShadow='rgba(0, 0, 0, 0.25) 0px 2px 4px'
    >
      <Modal isOpen={isOpen} size='xl' onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.content}>
                <Textarea
                  placeholder="What's on your mind"
                  {...register('content')}
                />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
              </FormControl>
              <HStack mt={3}>
                <FormControl isInvalid={errors.image}>
                  <FileUpload register={register('image')}>
                    <Button
                      colorScheme='gray'
                      leftIcon={<CFaImage color='teal.500' />}
                      borderRadius={50}
                    >
                      <Text color='teal.500'>Attach image</Text>
                    </Button>
                  </FileUpload>
                  <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                </FormControl>
                <Button type='submit' colorScheme='teal'>
                  Submit
                </Button>
              </HStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Avatar />
      <InputGroup>
        <Input
          placeholder="What's on your mind"
          onClick={() => setIsOpen(!isOpen)}
          isReadOnly
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            borderRadius={50}
            colorScheme='teal'
            onClick={() => setIsOpen(!isOpen)}
          >
            <CFaImage />
          </Button>
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
};
