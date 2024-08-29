function toUpperCase(str: string){
    let newStr = "";
    let start = 0;
    let end = 16;
    while(end <= str.length) {
        newStr += str.slice(start, end).split("").map(c => {
            const code = c.charCodeAt(0);
            return String.fromCharCode(((code >= 97 && code <= 122) ? 32 : 0) ^code);
        }).join("");
        start = end;
        end += 16;
    }
    return newStr;
}

console.log(toUpperCase("hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 hello 世界 "));