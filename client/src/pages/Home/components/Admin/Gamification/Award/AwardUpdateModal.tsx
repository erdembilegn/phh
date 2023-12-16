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
  import { AwardUpdateText } from '@libs/text';
  import { RankUpdateModalProps } from '../../../../model';

  const AwardUpdateModal: React.FC<RankUpdateModalProps> = (props) => {
    const { isAwardOpen, onAwardClose, registerAward, handleAwardSubmit, onAwardSubmit, isAwardLoading } = props;
    return (
      <>
        <Modal isOpen={isAwardOpen} onClose={onAwardClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size={'md'} color={Colors.primary}>
                {AwardUpdateText.updateRank}
              </Heading>
            </ModalHeader>
            <ModalCloseButton color={Colors.primary} />
            <ModalBody>
              <form onSubmit={handleAwardSubmit(onAwardSubmit)} className="gap-y-2 flex flex-col">
                <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                  <Text color={Colors.primary}>{AwardUpdateText.awardName}</Text>
                  <Input
                    {...registerAward('name', { required: true })}
                    borderColor={Colors.primary}
                    placeholder={AwardUpdateText.rankNamePlaceHolder}
                  />
                </Grid>
                <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                  <Text color={Colors.primary}>{AwardUpdateText.image}</Text>
                  <Input {...registerAward('image')} borderColor={Colors.primary} type="file" />
                </Grid>
                <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                  <Button
                    onClick={onAwardClose}
                    variant={'outline'}
                    color={Colors.primary}
                    borderColor={Colors.primary}
                  >
                    {AwardUpdateText.cancel}
                  </Button>
                  <Button
                    onSubmit={handleAwardSubmit(onAwardSubmit)}
                    type="submit"
                    backgroundColor={Colors.primary}
                    color={'white'}
                    isLoading={isAwardLoading}
                  >
                    {AwardUpdateText.update}
                  </Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AwardUpdateModal;
  