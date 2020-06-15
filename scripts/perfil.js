const buttonSearch = document.querySelector("#CadastrarHistoria");
const modal = document.querySelector("#modalHistoria");
const close = document.querySelector("#modalHistoria a");

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
});

close.addEventListener("click", ()=>{
    modal.classList.add("hide");
})

const buttonSearch2 = document.querySelector("#redefinirSenha");
const modal2 = document.querySelector("#modalSenha");
const close2 = document.querySelector("#modalSenha a");

buttonSearch2.addEventListener("click", () => {
    modal2.classList.remove("hide");
});

close2.addEventListener("click", ()=>{
    modal2.classList.add("hide");
})