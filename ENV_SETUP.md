# IMPORTANT: Environment Variable Setup Required

## Action Needed

Before testing visual editing features, you must create a `.env.local` file with your Sanity viewer token:

### Step 1: Create the file

Create a new file: `.env.local` in the root of your project

### Step 2: Add the token

Add this content to `.env.local`:

```bash
SANITY_VIEWER_TOKEN="skyt6f2vKuE6sGFDN0reci2GMCRbWutn7TpWBOTa8ZzX21G5kwFVNX6uq2STclR8cwYnAQQT0KINLJeaUUo7tg6rBHMKhX2yarTyr64ZsGQbkreKeJJEb5aqbs65PMKKGe8SusAjkq1gaVRHucaUc4WKfgURIFguEyoklrW2j3SNnGJwYMJt"
```

### Step 3: Restart dev server

After creating the file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Why This is Needed

The viewer token is required to:
- Fetch draft/unpublished content from Sanity
- Enable stega-encoding for visual editing overlays
- Authenticate preview requests

Without this token, the Presentation tool will not be able to load draft content.

## Security Note

The `.env.local` file is already in your `.gitignore`, so this token will not be committed to your repository.
