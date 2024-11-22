const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function exibirEndereco() {
    let userToken = JSON.parse(localStorage.getItem("user")).access_token;

    let api = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        let userName = JSON.parse(localStorage.getItem("user")).user.name;
        let userEmail = JSON.parse(localStorage.getItem("user")).user.email;
        document.getElementById("nameUser").innerHTML = userName
        document.getElementById("nameEmail").innerHTML = userEmail
        showAddress = (resposta.data[0].formatted_address)
        document.getElementById("endereçoUser").innerHTML = showAddress
        console.log(resposta.data)
        for(i=0; i < resposta.data.length; i++)
            console.log(resposta.data[i])
        return
    } else {
        let respostaErro = await api.json();
        console.error(respostaErro);
        alert('Erro ao buscar os endereços.');
    }

    
}

exibirEndereco()