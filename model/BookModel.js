const fs = require('fs').promises;
const path = require('path');
const crushFile = 'crush.json';
const supabase  = require("./supabase");


async function  getsupabase(){

 
  let { data: paragrafos, error: erroparagrafo } = await supabase
  .from('paragrafos')
  .select('*')
  .like('par_id_pagina', pagina.id)

 
}

async function onePage(pageId){

  const { data: paragrafos, error: erroparagrafo } = await supabase
    .from('paragrafos')
    .select('*')
    .eq('par_id_pagina', pageId);

  if (erroparagrafo) {
    console.error(erroparagrafo);
    return;
  }

  // console.log(paragrafos, 'entrou na gamebook');
  return paragrafos
} 
async function addParagrafo(paragrafo) {
  const paragrafoData = {
    par_titulo: paragrafo.par_titulo,
    par_imagem: paragrafo.par_imagem,
    par_texto: paragrafo.par_texto,
    par_id_pagina: paragrafo.par_id_pagina
  };
 
  const { data, error } = await supabase
    .from('paragrafos')
    .insert([paragrafoData], { returning: 'minimal' });

  if (error) {
    console.error(error);
    return;
  }

  console.log('Parágrafo adicionado com sucesso:',data);
}

async function readCrushFile() {
  return JSON.parse(await fs.readFile(path.resolve(__dirname, '..', crushFile)));
}

async function writeCrushFile(content) {
  await fs.writeFile(path.join(__dirname, '..', 'crush.json'), JSON.stringify(content, null, 2));
}

module.exports = { readCrushFile, writeCrushFile,getsupabase,onePage,addParagrafo };