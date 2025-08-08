# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application called "Stuff Happens" built with Expo and TypeScript. It's a stuff management application for mobile devices.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npx expo start

# Run on Android
npm run android
# or
npx expo run:android

# Run on iOS (macOS only)
npm run ios
# or
npx expo run:ios

# Run on web
npm run web

# Run tests
npm test
# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Build for production
npx expo build:android
npx expo build:ios
```

## Architecture Guidelines

This React Native application follows these architectural patterns:

### Component Structure

- Use functional components with hooks
- Organize components by feature/screen in directories
- Separate presentational and container components
- Use TypeScript for type safety throughout

### State Management

- Use Zustand for lightweight global state management
- Use React Query/TanStack Query for server state
- Use AsyncStorage for local persistence

### Navigation

- React Navigation v6 with bottom tabs as main navigation
- Stack navigation within individual tab screens
- TypeScript navigation types for type safety

### Folder Structure

```
src/
├── components/         # Reusable UI components
├── screens/           # Screen components
├── navigation/        # Navigation configuration
├── services/          # API calls and external services
├── store/            # State management (Zustand stores)
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── constants/        # Application constants
└── hooks/            # Custom React hooks
```

### Testing Strategy

- Use Jest and React Native Testing Library
- Test component behavior, not implementation
- Use MSW for API mocking
- Test user interactions and accessibility

## Mobile-Specific Considerations

- Design mobile-first with touch interactions
- Consider offline functionality and data sync
- Handle different screen sizes and orientations
- Use native device features appropriately
- Consider performance on lower-end devices

## Stuff Management Features

The application includes:

- Main navigation with 5 tabs: Home, Stuff, Add, List, Preferences
- Item CRUD operations for managing "stuff"
- Categories and organization system
- User authentication and data sync
- Offline-first data persistence

## Development Notes

- Follow React Native and Expo best practices
- Use Expo modules when possible for consistency
- Implement proper error boundaries
- Consider accessibility (screen readers, etc.)
- Test on both iOS and Android platforms
- Use TypeScript strictly - avoid `any` types

## Testing Instructions

**IMPORTANT**: All testing of the app must be done via Windows Command Prompt. When testing is required, provide specific commands to run and testing steps to follow. Do not attempt to run tests directly - instead provide instructions for manual testing.

# Claude Code Development Principles

## Core Development Philosophy

Follow these fundamental software engineering principles in all code you write, review, or modify:

## 1. KISS (Keep It Simple, Stupid)

- **Write straightforward, uncomplicated code** that solves the problem directly
- **Avoid clever tricks or overly complex solutions** unless absolutely necessary
- **Choose clarity over cleverness** - if there are two ways to solve a problem, pick the more readable one
- **Break complex problems into smaller, simpler parts**
- **Use descriptive variable and function names** that make the code self-documenting
- **Prefer explicit code over implicit behavior**

## 2. YAGNI (You Aren't Gonna Need It)

- **Only implement features that are currently needed** - don't build for hypothetical future requirements
- **Resist the urge to add "just in case" functionality**
- **Remove unused code, dependencies, and configuration** when you encounter it
- **Focus on the immediate requirements** rather than anticipated needs
- **If a feature isn't in the current sprint/milestone, don't build it**
- **Refactor and extend when you actually need the functionality**

## 3. Single Responsibility Principle

- **Each function should do one thing well** and have a single reason to change
- **Each module/class should have one clearly defined purpose**
- **If you can describe a function's purpose with "and", it probably does too much**
- **Separate business logic from presentation logic**
- **Separate data access from business logic**
- **Keep configuration separate from implementation**

## 4. Favor Readability and Maintainability

- **Write code as if the person maintaining it is a violent psychopath who knows where you live**
- **Use meaningful comments to explain WHY, not what** (the code should explain what)
- **Choose slightly verbose but clear code over terse but confusing code**
- **Use consistent formatting and naming conventions** throughout the project
- **Structure code in a logical, predictable way**
- **Make dependencies explicit and easy to understand**

## Specific Implementation Guidelines

### Code Structure

- **Use small, focused functions** (ideally 10-20 lines, never more than 50)
- **Limit function parameters** (3-4 max, use objects for more complex data)
- **Use clear, descriptive names** for variables, functions, and classes
- **Group related functionality** into well-organized modules
- **Keep related files together** in logical directory structures

### Error Handling

- **Handle errors explicitly** rather than ignoring them
- **Provide meaningful error messages** that help with debugging
- **Fail fast and fail clearly** when something goes wrong
- **Use consistent error handling patterns** throughout the application

### Testing and Documentation

- **Write tests for new functionality** (but don't over-engineer test coverage)
- **Include basic usage examples** in function/module documentation
- **Document any non-obvious business logic or domain-specific requirements**
- **Keep README and setup instructions current**

### Dependencies and Libraries

- **Minimize external dependencies** - only add what you actually need
- **Choose well-maintained, stable libraries** over cutting-edge alternatives
- **Document why specific libraries were chosen** for future maintainers
- **Regularly review and update dependencies** for security and compatibility

## Decision-Making Framework

When faced with implementation choices, ask yourself:

1. **Is this the simplest solution that works?**
2. **Will I actually need this flexibility/feature right now?**
3. **Does this function/module have a single, clear responsibility?**
4. **Will another developer understand this code in 6 months?**
5. **Can I explain this approach in plain English to a non-programmer?**

## Code Review Checklist

Before submitting code, ensure:

- [ ] Functions are small and focused on a single task
- [ ] Variable and function names clearly indicate their purpose
- [ ] No unnecessary complexity or premature optimization
- [ ] No features built for hypothetical future needs
- [ ] Error cases are handled appropriately
- [ ] Code follows existing project conventions
- [ ] Comments explain complex business logic, not obvious code

## Remember

**Good code is not just working code - it's code that can be easily understood, modified, and maintained by other developers (including your future self).** When in doubt, err on the side of simplicity and clarity.

The goal is to build an application that is reliable, maintainable, and easy for the team to work with over time.
