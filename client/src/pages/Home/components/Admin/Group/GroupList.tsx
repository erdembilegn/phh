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
import { useFetchGroup, useFetchUser } from '@libs/hooks';
import { userInfoAtom } from '@libs/jotai';
import { GroupListText } from '@libs/text';
import { CreateGroupApi, CreateUserApi } from '@utils/api';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForm, GroupForm } from '../../../model';
import GroupModal from './Groups/GroupModal';
import UserModal from './User/UserModal';
import GroupTable from './Groups/GroupTable';
import UserTable from './User/UserTable';

const GroupList: React.FC = () => {
  const toast = useToast({ position: 'top' });
  const [userInfo] = useAtom(userInfoAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen: isGroupOpen, onOpen: onGroupOpen, onClose: onGroupClose } = useDisclosure();
  const {
    register: registerGroup,
    handleSubmit: handleGroupSubmit,
    control: groupFormControl,
    reset,
  } = useForm<GroupForm>();

  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose } = useDisclosure();
  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    control: userFormControl,
    reset: userReset,
  } = useForm<UserForm>();

  const { refetch } = useFetchGroup();
  const { refetch: refetchUser } = useFetchUser();
  const onGroupSubmit: SubmitHandler<GroupForm> = async (data) => {
    new CreateGroupApi()
      .createGroup({
        name: data.name,
        createdUser: userInfo.id,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай үүслээ',
            isClosable: true,
          });
          onGroupClose();
          refetch();
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
  const onUserSubmit: SubmitHandler<UserForm> = async (data) => {
    new CreateUserApi()
      .createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        groupId: data.groupId ?? null,
        role: data.role,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай үүслээ',
            isClosable: true,
          });
          onUserClose();
          refetchUser();
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
          <Tab onClick={() => setTabKey('tab1')}>{GroupListText.group}</Tab>
          <Tab onClick={() => setTabKey('tab2')}>{GroupListText.student}</Tab>

          <Flex className="w-full justify-end">
            {tabKey === 'tab1' ? (
              <Button
                onClick={onGroupOpen}
                bgColor={Colors.primary}
                color={'white'}
                className="flex gap-1"
              >
                <AddIcon />
                Үүсгэх
              </Button>
            ) : (
              <Button
                onClick={onUserOpen}
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
            <GroupTable />
          </TabPanel>
          <TabPanel>
            <UserTable />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <GroupModal
        isGroupOpen={isGroupOpen}
        registerGroup={registerGroup}
        onGroupClose={() => {
          onGroupClose();
          reset();
        }}
        handleGroupSubmit={handleGroupSubmit}
        onGroupSubmit={onGroupSubmit}
        isGroupLoading={isLoading}
        formControl={groupFormControl}
      />
      <UserModal
        isUserOpen={isUserOpen}
        registerUser={registerUser}
        onUserClose={() => {
          onUserClose();
          userReset();
        }}
        handleUserSubmit={handleUserSubmit}
        onUserSubmit={onUserSubmit}
        isUserLoading={isLoading}
        formControl={userFormControl}
      />
    </>
  );
};
export default GroupList;
