export class TokenResponse {
    public refresh: string
    public access: string
    constructor(
        refresh: string,
        access: string
    ) {
        this.refresh = refresh
        this.access = access
    }
}

export class Registration {
    public username: string
    public email: string
    public password1: string
    public password2: string
    constructor(
        username: string,
        email: string,
        password1: string,
        password2: string
    ) {
        this.username = username
        this.email = email
        this.password1 = password1
        this.password2 = password2
    }
}