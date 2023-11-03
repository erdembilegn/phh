import React, { useEffect, useState } from 'react';
import { GetUserService } from '../..//libs/openapi';
import { Link, useNavigate } from 'react-router-dom';
import { Button,Menu, MenuItem, MenuButton, MenuList, ChakraProvider, Tab,Tabs, TabList, TabIndicator, TabPanel, TabPanels,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  CloseButton,
  Input,} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon} from '@chakra-ui/icons';
import { color } from 'framer-motion';

export const Home12: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setUserName] = useState('');
  const handleLogout= () => {
    navigate('/');
  };

  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleCreateClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    // Fetch the user's name from the backend API
    fetchUserNameFromDatabase();
  }, []);

  const fetchUserNameFromDatabase = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch the user's name
      const response = await fetch('http://localhost:8000/swagger-ui.html/#/');
      if (response.ok) {
        const data = await response.json();
        setUserName(data.firstName); // Assuming your API response contains the user's name
        console.log('AMjilttai');
      } else {
        console.error('Failed to fetch user name');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };



   return (
    <div>
      <header className='h-screen w-screen flex'>
          <picture className="logo">
            <img
              src="../photos/Logo.webp"
              width="50px"
              height='40px'
            />
          </picture>
          <h1>
            Leaderboard system
          </h1>
          {firstName && <div>Hello, {firstName}</div>}
        <div >
          <Menu>
            <MenuButton as={Button} leftIcon={<ChevronDownIcon/>} background={'#FFFFFF'}>
            </MenuButton>
            <MenuList bgColor={'#FFFFFF'}>
              <MenuItem as={Button} type='submit' onClick={handleLogout}>Гарах</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </header> 

      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Цол</Tab>
          <Tab>Урамшуулал</Tab>
          <Tab>Three</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <h1>Цолын жагсаалт</h1>
            <p>Цол</p>
            <Button type="submit" onClick={handleCreateClick} >
              Create
            </Button>
            {showForm && (
              <form>
                {/* Add your form elements here */}
                <label>
                  Field 1:
                  <Input/>
                </label>
                <CloseButton type="submit" onClick={handleCreateClose}>
                </CloseButton>
      
                {/* Add more form elements as needed */}
              </form>
            )}

            <TableContainer>
              <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>


          </TabPanel>
          <TabPanel>
            <p>Урамшуулал</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <nav className="head_menu">
          <ul>
            <li><a href="http://localhost:5173/12">Урамшууллын жагсаалт</a></li>
          </ul>
          <ul>
            <li><a href="http://localhost:5173/12">Тэргүүлэгчийн самбар</a></li>
          </ul>
          <section className="menu_bar"><i className="fa-solid fa-bars"></i></section>
        </nav>

        <div className='flex items-center justify-center content-center'>
        {/* <Button type='button' variant={'solid'}>
            Click me
        </Button> */}
        </div>
        
    </div>
  );
};



