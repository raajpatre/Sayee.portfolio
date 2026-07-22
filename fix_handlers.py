import os
import glob
import re

for file in glob.glob('src/app/**/*.tsx', recursive=True):
    with open(file, 'r') as f:
        content = f.read()
    if 'onclick=' in content or 'onchange=' in content or 'onsubmit=' in content:
        content = re.sub(r'onclick="[^"]*"', '', content)
        content = re.sub(r'onchange="[^"]*"', '', content)
        content = re.sub(r'onsubmit="[^"]*"', '', content)
        with open(file, 'w') as f:
            f.write(content)
        print(f'Fixed handlers in {file}')
