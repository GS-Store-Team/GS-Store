package com.store.gs.repositories;

import com.store.gs.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long> {
    void deleteAllByPluginId(long id);

    Page<Comment> getAllByPluginIdAndReviewer(Pageable pageable, long pluginId, long userId);
}
