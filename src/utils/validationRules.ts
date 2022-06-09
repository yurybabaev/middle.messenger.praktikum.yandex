export interface ValidationRule {
  regexp?: RegExp;
  required: boolean;
  errorMessage: string;
}

export const validationRules: Record<string, ValidationRule> = {
  email: {
    required: true,
    regexp: /^\S+@\S+\.\S+$/,
    errorMessage: 'Invalid email',
  },
  login: {
    required: true,
    regexp: /^(?=.{3,20}$)[a-z0-9_-]*[a-z][a-z0-9_-]*$/i,
    errorMessage: 'Invalid login',
  },
  firstName: {
    required: true,
    regexp: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    errorMessage: 'Invalid first name',
  },
  secondName: {
    required: true,
    regexp: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    errorMessage: 'Invalid second name',
  },
  phone: {
    required: true,
    regexp: /^[+]?[\d]{10,15}]*$/,
    errorMessage: 'Invalid phone',
  },
  password: {
    required: true,
    regexp: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/,
    errorMessage: 'Invalid password',
  },
  nickname: {
    required: true,
    regexp: /^(?=.{3,20}$)[a-z0-9_-]*[a-z][a-z0-9_-]*$/i,
    errorMessage: 'Invalid nickname',
  },
};
