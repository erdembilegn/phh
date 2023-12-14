import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { Table, TableContainer, Tbody, Td, Thead, Tr, Th, Grid, Heading, Badge, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { useFetchGamification, useFetchGroup } from '@libs/hooks';
import { GamificationTableText } from '@libs/text';
import { format, isPast } from 'date-fns';

const GamificationTable: React.FC = () => {
  const { gamifications } = useFetchGamification();
  const { getGroupNameById } = useFetchGroup();

  return (
    <>
      <Grid>
        <Heading color={Colors.primary} fontSize={'26px'}>
          {GamificationTableText.heading}
        </Heading>
      </Grid>
      <TableContainer style={{ height: '400px', position: 'relative' }} overflowY="auto" bgColor={'white'} marginTop={'15px'}>
        <Table overflowY={'auto'} style={{ position: 'relative' }}>
          <Thead bgColor={'#353D75'} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <Tr className="[&>th]:text-white">
              <Th>#</Th>
              <Th>{GamificationTableText.name}</Th>
              <Th>{GamificationTableText.beginDate}</Th>
              <Th>{GamificationTableText.endDate}</Th>
              <Th>{GamificationTableText.group}</Th>
              <Th>{GamificationTableText.status}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          {gamifications &&
            gamifications.map((item, index) => {
              const isOver = isPast(new Date(item.gamificationEndDate));
              return (
                <Tbody>
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.gamificationName}</Td>
                    <Td>{format(new Date(item.gamificationStartDate), 'yyyy-MM-dd')}</Td>
                    <Td>{format(new Date(item.gamificationEndDate), 'yyyy-MM-dd')}</Td>
                    <Td>{getGroupNameById(item.groupId)}</Td>
                    <Td>
                      <Badge colorScheme={isOver ? 'red' : 'green'}>
                        {isOver ? 'Дууссан' : 'Үргэлжилж буй'}
                      </Badge>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<DragHandleIcon />} size={'sm'} _hover={{ background: "white" }} bgColor={'white'}>
                        </MenuButton>
                        <MenuList width={"10px"}>
                          <MenuItem>Засах</MenuItem>
                          <MenuItem>Дэлгэрэнгүй</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                    {/* <Td><Button size={'sm'} leftIcon={<DragHandleIcon />} _hover={{ background: "white" }} bgColor={'white'}></Button></Td> */}
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
};

export default GamificationTable;
