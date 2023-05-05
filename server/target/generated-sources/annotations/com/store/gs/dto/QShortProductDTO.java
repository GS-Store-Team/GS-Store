package com.store.gs.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QShortProductDTO is a Querydsl query type for ShortProductDTO
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QShortProductDTO extends com.querydsl.sql.RelationalPathBase<ShortProductDTO> {

    private static final long serialVersionUID = 1771341525;

    public static final QShortProductDTO shortProductDTO = new QShortProductDTO("ShortProductDTO");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath uid = createString("uid");

    public final StringPath name = createString("name");

    public QShortProductDTO(String variable) {
        super(ShortProductDTO.class, forVariable(variable), null, "ShortProductDTO");
        addMetadata();
    }

    public QShortProductDTO(String variable, String schema, String table) {
        super(ShortProductDTO.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QShortProductDTO(String variable, String schema) {
        super(ShortProductDTO.class, forVariable(variable), schema, "ShortProductDTO");
        addMetadata();
    }

    public QShortProductDTO(Path<? extends ShortProductDTO> path) {
        super(path.getType(), path.getMetadata(), null, "ShortProductDTO");
        addMetadata();
    }

    public QShortProductDTO(PathMetadata metadata) {
        super(ShortProductDTO.class, metadata, null, "ShortProductDTO");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(uid, ColumnMetadata.named("Uid").withIndex(1));
        addMetadata(name, ColumnMetadata.named("Name").withIndex(2));
    }

}

