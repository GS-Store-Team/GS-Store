package com.store.gs.controllers;

import com.store.gs.models.Category;
import com.store.gs.models.Tag;
import com.store.gs.repositories.CategoryRepository;
import com.store.gs.repositories.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class CategoryTagController {
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> categories = new ArrayList<>();
        categoryRepository.findAll().forEach(categories::add);

        return categories.size() > 0 ?
                ResponseEntity.ok(categories)
                :ResponseEntity.noContent().build();
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllategories(){
        List<Tag> tags = new ArrayList<>();
        tagRepository.findAll().forEach(tags::add);

        return tags.size() > 0 ?
                ResponseEntity.ok(tags)
                :ResponseEntity.noContent().build();
    }
}
