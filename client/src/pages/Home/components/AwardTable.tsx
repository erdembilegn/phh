import { Image, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useFetchAward } from '@libs/hooks';

const AwardTable: React.FC = () => {
  const { awards } = useFetchAward();

  return (
    <>
      <TableContainer>
        <Table overflowY={'auto'}>
          {awards &&
            awards.map((item, index) => {
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>
                      <Image src={item.image} width={'35px'} height={'35px'} />
                    </Td>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
        ;
      </TableContainer>
    </>
  );
};

export default AwardTable;
