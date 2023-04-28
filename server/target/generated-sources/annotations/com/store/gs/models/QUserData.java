package com.store.gs.models;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QUserData is a Querydsl query type for UserData
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QUserData extends com.querydsl.sql.RelationalPathBase<UserData> {

    private static final long serialVersionUID = 112681521;

    public static final QUserData userData = new QUserData("UserData");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final StringPath nickName = createString("nickName");

    public final StringPath email = createString("email");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath description = createString("description");

    public QUserData(String variable) {
        super(UserData.class, forVariable(variable), null, "userdata");
        addMetadata();
    }

    public QUserData(String variable, String schema, String table) {
        super(UserData.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QUserData(String variable, String schema) {
        super(UserData.class, forVariable(variable), schema, "userdata");
        addMetadata();
    }

    public QUserData(Path<? extends UserData> path) {
        super(path.getType(), path.getMetadata(), null, "userdata");
        addMetadata();
    }

    public QUserData(PathMetadata metadata) {
        super(UserData.class, metadata, null, "userdata");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(userId, ColumnMetadata.named("user_id").withIndex(0));
        addMetadata(nickName, ColumnMetadata.named("nickname").withIndex(1));
        addMetadata(email, ColumnMetadata.named("Email").withIndex(2));
        addMetadata(phoneNumber, ColumnMetadata.named("phonenumber").withIndex(3));
        addMetadata(description, ColumnMetadata.named("Description").withIndex(4));
    }

}

