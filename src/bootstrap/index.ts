import { createRepositoryFactoryComposable, type RepositoryFactoryLike } from './useRepositoryFactory.js'

export interface FoundationBootstrapOptions {
  appName: string
  version?: string
  repositoryFactory?: RepositoryFactoryLike
  notificationStoreId?: string
}

export interface FoundationBootstrapRuntime {
  appName: string
  version: string
  notificationStoreId: string
  hasRepositoryFactory: boolean
}

export function createFoundationBootstrap(options: FoundationBootstrapOptions) {
  return {
    appName: options.appName,
    version: options.version ?? '0.1.0',
    notificationStoreId: options.notificationStoreId ?? 'cmh-notification',
    hasRepositoryFactory: Boolean(options.repositoryFactory),
  }
}

export function createFoundationRuntime(options: FoundationBootstrapOptions): FoundationBootstrapRuntime {
  return createFoundationBootstrap(options)
}

export function createFoundationRepositoryComposable(repositoryFactory: RepositoryFactoryLike) {
  return createRepositoryFactoryComposable(repositoryFactory)
}

export * from './useRepositoryFactory.js'
export * from './notification.store.js'
