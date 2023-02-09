package com.store.gs.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Data
public class CommentDTO {
    @Min(1)
    @Max(5)
    private float mark;
    @Size(min = 1, max = 2048, message = "Comment length should be in range [1 - 2048] characters!")
    private String text;
}
