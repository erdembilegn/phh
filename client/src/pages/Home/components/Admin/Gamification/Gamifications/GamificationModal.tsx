import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from '@chakra-ui/react';
import { Colors } from '@libs/colors';

import { GamificationModalProps } from '../../../../model';
import { GamificationModalText } from '@libs/text';
import { useFetchAssessment, useFetchAward, useFetchGroup } from '@libs/hooks';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import React, { useEffect} from 'react';

const GamificationModal: React.FC<GamificationModalProps> = (props) => {
  const {
    isGamificationOpen,
    onGamificationClose,
    registerGamification,
    handleGamificationSubmit,
    onGamificationSubmit,
    isGamificationLoading,
    setValue,
    getValue,
    trigger
  } = props;
  const { append, remove, update, fields } = useFieldArray({
    control: props.formControl,
    name: 'awards',
  });
  const {
    append: assessmentAppend,
    remove: assessmentRemove,
    update: updateAssessment,
    fields: assessmentFields,
  } = useFieldArray({
    control: props.formControl,
    name: 'assessments',
  });

  const watchAssessments = useWatch({
    control: props.formControl,
    name: 'assessments'
  });

  const { awards } = useFetchAward();
  const { assessments } = useFetchAssessment();
  const { groups } = useFetchGroup();

  useEffect(() => {
    trigger('assessments');
  }, [watchAssessments])

  const modalClose = () => {
    onGamificationClose();
  };

  useEffect(() => {
    if (awards && awards.length > 0 && awards[0].id) {
      update(0, {
        awardId: awards[0].id,
        min: 1,
        max: 1,
      });
    }
    if (assessments && assessments.length > 0 && assessments[0].id) {
      updateAssessment(0, {
        assessmentId: assessments[0].id,
        assessmentPercentage: 1,
      });
    }
  }, [awards, assessments]);

  return (
    <>
      <Modal isOpen={isGamificationOpen} onClose={() => modalClose()} isCentered size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size={'md'} color={Colors.primary}>
              {GamificationModalText.createGamification}
            </Heading>
          </ModalHeader>
          <ModalCloseButton color={Colors.primary} />
          <ModalBody>
            <form
              onSubmit={handleGamificationSubmit(onGamificationSubmit)}
              className="gap-y-3 flex flex-col"
            >
              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GamificationModalText.GamificationName}</Text>
                <Input
                  {...registerGamification('name', { required: true })}
                  borderColor={Colors.primary}
                  placeholder={GamificationModalText.GamificationNamePlaceHolder}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GamificationModalText.group}</Text>
                <Select
                  borderColor={Colors.primary}
                  {...registerGamification('groupId', { required: true })}
                >
                  {groups?.map((group, index) => (
                    <option key={index} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GamificationModalText.startDate}</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  
                  type="date"
                  {...registerGamification('startDate', { required: true })}
                  borderColor={Colors.primary}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GamificationModalText.endDate}</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"

                  {...registerGamification('endDate', { required: true })}
                  borderColor={Colors.primary}
                />
              </Grid>

              <Grid templateColumns={'repeat(2,1fr)'} alignItems={'center'}>
                <Text color={Colors.primary}>{GamificationModalText.assessmentNameInput}</Text>
                <Text color={Colors.primary}>{GamificationModalText.percentageOfAssessment}</Text>
              </Grid>
              <Grid marginBottom={"-5"}>
                <Text color={Colors.primary}
                  fontStyle={'italic'} fontSize={'15px'}>{GamificationModalText.assessmentDescription}</Text>
              </Grid>

              <Grid style={{ height: '80px' }} overflowY="auto">
                {assessmentFields.map((assessment, index) => (
                  <Grid
                    key={assessment.id}
                    templateColumns={'repeat(4,1fr)'}
                    alignItems={'center'}
                  >
                    {/* <Select
                      borderColor={Colors.primary}
                      {...registerGamification(`assessments.${index}.assessmentId`, {
                        required: true,
                      })}
                    >
                      {assessments?.map((assessment, index) => (
                        <option key={index} value={assessment.id}>
                          {assessment.assessmentName}
                        </option>
                      ))}
                    </Select> */}
                    <Select
                      borderColor={Colors.primary}
                      {...registerGamification(`assessments.${index}.assessmentId`, {
                        required: true,
                      })}
                    >
                      {assessments?.map((assessmentOption, optionIndex) => (
                        // Only render the option if it's not selected in any other assessment
                        !assessmentFields.some((a, i) => i !== index && a.assessmentId === assessmentOption.id) && (
                          <option key={optionIndex} value={assessmentOption.id}>
                            {assessmentOption.assessmentName}
                          </option>
                        )
                      ))}
                    </Select>
                    <Text>
                      {''}
                    </Text>

                    <Controller
                      control={props.formControl}
                      name={`assessments.${index}.assessmentPercentage`}
                      rules={
                        {
                          validate: (value) => {
                            const total = watchAssessments
                              .filter((_, i) => i !== index)
                              .map((e) => e.assessmentPercentage)
                              .reduce((accumulator, currentValue) => accumulator + currentValue,
                                0)
                            if (total + value > 100) return ">100";
                          }
                        }
                      }
                      render={({ field: {ref, onChange, onBlur, value }, fieldState: { error } }) =>
                        <FormControl isInvalid={Boolean(error)}>
                          <NumberInput
                            ref={ref}
                            min={0}
                            max={100}
                            size="md"
                            defaultValue={value}
                            onBlur={onBlur}
                            value={isNaN(value) ? 0 : value}
                            onChange={(_, value) => onChange(value)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                        </FormControl>
                      } />
                    <Box p="4">
                      {index === 0 ? (
                        <Button
                          onClick={() => {
                            assessmentAppend({
                              assessmentId: '11',
                              assessmentPercentage: 1,
                            });
                          }}
                          colorScheme="#353D75"
                          borderRadius="full"
                          variant="outline"
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            assessmentRemove(index);
                          }}
                          colorScheme="#353D75"
                          borderRadius="full"
                          variant="outline"
                        >
                          -
                        </Button>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>



              <Grid templateColumns={'repeat(4,1fr)'} alignItems={'center'} marginTop={"-15px"}>
                <Text color={Colors.primary}>{GamificationModalText.awardNameInput}</Text>
                <Text color={Colors.primary}>{GamificationModalText.minAward}</Text>
                <Text color={Colors.primary}>{GamificationModalText.maxAward}</Text>
              </Grid>

              <Grid style={{ height: '80px' }} overflowY="auto">
                {fields.map((award, index) => (
                  <Grid key={award.id} templateColumns={'repeat(4,2fr)'} alignItems={'center'}>
                    {/* <Select
                      borderColor={Colors.primary}
                      {...registerGamification(`awards.${index}.awardId`, { required: true })}
                    >
                      {awards?.map((award, index) => (
                        <option key={index} value={award.id}>
                          {award.name}
                        </option>
                      ))}
                    </Select> */}
                    <Select
                      borderColor={Colors.primary}
                      {...registerGamification(`awards.${index}.awardId`, { required: true })}
                    >
                      {awards?.map((awardOption, optionIndex) => (
                        // Only render the option if it's not selected in any other award
                        !fields.some((a, i) => i !== index && a.awardId === awardOption.id) && (
                          <option key={optionIndex} value={awardOption.id}>
                            {awardOption.name}
                          </option>
                        )
                      ))}
                    </Select>
                    <NumberInput
                      defaultValue={award.min}
                      min={0}
                      max={100}
                      size="md"
                      onChange={(_, value) => setValue(`awards.${index}.min`, value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      defaultValue={award.max}
                      min={0}
                      max={100}
                      size="md"
                      onChange={(_, value) => setValue(`awards.${index}.max`, value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Box p="4">
                      {index === 0 ? (
                        <Button
                          onClick={() => {
                            const prev = fields.length < 2 ? 0 : fields.length - 1;
                            append({
                              awardId: '11',
                              min: getValue(`awards.${prev}.max`) + 1,
                              max: getValue(`awards.${prev}.max`) + 2,
                            });
                          }}
                          colorScheme="#353D75"
                          borderRadius="full"
                          variant="outline"
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            console.log('IDX', index);
                            remove(index);
                          }}
                          colorScheme="#353D75"
                          borderRadius="full"
                          variant="outline"
                        >
                          -
                        </Button>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Flex w="full" justifyContent={'space-evenly'} marginY={'20px'}>
                <Button
                  onClick={onGamificationClose}
                  variant={'outline'}
                  color={Colors.primary}
                  borderColor={Colors.primary}
                >
                  {GamificationModalText.cancel}
                </Button>
                <Button
                  onSubmit={handleGamificationSubmit(onGamificationSubmit)}
                  type="submit"
                  backgroundColor={Colors.primary}
                  color={'white'}
                  isLoading={isGamificationLoading}
                >
                  {GamificationModalText.create}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GamificationModal;
