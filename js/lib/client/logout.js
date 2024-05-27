function logout(){
    location.href="../index.html";
}

addEventListener("beforeunload", (event) => {
    logout();
});