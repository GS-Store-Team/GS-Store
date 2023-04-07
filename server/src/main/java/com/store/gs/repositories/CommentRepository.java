package com.store.gs.repositories;

import com.store.gs.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long> {
    void deleteAllByPluginId(long id);

    Page<Comment> getAllByPluginIdAndReviewer(Pageable pageable, long pluginId, long userId);
    Page<Comment> getAllByPluginId(Pageable pageable, long pluginId);
    Page<Comment> getAllByPluginIdAndReviewerNot(Pageable pageable, long pluginId, long userId);
}
