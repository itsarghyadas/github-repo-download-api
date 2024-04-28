import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export async function POST() {
  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/zipball",
      {
        owner: "repo__owner__example__[itsarghyadas]",
        repo: "repo_name__example__[github-repo-download-api]",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const status = response.status;
    const downloadUrl = response.url;
    return NextResponse.json({ success: true, status, downloadUrl });
  } catch (error) {
    console.error("Error fetching repository zipball:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch repository zipball." },
      { status: 500 }
    );
  }
}
