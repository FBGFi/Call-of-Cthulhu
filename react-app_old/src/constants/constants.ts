const formatNumberToLength = (number: number, length: number): string => {
    let addZeroes = number.toString();
    for (let i = length; i > addZeroes.length; i--) {
        addZeroes = "0" + addZeroes;        
    }
    return addZeroes;
}

const getCookieValue = (name: string): string => {
    let cookies = document.cookie.split('; ');
    let splitCookie: string[];
    if (cookies.length > 1) {
        for (let cookie of cookies) {
            splitCookie = cookie.split(name + '=');
            if (splitCookie.length > 1) {
                return splitCookie[1].split(' ')[0];
            }
        }
    } else {
        cookies = document.cookie.split(name + '=');
        if (cookies.length === 2) {
            return cookies[1].split(' ')[0];
        }
    }
    return "";
}

export { formatNumberToLength, getCookieValue }