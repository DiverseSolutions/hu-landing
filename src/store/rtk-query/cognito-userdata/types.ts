// Generated by https://quicktype.io

export interface CognitoUserDataByEmailResponse {
    Response: Response;
}

export interface Response {
    Users: User[];
}

export interface User {
    Username: string;
    Attributes: Attribute[];
    UserCreateDate: string;
    UserLastModifiedDate: string;
    Enabled: boolean;
    UserStatus: string;
}

export interface Attribute {
    Name: string;
    Value: string;
}