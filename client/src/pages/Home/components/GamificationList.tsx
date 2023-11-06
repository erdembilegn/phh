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
import { useFetchAward } from '@libs/hooks';
import { userInfoAtom } from '@libs/jotai';
import { GamificationListText } from '@libs/text';
import { CreateAwardApi } from '@utils/api';
import { CloudinaryEnv } from '@utils/const';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RankForm } from '../model';
import AwardTable from './AwardTable';
import RankModal from './RankModal';

const GamificationList: React.FC = () => {
  const toast = useToast({ position: 'top' });
  const [userInfo] = useAtom(userInfoAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<RankForm>();
  const { refetch } = useFetchAward();
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
  return (
    <>
      <Tabs padding="40px">
        <TabList borderBottom="2px" borderColor={'#353D75CC'} color={Colors.primary}>
          <Tab>{GamificationListText.award}</Tab>
          <Tab>{GamificationListText.evalution}</Tab>
          <Tab>{GamificationListText.gamification}</Tab>

          <Flex className="w-full justify-end">
            <Button
              onClick={onOpen}
              bgColor={Colors.primary}
              color={'white'}
              className="flex gap-2"
            >
              <AddIcon />
              Үүсгэх
            </Button>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AwardTable />
          </TabPanel>
          <TabPanel>
            <p>hello1</p>
          </TabPanel>
          <TabPanel>
            <p>hello2</p>
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
    </>
  );
};
export default GamificationList;
