export function getPercentual(value, total) {
    // Armazena um valor percentual com 2 casas decimais ou 0.0 
    // caso seja um valor falsy.
    // O cálculo do percentual pode retornar falsy, especificamente 
    // um NaN, quando o divisor(total) for 0.
    // Na matemática uma divisão por zero possui um valor indeterminado
    const percentual = parseFloat((value / total).toFixed(2)) || 0.0
    return percentual
}