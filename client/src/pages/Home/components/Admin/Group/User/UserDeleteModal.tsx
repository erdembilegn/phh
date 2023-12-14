import {
  Button,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { UserDeleteText } from '@libs/text';
import { UserDeleteModalProps } from '../../../../model';
import { DeleteUserApi } from '@utils/api';

const UserDeleteModal: React.FC<UserDeleteModalProps> = (props) => {
  const { isUserDeleteOpen, onUserDeleteClose, isUserDeleteLoading, refetchTable } = props;
  const toast = useToast({ position: 'top', duration: 9000 });
  const onUserDelete = async () => {
    try {
      const UserId = props.userId;
      const deleteUserApi = new DeleteUserApi();
      await deleteUserApi.deleteUser({ id: UserId });
      toast({
        status: 'success',
        title: 'Амжилттай устлаа',
        isClosable: true,
      });
      onUserDeleteClose();
      refetchTable();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <>
      <Modal isOpen={isUserDeleteOpen} onClose={onUserDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {UserDeleteText.name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <div className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(1,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{UserDeleteText.description}</Text>
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onUserDeleteClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {UserDeleteText.cancel}
                </Button>
                <Button
                  onClick={onUserDelete}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isUserDeleteLoading}
                >
                  {UserDeleteText.delete}
                </Button>
              </Flex>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserDeleteModal;
