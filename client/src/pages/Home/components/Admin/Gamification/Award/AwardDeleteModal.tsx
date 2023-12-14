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
import { AwardDeleteText } from '@libs/text';
import { RankDeleteModalProps } from '../../../../model';
import { DeleteAwardApi } from '@utils/api';
import { userInfoAtom } from '@libs/jotai';
import { useAtom } from 'jotai';

const AwardDeleteModal: React.FC<RankDeleteModalProps> = (props) => {
  const [userInfo] = useAtom(userInfoAtom);
  const { isAwardDeleteOpen, onAwardDeleteClose, isAwardDeleteLoading, refetchTable } = props;
  const toast = useToast({ position: 'top', duration: 9000 });
  const onAwardDelete = async () => {
    try {
      const awardId = props.awardId;
      const deleteAwardApi = new DeleteAwardApi();
      await deleteAwardApi.deleteAward({ id: awardId, 
        createdUser: userInfo.id, });
      toast({
        status: 'success',
        title: 'Амжилттай устлаа',
        isClosable: true,
      });
      onAwardDeleteClose();
      refetchTable();
    } catch (error) {
      console.error('Error deleting award:', error);
    }
  };
  return (
    <>
      <Modal isOpen={isAwardDeleteOpen} onClose={onAwardDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {AwardDeleteText.name}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <div className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(1,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{AwardDeleteText.description}</Text>
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onAwardDeleteClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {AwardDeleteText.cancel}
                </Button>
                <Button
                  onClick={onAwardDelete}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isAwardDeleteLoading}
                >
                  {AwardDeleteText.delete}
                </Button>
              </Flex>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AwardDeleteModal;
