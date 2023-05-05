package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QMyImage is a Querydsl query type for MyImage
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QMyImage extends com.querydsl.sql.RelationalPathBase<MyImage> {

    private static final long serialVersionUID = 946598771;

    public static final QMyImage myImage = new QMyImage("MyImage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> pluginId = createNumber("pluginId", Long.class);

    public final BooleanPath isPreview = createBoolean("isPreview");

    public final ArrayPath<byte[], Byte> data = createArray("data", byte[].class);

    public QMyImage(String variable) {
        super(MyImage.class, forVariable(variable), null, "image");
        addMetadata();
    }

    public QMyImage(String variable, String schema, String table) {
        super(MyImage.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QMyImage(String variable, String schema) {
        super(MyImage.class, forVariable(variable), schema, "image");
        addMetadata();
    }

    public QMyImage(Path<? extends MyImage> path) {
        super(path.getType(), path.getMetadata(), null, "image");
        addMetadata();
    }

    public QMyImage(PathMetadata metadata) {
        super(MyImage.class, metadata, null, "image");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(pluginId, ColumnMetadata.named("plugin_id").withIndex(1));
        addMetadata(isPreview, ColumnMetadata.named("is_preview").withIndex(2));
        addMetadata(data, ColumnMetadata.named("Data").withIndex(3));
    }

}

