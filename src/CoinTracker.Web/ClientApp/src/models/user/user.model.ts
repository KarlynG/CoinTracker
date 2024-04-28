export interface User {
    id: string | undefined;
    firebaseId: string;
    name: string;
    lastName: string | undefined;
    totalSpentMonth: number | undefined;
    totalSpentYear: number | undefined;
    totalSpentEver: number | undefined;
}