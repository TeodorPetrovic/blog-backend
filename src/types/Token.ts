export interface Token {
    id: number;
    email: string;
    type: 'access' | 'refresh';
}