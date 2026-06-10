import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Ikigai", author: "Hector Garcia" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 4, title: "The Psychology of Money", author: "Morgan Housel" },
  { id: 5, title: "Deep Work", author: "Cal Newport" },
  { id: 6, title: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: 7, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 8, title: "The Power of Habit", author: "Charles Duhigg" },
  { id: 9, title: "Can't Hurt Me", author: "David Goggins" },
  { id: 10, title: "Zero to One", author: "Peter Thiel" },
  { id: 11, title: "Clean Code", author: "Robert C. Martin" },
  { id: 12, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
  { id: 13, title: "Eloquent JavaScript", author: "Marijn Haverbeke" },
  { id: 14, title: "Refactoring", author: "Martin Fowler" },
  { id: 15, title: "Design Patterns", author: "Erich Gamma" },
  { id: 16, title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell" },
  { id: 17, title: "Introduction to Algorithms", author: "Thomas H. Cormen" },
  { id: 18, title: "You Don't Know JS", author: "Kyle Simpson" },
  { id: 19, title: "Head First Java", author: "Kathy Sierra" },
  { id: 20, title: "The Clean Coder", author: "Robert C. Martin" }
];

// Home Route
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API Running");
});

// GET ALL BOOKS
app.get("/books", (req: Request, res: Response) => {
  res.status(200).json(books);
});

// GET BOOK BY ID
app.get("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.status(200).json(book);
});

// ADD NEW BOOK
app.post("/books", (req: Request, res: Response) => {
  const { id, title, author } = req.body;

  if (!id || !title || !author) {
    return res.status(400).json({
      message: "id, title and author are required"
    });
  }

  const existingBook = books.find((book) => book.id === id);

  if (existingBook) {
    return res.status(400).json({
      message: "Book ID already exists"
    });
  }

  const newBook: Book = {
    id,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// UPDATE BOOK
app.put("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  if (!title || !author) {
    return res.status(400).json({
      message: "title and author are required"
    });
  }

  book.title = title;
  book.author = author;

  res.status(200).json({
    message: "Book updated successfully",
    book
  });
});

// DELETE BOOK
app.delete("/books/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books = books.filter((book) => book.id !== id);

  res.status(200).json({
    message: "Book deleted successfully"
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});