const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

async function atualizaEndereco(){
    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;
    let userToken = JSON.parse(localStorage.getItem("user")).access_token;

    if (!title || !cep || !address || !number) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; 
    }

    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title" : title,
            "cep" : cep,
            "address" : address,
            "number" : number,
            "complement" : complement
        }),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'bearer '+userToken
        }
    });

    if(api.ok){
        let resposta = await api.json();
        console.log(resposta)
        alert('Endereço atualizado com sucesso')
        window.location.href="../view/listaendereco.html"
        return
    }

    let respostaErro = await api.json();
    console.log(respostaErro)
}


async function preencherFormulario() {
    let userToken = JSON.parse(localStorage.getItem("user")).access_token;

    let api = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + userToken
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        document.getElementById('title').value = resposta.data.title;
        document.getElementById('cep').value = resposta.data.cep;
        document.getElementById('address').value = resposta.data.address;
        document.getElementById('number').value = resposta.data.number;
        document.getElementById('complement').value = resposta.data.complement || '';
    } else {
        let respostaErro = await api.json();
        console.log(respostaErro);
        alert('Erro ao carregar o endereço. Tente novamente.');
    }
}

//document.addEventListener('DOMContentLoaded', preencherFormulario);

preencherFormulario()