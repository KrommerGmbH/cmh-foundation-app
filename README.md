# @cmh/foundation-app

Application foundation contracts for local Shopware-oriented Electron admin apps.

## Overview

`@cmh/foundation-app` is an open-source foundation package for local, desktop-first Electron admin applications that follow a Shopware-oriented host architecture.

It provides shared contracts and lightweight runtime helpers for renderer-side foundations such as DAL access, i18n helpers, bootstrap helpers, navigation registry, and shell state handling.

## Purpose

Use this package when a host app needs shared contracts for:

- DAL access through `DataAdapter`, `RepositoryFactory`, `Repository`, and `Criteria`
- entity definition and registry management
- repository-factory composition helpers for renderer hosts
- notification store creation
- shared locale helpers and supported locale conventions
- navigation registry management
- shell/sidebar state contracts

The host application still owns actual storage, entity registration timing, route composition, and business-domain rules.

## Public exports

- `@cmh/foundation-app`
- `@cmh/foundation-app/dal`
- `@cmh/foundation-app/i18n`
- `@cmh/foundation-app/bootstrap`
- `@cmh/foundation-app/entity`
- `@cmh/foundation-app/menu`
- `@cmh/foundation-app/shell`

## Host responsibilities

The consuming host must provide:

- a `DataAdapter` implementation
- entity definition registration before repository creation
- actual Vue/Pinia/i18n runtime wiring
- route ownership and navigation composition
- shell state to UI binding
- business validation, permissions, and persistence decisions

`RepositoryFactory` is intentionally adapter-driven. If entity definitions are not registered, repository creation fails by design.

## Bootstrap contract

The bootstrap layer currently provides:

- `createFoundationBootstrap()` / `createFoundationRuntime()` for lightweight runtime metadata
- `createFoundationRepositoryComposable()` for repository-factory injection into renderer hosts
- notification store helpers

It is a host integration layer, not a full app framework.

## Out of scope

This package does not provide:

- a universal database backend
- automatic entity discovery
- a complete Electron shell app
- business-domain modules
- remote APIs
- authentication/authorization framework
- Shopware branding approval or trademark rights
- relicensing of third-party assets

## Open-source and third-party notice

This package is open source.

It is intended for hosts that build local Shopware-oriented Electron admin apps and may be used together with upstream Shopware-oriented UI dependencies in the consuming application. Shopware, Shopware Meteor Component Library, and any related names, trademarks, icons, or design assets remain under their own upstream licenses, terms, and branding rules.

Consumers must review and comply with the applicable upstream licenses and branding requirements for their own use, packaging, and distribution.

This package does not grant trademark rights and does not relicense third-party assets.
