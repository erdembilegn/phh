import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';
import AssessmentList from './components/Teacher/AssessmentList';
const TeacherHome = () => {
  const [userInfo] = useAtom(userInfoAtom);
  return (
    <>
      <div className="w-screen h-screen">{userInfo.role === 'Teacher' && <AssessmentList />}</div>
    </>
  );
};
export default TeacherHome;
