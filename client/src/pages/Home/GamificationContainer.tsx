import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import GamificationList from './components/Admin/Gamification/GamificationList';

const GamificationContainer = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <>
      <div className="w-screen h-screen">
        {userInfo.role === 'Admin' && <GamificationList />}
      </div>
    </>
  );
};
export default GamificationContainer;
