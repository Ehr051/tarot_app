#!/usr/bin/env python3
"""Regenerar 20 cartas Thoth que fallaron"""

import requests
import time
import os
import json

OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/thoth"

with open('/Users/mac/Desktop/tarot_app/prompts_v2.json') as f:
    data = json.load(f)

thoth_style = data['thoth']['style']
thoth_cards = data['thoth']['cards']

missing = ['04','05','06','07','10','11','12','13','19','20','21','22','27','28','29','30','34','35','36','37']

def generate(card_id_str):
    card = thoth_cards[card_id_str]
    prompt = f"{card['prompt']}, {thoth_style}"
    output = os.path.join(OUTPUT_DIR, f"{card_id_str}.jpg")
    
    print(f"🎨 {card['name']}...", end=" ", flush=True)
    
    try:
        resp = requests.get(
            "https://image.pollinations.ai/prompt/" + requests.utils.quote(prompt),
            params={"width": 512, "height": 768, "model": "flux", "nologo": "true", "seed": int(card_id_str) * 23 + 11},
            timeout=120
        )
        if resp.status_code == 200:
            with open(output, 'wb') as f:
                f.write(resp.content)
            print(f"✅ ({len(resp.content)//1024} KB)")
            return True
        else:
            print(f"❌ {resp.status_code}")
            return False
    except Exception as e:
        print(f"❌ {e}")
        return False

print("🔮 Regenerando cartas Thoth faltantes...")
ok = 0
for cid in missing:
    if generate(cid):
        ok += 1
    time.sleep(3)

print(f"\n✅ {ok}/{len(missing)} regeneradas")
