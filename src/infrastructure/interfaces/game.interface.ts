export interface IGame { 
    Id: string;
    CreatedBy?: any;
    IsRunning: boolean;
    IsDeleted: boolean;
    Status: number;
    CreatedAt: number;
    ExpiredAt: number;
    CancelledAt: number;
    Region: string;
    Country: string;
}