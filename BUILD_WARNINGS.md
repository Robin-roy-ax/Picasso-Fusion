# Build Warnings - Expected and Safe

## Deprecation Warnings

During npm install, you may see these deprecation warnings:

```
npm warn deprecated get-random-values-esm@1.0.2: use crypto.getRandomValues() instead
npm warn deprecated @sanity/next-loader@1.7.5: This package is deprecated. Please use 'next-sanity/live' instead.
```

## Why These Warnings Appear

These warnings come from **transitive dependencies** (dependencies of your dependencies) in the Sanity ecosystem:

- `get-random-values-esm` is used by `@sanity/visual-editing`, `@portabletext/editor`, and other Sanity packages
- `@sanity/next-loader` is included in `next-sanity@9.12.3` but the package has already migrated to using `next-sanity/live` (which we're using correctly)

## Why You Can't Fix Them

These are not direct dependencies in your `package.json`. They are:
- Managed by the Sanity team
- Will be fixed in future Sanity package updates
- Cannot be overridden without potentially breaking Sanity functionality

## Why They're Safe to Ignore

1. **Functionality Not Affected**: The deprecated packages still work perfectly fine
2. **Already Using Modern APIs**: Your code uses `next-sanity/live` correctly (not the deprecated loader)
3. **Sanity is Aware**: The Sanity team knows about these and is working on updates
4. **No Security Risk**: These are just deprecation warnings, not security vulnerabilities

## Vercel Build

These warnings appear during `npm install` but **do not affect the build**:
- ✅ Build completes successfully
- ✅ Application runs correctly
- ✅ No runtime errors

## What We've Done

1. ✅ Updated all Sanity packages to the latest versions
2. ✅ Already using `next-sanity/live` (the modern approach)
3. ✅ Verified build works despite warnings
4. ✅ Created `.npmrc` with minimal logging to reduce warning visibility

## When Will They Be Fixed?

These will be automatically resolved when:
- Sanity releases new versions of `@sanity/visual-editing`, `@portabletext/editor`, etc.
- Those packages update or remove the deprecated dependencies

Until then, these warnings are expected and safe to ignore.

## Monitoring

To check if newer versions are available:
```bash
npm outdated next-sanity sanity @sanity/vision
```

To update Sanity packages when new versions are released:
```bash
npm update next-sanity sanity @sanity/vision @sanity/preview-url-secret
```

---

**Last Updated**: December 2025  
**Status**: Safe to ignore - Waiting for Sanity package updates
