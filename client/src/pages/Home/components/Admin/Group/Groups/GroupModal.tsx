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

import { GroupModalProps } from '../../../../model';
import { GroupModalText } from '@libs/text';

const GroupModal: React.FC<GroupModalProps> = (props) => {
  const {
    isGroupOpen,
    onGroupClose,
    registerGroup,
    handleGroupSubmit,
    onGroupSubmit,
    isGroupLoading,
  } = props;
  return (
    <>
      <Modal isOpen={isGroupOpen} onClose={onGroupClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {GroupModalText.createGroup}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form onSubmit={handleGroupSubmit(onGroupSubmit)} className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GroupModalText.groupName}</Text>
                <Input
                  {...registerGroup('name', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={GroupModalText.groupNamePlaceHolder}
                />
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onGroupClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {GroupModalText.cancel}
                </Button>
                <Button
                  onSubmit={handleGroupSubmit(onGroupSubmit)}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isGroupLoading}
                >
                  {GroupModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
