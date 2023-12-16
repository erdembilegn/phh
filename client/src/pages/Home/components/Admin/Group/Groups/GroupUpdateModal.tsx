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
  import { GroupUpdateText } from '@libs/text';
  import { GroupUpdateModalProps } from '../../../../model';

  const GroupUpdateModal: React.FC<GroupUpdateModalProps> = (props) => {
    const { isGroupUpdateOpen, onGroupUpdateClose, registerGroupUpdate, handleGroupUpdateSubmit, onGroupUpdateSubmit, isGroupUpdateLoading } = props;
    return (
      <>
        <Modal isOpen={isGroupUpdateOpen} onClose={onGroupUpdateClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size={'md'} color={Colors.primary}>
                {GroupUpdateText.name}
              </Heading>
            </ModalHeader>
            <ModalCloseButton color={Colors.primary} />
            <ModalBody>
              <form onSubmit={handleGroupUpdateSubmit(onGroupUpdateSubmit)} className="gap-y-2 flex flex-col">
                <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                  <Text color={Colors.primary}>{GroupUpdateText.groupName}</Text>
                  <Input
                    {...registerGroupUpdate('name', { required: true })}
                    borderColor={Colors.primary}
                    placeholder={GroupUpdateText.placeHolder}
                  />
                </Grid>
                
                <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                  <Button
                    onClick={onGroupUpdateClose}
                    variant={'outline'}
                    color={Colors.primary}
                    borderColor={Colors.primary}
                  >
                    {GroupUpdateText.cancel}
                  </Button>
                  <Button
                    onSubmit={handleGroupUpdateSubmit(onGroupUpdateSubmit)}
                    type="submit"
                    backgroundColor={Colors.primary}
                    color={'white'}
                    isLoading={isGroupUpdateLoading}
                  >
                    {GroupUpdateText.update}
                  </Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default GroupUpdateModal;
  