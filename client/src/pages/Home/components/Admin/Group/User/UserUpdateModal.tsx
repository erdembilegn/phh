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
    Select,
    Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';
import { UserUpdateText } from '@libs/text';
import { UserUpdateModalProps } from '../../../../model';
import { useState } from 'react';
import { Role } from '@utils/api';
import { useFetchGroup } from '@libs/hooks';

const UserUpdateModal: React.FC<UserUpdateModalProps> = (props) => {
    const [role, setRole] = useState<string>(Role.Admin)
    const { groups } = useFetchGroup();
    const { isUserUpdateOpen, onUserUpdateClose, registerUserUpdate, handleUserUpdateSubmit, onUserUpdateSubmit, isUserUpdateLoading } = props;
    return (
        <>
            <Modal isOpen={isUserUpdateOpen} onClose={onUserUpdateClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size={'md'} color={Colors.primary}>
                            {UserUpdateText.name}
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton color={Colors.primary} />
                    <ModalBody>
                        <form onSubmit={handleUserUpdateSubmit(onUserUpdateSubmit)} className="gap-y-2 flex flex-col">
                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.lastName}</Text>
                                <Input
                                    {...registerUserUpdate('lastName', { required: true })}
                                    borderColor={Colors.primary}
                                    placeholder={UserUpdateText.userNamePlaceHolder}
                                />
                            </Grid>

                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.firstName}</Text>
                                <Input
                                    {...registerUserUpdate('firstName', { required: true })}
                                    borderColor={Colors.primary}
                                    placeholder={UserUpdateText.userFirstNamePlaceHolder}
                                />
                            </Grid>

                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.email}</Text>
                                <Input
                                    {...registerUserUpdate('email', { required: true })}
                                    borderColor={Colors.primary}
                                    placeholder={UserUpdateText.userEmailPlaceHolder}
                                />
                            </Grid>

                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.password}</Text>
                                <Input
                                    {...registerUserUpdate('password', { required: true })}
                                    borderColor={Colors.primary}
                                    placeholder={UserUpdateText.userPasswordPlaceHolder}
                                />
                            </Grid>

                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.role}</Text>
                                <Select onClick={(e) => setRole(e.currentTarget.value)} borderColor={Colors.primary} {...registerUserUpdate('role', { required: true })}>
                                    <option value={Role.Admin}>{Role.Admin}</option>

                                    <option value={Role.Teacher}>{Role.Teacher}</option>

                                    <option value={Role.Student}>{Role.Student}</option>
                                </Select>
                            </Grid>

                            <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                                <Text color={Colors.primary}>{UserUpdateText.groupId}</Text>
                                <Select
                                    disabled={role === Role.Admin}
                                    borderColor={Colors.primary}
                                    {...registerUserUpdate('groupId')}
                                >
                                    {!(role === Role.Admin) && groups?.map((group, index) => (
                                        <option key={index} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>

                            <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                                <Button
                                    onClick={onUserUpdateClose}
                                    variant={'outline'}
                                    color={Colors.primary}
                                    borderColor={Colors.primary}
                                >
                                    {UserUpdateText.cancel}
                                </Button>
                                <Button
                                    onSubmit={handleUserUpdateSubmit(onUserUpdateSubmit)}
                                    type="submit"
                                    backgroundColor={Colors.primary}
                                    color={'white'}
                                    isLoading={isUserUpdateLoading}
                                >
                                    {UserUpdateText.update}
                                </Button>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserUpdateModal;
