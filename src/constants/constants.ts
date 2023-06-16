export const CONSTANTS = {
  TITLE: "Sprint FWD",
  ACTIVE: "active",
  COMPLETED: "completed",
  BUTTON: "button",
  TEAM: "Team",
  TEXT: "text",
  PLACEHOLDER_NEW_TODO: "Enter a new todo",
  PLACEHOLDER_INDEX_TODO: "Search To-Do",
  PREV: "Prev",
  NEXT: "Next",
  SUBMIT: "submit",
  CANCEL: "Cancel",
  MOUSEDOWN: "mousedown",
  ESCAPE: "Escape",
  BARS: `&#x2630`,
  TASK: "task",
  DELETE: "Delete",
  EDIT: "Edit",
  CREATE: "Create",
  CONFIRMATION: "Are you sure to delete this?",
  MEMBERS: "Members",
  PAGE_NOT_FOUND: "Page Not Found",
  RELOAD: "The requested page could not be found.",
  TEAMS: "Teams",
  ACTIVE_TASKS: "Active Tasks",
  COMPLETED_TASKS: "Completed Tasks",
}

export const MESSAGES = {
  ERROR: 'Unexpected error occured'
}

export const menuItems = [
  {
    title: "Todo",
    url: "todo",
  },
  {
    title: "Teams",
    url: "teams",
  },
  {
    title: "Members",
    url: "members",
  },
]

export const MembersColumn = [
  { name: "id", label: "ID" },
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "team.name", label: "Team" },
]

export const TeamColumns = [
  { name: "id", label: "ID" },
  { name: "name", label: "Name" },
  { name: "member_count", label: "Members" },
]
