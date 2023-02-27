
function get(url) {
    try{
        let request = new XMLHttpRequest()
    
        request.open('GET', url, false)
        request.send()
        limpaErrorFormSuccess()
        return request.responseText
    }catch(error){
        imprimeErro()
        console.log('Error: ' + error)
    }
}
//Limpa os campos do resultado anterior para que fique visivel apenas o resultado atual
function limpaInputs() {
    const section = document.getElementById('contentCep')
    const contentCep = document.querySelectorAll('#contentCep > div')
    console.log(contentCep.length)
    if(contentCep.length > 0) {
        section.removeChild(contentCep[contentCep.length-1])
    }
}

//Quando existir uma mensagem de erro e o usuário inserir um cep válido irá ocultar a mensagem de erro
function limpaErrorFormSuccess() {
    const textError = document.getElementById('textError')
    textError.style.visibility = 'hidden'
}
//Deixa visivel a mensagem de erro quando houver um erro
function imprimeErro() {
    const textError = document.getElementById('textError')
    textError.style.visibility = 'visible'
}

function enviaCep() {
    try{
        const formCep = document.getElementById('formCep')
        
        formCep.addEventListener('submit', function(env){
            env.preventDefault()
            limpaInputs()
            const inputCep = document.getElementById('inputCep').value
            let buscaCep = get('https://viacep.com.br/ws/' + inputCep + '/json/')
            let cep = JSON.parse(buscaCep)
    
            const section = document.getElementById('contentCep')
            const div = document.createElement('div')
            const endereco = document.createElement('p')
            const pcep = document.createElement('p')
            const bairro = document.createElement('p')
            const cidade = document.createElement('p')
            
            pcep.innerText = 'Cep: ' + cep.cep
            endereco.innerText = 'Rua: ' + cep.logradouro
            bairro.innerText = 'Bairro: ' + cep.bairro
            cidade.innerText = 'Cidade: ' + cep.localidade + '/' + cep.uf
            
            div.appendChild(pcep)
            div.appendChild(endereco)
            div.appendChild(bairro)
            div.appendChild(cidade)
            section.appendChild(div)
        })
    }catch (error){
        imprimeErro()
        console.log('Error: ' + error)
    }
}

function main() {
    enviaCep()
}

main()