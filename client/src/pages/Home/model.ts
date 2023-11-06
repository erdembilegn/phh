import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export interface RankModalProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<RankForm>;
  onSubmit: SubmitHandler<RankForm>;
  handleSubmit: UseFormHandleSubmit<RankForm>;
  isLoading: boolean;
}

export interface RankForm {
  name: string;
  image: Blob[];
}
