export interface RepositoryFactoryLike {
  create: <T = unknown>(entityName: string, source?: string) => T
}

/**
 * 앱이 가진 repositoryFactory 인스턴스를 주입해 composable을 생성한다.
 *
 * - aideworks / cmh-proxy-ip-server: @core/data 의 repositoryFactory 전달
 * - cmh-chatbot: 엔진 data-adapter 기반 factory 전달
 */
export function createRepositoryFactoryComposable(repositoryFactory: RepositoryFactoryLike) {
  return function useRepositoryFactory() {
    return {
      repositoryFactory: repositoryFactory as unknown as { create: <T>(entityName: string) => any },
    }
  }
}

// 기본 export는 빈 객체 fallback. 각 앱에서 createRepositoryFactoryComposable(...) 사용을 권장.
export function useRepositoryFactory() {
  return {
    repositoryFactory: {
      create() {
        throw new Error('Repository factory is not configured. Use createRepositoryFactoryComposable(...) in the host app.')
      },
    } as { create: <T>(entityName: string) => any },
  }
}
