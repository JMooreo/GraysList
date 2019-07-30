export interface Task {
    id: string;
    title: string;
    refreshInterval: number;
    nextRefresh: Date;
    completed: boolean;
    completedBy: string;
}
