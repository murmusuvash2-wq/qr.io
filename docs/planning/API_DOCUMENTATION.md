# API Documentation

## Overview
The Express server (`server.ts`) handles API routes, primarily acting as a secure gateway to Google's Gemini AI and managing the scheduling of automated template generation.

## Routes

### `POST /api/generate-templates`
Generates a batch of 10 generic premium templates based on a theme.
- **Request Body:** `{ theme?: string }` (optional)
- **Response:** `{ themeTitle: string, templates: TemplateDesign[] }`

### `POST /api/generate-tool-templates`
Generates 10 premium templates tailored specifically for a given tool.
- **Request Body:** `{ toolId: string, toolName: string, toolDescription: string, toolCategory: string }`
- **Response:** `{ toolName: string, templates: TemplateDesign[] }`

### `GET /api/schedule`
Retrieves the current scheduling configuration for automated AI generation.
- **Response:** `{ enabled: boolean, time: string, dailyChallenge: string, lastRunDate: string, history: any[] }`

### `POST /api/schedule/config`
Updates the daily schedule configuration.
- **Request Body:** `{ enabled: boolean, time: string, dailyChallenge: string }`
- **Response:** `{ success: true, config: object }`

### `POST /api/schedule/run` (or `/api/daily-templates?force=true`)
Forces an immediate run of the daily template generation job.
- **Response:** `{ success: true, themeTitle: string, templates: TemplateDesign[] }`

### `POST /api/regenerate`
Forces regeneration of a specific template or set.

## Error Codes
- `400 Bad Request`: Missing required fields.
- `401 Unauthorized`: (Future) Missing admin token.
- `500 Internal Server Error`: Gemini API failure or internal processing error.
- `502/504 Gateway Timeout`: Gemini AI taking too long to respond.
