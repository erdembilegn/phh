import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchGroup, useFetchUser } from '@libs/hooks';
import { UserTableText } from '@libs/text';
import UserUpdateModal from './UserUpdateModal';
import UserDeleteModal from './UserDeleteModal';
import { useState } from 'react';
import { UpdateUserApi } from '@utils/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserForm } from 'src/pages/Home/model';



const UserTable: React.FC = () => {
  const { refetch, users } = useFetchUser();
  const { groups } = useFetchGroup();

  const toast = useToast({ position: 'top' });
  const [userId, setUserId] = useState<string>('')
  const [isUserUpdateLoading, setIsUserUpdateLoading] = useState<boolean>(false);
  const [isUserDeleteLoading] = useState<boolean>(false);
  const { isOpen: isUserUpdateOpen, onOpen: onUserUpdateOpen, onClose: onUserUpdateClose } = useDisclosure();
  const { isOpen: isUserDeleteOpen, onOpen: onUserDeleteOpen, onClose: onUserDeleteClose } = useDisclosure();
  const handleUserUpdateOpen = (clickedAwardId: string) => {
    setUserId(clickedAwardId);
    onUserUpdateOpen();
  };

  const handleUserDeleteOpen = (clickedAwardId: string) => {
    setUserId(clickedAwardId);
    onUserDeleteOpen();
  };
  const {
    register: registerUserUpdate,
    handleSubmit: handleUserUpdateSubmit,
  } = useForm<UserForm>();
  const onUserUpdateSubmit: SubmitHandler<UserForm> = async (data) => {
    new UpdateUserApi()
      .updateUser({
        id: userId,
        firstName : data.firstName,
        lastName : data.lastName,
        email : data.email,
        password : data.password,
        groupId: data.groupId ?? null,
        role : data.role,
      })
      .then((res) => {
        if (res.data) {
          toast({
            status: 'success',
            title: 'Амжилттай засагдлаа.',
            isClosable: true,
          });
          onUserUpdateClose();
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
        setIsUserUpdateLoading(false);
      });
  };

  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {UserTableText.heading}
        </Heading>

      </Grid>
      <TableContainer style={{ height: '400px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th>{UserTableText.lastName}</Th>
              <Th>{UserTableText.firstName}</Th>
              <Th>{UserTableText.role}</Th>
              <Th>{UserTableText.email}</Th>
              <Th>{UserTableText.group}</Th>
              <Th>
              </Th>
              <Th>
              </Th>
            </Tr>
          </Thead>
          {users &&
            users.map((item, index) => {
              const result = groups?.filter((grp) => grp.id === item.groupId);
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.lastName}</Td>
                    <Td>{item.firstName}</Td>
                    <Td>{item.role === 'Admin' && 'Админ'}
                      {item.role === 'Teacher' && 'Багш'}
                      {item.role === 'Student' && 'Суралцагч'}</Td>

                    <Td>{item.email}</Td>
                    <Td>
                      {item.groupId === null ? '-' :
                        result && result.length > 0 ? result[0].name : 'Unknown Group'}
                    </Td>
                    <Td>
                      <Button size={'sm'}
                        leftIcon={<EditIcon />}
                        _hover={{ background: "white" }}
                        bgColor={'white'}
                        onClick={() => handleUserUpdateOpen(item.id)}>
                      </Button>
                    </Td>
                    <Td>
                      <Button size={'sm'}
                        leftIcon={<DeleteIcon
                          color={'#E75454'} />}
                        _hover={{ background: "white" }}
                        bgColor={'white'}
                        onClick={() => handleUserDeleteOpen(item.id)}>
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
      <UserUpdateModal
        isUserUpdateOpen={isUserUpdateOpen}
        onUserUpdateClose={onUserUpdateClose}
        registerUserUpdate={registerUserUpdate}
        handleUserUpdateSubmit={handleUserUpdateSubmit}
        onUserUpdateSubmit={onUserUpdateSubmit}
        isUserUpdateLoading={isUserUpdateLoading}
      />
      <UserDeleteModal
        isUserDeleteOpen={isUserDeleteOpen}
        onUserDeleteClose={onUserDeleteClose}
        isUserDeleteLoading={isUserDeleteLoading}
        userId={userId}
        refetchTable={refetch}
      />
    </>
  );
};

export default UserTable;
