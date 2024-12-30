/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedDashboardIndexImport } from './routes/_authed/dashboard/index'
import { Route as AuthedDashboardTransactionsLayoutImport } from './routes/_authed/dashboard/transactions/_layout'
import { Route as AuthedDashboardTransactionsLayoutIndexImport } from './routes/_authed/dashboard/transactions/_layout.index'
import { Route as AuthedDashboardTransactionsNewLayoutImport } from './routes/_authed/dashboard/transactions/new/_layout'
import { Route as AuthedDashboardTransactionsTransactionIdLayoutImport } from './routes/_authed/dashboard/transactions/$transactionId/_layout'
import { Route as AuthedDashboardTransactionsNewLayoutIndexImport } from './routes/_authed/dashboard/transactions/new/_layout.index'
import { Route as AuthedDashboardTransactionsTransactionIdLayoutIndexImport } from './routes/_authed/dashboard/transactions/$transactionId/_layout.index'

// Create Virtual Routes

const AuthedDashboardTransactionsImport = createFileRoute(
  '/_authed/dashboard/transactions',
)()
const AuthedDashboardTransactionsNewImport = createFileRoute(
  '/_authed/dashboard/transactions/new',
)()
const AuthedDashboardTransactionsTransactionIdImport = createFileRoute(
  '/_authed/dashboard/transactions/$transactionId',
)()

// Create/Update Routes

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedDashboardTransactionsRoute =
  AuthedDashboardTransactionsImport.update({
    id: '/dashboard/transactions',
    path: '/dashboard/transactions',
    getParentRoute: () => AuthedRoute,
  } as any)

const AuthedDashboardIndexRoute = AuthedDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedDashboardTransactionsNewRoute =
  AuthedDashboardTransactionsNewImport.update({
    id: '/new',
    path: '/new',
    getParentRoute: () => AuthedDashboardTransactionsRoute,
  } as any)

const AuthedDashboardTransactionsTransactionIdRoute =
  AuthedDashboardTransactionsTransactionIdImport.update({
    id: '/$transactionId',
    path: '/$transactionId',
    getParentRoute: () => AuthedDashboardTransactionsRoute,
  } as any)

const AuthedDashboardTransactionsLayoutRoute =
  AuthedDashboardTransactionsLayoutImport.update({
    id: '/_layout',
    getParentRoute: () => AuthedDashboardTransactionsRoute,
  } as any)

const AuthedDashboardTransactionsLayoutIndexRoute =
  AuthedDashboardTransactionsLayoutIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthedDashboardTransactionsLayoutRoute,
  } as any)

const AuthedDashboardTransactionsNewLayoutRoute =
  AuthedDashboardTransactionsNewLayoutImport.update({
    id: '/_layout',
    getParentRoute: () => AuthedDashboardTransactionsNewRoute,
  } as any)

const AuthedDashboardTransactionsTransactionIdLayoutRoute =
  AuthedDashboardTransactionsTransactionIdLayoutImport.update({
    id: '/_layout',
    getParentRoute: () => AuthedDashboardTransactionsTransactionIdRoute,
  } as any)

const AuthedDashboardTransactionsNewLayoutIndexRoute =
  AuthedDashboardTransactionsNewLayoutIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthedDashboardTransactionsNewLayoutRoute,
  } as any)

