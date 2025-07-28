#!/bin/bash

echo "🚀 Setting up your Next.js + Cloudflare Workers + D1 app..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file - Please update it with your Cloudflare credentials"
else
    echo "✅ .env file already exists"
fi

# Check if .dev.vars exists
if [ ! -f .dev.vars ]; then
    echo "📋 Creating .dev.vars file from .dev.vars.example..."
    cp .dev.vars.example .dev.vars
    echo "✅ Created .dev.vars file - Please update it with your API keys"
else
    echo "✅ .dev.vars file already exists"
fi

echo ""
echo "📚 Next steps:"
echo "1. Update .env with your Cloudflare account ID and API token"
echo "2. Update .dev.vars with your Resend API key"
echo "3. Create a D1 database: npx wrangler d1 create your-app-db"
echo "4. Update wrangler.toml with your database ID"
echo "5. Run migrations: npx wrangler d1 execute your-app-db --local --file=./migrations/0001_create_tables.sql"
echo "6. Start development: npm run dev"
echo ""
echo "For detailed instructions, see README.md"