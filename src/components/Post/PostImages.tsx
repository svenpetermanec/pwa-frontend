import {
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getLocalStorageJwt } from 'utils/localStorage';
import Carousel from 'framer-motion-carousel';

interface Props {
  images: string[];
}

export const PostImages = ({ images }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    const fetchImage = async (image: string) => {
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Authorization', `${getLocalStorageJwt()}`);

      //axios doesnt seem to work with these blobs
      const res = await fetch(`http://localhost:4200/api/image/${image}`, {
        headers: requestHeaders,
      });
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setState((s: string[]) => [...s, imageObjectURL]);
    };

    images.forEach((image: string) => {
      fetchImage(image);
    });
  }, [images]);

  return (
    <HStack overflowX='hidden'>
      <Modal isOpen={isOpen} size='xl' onClose={() => setIsOpen(!isOpen)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Carousel autoPlay={false} loop={true} interval={5}>
              {images.map((image: string, index: number) => (
                <Image key={index} src={state[index]} draggable={false} />
              ))}
            </Carousel>
          </ModalBody>
        </ModalContent>
      </Modal>

      {images.slice(0, 3).map((image: string, index: number) => (
        <Image
          boxSize={{ sm: '100%', md: '50%', lg: '33%' }}
          key={index}
          src={state[index]}
          onClick={() => setIsOpen(!isOpen)}
        />
      ))}
    </HStack>
  );
};
