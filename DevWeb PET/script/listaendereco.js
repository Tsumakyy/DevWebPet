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
        console.log(resposta.data)
        gerarTabela(resposta.data);
        return resposta
    } else {
        let respostaErro = await api.json();
        console.error(respostaErro);
        alert('Erro ao buscar os endereços.');
    }
}

function redirecionar(id){
    setTimeout(window.location.href= `atualizarendereco.html?id=${id}`, 2000)
}

async function remover(id) {
    let confirmar = confirm("Tem certeza que deseja remover o endereço?\n");
    if (confirmar) {
        let userToken = JSON.parse(localStorage.getItem("user")).access_token;
        await fetch(url + "/" + id, {
            method: "DELETE", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        }) 
        location.reload();
    }
}

function gerarTabela(enderecos) {
  const tbody = document.querySelector('#tabelaEnderecos tbody');
  enderecos.forEach(endereco => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${endereco.title}</td>
          <td>${endereco.cep}</td>
          <td>${endereco.address}</td>
          <td>${endereco.number}</td>
          <td>${endereco.complement}</td>
          <td><input type="button" value="Atualizar" onclick="redirecionar(${endereco.id})"></td>
          <td><input type="button" value="Deletar" onclick="remover(${endereco.id})"></td>
      `;
      tbody.appendChild(tr);
  });
}
document.addEventListener('DOMContentLoaded', exibirEndereco);

