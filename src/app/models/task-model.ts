export interface Task {
    id: string;
    title: string;
    refreshInterval: number;
    refreshDate: string;
    completed: boolean;
    completedBy: string;
}
