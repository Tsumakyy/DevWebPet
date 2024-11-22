const url = "https://go-wash-api.onrender.com/api/user"; 

async function cadastroUsuario() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let terms = document.getElementById('terms').checked;
    let birthday = document.getElementById('birthday').value;

    if (!name || !email || !password || !cpf_cnpj || !birthday) {
        return alert("Todos os campos devem ser preenchidos.");
    }

    if (!terms) {
        return alert("Você deve aceitar os termos de uso.");
    }

    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "user_type_id": 1,
            "password": password,
            "cpf_cnpj": cpf_cnpj,
            "terms": terms,
            "birthday": birthday
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        alert(resposta.data);
        return;
    }

    let respostaErro = await api.json();
    if (respostaErro.data.errors.cpf_cnpj) {
        alert(respostaErro.data.errors.cpf_cnpj[0]);
    }
    
    if (respostaErro.data.errors.password) {
        alert(respostaErro.data.errors.password[0]);
    }
    
    if (respostaErro.data.errors.email) {
        alert(respostaErro.data.errors.email[0]);
    }
}