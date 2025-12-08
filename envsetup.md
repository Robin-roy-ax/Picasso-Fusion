# Environment Setup

To run this project, you need to set up the following environment variables. You can copy `.env.local.example` to `.env.local` if available, or create a new `.env.local` file in the root directory.

## Required Variables

The following variables are required for Sanity integration:

\`\`\`bash
# Sanity Project Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name

# Sanity API Tokens
# Token with read permissions
SANITY_API_READ_TOKEN=your_read_token
# Token with write permissions (for visual editing/mutations)
SANITY_API_WRITE_TOKEN=your_write_token
\`\`\`

## Getting Values

1. **Project ID & Dataset**: Found in your Sanity project dashboard under **Project Settings > General**.
2. **API Tokens**: Generate these in **Project Settings > API > Tokens**.
    - Create a token with **Viewer** role for `SANITY_API_READ_TOKEN`.
    - Create a token with **Editor** role for `SANITY_API_WRITE_TOKEN`.
