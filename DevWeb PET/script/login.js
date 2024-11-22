const url = 'https://go-wash-api.onrender.com/api/login';
async function loginUsuario(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    //(Caso o professor quiser uma validação com JS, é só ativar esse campo de código abaixo)
    // if (!email || !password) {
    //     return alert("Todos os campos devem ser preenchidos.");
    // }
    
    let api = await fetch(url, {
        method : "POST",
        body : JSON.stringify({
            "email" : email,
            "user_type_id" : 1,
            "password" : password
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if(api.ok){
        let resposta = await api.json();
        localStorage.setItem("user", JSON.stringify(resposta))
        console.log(resposta)
        window.location.href="../view/home.html"
        return
    }

    let respostaErro = await api.json();
    if(respostaErro.data.errors.password)
        alert(respostaErro.data.errors.password[0]);
    
    if(!respostaErro.data.errors.password && respostaErro)
        alert(respostaErro.data.errors);
}