import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import LeaderboardList from './components/LeaderboardList';
const LeaderboardContainer = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <>
      <div className="w-screen h-screen">{<LeaderboardList />}</div>
    </>
  );
};
export default LeaderboardContainer;
