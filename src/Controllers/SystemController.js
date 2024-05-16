const UserModel = require('../Models/UserModel');
const CargoModel = require('../Models/CargoModel');
const bcrypt = require('bcrypt');

class ProductController {
    async create(req, res){

        const { profile_id, name, email, cpf, status, cargo, password } = req.body;
        const userExists = await UserModel.findOne({email});

        if (userExists) {
            return res.status(400).json({message : "Já existe um usuário cadastrado com o email informado!"});
        }

        if (!name || !email || !cpf || !status || !cargo || !password) {
            return res.status(400).json({message : "Preencha todos os campos!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await UserModel.create({
          profile_id,
          name,
          cpf,
          email,
          status,
          cargo,
          password: hashedPassword,
          created: new Date()
        });

        return res.status(200).json(createdUser);
    }

    async all(req, res){
        const listUsers = await UserModel.find();

        return res.status(200).json(listUsers);
    }

    async show(req, res){
        try {
            const {id} = req.params;

            const userRef = await UserModel.findById(id);
    
            if (!userRef) {
                return res.status(404).json({message : "Usuário não existe"});
            }
    
            return res.status(200).json(userRef);

        } catch (error) {
            return res.status(404).json({message : "Usuário não existe"});
        }

    }

    // Software Product - Atividade contnua 03
    async update(req, res){
        try {
          const { id } = req.params;
          
          const { name, email, cpf, cargo, status } = req.body;
      
          if (!name && !email && !cpf && !status && !cargo) {
            return res.status(400).json({ message: "Nenhum dado fornecido para atualização" });
          }
      
          const updatedFields = {};
          if (name) updatedFields.name = name;
          if (email) updatedFields.email = email;
          if (cpf) updatedFields.cpf = cpf;
          if (cargo) updatedFields.cargo = cargo;
          if (status) updatedFields.status = status;
      
          await UserModel.findByIdAndUpdate(id, updatedFields);
      
          return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
          return res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
        }
      }

    async delete(req, res){
        try {

            const {id} = req.params;

            const userDeleteRef = await UserModel.findByIdAndDelete(id);
            
            if (!userDeleteRef) {
                return res.status(404).json({message : "Usuário não existe"});
            }
    
            return res.status(200).json({message : "Usuário deletado com sucesso!"});

        } catch (error) {
            return res.status(404).json({message : "Erro ao deletar o arquivo"});
        }
    }

    
    async createcargo(req, res) {
        try {
          const { cargo } = req.body;
      
          // Verificar se o cargo já existe
          const existingCargo = await CargoModel.findOne({ cargo });
      
          // Se o cargo já existe, retorne um erro
          if (existingCargo) {
            return res.status(400).json({ message: 'Cargo já existe' });
          }
      
          // Criando um novo registro de cargo
          const newCargo = await CargoModel.create({
            cargo,
            created: new Date()
          });
      
          res.status(200).json({ message: 'Cargo cadastrado com sucesso!', cargo: newCargo });
        } catch (error) {
          console.error('Erro ao registrar cargo:', error);
          res.status(500).json({ message: 'Erro ao salvar o cargo' });
        }
      }      

      
      async allcargos(req, res){
        const listCargos = await CargoModel.find();

        return res.status(200).json(listCargos);
    }

    async search(req, res) {
      try {
        const { query } = req.body; // Assumindo que o corpo da requisição contém o critério de pesquisa
        
        // Realizar a pesquisa utilizando uma expressão regular para buscar em vários campos
        const users = await UserModel.find({
          $or: [
            { name: { $regex: query, $options: 'i' } }, // Buscar por nome (case-insensitive)
            { email: { $regex: query, $options: 'i' } }, // Buscar por email (case-insensitive)
            { cpf: { $regex: query, $options: 'i' } }, // Buscar por CPF (case-insensitive)
            { status: { $regex: query, $options: 'i' } }, // Buscar por status (case-insensitive)
            { cargo: { $regex: query, $options: 'i' } } // Buscar por cargo (case-insensitive)
          ]
        });
  
        res.status(200).json(users);
      } catch (error) {
        console.error('Erro ao pesquisar usuários:', error);
        res.status(500).json({ message: 'Erro ao pesquisar usuários' });
      }
    }
}

module.exports = new ProductController;