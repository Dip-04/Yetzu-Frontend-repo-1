{
  "info": {
    "_postman_id": "b2b0f1d7-4fd9-4f48-8e72-8bd0fb1e0f11",
    "name": "YETZU Admin API",
    "description": "Admin and organization API collection for dashboard, users, sessions, assignments, content, support, and billing.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{adminToken}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://your-domain.com"
    },
    {
      "key": "adminToken",
      "value": "<ADMIN_JWT>"
    },
    {
      "key": "orgId",
      "value": "<ORG_UUID>"
    },
    {
      "key": "userId",
      "value": "<USER_UUID>"
    },
    {
      "key": "sessionId",
      "value": "<SESSION_UUID>"
    },
    {
      "key": "assignmentId",
      "value": "<ASSIGNMENT_UUID>"
    },
    {
      "key": "blogId",
      "value": "<BLOG_UUID>"
    },
    {
      "key": "couponId",
      "value": "<COUPON_UUID>"
    },
    {
      "key": "ticketId",
      "value": "<TICKET_UUID>"
    },
    {
      "key": "contactId",
      "value": "<CONTACT_UUID>"
    },
    {
      "key": "paymentId",
      "value": "<PAYMENT_UUID>"
    },
    {
      "key": "invoiceId",
      "value": "<INVOICE_ID>"
    },
    {
      "key": "rangeDays",
      "value": "30"
    },
    {
      "key": "cmsPageKey",
      "value": "home"
    },
    {
      "key": "cmsSectionKey",
      "value": "hero"
    }
  ],
  "item": [
    {
      "name": "Overview",
      "item": [
        {
          "name": "Admin Overview",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/overview",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "overview"]
            }
          }
        },
        {
          "name": "Dashboard Notifications",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/dashboard/notifications",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "dashboard", "notifications"]
            }
          }
        },
        {
          "name": "Activity Feed",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/activity",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "activity"]
            }
          }
        }
      ]
    },
    {
      "name": "Users",
      "item": [
        {
          "name": "List Users",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/users?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create User",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Student\",\n  \"email\": \"student@example.com\",\n  \"password\": \"Temp@1234\",\n  \"mobileno\": \"9999999999\",\n  \"role\": \"student\",\n  \"status\": \"active\",\n  \"organizationId\": \"{{orgId}}\",\n  \"sendCredentialsEmail\": true,\n  \"inviteMethod\": \"temp_password\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/users",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users"]
            }
          }
        },
        {
          "name": "Get User",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/users/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users", "{{userId}}"]
            }
          }
        },
        {
          "name": "Update User",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Name\",\n  \"mobileno\": \"8888888888\",\n  \"status\": \"active\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/users/{{userId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users", "{{userId}}"]
            }
          }
        },
        {
          "name": "Assign Sessions to User",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sessionIds\": [\"{{sessionId}}\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/users/{{userId}}/sessions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users", "{{userId}}", "sessions"]
            }
          }
        },
        {
          "name": "User Notifications",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/users/{{userId}}/notifications",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "users", "{{userId}}", "notifications"]
            }
          }
        }
      ]
    },
    {
      "name": "Sessions",
      "item": [
        {
          "name": "List Sessions",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "sessions"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Session",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Webinar Session\",\n  \"description\": \"Session description\",\n  \"sessionType\": \"webinar\",\n  \"category\": \"writing\",\n  \"educatorId\": \"<EDUCATOR_UUID>\",\n  \"date\": \"2026-06-10\",\n  \"startTime\": \"10:00\",\n  \"endTime\": \"11:00\",\n  \"price\": 499,\n  \"status\": \"upcoming\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "sessions"]
            }
          }
        },
        {
          "name": "Get Session",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "sessions", "{{sessionId}}"]
            }
          }
        },
        {
          "name": "Update Session",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Session\",\n  \"status\": \"upcoming\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "sessions", "{{sessionId}}"]
            }
          }
        },
        {
          "name": "Delete Session",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "sessions", "{{sessionId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Assignments",
      "item": [
        {
          "name": "List Assignments",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/assignments?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "assignments"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Assignment",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Essay Draft\",\n  \"description\": \"Submit first draft\",\n  \"sessionId\": \"{{sessionId}}\",\n  \"dueDate\": \"2026-06-15T18:00:00.000Z\",\n  \"assignedStudents\": [\"{{userId}}\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/assignments/create",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "assignments", "create"]
            }
          }
        },
        {
          "name": "Get Assignment",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/assignments/{{assignmentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "assignments", "{{assignmentId}}"]
            }
          }
        },
        {
          "name": "Update Assignment",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Assignment\",\n  \"status\": \"published\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/assignments/{{assignmentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "assignments", "{{assignmentId}}"]
            }
          }
        },
        {
          "name": "Delete Assignment",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/assignments/{{assignmentId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "assignments", "{{assignmentId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Content",
      "item": [
        {
          "name": "Blogs List",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/blogs?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "blogs"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Blog",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"New Blog Post\",\n  \"content\": \"Blog content here\",\n  \"status\": \"draft\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/blogs",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "blogs"]
            }
          }
        },
        {
          "name": "Get Blog",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/blogs/{{blogId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "blogs", "{{blogId}}"]
            }
          }
        },
        {
          "name": "Update Blog",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Blog Title\",\n  \"status\": \"published\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/blogs/{{blogId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "blogs", "{{blogId}}"]
            }
          }
        },
        {
          "name": "Delete Blog",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/blogs/{{blogId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "blogs", "{{blogId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Analytics",
      "item": [
        {
          "name": "Analytics Overview",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/analytics?rangeDays={{rangeDays}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "analytics"],
              "query": [
                { "key": "rangeDays", "value": "{{rangeDays}}" }
              ]
            }
          }
        },
        {
          "name": "Analytics Export CSV",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/analytics/export?rangeDays={{rangeDays}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "analytics", "export"],
              "query": [
                { "key": "rangeDays", "value": "{{rangeDays}}" }
              ]
            }
          }
        },
        {
          "name": "Analytics Export JSON",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/analytics/export?rangeDays={{rangeDays}}&format=json",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "analytics", "export"],
              "query": [
                { "key": "rangeDays", "value": "{{rangeDays}}" },
                { "key": "format", "value": "json" }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "CMS",
      "item": [
        {
          "name": "List CMS Pages",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/cms/pages",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "pages"]
            }
          }
        },
        {
          "name": "Get CMS Page",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/cms/pages/{{cmsPageKey}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "pages", "{{cmsPageKey}}"]
            }
          }
        },
        {
          "name": "Update CMS Page",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"pageTitle\": \"Homepage\",\n  \"status\": \"active\",\n  \"sortOrder\": 1,\n  \"metadata\": {\n    \"theme\": \"modern\"\n  }\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/cms/pages/{{cmsPageKey}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "pages", "{{cmsPageKey}}"]
            }
          }
        },
        {
          "name": "Get CMS Section",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/cms/pages/{{cmsPageKey}}/sections/{{cmsSectionKey}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "pages", "{{cmsPageKey}}", "sections", "{{cmsSectionKey}}"]
            }
          }
        },
        {
          "name": "Update CMS Section",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sectionTitle\": \"Hero Banner\",\n  \"sortOrder\": 0,\n  \"metadata\": {\n    \"layout\": \"full\"\n  },\n  \"data\": {\n    \"title\": \"Welcome\",\n    \"subtitle\": \"Build with confidence\"\n  }\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/cms/pages/{{cmsPageKey}}/sections/{{cmsSectionKey}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "pages", "{{cmsPageKey}}", "sections", "{{cmsSectionKey}}"]
            }
          }
        },
        {
          "name": "Upload CMS Media",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                },
                {
                  "key": "title",
                  "value": "Homepage Hero"
                },
                {
                  "key": "altText",
                  "value": "Homepage hero banner"
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/api/cms/media",
              "host": ["{{baseUrl}}"],
              "path": ["api", "cms", "media"]
            }
          }
        }
      ]
    },
    {
      "name": "Coupons",
      "item": [
        {
          "name": "List Coupons",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/coupons?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "coupons"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Coupon",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Summer Discount\",\n  \"type\": \"discount\",\n  \"discountType\": \"percentage\",\n  \"discountValue\": 20,\n  \"maxUses\": 100,\n  \"status\": \"active\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/coupons",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "coupons"]
            }
          }
        },
        {
          "name": "Get Coupon",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/coupons/{{couponId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "coupons", "{{couponId}}"]
            }
          }
        },
        {
          "name": "Update Coupon",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Coupon\",\n  \"status\": \"active\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/coupons/{{couponId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "coupons", "{{couponId}}"]
            }
          }
        },
        {
          "name": "Delete Coupon",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/coupons/{{couponId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "coupons", "{{couponId}}"]
            }
          }
        }
      ]
    },
    {
      "name": "Support",
      "item": [
        {
          "name": "List Tickets",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/tickets?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "tickets"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Ticket",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"subject\": \"Payment issue\",\n  \"description\": \"User reported payment issue\",\n  \"priority\": \"medium\",\n  \"status\": \"open\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/tickets",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "tickets"]
            }
          }
        },
        {
          "name": "Get Ticket",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/tickets/{{ticketId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "tickets", "{{ticketId}}"]
            }
          }
        },
        {
          "name": "Update Ticket",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"resolved\",\n  \"resolution\": \"Payment confirmed\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/tickets/{{ticketId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "tickets", "{{ticketId}}"]
            }
          }
        },
        {
          "name": "Delete Ticket",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/tickets/{{ticketId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "tickets", "{{ticketId}}"]
            }
          }
        },
        {
          "name": "List Contacts",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/contacts",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "contacts"]
            }
          }
        },
        {
          "name": "Create Contact",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"User Name\",\n  \"email\": \"user@example.com\",\n  \"subject\": \"Admission query\",\n  \"mobile\": \"9999999999\",\n  \"medical_school_affiliation\": \"MIT ADT\",\n  \"description\": \"I need help with admission\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/contacts",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "contacts"]
            }
          }
        },
        {
          "name": "Get Contact",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/contacts/{{contactId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "contacts", "{{contactId}}"]
            }
          }
        },
        {
          "name": "Reply to Contact",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"replySubject\": \"Re: Admission query\",\n  \"replyMessage\": \"Hi, thanks for reaching out. Here is the answer...\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/contacts/{{contactId}}/reply",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "contacts", "{{contactId}}", "reply"]
            }
          }
        }
      ]
    },
    {
      "name": "Organizations",
      "item": [
        {
          "name": "List Organizations",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/organizations?page=1&limit=10",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "organizations"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "10" }
              ]
            }
          }
        },
        {
          "name": "Create Organization",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"organizationName\": \"ABC Institute\",\n  \"type\": \"institution\",\n  \"email\": \"admin@abc.edu\",\n  \"accessPlan\": \"basic\",\n  \"billingCycle\": \"monthly\",\n  \"billingPlanType\": \"seat-based\",\n  \"pricePerStudent\": 80,\n  \"totalSeats\": 300,\n  \"paymentMethod\": \"credit_card\",\n  \"estimatedTotal\": 24000,\n  \"currency\": \"USD\",\n  \"limits\": {\n    \"webinars\": 10,\n    \"cohorts\": 5,\n    \"mentorship\": 2,\n    \"certification_courses\": 3,\n    \"assignments\": 20\n  },\n  \"students\": [\n    {\n      \"name\": \"Student A\",\n      \"email\": \"studenta@example.com\",\n      \"password\": \"Temp@1234\"\n    }\n  ]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/organizations",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "organizations"]
            }
          }
        },
        {
          "name": "Get Organization",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "organizations", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Update Organization",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"organizationName\": \"Updated Institute\",\n  \"billingCycle\": \"monthly\",\n  \"billingPlanType\": \"subscription\",\n  \"pricePerStudent\": 100,\n  \"totalSeats\": 250\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/admin/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "organizations", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Suspend Organization",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/suspend",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "suspend"]
            }
          }
        },
        {
          "name": "Resume Organization",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/resume",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "resume"]
            }
          }
        },
        {
          "name": "Delete Organization",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/admin/organizations/{{orgId}}",
              "host": ["{{baseUrl}}"],
              "path": ["api", "admin", "organizations", "{{orgId}}"]
            }
          }
        },
        {
          "name": "Org Students List",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/students?page=1&limit=20",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "students"],
              "query": [
                { "key": "page", "value": "1" },
                { "key": "limit", "value": "20" }
              ]
            }
          }
        },
        {
          "name": "Org Add Student",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Student B\",\n  \"email\": \"studentb@example.com\",\n  \"password\": \"Temp@1234\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/students",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "students"]
            }
          }
        },
        {
          "name": "Org Import Students",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/students/import",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "students", "import"]
            }
          }
        },
        {
          "name": "Org Student Update",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Student\",\n  \"status\": \"active\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/students/<STUDENT_UUID>",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "students", "<STUDENT_UUID>"]
            }
          }
        },
        {
          "name": "Org Student Status",
          "request": {
            "method": "PATCH",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"inactive\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/students/<STUDENT_UUID>/status",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "students", "<STUDENT_UUID>", "status"]
            }
          }
        },
        {
          "name": "Org Access Permissions",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/access-permissions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "access-permissions"]
            }
          }
        },
        {
          "name": "Org Update Access Permissions",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"permissions\": [\n    {\n      \"code\": \"webinars\",\n      \"enabled\": true,\n      \"limit\": 10\n    }\n  ]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/access-permissions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "access-permissions"]
            }
          }
        },
        {
          "name": "Org Limits",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/limits",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "limits"]
            }
          }
        },
        {
          "name": "Org Update Limits",
          "request": {
            "method": "PUT",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"webinarLimit\": 10,\n  \"cohortLimit\": 5,\n  \"mentorshipLimit\": 2,\n  \"certificationLimit\": 3,\n  \"assignmentLimit\": 20\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/limits",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "limits"]
            }
          }
        },
        {
          "name": "Org Sessions",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/sessions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "sessions"]
            }
          }
        },
        {
          "name": "Org Enroll Sessions",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sessionIds\": [\"{{sessionId}}\"],\n  \"studentIds\": [\"{{userId}}\"]\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/sessions",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "sessions"]
            }
          }
        },
        {
          "name": "Org Billing Summary",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/billing",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "billing"]
            }
          }
        },
        {
          "name": "Org Record Payment",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"invoiceId\": \"INV-2026-01482\",\n  \"amount\": 24000,\n  \"currency\": \"USD\",\n  \"paymentMethod\": \"Bank Transfer\",\n  \"paymentStatus\": \"paid\",\n  \"paymentDate\": \"2026-06-07\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/billing/payments",
              "host": ["{{baseUrl}}"],
              "path": ["api", "organizations", "{{orgId}}", "billing", "payments"]
            }
          }
        },
        {
          "name": "Org Complete Payment",
          "request": {
            "method": "POST",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"paymentStatus\": \"paid\",\n  \"transactionRef\": \"TXN-2026-88341\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/billing/payments/{{paymentId}}/complete",
              "host": ["{{baseUrl}}"],
              "path": [
                "api",
                "organizations",
                "{{orgId}}",
                "billing",
                "payments",
                "{{paymentId}}",
                "complete"
              ]
            }
          }
        },
        {
          "name": "Download Invoice PDF",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/organizations/{{orgId}}/billing/invoices/{{invoiceId}}/download",
              "host": ["{{baseUrl}}"],
              "path": [
                "api",
                "organizations",
                "{{orgId}}",
                "billing",
                "invoices",
                "{{invoiceId}}",
                "download"
              ]
            }
          }
        }
      ]
    }
  ]
}
