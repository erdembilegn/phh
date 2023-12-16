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

import { AssessmentModalProps } from '../../../../model';
import { AssessmentModalText } from '@libs/text';

const AssessmentModal: React.FC<AssessmentModalProps> = (props) => {
  const {
    isAssessmentOpen,
    onAssessmentClose,
    registerAssessment,
    handleAssessmentSubmit,
    onAssessmentSubmit,
    isAssessmentLoading,
  } = props;
  return (
    <>
      <Modal isOpen={isAssessmentOpen} onClose={onAssessmentClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {AssessmentModalText.createAssessment}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form
              onSubmit={handleAssessmentSubmit(onAssessmentSubmit)}
              className="gap-y-2 flex flex-col"
            >
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{AssessmentModalText.AssessmentName}</Text>
                <Input
                  {...registerAssessment('name', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={AssessmentModalText.assessmentNamePlaceHolder}
                />
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onAssessmentClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {AssessmentModalText.cancel}
                </Button>
                <Button
                  onSubmit={handleAssessmentSubmit(onAssessmentSubmit)}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isAssessmentLoading}
                >
                  {AssessmentModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssessmentModal;
