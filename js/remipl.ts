function toUpperCase(str: string): string {
    let newStr = '';

    const len = str.length;
    for (let ptr = 0; ptr < len; ptr++) {
        const c = str.charCodeAt(ptr);
        newStr += String.fromCharCode(c >= 97 && c <= 122 ? c - 32 : c);
    }
    return newStr;
}

console.log(toUpperCase('hello world')); // HELLO WORLD