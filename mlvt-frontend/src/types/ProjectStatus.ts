// project status
export enum ProjectStatus {
    Succeeded = 'succeeded',
    Processing = 'processing',
    Failed = 'failed',
    Raw = 'raw',
}

export const mapStatusToProjectStatus = (status: string) => {
    switch (status.toLowerCase()) {
        case 'succeeded':
            return ProjectStatus.Succeeded;
        case 'processing': // Ensure the string matches exactly what's expected.
            return ProjectStatus.Processing;
        case 'failed':
            return ProjectStatus.Failed;
        case 'raw':
            return ProjectStatus.Raw;
        default:
            throw new Error(`Unhandled status: ${status}`);
    }
};

export const toDisplayText = (status: ProjectStatus) => {
    switch (status) {
        case ProjectStatus.Succeeded:
            return 'Succeeded';
        case ProjectStatus.Processing:
            return 'Processing';
        case ProjectStatus.Failed:
            return 'Failed';
        case ProjectStatus.Raw:
            return 'Raw';
    }
};
