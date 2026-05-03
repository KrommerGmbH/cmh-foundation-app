export interface NavigationMenuItem {
  id: string
  parentMenu?: string | null
  label: string
  routeName: string
  icon?: string
  position?: number
}

export interface NavigationRegistry {
  register: (item: NavigationMenuItem) => void
  unregister: (id: string) => void
  list: () => NavigationMenuItem[]
  getChildren: (parentMenu?: string | null) => NavigationMenuItem[]
}

export function createNavigationRegistry(initialItems: NavigationMenuItem[] = []): NavigationRegistry {
  const items = new Map<string, NavigationMenuItem>(initialItems.map((item) => [item.id, item]))

  return {
    register(item) {
      items.set(item.id, item)
    },
    unregister(id) {
      items.delete(id)
    },
    list() {
      return Array.from(items.values()).sort((left, right) => (left.position ?? 0) - (right.position ?? 0))
    },
    getChildren(parentMenu = null) {
      return Array.from(items.values())
        .filter((item) => (item.parentMenu ?? null) === parentMenu)
        .sort((left, right) => (left.position ?? 0) - (right.position ?? 0))
    },
  }
}