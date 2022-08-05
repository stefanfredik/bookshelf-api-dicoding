const {
  addBook,
  getBooks,
  getBookId,
  editBook,
  deleteBook,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: () => {
      return {
        status: "sukses",
        pesan: "Selamat datang di bookshelf API.",
      };
    },
  },
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookId,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

module.exports = routes;
