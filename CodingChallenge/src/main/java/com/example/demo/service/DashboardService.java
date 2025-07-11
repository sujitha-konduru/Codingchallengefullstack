package com.example.demo.service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DashboardResponse;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;

@Service
public class DashboardService {

    @Autowired
    private BookRepository bookRepository;

    public DashboardResponse getDashboardData() {
        DashboardResponse response = new DashboardResponse();
        List<Book> books = getAllBooks();

        response.setResponse("Success");
        response.setLatestAddedBooks(books);
        response.setTotalBooks(books.size());
        response.setTotalPublishedBefore2000(books.stream()
                .filter(book -> book.getPublicationYear() < 2000)
                .count());
        response.setTotalPublishedAfter2000(books.stream()
                .filter(book -> book.getPublicationYear() >= 2000)
                .count());

        return response;
    }

    private List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
