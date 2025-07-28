## Direct SQL Queries

```bash
source .env && PGPASSWORD=$FLY_DB_SUPERADMIN_PASSWORD psql -h localhost -p 5432 -U postgres -c "YOUR_QUERY"
```
