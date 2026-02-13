---
title: tsconfig.json  vue + vite字段解析
date: 2025-04-03
---
[官方文档关于tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "jsx": "preserve",
    "allowJs": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "rootDir": "src",
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}

```