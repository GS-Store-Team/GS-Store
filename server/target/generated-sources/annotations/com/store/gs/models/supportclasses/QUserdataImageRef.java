package com.store.gs.models.supportclasses;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QUserdataImageRef is a Querydsl query type for UserdataImageRef
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QUserdataImageRef extends com.querydsl.sql.RelationalPathBase<UserdataImageRef> {

    private static final long serialVersionUID = -538644856;

    public static final QUserdataImageRef userdataImageRef = new QUserdataImageRef("UserdataImageRef");

    public final NumberPath<Long> imageId = createNumber("imageId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUserdataImageRef(String variable) {
        super(UserdataImageRef.class, forVariable(variable), null, "userdata_image");
        addMetadata();
    }

    public QUserdataImageRef(String variable, String schema, String table) {
        super(UserdataImageRef.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QUserdataImageRef(String variable, String schema) {
        super(UserdataImageRef.class, forVariable(variable), schema, "userdata_image");
        addMetadata();
    }

    public QUserdataImageRef(Path<? extends UserdataImageRef> path) {
        super(path.getType(), path.getMetadata(), null, "userdata_image");
        addMetadata();
    }

    public QUserdataImageRef(PathMetadata metadata) {
        super(UserdataImageRef.class, metadata, null, "userdata_image");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(imageId, ColumnMetadata.named("image_id").withIndex(0));
        addMetadata(userId, ColumnMetadata.named("userdata_id").withIndex(1));
    }

}

