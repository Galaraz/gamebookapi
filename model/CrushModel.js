const fs = require('fs').promises;
const path = require('path');



const supabase  = require("./supabase");

async function  getsupabase(){

  let { data: GameBook, error } = await supabase
  .from('GameBook')
  .select('*')

  console.log(GameBook,"entrou na gamebook");
}



const crushFile = 'crush.json';

async function readCrushFile() {
  return JSON.parse(await fs.readFile(path.resolve(__dirname, '..', crushFile)));
}

async function writeCrushFile(content) {
  await fs.writeFile(path.join(__dirname, '..', 'crush.json'), JSON.stringify(content, null, 2));
}

module.exports = { readCrushFile, writeCrushFile,getsupabase };