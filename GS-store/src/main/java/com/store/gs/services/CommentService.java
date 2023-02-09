package com.store.gs.services;

import com.store.gs.models.Comment;
import com.store.gs.models.User;
import com.store.gs.repositories.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserService userService;

    public CommentService(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public void addComment(long pluginId, Comment comment, Authentication authentication){
        User user = userService.getUserByEmail(authentication.getName());

        comment.setPluginId(pluginId);
        comment.setReviewer(user.getId());
        comment.setTime(new Timestamp(System.currentTimeMillis()));

        commentRepository.save(comment);
    }

    public Page<Comment> getCommentsForPluginId(long id){
        return commentRepository.findAll(PageRequest.of(0,10));
    }
}
