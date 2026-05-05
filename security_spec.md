# Security Specification - CineTrack Pro

## Data Invariants
1. A movie entry must have a valid title, director, and year.
2. A movie entry must have a non-empty creatorId matching the actual creator.
3. Users can only edit/delete movies they created, or admins can edit any movie.
4. Users cannot change their own role in their user profile document.
5. `createdAt` and `creatorId` are immutable.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Create a movie with a `creatorId` of another user.
2. **Privilege Escalation**: Update user profile to set `role: 'admin'`.
3. **Ghost Field Injection**: Add a `isVerified: true` field to a user profile to bypass system logic.
4. **ID Poisoning**: Use a 2KB string as a document ID for a movie.
5. **Denial of Wallet**: Create a movie with a 1MB string in the `synopsis` field.
6. **State Shortcutting**: Change a movie visibility from `draft` to `public` without passing validation.
7. **Orphaned Writes**: Create a movie without a valid `creatorId`.
8. **PII Leak**: Attempt to read another user's profile which might contain private info (if we had private fields).
9. **Blanket Query Scraping**: Attempting to list all movies without a filter that the rules enforce.
10. **Immutable Violation**: Trying to change the `createdAt` timestamp on an update.
11. **Type Poisoning**: Setting `releaseYear` to a boolean value.
12. **Recursive Cost Attack**: Triggering multiple `get()` calls in a loop within rules (addressed by optimized rule structure).

## Test Runner
Rules will be tested against these scenarios to ensure `PERMISSION_DENIED`.
