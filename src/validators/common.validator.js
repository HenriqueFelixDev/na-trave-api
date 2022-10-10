import yup from 'yup'

export function validateDate() {
    return yup.date()
        .optional()
        .typeError('A data informada é inválida')
}