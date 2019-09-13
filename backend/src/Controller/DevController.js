const axios =  require('axios');

const Dev = require('../Models/Dev');

module.exports = {
    async index(req,res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        //Quero buscar todos os users
        //que não foi dado like ou dislike
        //ne = não é igual
        //nin = not in
        const users = await Dev.find({
            $and: [
                    { _id: {$ne: user} },
                    {_id : {$nin: loggedDev.likes }},
                    {_id: {$nin: loggedDev.dislikes }}
            ],
        });

        res.json(users)
    },

    //cria novo Dev
    async store(req,res){
        const { username } = req.body;

        //Verificar se existe um usuario com esse Username
        const userExists = await Dev.findOne({ user: username});

        //Se existir retorno o existente
        if(userExists){
            return res.json(userExists);
        }

        //Se não existir, busco na base de dados
        //e crio um novo user

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name , bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user : username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}