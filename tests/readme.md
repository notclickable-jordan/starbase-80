# Component Testing Documentation

This document describes the comprehensive snapshot test suite for all components in the `src/components` directory.

## Overview

The test suite includes snapshot tests across 5 components, providing comprehensive coverage of all component props, variations, and edge cases.

## Components Tested

### 1. Anchor Component (`anchor.ts`)

- **Total Tests**: 22 snapshots
- **Coverage**: 100% statements, branches, functions, and lines
- **Test Categories**:
    - Required props only (uri)
    - Title variations (short, long, themed)
    - ClassName variations (5 colors, long classNames)
    - Children variations (text, HTML, long content)
    - NewWindow variations (true/false)
    - Combined prop scenarios

### 2. Header Component (`header.ts`)

- **Total Tests**: 26 snapshots
- **Coverage**: 100% statements, branches, functions, and lines
- **Test Categories**:
    - No props (optional props test)
    - Title variations (short, long, 5 color themes, special characters)
    - Icon variations (local paths, URLs, long paths, 5 color themes)
    - Combined prop scenarios

### 3. Icon Component (`icon.ts`)

- **Total Tests**: 41 snapshots
- **Coverage**: 98.86% statements, 93.84% branches, 100% functions, 98.83% lines
- **Test Categories**:
    - Required props only (name, index)
    - Icon type variations (HTTP URLs, local paths, Material Design, Dashboard icons, SelfHst icons)
    - IconColor variations (5 colors, hex colors)
    - IconBG variations (5 colors, hex backgrounds)
    - IconBubble and IconBubblePadding variations
    - IconAspect variations (square, width, height)
    - URI and newWindow combinations
    - CategoryBubblePadding variations
    - Blank icon scenarios
    - Complex combined scenarios

### 4. Services Component (`services.ts`)

- **Total Tests**: 21 snapshots
- **Coverage**: 100% statements, branches, functions, and lines
- **Test Categories**:
    - Empty and single service arrays
    - CategoryBubblePadding variations
    - Services with all/minimal properties
    - Color-themed services (5 colors)
    - Long content handling
    - Different icon types
    - Large service collections (12 services)
    - Edge cases (empty strings, special characters)

### 5. ServiceCatalogList Component (`service-catalogs.ts`)

- **Total Tests**: 27 snapshots
- **Coverage**: 91.66% statements, 88.88% branches, 100% functions, 91.3% lines
- **Test Categories**:
    - Empty and multiple categories
    - Bubble variations (enabled/disabled)
    - Bubble background variations (5 colors, light/dark themes)
    - IconBubblePadding variations
    - Long content handling
    - Color-themed categories (5 colors)
    - Complex multi-category scenarios
    - Edge cases

## Color Themes Tested

Each component is tested with a consistent set of 5 color themes:

- **blue**: Primary blue theme
- **rose**: Pink/rose theme
- **green**: Green theme
- **red**: Red theme
- **yellow**: Yellow theme

## String Length Testing

All components are tested with:

- **Short strings**: Basic functionality
- **Long strings**: 150+ character strings to test layout handling
- **Empty strings**: Edge case handling
- **Special characters**: HTML entities, symbols, quotes

## Prop Combinations Tested

For each component, tests cover:

1. **Required props only**: Minimal viable configuration
2. **Single optional prop**: Each optional prop tested individually
3. **Multiple optional props**: Common combinations
4. **All props**: Maximum configuration
5. **Color-themed combinations**: All props with themed values
6. **Long content combinations**: All props with extended content

## Test Structure

Each test file follows this pattern:

```typescript
describe('ComponentName Component', () => {
  describe('Required props only', () => { ... });
  describe('With [propName] variations', () => { ... });
  describe('Combined prop variations', () => { ... });
  describe('Edge cases', () => { ... });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Coverage Report

The current test coverage achieves:

- **Components**: 97.84% statements, 94.68% branches, 100% functions
- **Overall**: 59.2% statements (including untested utility files)

Only minor edge cases in conditional logic remain untested, with excellent coverage of the component rendering logic.

## Snapshot Management

Snapshots are automatically generated and stored in `tests/components/__snapshots__/`. To update snapshots after component changes:

```bash
npm test -- --updateSnapshot
```

## Test Benefits

1. **Regression Prevention**: Detects unintended changes to component output
2. **Comprehensive Coverage**: Tests all prop combinations and edge cases
3. **Documentation**: Snapshots serve as examples of component usage
4. **Refactoring Safety**: Enables confident refactoring with change detection
5. **Cross-browser Consistency**: Ensures consistent rendering across environments
