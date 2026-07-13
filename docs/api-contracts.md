# API Contracts

Since this is a client-heavy landing and event page, backend services are kept minimal. We define one standard endpoint for contact and host expressions of interest.

## POST `/api/contact`

Submits an inquiry or expression of interest from an institution wishing to host or get information.

### Request Body (JSON)
Validated via Zod:
```typescript
{
  name: string;          // Contact Person
  email: string;         // Contact Email (valid email format)
  institution: string;   // Name of Campus/College/Organization
  role: string;          // Role (e.g., Student Representative, Faculty, HOD)
  message: string;       // Details of the inquiry (min 10 chars)
}
```

### Response (Success - 200 OK)
```json
{
  "success": true,
  "message": "Thank you for reaching out. We will get back to you shortly."
}
```

### Response (Error - 400 Bad Request)
```json
{
  "success": false,
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```
