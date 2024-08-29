const valueA = document.querySelector("#value-a");
const valueB = document.querySelector("#value-b");

const getValueA = () => parseInt(valueA.value) || 0;
const getValueB = () => parseInt(valueB.value) || 0;

// WASMからJSへのコールバック関数を定義
const imports = {
    js: {
        result(v) { alert(`${getValueA()} + ${getValueB()} = ${v}`); }
    }
}

const wasm = await (async () => {
    // インスタンス生成時にコールバック関数を渡す
    const { instance } = await WebAssembly.instantiateStreaming(fetch("../wasm/alert.wasm"), imports);
    return instance?.exports;
})();


document.querySelector("#action-calculate").addEventListener("click", () => {
    wasm.add(getValueA(), getValueB());
});