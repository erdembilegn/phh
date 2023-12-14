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
import { GroupDeleteText } from '@libs/text';
import { GroupDeleteModalProps } from '../../../../model';
import { DeleteGroupApi } from '@utils/api';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

const GroupDeleteModal: React.FC<GroupDeleteModalProps> = (props) => {
  const [userInfo] = useAtom(userInfoAtom);
  const { isGroupDeleteOpen, onGroupDeleteClose, isGroupDeleteLoading, refetchTable } = props;
  const toast = useToast({ position: 'top', duration: 9000 });
  const onGroupDelete = async () => {
    try {
      const groupId = props.groupId;
      const deleteGroupApi = new DeleteGroupApi();
      await deleteGroupApi.deleteGroup({ id: groupId,
      createdUser: userInfo.id });
      toast({
        status: 'success',
        title: 'Амжилттай устлаа',
        isClosable: true,
      });
      onGroupDeleteClose();
      refetchTable();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };
  return (
    <>
      <Modal isOpen={isGroupDeleteOpen} onClose={onGroupDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {GroupDeleteText.name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <div className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(1,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GroupDeleteText.description}</Text>
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onGroupDeleteClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {GroupDeleteText.cancel}
                </Button>
                <Button
                  onClick={onGroupDelete}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isGroupDeleteLoading}
                >
                  {GroupDeleteText.delete}
                </Button>
              </Flex>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupDeleteModal;
