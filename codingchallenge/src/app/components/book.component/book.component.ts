import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book';
import { IntegrationService } from '../../services/integration.service';
@Component({
  selector: 'app-book.component',
  standalone: false,
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  editForm!: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private integration: IntegrationService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      isbn: [{ value: '', disabled: true }, Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYear: [null, [Validators.required, Validators.min(1000)]]
    });
    this.loadBooks();
  }

  loadBooks(): void {
    this.integration.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Error loading books:', err)
    });
  }

  editBook(book: Book): void {
    this.selectedBook = book;
    this.editForm.setValue({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear
    });
  }

  updateBook(): void {
    if (!this.selectedBook) return;

    const updatedBook: Book = {
      isbn: this.selectedBook.isbn,
      title: this.editForm.get('title')?.value,
      author: this.editForm.get('author')?.value,
      publicationYear: this.editForm.get('publicationYear')?.value
    };

    this.integration.updateBook(this.selectedBook.isbn, updatedBook).subscribe({
      next: () => {
        this.message = 'Book updated successfully!';
        this.selectedBook = null;
        this.editForm.reset();
        this.loadBooks();
      },
      error: (err) => {
        console.error('Update error:', err);
        this.message = 'Failed to update book.';
      }
    });
  }

  deleteBook(isbn: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.integration.deleteBook(isbn).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  cancelEdit(): void {
    this.selectedBook = null;
    this.editForm.reset();
  }
}
