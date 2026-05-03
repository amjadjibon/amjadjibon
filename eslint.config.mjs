import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'
import coreWebVitalsConfig from 'eslint-config-next/core-web-vitals'

export default [
  {
    ignores: ['next-env.d.ts', 'next.config.js'],
  },
  js.configs.recommended,
  ...coreWebVitalsConfig,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: '19.0.0',
      },
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
