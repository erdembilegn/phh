import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import GamificationList from './components/GamificationList';
const HomeContainer = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <div className="w-screen h-screen">{userInfo.role === 'Admin' && <GamificationList />}</div>
  );
};
export default HomeContainer;
