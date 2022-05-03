import express, { request } from 'express'
import {v4 as uuid} from 'uuid'

const app = express()
app.use(express.json())

interface User {
    id: string
    name: string
    email: string
}

//const para simular o BD da aplicação, onde serão armazenados todos os usuários
const users: User[] = []
/*
Metodos HTTP: GET (coletar um dado) | POST (adicionar um dado) | PUT (atualizar um dado) | DELETE (deletar um dado)

Tipos de parametros:

Query params: para fazer filtragem de dados durante uma
Route params: server para identificar um recurso a partir de uma rota
Request body: request em json a partir de um form ou no caso do curso, via insomnia 
*/

app.get('/users', (request, response) => {
    //buscar usuarios no BD (neste exemplo na const users)
    return response.json(users)
})

app.post('/users', (request, response) => {
    //receber dados do novo usuario
    const { name, email} = request.body

    //criar o novo usuario (uuid para criar id unico)
    const user = { id: uuid(), name, email }

    //registrar o usuario novo na base de dados (const users)
    users.push(user)

    //retornar os dados do usuario criado
    return response.json(user)
})

app.put('/users/:id', (request, response) => {
    //receber os dados do usuario
    const { id } = request.params
    const { name, email} = request.body

    //localizar o usuario na base de dados usando o metodo findindex, pra acha-lo no array
    const userIndex = users.findIndex((user) => user.id === id)
    // const userIndex = users.findIndex(
    //     function (user){
    //         return user.id === id
    //     })

    //se o usuario não existe, retorna erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found'})
    }
    
    //atualizar o usuario na base de dados
    const user = { id, name, email }
    users[userIndex] = user

    //retornar os dados do usuario atualizado
    return response.json(user)
})

app.delete('/users/:id', (request, response) => {
    //receber id do usuario
    const { id } = request.params

    //localizar o usuario na base de dados usando o metodo findindex, pra acha-lo no array
    const userIndex = users.findIndex((user) => user.id === id)

    //se o usuario não existe, retorna erro
    if (userIndex < 0) {
        return response.status(404).json({ error: 'User not found'})
    }

    //excluir usuario da base de dados
    users.splice(userIndex, 1)

    //retorna status de sucesso
    return response.status(204).send()
})

app.listen('3333', () => {
    console.log('Back-end Started!')
})


