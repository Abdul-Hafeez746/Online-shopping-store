const secondscheme = require("./models/schema")
let cardsData = require("./cardssdatasAPI.json")
let mongoDB = require("./database/connection")

let Begin = async() => {
 try{
  await secondscheme.create(cardsData)
  console.log("success:Cards Data Created")
 }catch(error){
    console.log(error)
 }
}

module.exports = Begin



// const fs = require('fs');
// const secondscheme = require('./models/schema');
// const cardsData = require('./cardssdatasAPI.json');
// let mongoDB = require("./database/connection")


// const flagFilePath = './flag.txt';

// let isFlagExists = fs.existsSync(flagFilePath);

// let Begin = async () => {
//   try {
//     await mongoDB()
//     await secondscheme.create(cardsData);
//     console.log('success:Cards Data Created');
//     if (!isFlagExists) {
//       fs.writeFileSync(flagFilePath, 'flag');
//       console.log('Flag file created');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// if (!isFlagExists) {
//   Begin();
// } else {
//   console.log('Script already executed');
// }
