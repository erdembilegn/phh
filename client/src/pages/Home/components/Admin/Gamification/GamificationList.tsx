import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchAssessment, useFetchAward, useFetchGamification } from '@libs/hooks';
import { userInfoAtom } from '@libs/jotai';
import { GamificationListText } from '@libs/text';
import { CreateAsessmentApi, CreateAwardApi, CreateGamificationApi } from '@utils/api';
import { CloudinaryEnv } from '@utils/const';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RankForm, AssessmentForm, GamificationForm } from '../../../model';
import AwardTable from './Award/AwardTable';
import AssessmentTable from './Assessment/AssessmentTable';
import RankModal from './Award/RankModal';
import AssessmentModal from './Assessment/AssessmentModal';
import GamificationTable from './Gamifications/GamificationTable';
import GamificationModal from './Gamifications/GamificationModal';

const GamificationList: React.FC = () => {
  const toast = useToast({ position: 'top' });
  const [userInfo] = useAtom(userInfoAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAssessmentOpen,
    onOpen: onAssessmentOpen,
    onClose: onAssessmentClose,
  } = useDisclosure();
  const {
    isOpen: isGamificationOpen,
    onOpen: GamificationOpen,
    onClose: onGamificationClose,
  } = useDisclosure();
  const { register, handleSubmit } = useForm<RankForm>();
  const { register: registerAssessment, handleSubmit: handleAssessmentSubmit } =
    useForm<AssessmentForm>();
  const {
    register: registerGamification,
    handleSubmit: handleGamificationSubmit,
    control: gamificationFormControl,
    setValue,
    getValues,
    reset,
    trigger
  } = useForm<GamificationForm>({
    mode: 'onChange',
    defaultValues: {
      awards: [
        {
          awardId: '11',
          min: 1,
          max: 1,
        },
      ],
      assessments: [
        {
          assessmentId: '11',
          assessmentPercentage: 1,
        },
      ],
    },
  });
  const { refetch } = useFetchAward();
  const { refetch: refetchAssessment } = useFetchAssessment();
  const { refetch: refetchGamification } = useFetchGamification();

  const onSubmit: SubmitHandler<RankForm> = async (data) => {
    const imageData = new FormData();
    imageData.append('file', data.image[0]);
    imageData.append('upload_preset', CloudinaryEnv.preset_key);
    setIsLoading(true);
    axios
      .post(`https://api.cloudinary.com/v1_1//${CloudinaryEnv.cloud_name}/image/upload`, imageData)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          new CreateAwardApi()
            .createAward({
              name: data.name,
              createdUser: userInfo.id,
              image: res.data.url,
            })
            .then((res) => {
              if (res.data) {
                toast({
                  status: 'success',
                  title: 'Амжилттай үүслээ',
                  isClosable: true,
                });
                onClose();
                refetch();
              }
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onAssessmentSubmit: SubmitHandler<AssessmentForm> = async (data) => {
    new CreateAsessmentApi()
      .createAssessment({
        assessmentName: data.name,
        createdUser: userInfo.id,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай үүслээ',
            isClosable: true,
          });
          onClose();
          refetchAssessment();
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onGamificationSubmit: SubmitHandler<GamificationForm> = async (data) => {
    new CreateGamificationApi()
      .createGamification({
        gamificationName: data.name,
        createdUser: userInfo.id,
        gamificationStartDate: data.startDate,
        gamificationEndDate: data.endDate,
        groupId: data.groupId,
        awards: data.awards.map((item) => ({
          awardId: item.awardId,
          awardMinPercentage: item.min,
          awardMaxPercentage: item.max,
        })),
        assessments: data.assessments.map((item) => ({
          assessmentId: item.assessmentId,
          assessmentPercentage: item.assessmentPercentage,
        })),
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай үүслээ',
            isClosable: true,
          });
          onClose();
          refetchGamification();
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const [tabKey, setTabKey] = useState<string>('tab1');
  return (
    <>
      <Tabs paddingLeft="40px" paddingRight={"40px"} paddingTop={"30px"}>
        <TabList borderBottom="2px" borderColor={'#353D75CC'} color={Colors.primary}>
          <Tab onClick={() => setTabKey('tab1')}>{GamificationListText.award}</Tab>
          <Tab onClick={() => setTabKey('tab2')}>{GamificationListText.evalution}</Tab>
          <Tab onClick={() => setTabKey('tab3')}>{GamificationListText.gamification}</Tab>

          <Flex className="w-full justify-end">
            {tabKey === 'tab1' ? (
              <Button
                onClick={onOpen}
                bgColor={Colors.primary}
                color={'white'}
                className="flex gap-1"
              >
                <AddIcon />
                Үүсгэх
              </Button>
            ) : tabKey === 'tab2' ? (
              <Button
                onClick={onAssessmentOpen}
                bgColor={Colors.primary}
                color={'white'}
                className="flex gap-1"
              >
                <AddIcon />
                Үүсгэх
              </Button>
            ) : (
              <Button
                onClick={GamificationOpen}
                bgColor={Colors.primary}
                color={'white'}
                className="flex gap-1"
              >
                <AddIcon />
                Үүсгэх
              </Button>
            )}
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AwardTable />
          </TabPanel>
          <TabPanel>
            <AssessmentTable />
          </TabPanel>
          <TabPanel>
            <GamificationTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <RankModal
        isOpen={isOpen}
        onClose={onClose}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <AssessmentModal
        isAssessmentOpen={isAssessmentOpen}
        registerAssessment={registerAssessment}
        onAssessmentClose={onAssessmentClose}
        handleAssessmentSubmit={handleAssessmentSubmit}
        onAssessmentSubmit={onAssessmentSubmit}
        isAssessmentLoading={isLoading}
      />
      <GamificationModal
        isGamificationOpen={isGamificationOpen}
        registerGamification={registerGamification}
        onGamificationClose={() => {
          onGamificationClose();
          reset();
        }}
        handleGamificationSubmit={handleGamificationSubmit}
        onGamificationSubmit={onGamificationSubmit}
        isGamificationLoading={isLoading}
        formControl={gamificationFormControl}
        trigger={trigger}
        setValue={setValue}
        getValue={getValues}
      />
    </>
  );
};
export default GamificationList;
