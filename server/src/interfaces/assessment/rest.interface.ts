export interface RestCreateAssessment {
  assessmentName: string;
  createdUser: string;
}

export interface RestUpdateAssessment {
  id : string;
  assessmentName?: string;
}

export interface RestDeleteAssessment {
  id : string;
}