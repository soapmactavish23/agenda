package com.example.agenda.services;

import com.example.agenda.exception.NotFoundException;
import com.example.agenda.models.Contact;
import com.example.agenda.repositories.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository repository;

    @Transactional
    public Contact create(Contact obj) {
        return repository.save(obj);
    }

    @Transactional(readOnly = true)
    public List<Contact> findAll() {
        return repository.findAll();
    }

    public Contact findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Registro não encontrado"));
    }

    @Transactional
    public Contact update(Contact contact) {
        Contact contactSaved = findById(contact.getId());

        BeanUtils.copyProperties(contact, contactSaved, "id");

        return repository.save(contact);
    }

    @Transactional
    public void delete(Integer id) {
        findById(id);
        repository.deleteById(id);
    }

}
