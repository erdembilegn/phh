import {
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';

import { UserModalProps } from '../../../../model';
import { UserModalText } from '@libs/text';

import { Role } from '@utils/api';
import { useFetchGroup } from '@libs/hooks';
import { useState } from 'react';

const UserModal: React.FC<UserModalProps> = (props) => {
  const [role, setRole] = useState<string>(Role.Admin)
  const { groups } = useFetchGroup();
  const { isUserOpen, onUserClose, registerUser, handleUserSubmit, onUserSubmit, isUserLoading } =
    props;
  return (
    <>
      <Modal isOpen={isUserOpen} onClose={onUserClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {UserModalText.createUser}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form onSubmit={handleUserSubmit(onUserSubmit)} className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.lastName}</Text>
                <Input
                  {...registerUser('lastName', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userNamePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.firstName}</Text>
                <Input
                  {...registerUser('firstName', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userFirstNamePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.email}</Text>
                <Input
                  {...registerUser('email', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userEmailPlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.password}</Text>
                <Input
                  {...registerUser('password', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={UserModalText.userPasswordPlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.role}</Text>
                <Select onClick={(e) => setRole(e.currentTarget.value)} borderColor={Colors.primary} {...registerUser('role', { required: true })}>
                  <option value={Role.Admin}>{Role.Admin}</option>

                  <option value={Role.Teacher}>{Role.Teacher}</option>

                  <option value={Role.Student}>{Role.Student}</option>
                </Select>
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserModalText.groupId}</Text>
                <Select
                  disabled={role === Role.Admin}
                  borderColor={Colors.primary}
                  {...registerUser('groupId')}
                >
                  {!(role === Role.Admin) && groups?.map((group, index) => (
                    <option key={index} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onUserClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {UserModalText.cancel}
                </Button>
                <Button
                  onClick={() => {
                    handleUserSubmit(onUserSubmit)
                    console.log('clicked')
                  }}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isUserLoading}
                >
                  {UserModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
