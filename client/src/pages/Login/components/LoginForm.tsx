import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, Heading, Image, Input } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { loginText } from '@libs/text';
import { useState } from 'react';
import logo from '../../../libs/assets/logo.png';
import { LoginFormProps } from '../models';

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { register, handleSubmit, onSubmit, loading } = props;
  const [view, setView] = useState<boolean>(false);
  return (
    <Flex justify={'center'} backgroundColor={'#FFFFFF'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-[50%] [&>*]:my-4"
      >
        <Flex alignItems={'center'} gap={'4'}>
          <Image src={logo} w="36px" h="30px" />
          <Heading fontWeight={500} color={Colors.primary} fontSize={'26px'}>
            {loginText.text}
          </Heading>
        </Flex>
        <FormControl>
          <Input
            w={'full'}
            variant={'flushed'}
            type="email"
            placeholder={loginText.email}
            {...register('email', { required: true })}
          />
        </FormControl>
        <FormControl className="relative">
          <Input
            variant={'flushed'}
            type={view ? 'text' : 'password'}
            placeholder={loginText.password}
            w={'full'}
            {...register('password', { required: true })}
          />
          {!view ? (
            <ViewIcon
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setView(true)}
            />
          ) : (
            <ViewOffIcon
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setView(false)}
            />
          )}
        </FormControl>
        <Button type="submit" isLoading={loading} backgroundColor={Colors.primary} color={'white'}>
          {loginText.login}
        </Button>
      </form>
    </Flex>
  );
};

export default LoginForm;
