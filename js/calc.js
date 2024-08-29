const valueA = document.querySelector("#value-a");
const valueB = document.querySelector("#value-b");

const getValueA = () => parseInt(valueA.value) || 0;
const getValueB = () => parseInt(valueB.value) || 0;

const imports = {
   wasm: (await WebAssembly.instantiateStreaming(fetch("../wasm/import.wasm"))).instance?.exports,
   js: {
    result(v) { alert(`${getValueA()} + ${getValueB()} = ${v}`); }
   }
};

const wasm = await (async () => {
    const { instance } = await WebAssembly.instantiateStreaming(fetch("../wasm/calc.wasm"), imports);
    return instance?.exports;
})();

document.querySelector("#action-calculate").addEventListener("click", () => {
    wasm.calc(getValueA(), getValueB());
});