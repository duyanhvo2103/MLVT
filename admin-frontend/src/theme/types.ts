export interface StatusTheme {
    fontColor: string;
    backgroundColor: string;
}

export interface Theme {
    status: {
        complete: StatusTheme;
        inProgress: StatusTheme;
        failed: StatusTheme;
        raw: StatusTheme;
    };
    background: {
        main: string;
        white: string;
        lightPink: string;
        lightPurple: string;
    };
    fontColor: {
        black: string;
        gray: string;
        yellow: string;
    };
}
