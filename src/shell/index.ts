export interface AppShellSidebarState {
  opened: boolean
  width?: number
}

export interface AppShellContract {
  getSidebarState: () => AppShellSidebarState
  setSidebarOpened: (opened: boolean) => AppShellSidebarState
  setSidebarWidth: (width: number) => AppShellSidebarState
}

export function createAppShellContract(initialState: AppShellSidebarState = { opened: false }): AppShellContract {
  const state: AppShellSidebarState = { ...initialState }

  return {
    getSidebarState() {
      return { ...state }
    },
    setSidebarOpened(opened: boolean) {
      state.opened = opened
      return { ...state }
    },
    setSidebarWidth(width: number) {
      state.width = width
      return { ...state }
    },
  }
}