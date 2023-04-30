package com.store.gs.models;

import com.store.gs.dto.CommentDTO;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Data
@Table("review")
@ToString
public class Comment {
    @Id
    private long id;
    private long pluginId;
    private long reviewer;
    @Min(1)
    @Max(5)
    private float mark;
    @Size(min = 1, max = 2048, message = "Comment length should be in range [1 - 2048] characters!")
    private String text;
    @Column("creation_time")
    private Timestamp creationTime;
    @Column("last_change")
    private Timestamp lastChange;

    public static Comment fromDTO(CommentDTO commentDTO) {
        Comment comment = new Comment();

        comment.setMark(commentDTO.getMark());
        comment.setText(commentDTO.getText());

        return comment;
    }
}
