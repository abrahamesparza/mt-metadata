const csvToJson = require('csvtojson');
const fs = require('fs');
let jsonData = [];

csvToJson()
.fromFile('./metatoons.csv')
.then(data => {
  for (let i = 0; i < data.length; i++) {
    //push each object of data into my jsonData array
    jsonData.push(data[i]);
    //keep track of each metadata's COUNT and store in id variable
    let id = data[i].COUNT;
    //write a seperate file to store each set of metadata in its own file
    fs.writeFile(`./metadata/${id}.json`, JSON.stringify(
      // need to find the id in my jsonData array that equals the id of the json file
      // once found, push that metadata into the newly created json file
      jsonData.find(meta => meta.COUNT === id)
    ), err => {
      // if err with above code, throw the error
      if (err) throw err;
      // otherwise print that the file has been saved
      console.log(`File ${id} has been saved successfully.`);
    });
  }
});
