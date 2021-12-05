import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import LoginButton from './LoginButton';
import Link from 'next/link';
import CreateProject from './project/CreateProject';

const Links = ['Home', 'About Us', 'Team'];

const linkMapping = new Map<string, string>([
    ['Home', "/"],
    ["About Us", "about"],
    ['Team', 'team']
]);

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    href={linkMapping.get(children.toString())}>
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* If we ever want light/dark mode <Box bg={useColorModeValue('gray.100', 'gray.800')} px={4}> */}
      <Box bg={"gray.800"} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
                Fundr
                {/* TODO:  <img src={'assets/fundr.png'}  alt="website logo"/> */}
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
              <CreateProject />
                <LoginButton />
        </Flex>
        </Flex>
      </Box>
    </>
  );
}