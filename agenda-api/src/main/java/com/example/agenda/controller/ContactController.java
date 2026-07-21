package com.example.agenda.controller;

import com.example.agenda.models.Contact;
import com.example.agenda.services.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/contatos")
public class ContactController {

    private final ContactService service;

    @PostMapping
    public ResponseEntity<Contact> create(@RequestBody @Valid Contact contact) {
        Contact contactSaved = service.create(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(contactSaved);
    }

    @PutMapping
    public ResponseEntity<Contact> update(@RequestBody @Valid Contact contact) {
        Contact contactSaved = service.update(contact);
        return ResponseEntity.ok(contactSaved);
    }

    @GetMapping
    public List<Contact> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> findById(@PathVariable Integer id) {
        Contact contactSaved = service.findById(id);
        return ResponseEntity.ok(contactSaved);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
