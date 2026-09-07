import { defineConfig } from 'oxfmt'

export default defineConfig({
  experimentalOperatorPosition: 'start',

  objectWrap: 'preserve',
  printWidth: 80,
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  sortImports: {
    groups: [
      ['value-builtin', 'value-external'],
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      'type-import',
      'unknown',
    ],
    newlinesBetween: true,
  },
  sortPackageJson: { sortScripts: true },
})
