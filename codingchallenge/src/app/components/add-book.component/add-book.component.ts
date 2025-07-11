import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntegrationService } from '../../services/integration.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-add-book.component',
  standalone: false,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})

export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private integration: IntegrationService) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      publicationYear: [null, [Validators.required, Validators.min(1000)]]
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const book: Book = this.bookForm.value;

    this.integration.addBook(book).subscribe({
      next: () => {
        this.successMessage = 'Book added successfully!';
        this.errorMessage = '';
        this.bookForm.reset();
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Failed to add book. Please check console.';
        console.error('Add book error:', err);
      }
    });
  }
}
