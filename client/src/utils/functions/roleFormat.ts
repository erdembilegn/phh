enum Role {
  student = 'Суралцагч',
  teacher = 'Багш',
  admin = 'Админ',
}

export const roleName = (role: string): string => {
  switch (role) {
    case 'Admin' || 'admin':
      return Role.admin;
    case 'Teacher' || 'teacher':
      return Role.teacher;
    default:
      return Role.student;
  }
};
