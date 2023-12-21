let books = require("../models/booksdb");

async function getAllBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const allBooks = Object.values(books);
        resolve(allBooks);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function searchByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.isbn === isbn);
        if (book) {
          resolve(book);
        } else {
          resolve([])
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}
function searchByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.title === title);
        if (book) {
          resolve(book);
        } else {
          resolve([])
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}
function searchByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.author === author);
        if (book) {
          resolve(book);
        } else {
          resolve([])
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}
function getReviews(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.isbn === isbn);
        if (book) {
          resolve(book.reviews);
        } else {
          resolve([])
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function updateReviews(payload) {
  const {isbn, id, user, comment, date} = payload
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.isbn === +isbn);
        if (book) {
          const reviews = Object.values(book.reviews)
          if (id == null) {
            if (reviews.length > 0) {
              reviews.push({
                comment: comment,
                date: date,
                user: user,
                id: reviews.length + 1,
              })            
              resolve(reviews[reviews.length + 1]);
            } else {
              reviews.push({
                comment: comment,
                date: date,
                user: user,
                id: reviews.length + 1,
              })
              resolve(reviews);
            }
          } else {
            const is_found = reviews.findIndex((review) => review.id = id)
            if (is_found !== -1) {
              reviews[is_found] = {
                comment: comment,
                date: date,
                user: user,
                id: is_found,
              }
              resolve(reviews[is_found]);
            } else {
              resolve([]);
            }
          }
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}
function deleteReviews(payload) {
  const {isbn, id} = payload
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const book = Object.values(books).find((b) => b.isbn === +isbn);
        if (book) {
          const reviews = Object.values(book.reviews)
          if (id == null) {
            const is_found = reviews.filter((review) => review.id = id)
            resolve(is_found);
          }
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

module.exports = {
  getAllBooks,
  searchByISBN,
  searchByTitle,
  searchByAuthor,
  getReviews,
  updateReviews,
  deleteReviews
};
