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
  import { AssessmentDeleteText } from '@libs/text';
  import { AssessmentDeleteModalProps } from '../../../../model';
  import { DeleteAssessmentApi } from '@utils/api';

  const AssessmentDeleteModal: React.FC<AssessmentDeleteModalProps> = (props) => {
    const { isAssessmentDeleteOpen, onAssessmentDeleteClose, isAssessmentDeleteLoading, refetchTable } = props;
    const toast = useToast({ position: 'top', duration: 9000 });
    const onAssessmentDelete = async () => {
      try {
        const assessmentId = props.assessmentId; 
        const deleteAssessmentApi = new DeleteAssessmentApi();
        await deleteAssessmentApi.deleteAssessment({ id: assessmentId });
        toast({
          status: 'success',
          title: 'Амжилттай устлаа',
          isClosable: true,
        });
        onAssessmentDeleteClose();
        refetchTable();
      } catch (error) {
        console.error('Error deleting assessment:', error);
      }
    };
    return (
      <>
        <Modal isOpen={isAssessmentDeleteOpen} onClose={onAssessmentDeleteClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size={'md'} color={Colors.primary}>
                {AssessmentDeleteText.name}
              </Heading>
            </ModalHeader>
            <ModalCloseButton color={Colors.primary} />
            <ModalBody>
              <div className="gap-y-2 flex flex-col">
                <Grid templateColumns={'repeat(1,1fr)'} alignItems={'center'}>
                  <Text color={Colors.primary}>{AssessmentDeleteText.description}</Text>
                </Grid>
                
                <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                  <Button
                    onClick={onAssessmentDeleteClose}
                    variant={'outline'}
                    color={Colors.primary}
                    borderColor={Colors.primary}
                  >
                    {AssessmentDeleteText.cancel}
                  </Button>
                  <Button
                    onClick={onAssessmentDelete}
                    type="submit"
                    backgroundColor={Colors.primary}
                    color={'white'}
                    isLoading={isAssessmentDeleteLoading}
                  >
                    {AssessmentDeleteText.delete}
                  </Button>
                </Flex>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AssessmentDeleteModal;
  