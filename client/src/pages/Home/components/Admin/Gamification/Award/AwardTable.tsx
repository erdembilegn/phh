import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Grid, Heading, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchAward, useFetchUser } from '@libs/hooks';
import { AwardTableText } from '@libs/text';
import { format } from 'date-fns';
import { formatName } from '@utils/functions';
import AwardUpdateModal from './AwardUpdateModal';
import AwardDeleteModal from './AwardDeleteModal';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RankForm } from 'src/pages/Home/model';
import { CloudinaryEnv } from '@utils/const';
import axios from 'axios';
import { UpdateAwardApi } from '@utils/api';

const AwardTable: React.FC = () => {
  const { users } = useFetchUser();
  const { refetch, awards } = useFetchAward();
  const toast = useToast({ position: 'top' });
  const [awardId, setAwardId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAwardDeleteLoading] = useState<boolean>(false);
  const { isOpen: isAwardOpen, onOpen: onAwardOpen, onClose: onAwardClose } = useDisclosure();
  const { isOpen: isAwardDeleteOpen, onOpen: onAwardDeleteOpen, onClose: onAwardDeleteClose } = useDisclosure();
  const handleAwardOpen = (clickedAwardId: string) => {
    setAwardId(clickedAwardId);
    onAwardOpen();
  };

  const handleAwardDeleteOpen = (clickedAwardId: string) => {
    setAwardId(clickedAwardId);
    onAwardDeleteOpen();
  };
  const {
    register: registerAward,
    handleSubmit: handleAwardSubmit,
  } = useForm<RankForm>();
  console.log(awardId);
  const onAwardSubmit: SubmitHandler<RankForm> = async (data) => {
    const imageData = new FormData();
    imageData.append('file', data.image[0]);
    imageData.append('upload_preset', CloudinaryEnv.preset_key);
    setIsLoading(true);
    axios
      .post(`https://api.cloudinary.com/v1_1//${CloudinaryEnv.cloud_name}/image/upload`, imageData)
      .then((res) => {
        if (res.data) {
          new UpdateAwardApi()
            .updateAward({
              id: awardId,
              name: data.name,
              image: res.data.url,
            })
            .then((res) => {
              if (res.data) {
                toast({
                  status: 'success',
                  title: 'Амжилттай засагдлаа',
                  isClosable: true,
                });
                onAwardClose();
                refetch();
              }
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'something went wrong',
          description: err.message,
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {AwardTableText.heading}
        </Heading>
        <Text color={Colors.primary} marginTop={'10px'}
          fontStyle={'italic'} fontSize={'15px'}>{AwardTableText.description}</Text>
      </Grid>
      <TableContainer style={{ height: '400px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th>{AwardTableText.image}</Th>
              <Th>{AwardTableText.name}</Th>
              <Th>{AwardTableText.createdUser}</Th>
              <Th>{AwardTableText.createdDate}</Th>
              <Th>{AwardTableText.isActive}</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          {awards &&
            awards.map((item, index) => {
              const created = users?.filter((user) => user.id === item.createdUser);
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Image src={item.image} width={'35px'} height={'35px'} />
                    </Td>
                    <Td>{item.name}</Td>

                    {created?.map((user, _) => {
                      return (<Td>{formatName(user.firstName, user.lastName)}</Td>)
                    })}
                    <Td>{format(new Date(item.createdAt), 'yyyy-MM-dd')}</Td>
                    <Td><Button
                      colorScheme='#353D75'
                      variant='outline'
                      size={'sm'}
                      cursor={'default'} >{item.gamifications.length > 0 ? AwardTableText.active : AwardTableText.deactive}
                    </Button></Td>
                    <Td><Button
                      size={'sm'}
                      leftIcon={<EditIcon />}
                      _hover={{ background: "white" }}
                      bgColor={'white'}
                      onClick={() => handleAwardOpen(item.id)}>
                    </Button></Td>
                    <Td><Button
                      size={'sm'}
                      leftIcon={<DeleteIcon color={'#E75454'} />}
                      isDisabled={item.gamifications.length>0}
                      _hover={{ background: "white" }}
                      bgColor={'white'}
                      onClick={() => handleAwardDeleteOpen(item.id)}>
                    </Button></Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
      <AwardUpdateModal
        isAwardOpen={isAwardOpen}
        onAwardClose={onAwardClose}
        registerAward={registerAward}
        handleAwardSubmit={handleAwardSubmit}
        onAwardSubmit={onAwardSubmit}
        isAwardLoading={isLoading}
      />
      <AwardDeleteModal
        isAwardDeleteOpen={isAwardDeleteOpen}
        onAwardDeleteClose={onAwardDeleteClose}
        isAwardDeleteLoading={isAwardDeleteLoading}
        awardId={awardId}
        refetchTable={refetch}
      />
    </>
  );
};

export default AwardTable;
