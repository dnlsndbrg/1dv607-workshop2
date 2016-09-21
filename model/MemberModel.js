// class Member {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }


var Member = sequelize.define('member', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name' // Will result in an attribute that is lastName when user facing but last_name in the database
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Member;


//
// Member.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });
