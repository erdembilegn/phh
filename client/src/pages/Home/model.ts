import {
  Control,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

export interface RankModalProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<RankForm>;
  onSubmit: SubmitHandler<RankForm>;
  handleSubmit: UseFormHandleSubmit<RankForm>;
  isLoading: boolean;
}

export interface RankForm {
  id?: string;
  name: string;
  image: Blob[];
}

export interface RankUpdateModalProps {
  isAwardOpen: boolean;
  onAwardClose: () => void;
  registerAward: UseFormRegister<RankForm>;
  onAwardSubmit: SubmitHandler<RankForm>;
  handleAwardSubmit: UseFormHandleSubmit<RankForm>;
  isAwardLoading: boolean;
}

export interface RankDeleteModalProps {
  isAwardDeleteOpen: boolean;
  onAwardDeleteClose: () => void;
  isAwardDeleteLoading: boolean;
  awardId : string;
  refetchTable : () => void;
}

export interface AssessmentModalProps {
  isAssessmentOpen: boolean;
  onAssessmentClose: () => void;
  registerAssessment: UseFormRegister<AssessmentForm>;
  onAssessmentSubmit: SubmitHandler<AssessmentForm>;
  handleAssessmentSubmit: UseFormHandleSubmit<AssessmentForm>;
  isAssessmentLoading: boolean;
}

export interface AssessmentForm {
  name: string;
}

export interface AssessmentUpdateModalProps {
  isAssessmentUpdateOpen: boolean;
  onAssessmentUpdateClose: () => void;
  registerAssessmentUpdate: UseFormRegister<AssessmentForm>;
  onAssessmentUpdateSubmit: SubmitHandler<AssessmentForm>;
  handleAssessmentUpdateSubmit: UseFormHandleSubmit<AssessmentForm>;
  isAssessmentUpdateLoading: boolean;
}

export interface AssessmentDeleteModalProps {
  isAssessmentDeleteOpen: boolean;
  onAssessmentDeleteClose: () => void;
  isAssessmentDeleteLoading: boolean;
  assessmentId : string;
  refetchTable : () => void;
}

export interface GamificationModalProps {
  isGamificationOpen: boolean;
  onGamificationClose: () => void;
  registerGamification: UseFormRegister<GamificationForm>;
  onGamificationSubmit: SubmitHandler<GamificationForm>;
  handleGamificationSubmit: UseFormHandleSubmit<GamificationForm>;
  formControl: Control<GamificationForm>;
  setValue: UseFormSetValue<GamificationForm>;
  getValue: UseFormGetValues<GamificationForm>;
  trigger: UseFormTrigger<GamificationForm>;
  isGamificationLoading: boolean;
}

export interface GamificationForm {
  name: string;
  startDate: string;
  endDate: string;
  groupId: string;
  awards: {
    awardId: string;
    min: number;
    max: number;
  }[];
  assessments: {
    assessmentId: string;
    assessmentPercentage: number;
  }[];
}

export interface GradeModalProps {
  isGradeOpen: boolean;
  onGradeClose: () => void;
  registerGrade: UseFormRegister<GradeForm>;
  onGradeSubmit: SubmitHandler<GradeForm>;
  handleGradeSubmit: UseFormHandleSubmit<GradeForm>;
  formControl: Control<GradeForm>;
  setValue: UseFormSetValue<GradeForm>;
  isGradeLoading: boolean;
}

export interface GradeForm {
  values: {
    gradeNumber: number;
    userId: string;
    gamificationId: string;
    assessmentId: string;
  }[];
}

export interface GroupModalProps {
  isGroupOpen: boolean;
  onGroupClose: () => void;
  registerGroup: UseFormRegister<GroupForm>;
  onGroupSubmit: SubmitHandler<GroupForm>;
  handleGroupSubmit: UseFormHandleSubmit<GroupForm>;
  formControl: Control<GroupForm>;
  isGroupLoading: boolean;
}

export interface GroupForm {
  name: string;
}

export interface GroupUpdateModalProps {
  isGroupUpdateOpen: boolean;
  onGroupUpdateClose: () => void;
  registerGroupUpdate: UseFormRegister<GroupForm>;
  onGroupUpdateSubmit: SubmitHandler<GroupForm>;
  handleGroupUpdateSubmit: UseFormHandleSubmit<GroupForm>;
  isGroupUpdateLoading: boolean;
}

export interface GroupDeleteModalProps {
  isGroupDeleteOpen: boolean;
  onGroupDeleteClose: () => void;
  isGroupDeleteLoading: boolean;
  groupId : string;
  refetchTable : () => void;
}

export interface UserModalProps {
  isUserOpen: boolean;
  onUserClose: () => void;
  registerUser: UseFormRegister<UserForm>;
  onUserSubmit: SubmitHandler<UserForm>;
  handleUserSubmit: UseFormHandleSubmit<UserForm>;
  formControl: Control<UserForm>;
  isUserLoading: boolean;
}

export enum Role {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin',
}

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  groupId: string | null;
  role: Role;
}

export interface UserUpdateModalProps {
  isUserUpdateOpen: boolean;
  onUserUpdateClose: () => void;
  registerUserUpdate: UseFormRegister<UserForm>;
  onUserUpdateSubmit: SubmitHandler<UserForm>;
  handleUserUpdateSubmit: UseFormHandleSubmit<UserForm>;
  isUserUpdateLoading: boolean;
}

export interface UserDeleteModalProps {
  isUserDeleteOpen: boolean;
  onUserDeleteClose: () => void;
  isUserDeleteLoading: boolean;
  userId : string;
  refetchTable : () => void;
}