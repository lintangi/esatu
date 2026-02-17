// This file runs on the Vercel server, not in the browser.
// It securely handles the GitHub Token to update data.json.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Ensure these Environment Variables are set in Vercel Project Settings
  const {
    GITHUB_TOKEN,
    REPO_OWNER,
    REPO_NAME,
    FILE_PATH = 'data.json' // Defaults to root, change to 'src/data.json' or 'public/data.json' if needed via Env Var
  } = process.env;

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
    return res.status(500).json({ 
      message: 'Server Configuration Error: Missing GitHub Environment Variables (GITHUB_TOKEN, REPO_OWNER, REPO_NAME).' 
    });
  }

  try {
    const newData = req.body; // The JSON data sent from the frontend

    // 1. Get the current file's SHA (required to update it)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!getFileResponse.ok) {
        const errorText = await getFileResponse.text();
        // Handle 404 if file doesn't exist yet (create it), otherwise throw
        if (getFileResponse.status !== 404) {
            throw new Error(`Failed to fetch file from GitHub (${FILE_PATH}): ${errorText}`);
        }
    }

    let sha = null;
    if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
    }

    // 2. Commit the new data
    // Content must be Base64 encoded
    const content = Buffer.from(JSON.stringify(newData, null, 2)).toString('base64');

    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update school data via Admin Dashboard', // Commit message
          content: content,
          sha: sha, // The SHA of the file we are replacing (if it exists)
        }),
      }
    );

    if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Failed to update file on GitHub: ${errorText}`);
    }

    return res.status(200).json({ success: true, message: 'Data updated successfully. Vercel deployment triggered.' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: error.message });
  }
}