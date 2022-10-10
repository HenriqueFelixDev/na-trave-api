import yup from 'yup'

function validateName() {
    return yup.string()
        .required('O nome é obrigatório')
        .trim('O nome não pode ser vazio')
        .min(3, ({min}) => `O nome deve ter pelo menos ${min} caractere(s)`)
        .max(128, ({max}) => `O nome deve ter no máximo ${max} caractere(s)`)
        .matches(/^[a-zA-ZÀ-Úà-ú\s]+$/gu, 'O nome deve ter apenas letras e espaços')
}

function validateUsername() {
    return yup.string()
        .required('O nome de usuário é obrigatório')
        .min(3, ({min}) => `O nome de usuário deve ter pelo menos ${min} caractere(s)`)
        .max(32, ({max}) => `O nome de usuário deve ter no máximo ${max} caractere(s)`)
        .matches(/^[a-zA-ZÀ-Úà-ú0-9_]+$/gu, 'O nome de usuário deve ter apenas letras, números e underlines')
}

function validateEmail() {
    return yup.string()
        .required('O nome de usuário é obrigatório')
        .email('O e-mail informado é inválido')
}

function validatePassword() {
    return yup.string()
        .required('A senha é obrigatória')
        .trim('A senha não pode ser vazia')
        .min(6, ({min}) => `A senha deve ter pelo menos ${min} caractere(s)`)
        .max(255, ({max}) => `A senha deve ter no máximo ${max} caractere(s)`)
}

export const userCreated = {
    name: validateName(),
    username: validateUsername(),
    email: validateEmail(),
    password: validatePassword()
}