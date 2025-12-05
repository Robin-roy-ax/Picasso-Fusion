/**
 * README: Setting up Visual Editing with Sanity
 * 
 * This file provides documentation for developers on how to use the visual editing features.
 */

## Environment Setup

Add the following to your `.env.local` file:

```bash
SANITY_VIEWER_TOKEN="your_viewer_token_here"
```

You can create a viewer token at: https://www.sanity.io/manage
1. Select your project
2. Go to API → Tokens
3. Create a new token with "Viewer" permissions

## Using Visual Editing in Your Components

### Basic Setup with Stega Encoding

When fetching data in your components, use the appropriate client based on draft mode:

```typescript
import { getClient } from '@/sanity/lib/client-helpers'

export default async function MyPage() {
  const client = await getClient()
  const data = await client.fetch(query)
  
  return <div>{data.title}</div>
}
```

The `getClient()` helper automatically returns the preview client with stega-encoding when in draft mode.

### Manual Client Selection

If you need more control:

```typescript
import { client, previewClient } from '@/sanity/lib/client'
import { draftMode } from 'next/headers'

export default async function MyPage() {
  const { isEnabled } = await draftMode()
  const sanityClient = isEnabled ? previewClient : client
  
  const data = await sanityClient.fetch(query)
  return <div>{data.title}</div>
}
```

### Enabling Drag and Drop for Arrays

To enable drag-and-drop reordering of array items:

1. Add data attributes to your array items:
```typescript
<div
  data-sanity-edit-target
  data-sanity={JSON.stringify({
    _id: item._id,
    _type: item._type,
    _path: `items[_key=="${item._key}"]`
  })}
>
  {item.content}
</div>
```

2. Hold Shift in Presentation tool to see the minimap and drag items

### Custom Overlay Components

You can create custom overlay plugins to add controls:

```typescript
import { defineOverlayPlugin } from '@sanity/visual-editing'

export const myPlugin = defineOverlayPlugin({
  name: 'my-custom-overlay',
  component: ({ documentId }) => {
    return <div>Custom control for {documentId}</div>
  }
})
```

## How to Use Presentation Tool

1. Start your dev server: `npm run dev`
2. Navigate to: http://localhost:3000/studio
3. Click the "Presentation" tab (next to Structure and Vision)
4. Select a document to preview
5. The preview will load in an iframe showing your live site
6. Hover over content to see blue overlay boxes
7. Click any content to jump to that field in the editor
8. Hold Shift to see the minimap for drag-and-drop (if configured)

## Troubleshooting

### Overlays not appearing
- Ensure draft mode is enabled
- Check that SANITY_VIEWER_TOKEN is set correctly
- Verify stega encoding is enabled in the client configuration

### Changes not reflecting immediately
- The preview client is configured to bypass CDN caching
- If changes still don't appear, check your GROQ query
- Ensure you're using the correct perspective: 'previewDrafts'

### "Invalid secret" error
- Regenerate your viewer token
- Ensure the token is properly set in .env.local
- Restart your dev server after changing environment variables
