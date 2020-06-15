console.log('pato');
const buttonSearch = document.querySelector("#login");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .logon a");

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide");
});

close.addEventListener("click", ()=>{
    modal.classList.add("hide");
})

