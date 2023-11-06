import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Grid,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { userInfoAtom } from '@libs/jotai';
import { headerText } from '@libs/text';
import { formatName, roleName } from '@utils/functions';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../libs/assets/logo.png';

const Header = () => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const logOut = () => {
    Cookies.remove('token');
    setUserInfo({
      email: '',
      firstName: '',
      lastName: '',
      id: '',
      groupId: '',
      role: '',
    });
    navigate('/login');
  };

  return (
    <Grid templateColumns={'repeat(3, 1fr)'} bg={'white'}>
      <Flex alignItems="center" w="50%" justify="center" gap="4">
        <Image w={'24px'} h={'26px'} src={logo} />
        <Heading fontWeight={800} fontSize={24} color={Colors.primary}>
          {headerText.title}
        </Heading>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Link to="/">
          <Text
            fontSize={24}
            fontWeight={location.pathname === '/' ? 600 : 0}
            color={Colors.primary}
          >
            {userInfo.role === 'admin' || userInfo.role === 'Admin'
              ? headerText.rewardList
              : userInfo.role === 'student' || userInfo.role === 'Student'
              ? headerText.rank
              : headerText.evaluate}
          </Text>
        </Link>
        <Text fontSize={24} color={Colors.primary}>
          {headerText.rating}
        </Text>
      </Flex>
      <Flex w="95%" direction="row-reverse">
        <Menu>
          <MenuButton color={Colors.primary}>
            <ChevronDownIcon boxSize="12" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logOut}>{headerText.logout}</MenuItem>
          </MenuList>
        </Menu>
        <Flex direction="column" alignItems="center">
          <Text color={Colors.primary} fontWeight={600}>
            {formatName(userInfo.firstName, userInfo.lastName)}
          </Text>
          <Text color="gray.50  0">{roleName(userInfo.role)}</Text>
        </Flex>
      </Flex>
    </Grid>
  );
};
export default Header;
