package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface LoginRepository extends JpaRepository<User, Integer> {


	Optional<User> findByUsername(String username);
}
