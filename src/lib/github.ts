import { Buffer } from 'buffer';

const GITHUB_REPO = process.env.GITHUB_REPO || 'HOLYKEYZ/nextphase-realestate';

export async function getGitHubFileSha(filePath: string): Promise<string | undefined> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return undefined;
  
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store', // Prevent fetching stale SHA
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.sha;
    }
  } catch (error) {
    console.error(`Error fetching SHA for ${filePath}:`, error);
  }
  return undefined;
}

export async function getGitHubFileContent(filePath: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return Buffer.from(data.content, 'base64').toString('utf8');
    }
  } catch (error) {
    console.error(`Error fetching content for ${filePath}:`, error);
  }
  return null;
}

export async function uploadToGitHub(filePath: string, content: string | Buffer, message: string, isBase64: boolean = false): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN missing - falling back to local operations.");
    return false;
  }

  const sha = await getGitHubFileSha(filePath);
  
  let contentEncoded: string;
  if (isBase64) {
    contentEncoded = typeof content === 'string' ? content : content.toString('base64');
  } else {
    // string content like JSON needs to be b64 encoded for GitHub API
    contentEncoded = Buffer.from(content as string).toString('base64');
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: contentEncoded,
        ...(sha ? { sha } : {}), // include SHA if file already exists to overwrite
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("GitHub API Upload Error:", err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to upload to GitHub:", error);
    return false;
  }
}
