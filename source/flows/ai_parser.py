import json
import re

def parse_ai_json(text: str):
    if not text or not text.strip():
        raise ValueError("Empty AI response")

    # Extract the JSON object inside ```json ... ```
    match = re.search(r"\{[\s\S]*\}", text)

    if not match:
        raise ValueError("No JSON found in AI response")

    return json.loads(match.group())