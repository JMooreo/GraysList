export interface Task {
    id: string;
    title: string;
    refreshInterval: number;
    refreshDate: Date;
    completed: boolean;
    completedBy: string;
}
