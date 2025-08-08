# Production Deployment Checklist

Use this checklist every time you merge development branch into main to ensure production readiness.

## 📋 **Pre-Merge Code Quality**

### Code Standards
- [ ] Run `npm run lint` - All ESLint errors resolved
- [ ] Run `npm run format` - All code properly formatted with Prettier
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm test` - All tests passing (if applicable)

### Dependencies & Security
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Update critical dependencies if needed: `npm update`
- [ ] Verify all dependencies are properly listed in package.json
- [ ] Remove any unused dependencies

## 🔧 **Build Configuration**

### Environment Setup
- [ ] Verify app.json configuration is production-ready
- [ ] Check bundle identifiers: `com.stuffhappens.mobile`
- [ ] Confirm app version and build numbers are incremented
- [ ] Validate all asset files exist (icon.png, splash.png, etc.)

### EAS Configuration
- [ ] Verify eas.json profiles are correct
- [ ] Ensure production profile builds APK: `"buildType": "apk"`
- [ ] Check .easignore excludes unnecessary files (keeps uploads small)
- [ ] Confirm .npmrc has `legacy-peer-deps=true` for dependency resolution

## 📱 **Testing & Validation**

### Development Testing
- [ ] Test with Expo Go: `npm start` + QR code scan
- [ ] Verify all screens render correctly
- [ ] Test navigation between all tabs and admin screens
- [ ] Confirm custom fonts (Besley, Montserrat) load properly
- [ ] Check header consistency across all screens

### Build Testing
- [ ] Create development build: `eas build --platform android --profile development`
- [ ] Install and test development APK on physical device
- [ ] Verify app functions without Expo Go dependency
- [ ] Test all core functionality in standalone mode

## 🚀 **Production Build Process**

### Pre-Build Checks
- [ ] Commit all changes with proper commit messages
- [ ] Push all changes to development branch
- [ ] Create pull request from development to main
- [ ] Code review completed and approved

### Build Execution
- [ ] Merge development branch into main
- [ ] Switch to main branch locally: `git checkout main && git pull`
- [ ] Create production build: `eas build --platform android --profile production`
- [ ] Monitor build process for errors
- [ ] Download and test production APK

### Production Validation
- [ ] Install production APK on clean device (factory reset or new device)
- [ ] Verify app launches correctly with splash screen
- [ ] Test all primary user flows
- [ ] Confirm no development tools are visible
- [ ] Check app performs well on lower-end devices
- [ ] Verify app works offline (for applicable features)

## 📊 **Performance & Quality**

### App Performance
- [ ] Check app bundle size is reasonable (< 50MB recommended)
- [ ] Verify fast startup time (< 3 seconds to usable)
- [ ] Test memory usage doesn't exceed device limits
- [ ] Confirm smooth animations and transitions

### User Experience
- [ ] Verify design system consistency across all screens
- [ ] Check all interactive elements have proper touch targets
- [ ] Confirm accessibility features work (screen readers, etc.)
- [ ] Test on different screen sizes and orientations

## 🔒 **Security & Privacy**

### Code Security
- [ ] No API keys or secrets in code (use environment variables)
- [ ] All user inputs properly validated
- [ ] Secure network requests (HTTPS only)
- [ ] Proper error handling without exposing sensitive data

### Privacy Compliance
- [ ] Review data collection and usage
- [ ] Ensure privacy policy is current
- [ ] Verify permissions requested are necessary and justified

## 📝 **Documentation & Deployment**

### Documentation Updates
- [ ] Update CHANGELOG.md with new features and fixes
- [ ] Update README.md if needed
- [ ] Document any breaking changes
- [ ] Update API documentation (if applicable)

### Release Preparation
- [ ] Tag release in git: `git tag v1.x.x`
- [ ] Create GitHub release with release notes
- [ ] Prepare app store listings (if applicable)
- [ ] Update version in app stores

### Post-Deployment
- [ ] Monitor app performance and crash reports
- [ ] Verify analytics are working (if implemented)
- [ ] Check for user feedback and reviews
- [ ] Plan hotfix process if critical issues found

## ⚡ **Quick Commands Reference**

```bash
# Code Quality
npm run lint && npm run format && npm run type-check

# Development Testing  
npm start

# Production Build
eas build --platform android --profile production

# Local Android Build (if needed)
cd android && gradlew assembleRelease

# Version Management
git tag v1.x.x && git push --tags
```

## 🚨 **Red Flags - DO NOT DEPLOY IF:**

- [ ] ESLint errors present
- [ ] TypeScript compilation errors
- [ ] Build failures or warnings
- [ ] App crashes on startup
- [ ] Critical features not working
- [ ] Performance significantly degraded
- [ ] Security vulnerabilities unresolved

---

**Note:** This checklist should be reviewed and updated as the project evolves. Consider automating as many steps as possible through CI/CD pipelines.