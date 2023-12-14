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
    Text,
  } from '@chakra-ui/react';
  import { Colors } from '@libs/colors';
  import { AssessmentUpdateText } from '@libs/text';
  import { AssessmentUpdateModalProps } from '../../../../model';

  const AssessmentUpdateModal: React.FC<AssessmentUpdateModalProps> = (props) => {
    const { isAssessmentUpdateOpen, onAssessmentUpdateClose, registerAssessmentUpdate, handleAssessmentUpdateSubmit, onAssessmentUpdateSubmit, isAssessmentUpdateLoading } = props;
    return (
      <>
        <Modal isOpen={isAssessmentUpdateOpen} onClose={onAssessmentUpdateClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size={'md'} color={Colors.primary}>
                {AssessmentUpdateText.name}
              </Heading>
            </ModalHeader>
            <ModalCloseButton color={Colors.primary} />
            <ModalBody>
              <form onSubmit={handleAssessmentUpdateSubmit(onAssessmentUpdateSubmit)} className="gap-y-2 flex flex-col">
                <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                  <Text color={Colors.primary}>{AssessmentUpdateText.assessmentName}</Text>
                  <Input
                    {...registerAssessmentUpdate('name', { required: true })}
                    borderColor={Colors.primary}
                    placeholder={AssessmentUpdateText.placeHolder}
                  />
                </Grid>
                
                <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                  <Button
                    onClick={onAssessmentUpdateClose}
                    variant={'outline'}
                    color={Colors.primary}
                    borderColor={Colors.primary}
                  >
                    {AssessmentUpdateText.cancel}
                  </Button>
                  <Button
                    onSubmit={handleAssessmentUpdateSubmit(onAssessmentUpdateSubmit)}
                    type="submit"
                    backgroundColor={Colors.primary}
                    color={'white'}
                    isLoading={isAssessmentUpdateLoading}
                  >
                    {AssessmentUpdateText.update}
                  </Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AssessmentUpdateModal;
  