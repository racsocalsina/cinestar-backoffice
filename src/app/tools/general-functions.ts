import { Trades, Business, Pages } from '@tools/enums';

export const formData = (params) => {
    const form = new FormData();
    for (const key in params) {
        if (
            (params[key] != null && typeof params[key] !== 'object') ||
            (typeof params[key] === 'object' && params[key] instanceof File)
        ) {
            form.append(key, params[key]);
        } else if (typeof params[key] === 'object' && params[key] != null) {
            for (const obj of params[key]) {
                if (obj instanceof File) {
                    form.append(key, obj);
                } else {
                    form.append(key + '[]', obj);
                }
            }
        }
    }
    return form;
};

export const emptyValues = (objct) => {
    for (const member in objct) {
        if (
            objct[member] === null ||
            objct[member] === '' ||
            objct[member] === undefined
        ) {
            delete objct[member];
        }
    }
    return objct;
};

export const tradeList = () => {
    return [
        { id: Trades.CINESTAR, name: 'Cinestar' },
        { id: Trades.MOVIETIME, name: 'Movie Time' },
    ];
};

export const originList = () => {
    return [
        { id: 'web', name: 'Web' },
        { id: 'app', name: 'App' },
    ];
};

export const typeClientList = () => {
    return [
        { id: 'invitado', name: 'Invitado' },
        { id: 'socio', name: 'Socio' },
    ];
};

export const businessList = () => {
    return [
        { id: Business.STAR_PLAZA, name: 'Star Plaza' },
        { id: Business.TOP_RANK, name: 'Top Rank' },
    ];
};

export const bannerTypeList = () => {
    return [
        { id: 'web', name: 'Web' },
        { id: 'movil', name: 'Móvil' },
        { id: 'responsive', name: 'Web responsive' },
    ];
};

export const bannerPageList = () => {
    return [
        { id: Pages.HOME, name: 'Home' },
        { id: Pages.SOCIO, name: 'Socio' },
        { id: Pages.CORPORATIVO, name: 'Corporativo' },
        { id: Pages.PROMOCION, name: 'Promoción' },
    ];
};
