import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FavoriteIcon } from './Icons.jsx';
import FavoriteStore from '../store/FavoriteStore';
import { logEvent, LogCategories, LogActions } from '../utils/ga';

const Favorite = ({ category, id }) => {
    const [store, setStore] = useState(null);
    const [is_favorate, setFavorite] = useState(false);

    const onClick = useCallback(
        e => {
            e.stopPropagation();
            e.nativeEvent.isHandledByDialog = true; // prevent close dialog
            store.toggleFavorite(category, id);
        },
        [store, category, id]
    );
    const onFavoriteUpdate = useCallback(() => {
        const isFavorite = store.isFavorite(category, id);
        if (isFavorite !== is_favorate) {
            setFavorite(isFavorite);
            logEvent(LogCategories.CategoricalDisplay, LogActions.Favorite, `${isFavorite ? 'Add ' : 'Remove '} ${id}`);
        }
    }, [store, category, id, is_favorate]);

    useEffect(() => {
        if (store && store.onFavoriteUpdate) {
            store.onFavoriteUpdate(onFavoriteUpdate);
            setFavorite(store.isFavorite(category, id));
        }
    }, [store, category, id, onFavoriteUpdate]);
    useEffect(() => {
        const _store = FavoriteStore.getInstance();
        setStore(_store);
    }, [category, id]);

    return !category || !id ? null : (
        <FavoriteIcon
            onClick={onClick}
            className={classNames('ciq-favorite', {
                'ciq-active-favorite': is_favorate,
            })}
        />
    );
};

export default Favorite;
