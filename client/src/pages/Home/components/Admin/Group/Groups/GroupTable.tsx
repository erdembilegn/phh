import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, Input, useToast, useDisclosure } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchGroup, useFetchUser } from '@libs/hooks';
import { GroupTableText } from '@libs/text';
import { formatName } from '@utils/functions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GroupForm } from 'src/pages/Home/model';
import GroupUpdateModal from './GroupUpdateModal';
import GroupDeleteModal from './GroupDeleteModal';
import { UpdateGroupApi } from '@utils/api';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

const GroupTable: React.FC = () => {
  const { users } = useFetchUser();
  const [userInfo] = useAtom(userInfoAtom);
  const { refetch, groups } = useFetchGroup();
  const toast = useToast({ position: 'top' });
  const [groupId, setGroupId] = useState<string>('')
  const [isGroupUpdateLoading, setIsGroupUpdateLoading] = useState<boolean>(false);
  const [isGroupDeleteLoading] = useState<boolean>(false);
  const { isOpen: isGroupUpdateOpen, onOpen: onGroupUpdateOpen, onClose: onGroupUpdateClose } = useDisclosure();
  const { isOpen: isGroupDeleteOpen, onOpen: onGroupDeleteOpen, onClose: onGroupDeleteClose } = useDisclosure();
  const handleGroupUpdateOpen = (clickedAwardId: string) => {
    setGroupId(clickedAwardId);
    onGroupUpdateOpen();
  };

  const handleGroupDeleteOpen = (clickedAwardId: string) => {
    setGroupId(clickedAwardId);
    onGroupDeleteOpen();
  };
  const {
    register: registerGroupUpdate,
    handleSubmit: handleGroupUpdateSubmit,
  } = useForm<GroupForm>();
  const onGroupUpdateSubmit: SubmitHandler<GroupForm> = async (data) => {
    new UpdateGroupApi()
      .updateGroup({
        id: groupId,
        name: data.name,
        createdUser : userInfo.id,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай засагдлаа.',
            isClosable: true,
          });
          onGroupUpdateClose();
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
        setIsGroupUpdateLoading(false);
      });
  };


  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredGroups = groups?.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.users.length.toString().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {GroupTableText.heading}
        </Heading>
        <Text color={Colors.primary} marginTop={'10px'}
          fontStyle={'italic'} fontSize={'15px'}>{GroupTableText.description}</Text>
      </Grid>
      <TableContainer style={{ height: '400px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }} >
            <Tr className="[&>th]:text-white" >
              <Th>#</Th>
              <Th>{GroupTableText.name}</Th>
              <Th>{GroupTableText.number}</Th>
              <Th>{GroupTableText.teacher}</Th>
              <Th>{GroupTableText.isActive}</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
            <Tr className="[&>th]:text-white" >
              <Th></Th>
              <Th><Input
                placeholder='х'
                size='sm'
                value={searchQuery}
                backgroundColor={"white"}
                color={Colors.primary}
                margin={"-5px"}
                onChange={(e) => setSearchQuery(e.target.value)}
              /></Th>
              <Th><Input
                placeholder='х'
                size='sm'
                value={searchQuery}
                backgroundColor={"white"}
                color={Colors.primary}
                margin={"-5px"}
                onChange={(en) => setSearchQuery(en.target.value)}
              /></Th>
              <Th><Input placeholder='extra small size' size='xs' margin={"-5px"} /></Th>
              <Th><Input placeholder='extra small size' size='xs' margin={"-5px"} /></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {filteredGroups &&
            filteredGroups.map((item, index) => {
              const teacherId = item.users.find(item => users?.some(user => user.id === item.userId && user.role === 'Teacher'));
              const teacher = users?.find(user => user.id === teacherId?.userId);

              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td width={'5%'}>{index + 1}</Td>
                    <Td width={'20%'}>{item.name}</Td>
                    <Td>{item.users.length}</Td>
                    <Td>{teacher ? formatName(teacher.firstName, teacher.lastName) : '-'}</Td>
                    <Td><Button colorScheme='#353D75' variant='outline' size={'sm'} cursor={'default'} >{item.users.length > 0 ? GroupTableText.active : GroupTableText.deactive}</Button></Td>
                    <Td width={'5%'}>
                      <Button
                        size={'sm'}
                        leftIcon={<EditIcon />}
                        _hover={{ background: "white" }}
                        bgColor={'white'}
                        onClick={() => handleGroupUpdateOpen(item.id)}>
                      </Button>
                    </Td>
                    <Td width={'5%'}>
                      <Button
                        size={'sm'}
                        leftIcon={<DeleteIcon color={'#E75454'} />}
                        isDisabled={item.users.length > 0}
                        _hover={{ background: "white" }}
                        bgColor={'white'}
                        onClick={() => handleGroupDeleteOpen(item.id)}>
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
      <GroupUpdateModal
        isGroupUpdateOpen={isGroupUpdateOpen}
        onGroupUpdateClose={onGroupUpdateClose}
        registerGroupUpdate={registerGroupUpdate}
        handleGroupUpdateSubmit={handleGroupUpdateSubmit}
        onGroupUpdateSubmit={onGroupUpdateSubmit}
        isGroupUpdateLoading={isGroupUpdateLoading}
      />
      <GroupDeleteModal
        isGroupDeleteOpen={isGroupDeleteOpen}
        onGroupDeleteClose={onGroupDeleteClose}
        isGroupDeleteLoading={isGroupDeleteLoading}
        groupId={groupId}
        refetchTable={refetch}
      />
    </>
  );
};

export default GroupTable;
