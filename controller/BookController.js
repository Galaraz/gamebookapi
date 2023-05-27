const { readCrushFile, writeCrushFile,onePage,getsupabase,addParagrafo } = require('../model/BookModel');

const getAllBooks = async (_req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
  try {
    const result = await getsupabase();
    return res.status(200).json(result);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crushs!');
  }
};

const getOneBook = async (req, res) => {
  console.log('[BOOK CONTROLLER] : CHAMOU O MÉTODO BUSCAR UMA PAGINA');
  try {
    const { id: pageId } = req.params;
    const result = await onePage(pageId);
    
    if (!result) {
      return res.status(404).json({ message: 'Página não encontrada' });
    }
    
    return res.status(200).json(result);
  } catch (error) {
    console.log(`[BOOK CONTROLLER] : buscar => ${error}`);
    res.status(500).json({ message: 'errou ' });
  }
};

const addBook = async (req, res) => {
  console.log('[BOOK CONTROLLER] : CHAMOU O MÉTODO ADICIONAR UM PARAGRAFO');
  try {
    const { par_titulo, par_imagem, par_texto, par_id_pagina } = req.body;
 console.log(req.body,"oque vem da req");
    const paragrafo = {
      par_titulo,
      par_imagem,
      par_texto,
      par_id_pagina
    };
    await addParagrafo(paragrafo);

    res.status(201).json({ message: 'Parágrafo adicionado com sucesso' });
  } catch (error) {
    console.log(`[BOOK CONTROLLER] : addBook => ${error}`);
    res.status(500).json({ message: 'Erro ao adicionar o parágrafo' });
  }
};

const editBook = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO EDITAR UM CRUSH');
  try {
    const { id: crushId } = req.params;
    const { ...reqs } = req.body;
    const result = await readCrushFile();
    const newCrush = { id: parseFloat(crushId), ...reqs };
    const editResult = await result.filter(({ id }) => id !== parseFloat(crushId));
    const newResult = [...editResult, newCrush];

    await writeCrushFile(newResult);
    return res.status(200).json(newCrush);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscar => ${error}`);
    res.status(500).json({ message: 'Crush não encontrado' });
  }
};

const deleteBook = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO DELETAR CRUSHS');
  try {
    const { id: crushId } = req.params;

    const result = await readCrushFile();
    const deleteResult = await result.filter(({ id }) => id !== parseFloat(crushId));
    await writeCrushFile(deleteResult);

    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crush!');
  }
};
const searchBook = async (req, res, next) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
  try {
    const { q } = req.query;

    const result = await readCrushFile();
    const filteredResult = result.filter((e) => e.name.includes(q));
    res.status(200).json(filteredResult);
    if (filteredResult === []) next();
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crush!');
  }
};
module.exports = { getAllBooks, getOneBook, editBook, addBook, deleteBook, searchBook };
