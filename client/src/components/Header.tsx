import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { homeText } from '@libs/text';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../libs/assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <Flex bg={'white'}>
      <Flex>
        <Image w={'24px'} h={'26px'} src={logo} />
        <Heading fontWeight={800} fontSize={24}>
          {homeText.title}
        </Heading>
      </Flex>
      <Menu>
        <MenuButton>
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logOut}>Гарах</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default Header;
