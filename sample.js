const { instance } = await WebAssembly.instantiateStreaming(fetch("./sample.wasm"));

const valueA = document.querySelector("#value-a");
const valueB = document.querySelector("#value-b");

document.querySelector("#action-calculate").addEventListener("click", () => {
    const a = parseInt(valueA.value) || 0;
    const b = parseInt(valueB.value) || 0;
    const result = instance?.exports?.add(a, b);
    alert(`${a} + ${b} = ${result}`);
});