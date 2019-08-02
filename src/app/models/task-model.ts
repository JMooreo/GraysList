export interface Task {
    id: string;
    title: string;
    refreshInterval: number;
    refreshDate: string;
    createdDate: string;
    completed: boolean;
    completedBy: string;
}
