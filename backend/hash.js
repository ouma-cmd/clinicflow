const bcrypt = require("bcrypt");


async function generate(){

  const admin = await bcrypt.hash("Admin123", 10);
  const staff = await bcrypt.hash("Staff123", 10);


  console.log("ADMIN:", admin);
  console.log("STAFF:", staff);

}


generate();