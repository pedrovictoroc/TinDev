const Dev = require('../Models/Dev');

module.exports = {
    async store(req,res){

        const { user } = req.headers;
        const { devId } = req.params;


        const loggedDev = await Dev.findById(user);

        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            //Código para Bad Request
            return res.status(400).json({
                error: "Dev not exists! "
            });
        }

        //Se existir, vou adicionar na lista de Likes
        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}