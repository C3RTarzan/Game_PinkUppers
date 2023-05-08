const mongoose = require('mongoose');

async function main(){
    await mongoose.connect(process.env.MONGODB)
}

console.log("Mongoose conectado.");

main().catch((err) => console.log(err))

module.exports = mongoose