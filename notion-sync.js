const https = require('https');

const NOTION_TOKEN = process.env.NOTION_TOKEN || 'YOUR_NOTION_TOKEN_HERE';
const PAGE_ID = process.env.NOTION_PAGE_ID || '2c64ca3fb25f81f0bef0daeba408fb30';

function notionRequest(path, method, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function syncRoadmap() {
  console.log('Syncing roadmap to Notion...');
  
  // Add content to the page
  const blocks = [
    {
      object: 'block',
      type: 'heading_1',
      heading_1: {
        rich_text: [{ type: 'text', text: { content: 'KeyView Platform - Complete Roadmap' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ 
          type: 'text', 
          text: { content: 'Vision: Create a white-label business automation platform that can be deployed to any cloud provider with N8N automation, AI workflows, and flexible database options.' } 
        }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '✅ Phase 1: Infrastructure Foundation (Partially Complete)' } }]
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Create repository structure' } }],
        checked: true
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Dockerfile with nginx configuration' } }],
        checked: true
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'GitHub Actions workflow for Cloud Run' } }],
        checked: true
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'GCP service account with proper IAM roles' } }],
        checked: true
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Initial deployment successful' } }],
        checked: true
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🔄 Phase 2: N8N Automation Platform (Next)' } }]
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Decide on database strategy (Cloud SQL vs Supabase)' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Set up PostgreSQL database' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Create N8N Dockerfile configuration' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Deploy N8N to Cloud Run' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Set up Google Sheets integration' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '📍 Phase 3: Custom Domain Configuration' } }]
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Map keyview.com.au to Cloud Run website service' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Map digital.keyview.com.au to Cloud Run' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Map chat.keyview.com.au to N8N service' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Configure SSL certificates' } }],
        checked: false
      }
    },
    {
      object: 'block',
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: 'Update DNS records at domain registrar' } }],
        checked: false
      }
    }
  ];

  const result = await notionRequest(`/v1/blocks/${PAGE_ID}/children`, 'PATCH', {
    children: blocks
  });

  console.log('Roadmap synced to Notion!');
  console.log(result);
}

syncRoadmap().catch(console.error);
