const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (request, h) => {
  const id = nanoid(16);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  //   console.log(request.payload);
  //   return request.payload;

  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });

  response.code(500);
  return response;
};

const getBooks = (request, h) => {
  const allBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const name = request.query.name;
  const reading = request.query.reading;
  const finished = request.query.finished;

  if (name) {
    const book = allBooks.filter((b) =>
      String(b.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );

    const response = h.response({
      status: "success",
      data: {
        books: book,
      },
    });

    response.code(200);
    return response;
  }

  if (reading) {
    if (reading === "1") {
      const book = books
        .filter((b) => b.reading === true)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));

      const response = h.response({
        status: "success",
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    } else if (reading === "0") {
      const book = books
        .filter((b) => b.reading === false)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));

      const response = h.response({
        status: "success",
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }
  }

  if (finished) {
    if (finished === "1") {
      const book = books
        .filter((b) => b.finished === true)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
      const response = h.response({
        status: "success",
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    } else {
      const book = books
        .filter((b) => b.finished === false)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
      const response = h.response({
        status: "success",
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }
  }

  //   return request.query;
  const response = h.response({
    status: "success",
    data: {
      books: allBooks,
    },
  });

  response.code(200);
  return response;
};

const getBookId = (request, h) => {
  const { id } = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBook = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const finished = readPage === pageCount;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });

    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      reading,
      readPage,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = { addBook, getBooks, getBookId, editBook, deleteBook };
