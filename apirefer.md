API Reference Requested
This note covers the APIs you asked for:

Admin organizations
CMS APIs
Contact API
Coupon management
Educator/student reschedule flow
Student certificates API
It uses the current codebase contracts, not guesses.

1. Shared Rules
Admin routes require Authorization: Bearer <adminToken>.
Student routes require Authorization: Bearer <studentToken> and x-user-id: <studentUserId>.
Educator routes require Authorization: Bearer <educatorToken> and x-user-id: <educatorUserId>.
Most write routes expect Content-Type: application/json.
OPTIONS preflight is supported on the routes below.
2. Admin Organizations API
Base route:

GET /api/admin/organizations
POST /api/admin/organizations
GET /api/admin/organizations/[id]
PUT /api/admin/organizations/[id]
DELETE /api/admin/organizations/[id]
What it does
GET returns paginated organizations with search and filters.
POST creates a new organization.
GET [id] fetches one organization.
PUT [id] updates one organization.
DELETE [id] removes one organization.
List organizations
curl -X GET "http://localhost:3000/api/admin/organizations?page=1&limit=10" \
  -H "Authorization: Bearer <adminToken>"
Create organization
curl -X POST "http://localhost:3000/api/admin/organizations" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Institute",
    "type": "institution",
    "email": "hello@newinstitute.edu",
    "status": "active",
    "billingCycle": "monthly"
  }'
Update organization
curl -X PUT "http://localhost:3000/api/admin/organizations/<organizationId>" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Institute",
    "status": "active"
  }'
Delete organization
curl -X DELETE "http://localhost:3000/api/admin/organizations/<organizationId>" \
  -H "Authorization: Bearer <adminToken>"
Organization flow text
Admin opens the organizations screen.
Frontend calls GET /api/admin/organizations with page and filters.
Admin creates or edits an organization from the form.
Frontend calls POST /api/admin/organizations or PUT /api/admin/organizations/[id].
The list refreshes after save.
Admin can delete the organization if it is no longer needed.
3. CMS APIs
In this codebase, CMS means the admin blog/content APIs.

Base route:

GET /api/admin/blogs
POST /api/admin/blogs
GET /api/admin/blogs/[id]
PUT /api/admin/blogs/[id]
DELETE /api/admin/blogs/[id]
What it does
GET returns blog posts with pagination and optional status filter.
POST creates a blog post.
GET [id] fetches one blog post.
PUT [id] updates one blog post.
DELETE [id] deletes one blog post.
List blogs
curl -X GET "http://localhost:3000/api/admin/blogs?page=1&limit=10&status=published" \
  -H "Authorization: Bearer <adminToken>"
Create blog
curl -X POST "http://localhost:3000/api/admin/blogs" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Writing Tips",
    "excerpt": "Short blog excerpt",
    "content": "Full blog content here.",
    "status": "published",
    "tags": ["writing", "tips"],
    "sections": [
      {
        "img": "https://cdn.example.com/blogs/writing-1.jpg",
        "title": "Start with a hook",
        "description": "Open with a problem, a question, or a surprising stat.",
        "button": {
          "label": "Read more",
          "link": "/blogs/writing-tips#hook"
        }
      }
    ]
  }'
Update blog
curl -X PUT "http://localhost:3000/api/admin/blogs/<blogId>" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Writing Tips",
    "status": "published"
  }'
Delete blog
curl -X DELETE "http://localhost:3000/api/admin/blogs/<blogId>" \
  -H "Authorization: Bearer <adminToken>"
CMS flow text
Admin creates or edits a blog post.
Frontend sends content, title, tags, and optional section blocks.
Draft posts stay hidden until published.
Published posts can then be consumed by the student blog routes.
4. Contact API
There are two contact-related routes:

Public form submit: POST /api/form/v1/contact
Admin contact inbox: GET /api/admin/contacts
4.1 Public contact submit
Route:

POST /api/form/v1/contact
Required body fields:

name
email
subject
mobile
medical_school_affiliation
description
Public contact cURL
curl -X POST "http://localhost:3000/api/form/v1/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Admissions query",
    "mobile": "9876543210",
    "medical_school_affiliation": "ABC Medical College",
    "description": "I want to know about the admission process."
  }'
What it does
Validates all required fields.
Normalizes email and mobile.
Rejects duplicate email or mobile.
Stores the contact record.
Creates a support ticket with category contact.
Public contact flow text
Visitor fills the contact form.
Frontend posts to /api/form/v1/contact.
Backend validates and stores the contact.
Backend also creates a support ticket for admin follow-up.
4.2 Admin contact inbox
Route:

GET /api/admin/contacts
POST /api/admin/contacts
Admin list contacts
curl -X GET "http://localhost:3000/api/admin/contacts" \
  -H "Authorization: Bearer <adminToken>"
Admin create contact record
curl -X POST "http://localhost:3000/api/admin/contacts" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Support request",
    "mobile": "9876543210",
    "medical_school_affiliation": "XYZ College",
    "description": "Need help with the portal."
  }'
