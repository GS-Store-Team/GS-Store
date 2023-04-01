package com.store.gs.dto;

import com.store.gs.models.Comment;
import com.store.gs.models.supportclasses.Avatar;
import lombok.Data;
import java.sql.Timestamp;

@Data
public class CommentDTO {
    private float mark;
    private String text;
    private Timestamp time;
    private long reviewer;
    private Avatar avatar;
    private String nickName;

    public CommentDTO(Comment comment) {
        this.mark = comment.getMark();
        this.text = comment.getText();
        this.time = comment.getTime();
        this.reviewer = comment.getReviewer();
    }
}
