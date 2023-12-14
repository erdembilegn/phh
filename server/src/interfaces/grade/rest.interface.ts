export interface RestCreateGrade {
    assessmentId: string,
    gamificationId: string,
    user:{
        userId: string,
        gradeNumber: number,
    }[],
    createdUser: string;
};

export interface RestGetGrade {
    userId: string,
    assessmentId: string,
    gamificationId: string,
};
