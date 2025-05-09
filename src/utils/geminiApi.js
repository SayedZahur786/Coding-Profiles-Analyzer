import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function generateInsights(data) {
  try {
    let prompt = ''

    if (data.type === 'leetcode') {
      prompt = `
        As an expert competitive programming coach, analyze this student's LeetCode performance and provide insights in a clear, structured format.

        LeetCode Statistics:
        - Total Questions Solved: ${data.data.totalSolved} out of ${data.data.totalQuestions}
        - Easy Problems: ${data.data.easySolved}/${data.data.totalEasy}
        - Medium Problems: ${data.data.mediumSolved}/${data.data.totalMedium}
        - Hard Problems: ${data.data.hardSolved}/${data.data.totalHard}
        - Acceptance Rate: ${data.data.acceptanceRate}%
        - Ranking: ${data.data.ranking}
        - Contribution Points: ${data.data.contributionPoints}
        - Coding Experience: ${data.codingDuration || 'Unknown'} months

        Format your response exactly like this, with these exact headings and no special formatting characters:

        PERFORMANCE ASSESSMENT
        [Write a clear assessment of their current level and progress, using plain text]

        KEY STRENGTHS
        - [First strength in plain text]
        - [Second strength in plain text]
        - [Third strength in plain text]

        AREAS FOR IMPROVEMENT
        - [First area with actionable advice in plain text]
        - [Second area with actionable advice in plain text]
        - [Third area with actionable advice in plain text]

        RECOMMENDED STUDY PLAN
        [Write a clear study plan using plain text, with bullet points using simple hyphens]

        FOCUS TOPICS
        - [First topic with example problem in plain text]
        - [Second topic with example problem in plain text]
        - [Third topic with example problem in plain text]

        NEXT STEPS
        [Provide clear, actionable next steps in plain text]

        Important: Do not use any special characters or formatting (like **, *, or #). Use only plain text and simple hyphens for bullet points.
      `
    } else if (data.type === 'codeforces') {
      prompt = `
        As an expert competitive programming coach, analyze this student's Codeforces performance and provide insights in a clear, structured format.

        Codeforces Statistics:
        - Current Rating: ${data.data.rating}
        - Max Rating: ${data.data.maxRating}
        - Rank: ${data.data.rank}
        - Contribution: ${data.data.contribution}
        - Last Active: ${data.data.lastActive}
        
        Student's Challenges:
        ${data.data.challenges}

        Format your response exactly like this, with these exact headings and no special formatting characters:

        PERFORMANCE ASSESSMENT
        [Write a clear assessment of their current level and progress, using plain text]

        KEY STRENGTHS
        - [First strength in plain text]
        - [Second strength in plain text]
        - [Third strength in plain text]

        AREAS FOR IMPROVEMENT
        - [First area with actionable advice in plain text]
        - [Second area with actionable advice in plain text]
        - [Third area with actionable advice in plain text]

        TRAINING PLAN
        [Write a clear training plan using plain text, with bullet points using simple hyphens]

        CONTEST STRATEGY
        [Provide specific tips for contest improvement in plain text]

        NEXT STEPS
        [Provide clear, actionable next steps in plain text]

        Important: Do not use any special characters or formatting (like **, *, or #). Use only plain text and simple hyphens for bullet points.
      `
    } else if (data.type === 'github') {
      prompt = `
        As an expert software development mentor, analyze this developer's GitHub profile and provide insights in a clear, structured format.

        Developer Profile:
        - Role: ${data.data.role}
        - Primary Tech Stack: ${data.data.primaryStack}
        - Secondary Tech Stack: ${data.data.secondaryStack}
        - Other Languages: ${data.data.otherLanguages}
        - Public Repos: ${data.data.public_repos}
        - Followers: ${data.data.followers}
        - Last Active: ${data.data.lastActive}

        Format your response exactly like this, with these exact headings and no special formatting characters:

        PROFILE ASSESSMENT
        [Write a clear assessment of their GitHub presence and activity, using plain text]

        KEY STRENGTHS
        - [First strength in plain text]
        - [Second strength in plain text]
        - [Third strength in plain text]

        AREAS FOR IMPROVEMENT
        - [First area with actionable advice in plain text]
        - [Second area with actionable advice in plain text]
        - [Third area with actionable advice in plain text]

        PROJECT RECOMMENDATIONS
        [Suggest projects aligned with their tech stack in plain text]

        CONTRIBUTION STRATEGY
        [Share specific tips for improving contributions in plain text]

        NEXT STEPS
        [Provide clear, actionable next steps in plain text]

        Important: Do not use any special characters or formatting (like **, *, or #). Use only plain text and simple hyphens for bullet points.
      `
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }
    )

    if (!response.data || !response.data.candidates || !response.data.candidates.length) {
      return 'Unable to generate insights at this time. Please try again later.'
    }

    const candidate = response.data.candidates[0]
    if (!candidate.content || !candidate.content.parts || !candidate.content.parts.length) {
      return 'Unable to generate insights at this time. Please try again later.'
    }

    return candidate.content.parts[0].text || 'Unable to generate insights at this time. Please try again later.'
  } catch (error) {
    console.error('Error generating insights:', error)
    return 'An error occurred while generating insights. Please check your API key and try again.'
  }
}