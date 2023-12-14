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
import { RankModalText } from '@libs/text';
import { RankModalProps } from '../../../../model';

const RankModal: React.FC<RankModalProps> = (props) => {
  const { isOpen, onClose, register, handleSubmit, onSubmit, isLoading } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {RankModalText.createRank}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="gap-y-2 flex flex-col">
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{RankModalText.rankName}</Text>
                <Input
                  {...register('name', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={RankModalText.rankNamePlaceHolder}
                />
              </Grid>
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{RankModalText.image}</Text>
                <Input {...register('image')} borderColor={Colors.primary} type="file" />
              </Grid>
              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {RankModalText.cancel}
                </Button>
                <Button
                  onSubmit={handleSubmit(onSubmit)}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isLoading}
                >
                  {RankModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RankModal;
