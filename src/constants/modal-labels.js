import { after } from "lodash"

export const PRIMARY_MODAL_LABELS = {
    deleteGroup: "Are you sure you want to delete this group?",
    afterDeleteGroup: "This group has been deleted successfully.",
    deleteHabit: "Are you sure you want to delete this habit?",
    afterDeleteHabit: "This habit has been deleted successfully.",
    undo: "Are you sure? All progress will be lost.",
    deleteAccount: "Are you sure you want to delete your account?",
    deleteAllHabits: "Are you sure you want to delete all your habits and progress?",
    afterDeleteAllHabits: "All your habits has been deleted successfully.",
    deleteAllHabitsProgress: "Are you sure you want to delete all your progress?",
    afterDeleteAllHabitsProgress: "All your progress has been deleted successfully."
}

export const SECONDARY_MODAL_LABEL = "This change cannot be undone."
export const BUTTON_LABELS = {
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    back: "Back"
}