const {Sequelize,Datatypes}= require("sequelize")

const sequelize = new Sequelize(process.env.CS)

sequelize.authenticate()
.then(()=>{
  console.log('connected successfully');
})
.catch((err)=>{
  console.log('err'+err);
})

const db ={}
db.Sequelize=Sequelize
db.sequelize=sequelize

sequelize.sync({alter:false}).then(()=>{
  console.log('migration done successfully');
})