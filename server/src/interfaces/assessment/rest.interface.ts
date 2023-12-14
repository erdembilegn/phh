export interface RestCreateAssessment {
  assessmentName: string;
  createdUser: string;
}

export interface RestUpdateAssessment {
  id : string;
  assessmentName?: string;
  createdUser: string;
}

export interface RestDeleteAssessment {
  id : string;
  createdUser: string;
}