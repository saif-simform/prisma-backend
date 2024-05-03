# prisma-backend

# Prisma Generator : npx prisma generate

- The Prisma generator is a tool that takes Prisma schema file (usually named schema.prisma) as input and 
  generates the Prisma Client code based on   that schema. 

- The Prisma Client is a type-safe database client that provides methods for querying, creating, updating, and deleting data in your database.

-Run the Prisma CLI (npx prisma generate) to generate the Prisma Client based on your schema file. 

- This command reads schema.prisma file, interprets it, and generates the corresponding Prisma Client code in the 
  "node_modules/@prisma/client"  directory.

# Important : 
- Whenever we make changes to our Prisma schema, such as adding new models or fields, we need to regenerate the Prisma Client to reflect those changes. Simply rerun the prisma generate command to update the Prisma Client code.

# Prisma Studio : npx prisma studio

- Prisma Studio provides a visual representation of relationships between tables, making it easy to understand the structure of database and navigate between related data.

# We have used different features of prisma client and implemented it into the demo-project

## CRUD Operation
## Fields Selection
## Relation Queries
## Filtering (Using contains) and Sorting 
## Pagination
## Aggregation (Using _count),Grouping
## Case Sensitivity ( mode: 'insensitive')