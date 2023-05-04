package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QImage is a Querydsl query type for Image
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QImage extends com.querydsl.sql.RelationalPathBase<Image> {

    private static final long serialVersionUID = -105836865;

    public static final QImage image = new QImage("Image");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isPreview = createBoolean("isPreview");

    public final ArrayPath<byte[], Byte> data = createArray("data", byte[].class);

    public QImage(String variable) {
        super(Image.class, forVariable(variable), null, "image");
        addMetadata();
    }

    public QImage(String variable, String schema, String table) {
        super(Image.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QImage(String variable, String schema) {
        super(Image.class, forVariable(variable), schema, "image");
        addMetadata();
    }

    public QImage(Path<? extends Image> path) {
        super(path.getType(), path.getMetadata(), null, "image");
        addMetadata();
    }

    public QImage(PathMetadata metadata) {
        super(Image.class, metadata, null, "image");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(isPreview, ColumnMetadata.named("is_preview").withIndex(1));
        addMetadata(data, ColumnMetadata.named("Data").withIndex(2));
    }

}

