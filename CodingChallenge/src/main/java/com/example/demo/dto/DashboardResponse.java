package com.example.demo.dto;

import com.example.demo.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DashboardResponse {
    private String response;

    private long totalBooks;

    private long totalPublishedBefore2000;

    private long totalPublishedAfter2000;

    private List<Book> latestAddedBooks;
}
