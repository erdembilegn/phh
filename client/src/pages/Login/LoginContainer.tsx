import { Flex, Grid, Image, useToast } from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { GetUserApi, RestGetUser } from '@utils/api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginLogo from '../../libs/assets/loginLogo.png';
import LoginForm from './components/LoginForm';

const LoginContainer: React.FC = () => {
  const toast = useToast({ position: 'top' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<RestGetUser>();

  const onSubmit: SubmitHandler<RestGetUser> = (data) => {
    setLoading(true);
    const id = new Promise((resolve, reject) => {
      new GetUserApi()
        .getUser(data, { withCredentials: true })
        .then((res) => {
          resolve(res.data.data);
          navigate('/');
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
    toast.promise(id, {
      success: { title: 'Login successful', description: 'Redirecting...' },
      error: { title: 'Login failed', description: 'Please try again' },
      loading: { title: 'Logging in', description: 'Please wait...' },
    });
  };

  return (
    <Grid templateRows="1fr" templateColumns="1.8fr 1.2fr" className="w-screen h-screen">
      <Flex
        w={'full'}
        h={'full'}
        justify={'center'}
        alignItems={'center'}
        backgroundColor={Colors.secondary}
      >
        <Image src={loginLogo} w={'full'} />
      </Flex>
      <LoginForm
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </Grid>
  );
};

export default LoginContainer;
