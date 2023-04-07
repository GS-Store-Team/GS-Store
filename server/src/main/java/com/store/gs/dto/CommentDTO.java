package com.store.gs.dto;

import com.store.gs.models.Comment;
import com.store.gs.models.supportclasses.Avatar;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Data
public class CommentDTO {
    private Long id;
    @Min(1)
    @Max(5)
    private float mark;
    @Size(min = 1, max = 2048, message = "Comment length should be in range [1 - 2048] characters!")
    private String text;
    private Timestamp creationTime;
    private Timestamp lastChange;
    private long reviewer;
    private Avatar avatar;
    private String nickName;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.mark = comment.getMark();
        this.text = comment.getText();
        this.creationTime = comment.getCreationTime();
        this.lastChange = comment.getLastChange();
        this.reviewer = comment.getReviewer();
    }
}