5. Coupon Management
Base route:

GET /api/admin/coupons
POST /api/admin/coupons
GET /api/admin/coupons/[id]
PUT /api/admin/coupons/[id]
DELETE /api/admin/coupons/[id]
What it does
GET lists coupons with pagination and optional filters.
POST creates a coupon.
GET [id] fetches one coupon.
PUT [id] updates one coupon.
DELETE [id] removes one coupon.
List coupons
curl -X GET "http://localhost:3000/api/admin/coupons?page=1&limit=10" \
  -H "Authorization: Bearer <adminToken>"
Create coupon
curl -X POST "http://localhost:3000/api/admin/coupons" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Launch Offer",
    "code": "LAUNCH20",
    "discountType": "percentage",
    "discountValue": 20,
    "maxUses": 100,
    "status": "active"
  }'
Update coupon
curl -X PUT "http://localhost:3000/api/admin/coupons/<couponId>" \
  -H "Authorization: Bearer <adminToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Launch Offer Updated",
    "discountValue": 25,
    "status": "active"
  }'
Delete coupon
curl -X DELETE "http://localhost:3000/api/admin/coupons/<couponId>" \
  -H "Authorization: Bearer <adminToken>"
Coupon flow text
Admin creates a coupon with code, discount, and usage rules.
The coupon can be filtered by status or type in the list view.
Admin updates or disables the coupon as needed.
Admin deletes the coupon when it is no longer valid.
6. Educator-Student Reschedule Flow
There are two related routes in the codebase:

Student request route: POST /api/student/course/reschedule-request
Educator action route: POST /api/educator/reschedule-action
Session-style educator request route: POST /api/educator/session/reschedule-request
The current code mixes courseId and sessionId naming, so the safest approach is to follow the exact route contract being used.

6.1 Student reschedule request
Route:

POST /api/student/course/reschedule-request
Required body:

courseId
reason
proposedDate
Student reschedule cURL
curl -X POST "http://localhost:3000/api/student/course/reschedule-request" \
  -H "Authorization: Bearer <studentToken>" \
  -H "x-user-id: <studentUserId>" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "<courseId>",
    "reason": "I have a university exam on that day.",
    "proposedDate": "2026-05-25T10:00:00.000Z"
  }'
What it does
Verifies the student token and x-user-id.
Confirms the student is enrolled in the course.
Stores a pending reschedule request on the course and user records.
6.2 Educator review action
Route:

POST /api/educator/reschedule-action
Required body:

courseId
requestId
action with approved or rejected
educatorRemark optional
Educator action cURL
curl -X POST "http://localhost:3000/api/educator/reschedule-action" \
  -H "Authorization: Bearer <educatorToken>" \
  -H "x-user-id: <educatorUserId>" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "<courseId>",
    "requestId": "<requestId>",
    "action": "approved",
    "educatorRemark": "Approved, shifting to next week."
  }'
What it does
Verifies the educator token and x-user-id.
Confirms the educator owns the course.
Finds the pending request.
Marks the request approved or rejected.
If approved, updates the course start time.
6.3 Session-style educator request
Route:

POST /api/educator/session/reschedule-request
Required body:

sessionId
proposedDate
reason
proposedTime optional
Session reschedule cURL
curl -X POST "http://localhost:3000/api/educator/session/reschedule-request" \
  -H "Authorization: Bearer <educatorToken>" \
  -H "x-user-id: <educatorUserId>" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "<sessionId>",
    "proposedDate": "2026-05-25",
    "proposedTime": "10:30",
    "reason": "Need to move the session due to instructor availability."
  }'
Reschedule flow text
Student submits a reschedule request for the course.
The request is stored as pending.
Educator opens the request list.
Educator approves or rejects the request.
If approved, the course start time is updated.
The same status is reflected in the student record.
7. Student Certificates API
Route:

GET /api/student/certificates
What it does
Verifies the student token and x-user-id.
Confirms the user is a student.
Finds completed sessions with certificate_enabled = true.
Merges generated certificates into the student certificates field.
Returns the full certificate list.
Student certificates cURL
curl -X GET "http://localhost:3000/api/student/certificates" \
  -H "Authorization: Bearer <studentToken>" \
  -H "x-user-id: <studentUserId>"
Typical response shape
count
list
generatedFromSessions
Certificate flow text
Student opens the certificates screen.
Frontend calls GET /api/student/certificates.
Backend checks completed certificate-enabled sessions.
Missing certificates are generated from completed sessions.
The merged certificate list is returned to the student.
8. Suggested Base Variables
If you want to paste these into shell scripts, use:

BASE_URL="http://localhost:3000"
ADMIN_TOKEN="<adminToken>"
EDUCATOR_TOKEN="<educatorToken>"
STUDENT_TOKEN="<studentToken>"
ADMIN_ID="<adminUserId>"
EDUCATOR_ID="<educatorUserId>"
STUDENT_ID="<studentUserId>"