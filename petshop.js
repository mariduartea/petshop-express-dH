// módulo próprio   

const moment = require('moment');
const fs = require('fs');
let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

//dentro do objeto "petshop" iremos incluir as funções que usamos no primeiro projeto em formato de método.
const petshop = {

    atualizarBanco:() => {
        let petsAtualizado = JSON.stringify(bancoDados);
        fs.writeFileSync('bancoDados.json', petsAtualizado, 'utf-8'); 
    },
    listarPets: () => {
        for (let pet of bancoDados.pets) {
            console.log(`${pet.nome}, ${pet.idade} anos, ${pet.tipo}`);
    
            for (const servico of pet.servicos) {
                console.log(`${servico.data} - ${servico.nome}`);            
            }        
        }
    }, 
    vacinarPets: pet => {
        if (!pet.vacinado) {
            pet.vacinado = true;
            console.log(`${pet.nome} foi vacinade! :)`);      
        } else {
            console.log(`${pet.nome} já está vacinade.`);        
        }
    },
    campanhaVacina: () => {
        console.log("Campanha de vacina oferecida pelo Petshop2.0");
    
        let petsVacinadosCampanha = 0;
    
        bancoDados.pets = bancoDados.pets.map((pet) => {
            if (!pet.vacinado) {
                vacinarPets(pet);
                petsVacinadosCampanha++;
            }
        })},
        adicionarPet: novoPet => {
            bancoDados.pets.push(novoPet);
            atualizarBanco();
            console.log(`${novoPet.nome} foi adicionado com sucesso.`);
        },
        darBanho: pet => {
            pet.servicos.push({
                'nome': 'tomou banho',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`${pet.nome} está de banho tomado!`)
        },
        tosarPet: pet => {
            pet.servicos.push({
                'nome': 'tosou os pelos',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`${pet.nome} está tosado!`)
        },
        apararUnhas: pet => {
            pet.servicos.push({
                'nome': 'aparou as unhas',
                'data': moment().format('DD-MM-YYYY')
            });
            console.log(`${pet.nome} está de unhas aparadas!`)
        },
        atenderCliente: (pet, servico) => {
            console.log(`Olá, ${pet.nome} seja bem vinde!`)
            servico(pet);
            atualizarBanco();
            console.log("Tchau!");
        },
        buscarPet: (nomePet) => {

            let petEncontrado = bancoDados.pets.find((pet) => {
                return pet.nome == nomePet;
            });
        
            return petEncontrado ? petEncontrado : `Nenhum pet encontrado com esse nome ${nomePet}`
        },
        filtrarTipoPet: (tipoPet) => {
            let petsEncontados = bancoDados.pets.filter((pet) => {
                return pet.tipo == tipoPet && !pet.vacinado;
            });
        
            return petsEncontados;
        },
        clientePremium: (pet) => {
            let nServicos = pet.servicos.length;
        
            if (nServicos > 5) {
                console.log(`Olá, ${pet.nome}! Você é um cliente especial e ganhou um descontão!`);
            } else {
                console.log(`Olá, ${pet.nome}! Você ainda não tem descontos disponiveis!`);
            }
        },
        }
        
        module.exports = petshop;
