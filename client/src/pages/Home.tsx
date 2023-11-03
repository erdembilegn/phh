import React from 'react';
import { GetUserService } from '../..//libs/openapi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Input,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  CloseButton,
} from '@chakra-ui/react';
import { color } from 'framer-motion';

import { Flex, Box, Text, InputRightElement } from "@chakra-ui/react";
import { FormControl, InputGroup } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { LoginPage } from "../data/globalData";

import { FormInput, Submit, Form } from  '../themes/customComponent';



export const Home: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = e.currentTarget.email.value;
    const password  = e.currentTarget.password.value;

    try {
      const response = await GetUserService.getUserById(email, password);
      console.log(response);
      if (response.data) {
        navigate('/12');
      }
        // Display a Chakra UI alert if response does not contain data
        else {
          // Show the alert
          setShowAlert(true);
        }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex justify="center" align="center" w="100vw" h="100vh">
        <Flex
          bg="loginForm"
          w={{ xl: "30%", lg: "40%", md: "50%", sm: "30em" }}
          h="60%"
          rounded="md"
          justify="center"
          align="center"
          shadow="lg"
          
        >
          <Form
            as="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
          >
            <Box
              borderBottom="10px solid"
              fontWeight="bold"
              borderColor="#3D6CB9"
              
            >
              <Text fontSize="4xl" color='#3D6CB9' display="inline">
                {LoginPage.title}
              </Text>
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color='#33425B'
                display="inline"
              >
                {LoginPage.subTitle}
              </Text>
            </Box>

            <FormControl isRequired>
              <FormInput
                type="email"
                variant="flushed"
                placeholder="email address"
                color='#3D6CB9'
              />
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <FormInput
                  type={isOpen ? "text" : "password"}
                  variant="flushed"
                  placeholder="password"
                  color='#3D6CB9'
                />
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {!isOpen ? (
                    <ViewIcon w={5} h={5} />
                  ) : (
                    <ViewOffIcon w={5} h={5} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Submit type="submit" >
              LOGIN
            </Submit>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

