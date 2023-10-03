export enum Roles {
    SUPER_ADMIN = 'super-admin',
    CINEMA_ADMIN = 'cinema-admin',
    MARKETING = 'mkt',
}

export enum Pages {
    HOME = 'home',
    SOCIO = 'socio',
    CORPORATIVO = 'corporativo',
    PROMOCION = 'promocion',
}

export enum Trades {
    CINESTAR = 'CINESTAR',
    MOVIETIME = 'MOVIETIME',
}

export enum Business {
    TOP_RANK = 'TOP_RANK',
    STAR_PLAZA = 'STAR_PLAZA',
}

export enum AlertTypes {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
}

export enum PurchaseStatus {
    CONFIRMED = 'confirmed',
    ERROR = 'error',
    ERROR_BILLING = 'error-billing',
    ERROR_INTERNAL = 'error-internal',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum Actions {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    VIEW = 'VIEW',
    DELETE = 'DELETE',
}

export enum LogStatusSync {
    SYNCING = 'syncing',
    SUCCESS = 'success',
    ERROR = 'error',
}
