//the repo layer is the one that communicates with the db i.e the model layer
const bcrypt = require("bcrypt");
const User = require("../models/users");

class UserRepository {
  constructor() {}

  findAll = async () => await User.findAll();

  // async findAllWithPagination(filter, options) {
  //   return await User.paginate(filter, options);
  // }

  findByID = async (id) => await User.findByPk(id);

  //!HACER QUERY
  findByEmail = async (email) => await User.findOne({ email });

  save = async (user) => {
    //encrypt pass
    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  };

  update = async (id, user) =>
    //change every user in the db whose id matches the id passed as a param to the user passed as a param
    await User.update(user, { user }, { where: { id } });

  remove = async (id) => await User.destroy({ where: id });
}

module.exports = UserRepository;
