import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import GroupList from './components/Admin/Group/GroupList';
import AssessmentList from './components/Teacher/AssessmentList';
import MyAward from './components/Student/MyAward';

const HomeContainer = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <>
      <div className="w-screen h-screen">
        {userInfo.role === 'Admin' && <GroupList />}
        {userInfo.role === 'Teacher' && <AssessmentList />}
        {userInfo.role === 'Student' && <MyAward />}
      </div>
    </>
  );
};
export default HomeContainer;
