export interface Task {
    title: string;
    refreshInterval: number;
    refreshDate: Date;
    completed: boolean;
    completedBy: string;
}
