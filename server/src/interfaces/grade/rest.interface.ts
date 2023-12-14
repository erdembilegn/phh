export interface RestCreateGrade {
    userId : string,
    assessmentId : string,
    gamificationId : string,
    gradeNumber : number,
};

export interface RestGetGrade {
    userId : string,
    assessmentId : string,
    gamificationId : string,
};
