package com.store.gs.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;

import com.querydsl.sql.ColumnMetadata;
import java.sql.Types;




/**
 * QDarcyUserDTO is a Querydsl query type for DarcyUserDTO
 */
@Generated("com.infobip.spring.data.jdbc.annotation.processor.CustomMetaDataSerializer")
public class QDarcyUserDTO extends com.querydsl.sql.RelationalPathBase<DarcyUserDTO> {

    private static final long serialVersionUID = -1852284256;

    public static final QDarcyUserDTO darcyUserDTO = new QDarcyUserDTO("DarcyUserDTO");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> roleId = createNumber("roleId", Integer.class);

    public final BooleanPath isActive = createBoolean("isActive");

    public final StringPath firstName = createString("firstName");

    public final StringPath lastName = createString("lastName");

    public final StringPath thirdName = createString("thirdName");

    public final StringPath email = createString("email");

    public final StringPath username = createString("username");

    public final StringPath telephone = createString("telephone");

    public final BooleanPath isLegalPerson = createBoolean("isLegalPerson");

    public final StringPath company = createString("company");

    public final StringPath region = createString("region");

    public final StringPath position = createString("position");

    public final StringPath gender = createString("gender");

    public final DateTimePath<java.util.Date> dob = createDateTime("dob", java.util.Date.class);

    public final DateTimePath<java.util.Date> createdAt = createDateTime("createdAt", java.util.Date.class);

    public final StringPath photo = createString("photo");

    public final ListPath<ShortProductDTO, QShortProductDTO> products = this.<ShortProductDTO, QShortProductDTO>createList("products", ShortProductDTO.class, QShortProductDTO.class, PathInits.DIRECT2);

    public QDarcyUserDTO(String variable) {
        super(DarcyUserDTO.class, forVariable(variable), null, "DarcyUserDTO");
        addMetadata();
    }

    public QDarcyUserDTO(String variable, String schema, String table) {
        super(DarcyUserDTO.class, forVariable(variable), schema, table);
        addMetadata();
    }

    public QDarcyUserDTO(String variable, String schema) {
        super(DarcyUserDTO.class, forVariable(variable), schema, "DarcyUserDTO");
        addMetadata();
    }

    public QDarcyUserDTO(Path<? extends DarcyUserDTO> path) {
        super(path.getType(), path.getMetadata(), null, "DarcyUserDTO");
        addMetadata();
    }

    public QDarcyUserDTO(PathMetadata metadata) {
        super(DarcyUserDTO.class, metadata, null, "DarcyUserDTO");
        addMetadata();
    }

    public void addMetadata() {
        addMetadata(id, ColumnMetadata.named("Id").withIndex(0));
        addMetadata(roleId, ColumnMetadata.named("RoleId").withIndex(1));
        addMetadata(isActive, ColumnMetadata.named("IsActive").withIndex(2));
        addMetadata(firstName, ColumnMetadata.named("FirstName").withIndex(3));
        addMetadata(lastName, ColumnMetadata.named("LastName").withIndex(4));
        addMetadata(thirdName, ColumnMetadata.named("ThirdName").withIndex(5));
        addMetadata(email, ColumnMetadata.named("Email").withIndex(6));
        addMetadata(username, ColumnMetadata.named("Username").withIndex(7));
        addMetadata(telephone, ColumnMetadata.named("Telephone").withIndex(8));
        addMetadata(isLegalPerson, ColumnMetadata.named("IsLegalPerson").withIndex(9));
        addMetadata(company, ColumnMetadata.named("Company").withIndex(10));
        addMetadata(region, ColumnMetadata.named("Region").withIndex(11));
        addMetadata(position, ColumnMetadata.named("Position").withIndex(12));
        addMetadata(gender, ColumnMetadata.named("Gender").withIndex(13));
        addMetadata(dob, ColumnMetadata.named("Dob").withIndex(14));
        addMetadata(createdAt, ColumnMetadata.named("CreatedAt").withIndex(15));
        addMetadata(photo, ColumnMetadata.named("Photo").withIndex(16));
        addMetadata(products, ColumnMetadata.named("Products").withIndex(17));
    }

}

