package com.store.gs.services;

import com.store.gs.models.Comment;
import com.store.gs.models.User;
import com.store.gs.repositories.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.NoSuchElementException;

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

    public boolean deleteComment(long id, Authentication authentication){

        User user = userService.getUserByEmail(authentication.getName());
        Comment comment = commentRepository.findById(id).orElseThrow(NoSuchElementException::new);

        if(!(comment.getReviewer() == user.getId())) return false;

        commentRepository.delete(comment);
        return true;
    }

    public void deleteAllCommentsForPlugin(long pluginId){
        commentRepository.deleteAllByPluginId(pluginId);
    }

    public Page<Comment> getCommentsForPluginId(long id, int page, int limit, int type, Authentication authentication){
        if(page < 1) page = 1;
        if(limit < 10) limit = 10;

        User user = userService.getUserByEmail(authentication.getName());
        Page<Comment> resultSet;

        switch (type){
            case 1 -> resultSet = commentRepository.findAll(PageRequest.of(page-1,limit, Sort.by("time").descending()));
            case 2 -> resultSet = commentRepository.findAll(PageRequest.of(page-1,limit, Sort.by("mark").descending()));
            case 3 -> resultSet = commentRepository.findAll(PageRequest.of(page-1,limit, Sort.by("mark").ascending()));
            case 4 -> resultSet = commentRepository.getAllByPluginIdAndReviewer(PageRequest.of(page-1,limit, Sort.by("time").ascending()), id, user.getId());
            default -> resultSet = commentRepository.findAll(PageRequest.of(page-1,limit));
        }
        return resultSet;
    }
}
