import re
import sys
import os

def html_to_jsx(html_str):
    # Replace class with className
    jsx = html_str.replace('class="', 'className="')
    
    # Replace comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', jsx)
    
    # Replace SVG and HTML attributes
    jsx = jsx.replace('stroke-width=', 'strokeWidth=')
    jsx = jsx.replace('stroke-linecap=', 'strokeLinecap=')
    jsx = jsx.replace('stroke-linejoin=', 'strokeLinejoin=')
    jsx = jsx.replace('fill-rule=', 'fillRule=')
    jsx = jsx.replace('clip-rule=', 'clipRule=')
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('tabindex=', 'tabIndex=')
    jsx = jsx.replace('datetime=', 'dateTime=')
    
    # Handle self-closing tags
    jsx = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', jsx)
    jsx = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1 />', jsx)
    jsx = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1 />', jsx)
    jsx = re.sub(r'<path([^>]*?)(?<!/)>', r'<path\1 />', jsx)
    jsx = re.sub(r'<circle([^>]*?)(?<!/)>', r'<circle\1 />', jsx)
    jsx = re.sub(r'<source([^>]*?)(?<!/)>', r'<source\1 />', jsx)
    
    # Remove hanging closing tags from self-closed replacements
    jsx = jsx.replace('</path>', '')
    jsx = jsx.replace('</circle>', '')
    jsx = jsx.replace('</input>', '')
    jsx = jsx.replace('</img>', '')
    
    # Convert simple style="background-image: ...; ..." to style={{ ... }}
    def style_repl(match):
        style_str = match.group(1)
        parts = style_str.split(';')
        style_obj = []
        for p in parts:
            if not p.strip(): continue
            if ':' not in p: continue
            k, v = p.split(':', 1)
            k = k.strip()
            v = v.strip()
            # camelCase key
            k_camel = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            style_obj.append(f'{k_camel}: "{v}"')
        return 'style={{' + ', '.join(style_obj) + '}}'

    jsx = re.sub(r'style="([^"]*)"', style_repl, jsx)
    return jsx

if len(sys.argv) < 3:
    print("Usage: python convert_jsx.py <input.html> <output.tsx>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

with open(input_file, 'r') as f:
    content = f.read()

# extract body content (excluding the body tag itself)
match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
if match:
    body_content = match.group(1)
else:
    body_content = content

# Remove script tags
body_content = re.sub(r'<script.*?</script>', '', body_content, flags=re.DOTALL)

jsx = html_to_jsx(body_content)

out = f'''/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, jsx-a11y/alt-text */
export default function Page() {{
  return (
    <>
      {jsx}
    </>
  );
}}
'''

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, 'w') as out_f:
    out_f.write(out)
print(f"Successfully converted {input_file} to {output_file}")
