export interface Task {
    id: string;
    title: string;
    nextRefresh: Date;
    completed: boolean;
    completedBy: string;
}
