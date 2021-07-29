const formatNumberToLength = (number: number, length: number): string => {
    let addZeroes = number.toString();
    for (let i = length; i > addZeroes.length; i--) {
        addZeroes = "0" + addZeroes;        
    }
    return addZeroes;
}

export { formatNumberToLength }