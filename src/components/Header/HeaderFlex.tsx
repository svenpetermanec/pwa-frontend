import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export const HeaderFlex = forwardRef<FlexProps, 'div'>((props, ref) => (
  <Flex
    alignItems='center'
    justifyContent='center'
    h='50px'
    fontWeight='700'
    w='100%'
    ref={ref}
    {...props}
  />
));
