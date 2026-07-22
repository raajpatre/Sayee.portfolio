import json
import os
import subprocess
import urllib.request

# Read screens JSON
with open('/Users/raaj.dev/.gemini/antigravity/brain/dbb75fd4-6ea4-430d-8a4f-ef3894d4164d/.system_generated/steps/126/output.txt', 'r') as f:
    data = json.load(f)

# Mapping screen IDs to Next.js page paths
screen_map = {
    'fac0b61ce4314d3abb0b5359c50dc50f': 'src/app/projects/page.tsx',
    'b79ac5071d014e4a8b115cba53f71898': 'src/app/projects/[slug]/page.tsx',
    '1da42e1203ee489bbeefc3848d813f60': 'src/app/about/page.tsx',
    '4b94c2089c884343b6e544fcec6eadaf': 'src/app/contact/page.tsx',
    'd8cea109d828488f80ac99dd285cd044': 'src/app/admin/login/page.tsx',
    '458117352d62488d8465ab439b298552': 'src/app/admin/page.tsx',
    'b8577ca233024aaba1f93526a46c62fe': 'src/app/admin/projects/page.tsx',
    'a85b65311fb24542b2a0304c2a87d0d6': 'src/app/admin/projects/new/page.tsx',
    'db3b3b4fc6e8497aad81fc6c7904e850': 'src/app/admin/profile/page.tsx',
    '4929ee590c6247808419344983371f6f': 'src/app/admin/credentials/page.tsx',
    '9258dc93d1a74c5c8f0e360a3f8909fd': 'src/app/admin/testimonials/page.tsx',
    'ebcc612602ca45b4a7e7be889abcd81f': 'src/app/admin/links/page.tsx',
    '4b8348b3c2394319b6b7524096bf4bea': 'src/app/admin/services/page.tsx'
}

for screen in data['screens']:
    screen_id = screen['name'].split('/')[-1]
    if screen_id in screen_map:
        download_url = screen['htmlCode']['downloadUrl']
        output_tsx = screen_map[screen_id]
        
        print(f"Fetching HTML for {screen['title']} -> {output_tsx}")
        
        temp_html = f"temp_{screen_id}.html"
        urllib.request.urlretrieve(download_url, temp_html)
        
        # Call convert_jsx.py
        subprocess.run(['python3', 'convert_jsx.py', temp_html, output_tsx], check=True)
        
        # Cleanup temp HTML
        os.remove(temp_html)
        
print("All mapped screens processed.")
