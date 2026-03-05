import { ProjectStatus } from "../types/ProjectStatus";

/**
 * Maps a project status to a specific background and font color.
 * @param {ProjectStatus} status - The status of the project.
 * @returns An object with backgroundColor and fontColor hex codes.
 */
export function mapStatusToColor(status: ProjectStatus) {
    switch (status) {
        case ProjectStatus.Processing:
            return { backgroundColor: "#FFCC00", fontColor: "#000000" };
        case ProjectStatus.Succeeded:
            return { backgroundColor: "#C0EBA6", fontColor: "#16610E" };
        case ProjectStatus.Failed:
            return { backgroundColor: "#F8C4B4", fontColor: "#CF0A0A" };
        case ProjectStatus.Raw:
            return { backgroundColor: "#CCCCCC", fontColor: "#000000" };
        default:
            return { backgroundColor: "#FFFFFF", fontColor: "#000000" };
    }
}