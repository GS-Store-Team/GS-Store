package ext.java.util;

import static com.querydsl.core.types.PathMetadataFactory.*;
import java.util.Set;


import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSet is a Querydsl query type for Set
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QSet extends BeanPath<Set<?>> {

    private static final long serialVersionUID = -1383343454L;

    public static final QSet set = new QSet("set1");

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QSet(String variable) {
        super((Class) Set.class, forVariable(variable));
    }

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QSet(Path<? extends Set> path) {
        super((Class) path.getType(), path.getMetadata());
    }

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QSet(PathMetadata metadata) {
        super((Class) Set.class, metadata);
    }

}