const AuthedDashboardTransactionsTransactionIdLayoutIndexRoute =
  AuthedDashboardTransactionsTransactionIdLayoutIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthedDashboardTransactionsTransactionIdLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/_authed/dashboard/': {
      id: '/_authed/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthedDashboardIndexImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/dashboard/transactions': {
      id: '/_authed/dashboard/transactions'
      path: '/dashboard/transactions'
      fullPath: '/dashboard/transactions'
      preLoaderRoute: typeof AuthedDashboardTransactionsImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/dashboard/transactions/_layout': {
      id: '/_authed/dashboard/transactions/_layout'
      path: '/dashboard/transactions'
      fullPath: '/dashboard/transactions'
      preLoaderRoute: typeof AuthedDashboardTransactionsLayoutImport
      parentRoute: typeof AuthedDashboardTransactionsRoute
    }
    '/_authed/dashboard/transactions/$transactionId': {
      id: '/_authed/dashboard/transactions/$transactionId'
      path: '/$transactionId'
      fullPath: '/dashboard/transactions/$transactionId'
      preLoaderRoute: typeof AuthedDashboardTransactionsTransactionIdImport
      parentRoute: typeof AuthedDashboardTransactionsImport
    }
    '/_authed/dashboard/transactions/$transactionId/_layout': {
      id: '/_authed/dashboard/transactions/$transactionId/_layout'
      path: '/$transactionId'
      fullPath: '/dashboard/transactions/$transactionId'
      preLoaderRoute: typeof AuthedDashboardTransactionsTransactionIdLayoutImport
      parentRoute: typeof AuthedDashboardTransactionsTransactionIdRoute
    }
    '/_authed/dashboard/transactions/new': {
      id: '/_authed/dashboard/transactions/new'
      path: '/new'
      fullPath: '/dashboard/transactions/new'
      preLoaderRoute: typeof AuthedDashboardTransactionsNewImport
      parentRoute: typeof AuthedDashboardTransactionsImport
    }
    '/_authed/dashboard/transactions/new/_layout': {
      id: '/_authed/dashboard/transactions/new/_layout'
      path: '/new'
      fullPath: '/dashboard/transactions/new'
      preLoaderRoute: typeof AuthedDashboardTransactionsNewLayoutImport
      parentRoute: typeof AuthedDashboardTransactionsNewRoute
    }
    '/_authed/dashboard/transactions/_layout/': {
      id: '/_authed/dashboard/transactions/_layout/'
      path: '/'
      fullPath: '/dashboard/transactions/'
      preLoaderRoute: typeof AuthedDashboardTransactionsLayoutIndexImport
      parentRoute: typeof AuthedDashboardTransactionsLayoutImport
    }
    '/_authed/dashboard/transactions/$transactionId/_layout/': {
      id: '/_authed/dashboard/transactions/$transactionId/_layout/'
      path: '/'
      fullPath: '/dashboard/transactions/$transactionId/'
      preLoaderRoute: typeof AuthedDashboardTransactionsTransactionIdLayoutIndexImport
      parentRoute: typeof AuthedDashboardTransactionsTransactionIdLayoutImport
    }
    '/_authed/dashboard/transactions/new/_layout/': {
      id: '/_authed/dashboard/transactions/new/_layout/'
      path: '/'
      fullPath: '/dashboard/transactions/new/'
      preLoaderRoute: typeof AuthedDashboardTransactionsNewLayoutIndexImport
      parentRoute: typeof AuthedDashboardTransactionsNewLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthedDashboardTransactionsLayoutRouteChildren {
  AuthedDashboardTransactionsLayoutIndexRoute: typeof AuthedDashboardTransactionsLayoutIndexRoute
}

const AuthedDashboardTransactionsLayoutRouteChildren: AuthedDashboardTransactionsLayoutRouteChildren =
  {
    AuthedDashboardTransactionsLayoutIndexRoute:
      AuthedDashboardTransactionsLayoutIndexRoute,
  }

const AuthedDashboardTransactionsLayoutRouteWithChildren =
  AuthedDashboardTransactionsLayoutRoute._addFileChildren(
    AuthedDashboardTransactionsLayoutRouteChildren,
  )

interface AuthedDashboardTransactionsTransactionIdLayoutRouteChildren {
  AuthedDashboardTransactionsTransactionIdLayoutIndexRoute: typeof AuthedDashboardTransactionsTransactionIdLayoutIndexRoute
}

const AuthedDashboardTransactionsTransactionIdLayoutRouteChildren: AuthedDashboardTransactionsTransactionIdLayoutRouteChildren =
  {
    AuthedDashboardTransactionsTransactionIdLayoutIndexRoute:
      AuthedDashboardTransactionsTransactionIdLayoutIndexRoute,
  }

const AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren =
  AuthedDashboardTransactionsTransactionIdLayoutRoute._addFileChildren(
    AuthedDashboardTransactionsTransactionIdLayoutRouteChildren,
  )

interface AuthedDashboardTransactionsTransactionIdRouteChildren {
  AuthedDashboardTransactionsTransactionIdLayoutRoute: typeof AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren
}

const AuthedDashboardTransactionsTransactionIdRouteChildren: AuthedDashboardTransactionsTransactionIdRouteChildren =
  {
    AuthedDashboardTransactionsTransactionIdLayoutRoute:
      AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren,
  }

const AuthedDashboardTransactionsTransactionIdRouteWithChildren =
  AuthedDashboardTransactionsTransactionIdRoute._addFileChildren(
    AuthedDashboardTransactionsTransactionIdRouteChildren,
  )

interface AuthedDashboardTransactionsNewLayoutRouteChildren {
  AuthedDashboardTransactionsNewLayoutIndexRoute: typeof AuthedDashboardTransactionsNewLayoutIndexRoute
}

const AuthedDashboardTransactionsNewLayoutRouteChildren: AuthedDashboardTransactionsNewLayoutRouteChildren =
  {
    AuthedDashboardTransactionsNewLayoutIndexRoute:
      AuthedDashboardTransactionsNewLayoutIndexRoute,
  }

const AuthedDashboardTransactionsNewLayoutRouteWithChildren =
  AuthedDashboardTransactionsNewLayoutRoute._addFileChildren(
    AuthedDashboardTransactionsNewLayoutRouteChildren,
  )

interface AuthedDashboardTransactionsNewRouteChildren {
  AuthedDashboardTransactionsNewLayoutRoute: typeof AuthedDashboardTransactionsNewLayoutRouteWithChildren
}

const AuthedDashboardTransactionsNewRouteChildren: AuthedDashboardTransactionsNewRouteChildren =
  {
    AuthedDashboardTransactionsNewLayoutRoute:
      AuthedDashboardTransactionsNewLayoutRouteWithChildren,
  }

const AuthedDashboardTransactionsNewRouteWithChildren =
  AuthedDashboardTransactionsNewRoute._addFileChildren(
    AuthedDashboardTransactionsNewRouteChildren,
  )

interface AuthedDashboardTransactionsRouteChildren {
  AuthedDashboardTransactionsLayoutRoute: typeof AuthedDashboardTransactionsLayoutRouteWithChildren
  AuthedDashboardTransactionsTransactionIdRoute: typeof AuthedDashboardTransactionsTransactionIdRouteWithChildren
  AuthedDashboardTransactionsNewRoute: typeof AuthedDashboardTransactionsNewRouteWithChildren
}

const AuthedDashboardTransactionsRouteChildren: AuthedDashboardTransactionsRouteChildren =
  {
    AuthedDashboardTransactionsLayoutRoute:
      AuthedDashboardTransactionsLayoutRouteWithChildren,
    AuthedDashboardTransactionsTransactionIdRoute:
      AuthedDashboardTransactionsTransactionIdRouteWithChildren,
    AuthedDashboardTransactionsNewRoute:
      AuthedDashboardTransactionsNewRouteWithChildren,
  }

const AuthedDashboardTransactionsRouteWithChildren =
  AuthedDashboardTransactionsRoute._addFileChildren(
    AuthedDashboardTransactionsRouteChildren,
  )

interface AuthedRouteChildren {
  AuthedDashboardIndexRoute: typeof AuthedDashboardIndexRoute
  AuthedDashboardTransactionsRoute: typeof AuthedDashboardTransactionsRouteWithChildren
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedDashboardIndexRoute: AuthedDashboardIndexRoute,
  AuthedDashboardTransactionsRoute:
    AuthedDashboardTransactionsRouteWithChildren,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/dashboard': typeof AuthedDashboardIndexRoute
  '/dashboard/transactions': typeof AuthedDashboardTransactionsLayoutRouteWithChildren
  '/dashboard/transactions/$transactionId': typeof AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren
  '/dashboard/transactions/new': typeof AuthedDashboardTransactionsNewLayoutRouteWithChildren
  '/dashboard/transactions/': typeof AuthedDashboardTransactionsLayoutIndexRoute
  '/dashboard/transactions/$transactionId/': typeof AuthedDashboardTransactionsTransactionIdLayoutIndexRoute
  '/dashboard/transactions/new/': typeof AuthedDashboardTransactionsNewLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/dashboard': typeof AuthedDashboardIndexRoute
  '/dashboard/transactions': typeof AuthedDashboardTransactionsLayoutIndexRoute
  '/dashboard/transactions/$transactionId': typeof AuthedDashboardTransactionsTransactionIdLayoutIndexRoute
  '/dashboard/transactions/new': typeof AuthedDashboardTransactionsNewLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/_authed/dashboard/': typeof AuthedDashboardIndexRoute
  '/_authed/dashboard/transactions': typeof AuthedDashboardTransactionsRouteWithChildren
  '/_authed/dashboard/transactions/_layout': typeof AuthedDashboardTransactionsLayoutRouteWithChildren
  '/_authed/dashboard/transactions/$transactionId': typeof AuthedDashboardTransactionsTransactionIdRouteWithChildren
  '/_authed/dashboard/transactions/$transactionId/_layout': typeof AuthedDashboardTransactionsTransactionIdLayoutRouteWithChildren
  '/_authed/dashboard/transactions/new': typeof AuthedDashboardTransactionsNewRouteWithChildren
  '/_authed/dashboard/transactions/new/_layout': typeof AuthedDashboardTransactionsNewLayoutRouteWithChildren
  '/_authed/dashboard/transactions/_layout/': typeof AuthedDashboardTransactionsLayoutIndexRoute
  '/_authed/dashboard/transactions/$transactionId/_layout/': typeof AuthedDashboardTransactionsTransactionIdLayoutIndexRoute
  '/_authed/dashboard/transactions/new/_layout/': typeof AuthedDashboardTransactionsNewLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/dashboard/transactions'
    | '/dashboard/transactions/$transactionId'
    | '/dashboard/transactions/new'
    | '/dashboard/transactions/'
    | '/dashboard/transactions/$transactionId/'
    | '/dashboard/transactions/new/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/dashboard'
    | '/dashboard/transactions'
    | '/dashboard/transactions/$transactionId'
    | '/dashboard/transactions/new'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/_authed/dashboard/'
    | '/_authed/dashboard/transactions'
    | '/_authed/dashboard/transactions/_layout'
    | '/_authed/dashboard/transactions/$transactionId'
    | '/_authed/dashboard/transactions/$transactionId/_layout'
    | '/_authed/dashboard/transactions/new'
    | '/_authed/dashboard/transactions/new/_layout'
    | '/_authed/dashboard/transactions/_layout/'
    | '/_authed/dashboard/transactions/$transactionId/_layout/'
    | '/_authed/dashboard/transactions/new/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/dashboard/",
        "/_authed/dashboard/transactions"
      ]
    },
    "/_authed/dashboard/": {
      "filePath": "_authed/dashboard/index.tsx",
      "parent": "/_authed"
    },
    "/_authed/dashboard/transactions": {
      "filePath": "_authed/dashboard/transactions",
      "parent": "/_authed",
      "children": [
        "/_authed/dashboard/transactions/_layout",
        "/_authed/dashboard/transactions/$transactionId",
        "/_authed/dashboard/transactions/new"
      ]
    },
    "/_authed/dashboard/transactions/_layout": {
      "filePath": "_authed/dashboard/transactions/_layout.tsx",
      "parent": "/_authed/dashboard/transactions",
      "children": [
        "/_authed/dashboard/transactions/_layout/"
      ]
    },
    "/_authed/dashboard/transactions/$transactionId": {
      "filePath": "_authed/dashboard/transactions/$transactionId",
      "parent": "/_authed/dashboard/transactions",
      "children": [
        "/_authed/dashboard/transactions/$transactionId/_layout"
      ]
    },
    "/_authed/dashboard/transactions/$transactionId/_layout": {
      "filePath": "_authed/dashboard/transactions/$transactionId/_layout.tsx",
      "parent": "/_authed/dashboard/transactions/$transactionId",
      "children": [
        "/_authed/dashboard/transactions/$transactionId/_layout/"
      ]
    },
    "/_authed/dashboard/transactions/new": {
      "filePath": "_authed/dashboard/transactions/new",
      "parent": "/_authed/dashboard/transactions",
      "children": [
        "/_authed/dashboard/transactions/new/_layout"
      ]
    },
    "/_authed/dashboard/transactions/new/_layout": {
      "filePath": "_authed/dashboard/transactions/new/_layout.tsx",
      "parent": "/_authed/dashboard/transactions/new",
      "children": [
        "/_authed/dashboard/transactions/new/_layout/"
      ]
    },
    "/_authed/dashboard/transactions/_layout/": {
      "filePath": "_authed/dashboard/transactions/_layout.index.tsx",
      "parent": "/_authed/dashboard/transactions/_layout"
    },
    "/_authed/dashboard/transactions/$transactionId/_layout/": {
      "filePath": "_authed/dashboard/transactions/$transactionId/_layout.index.tsx",
      "parent": "/_authed/dashboard/transactions/$transactionId/_layout"
    },
    "/_authed/dashboard/transactions/new/_layout/": {
      "filePath": "_authed/dashboard/transactions/new/_layout.index.tsx",
      "parent": "/_authed/dashboard/transactions/new/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
