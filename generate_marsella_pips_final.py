#!/usr/bin/env python3
"""
Generar 40 cartas pip del Marsella (1-9 de cada palo)
Estilo naipe español con distribución correcta de símbolos,
pero con el mismo estilo artístico de las demás cartas.
"""

import requests
import time
import os
import json

OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"

# Estilo base de las cartas Marsella que ya funcionan
STYLE = "detailed illustration, medieval woodcut style, cream parchment background, red blue and gold colors, tarot card border, professional artwork, 4K resolution"

PROMPTS = {
    # ═══════════════ COPAS ═══════════════
    22: f"Tarot card Ace of Cups, single ornate golden chalice in center with decorative base, red and blue flourishes, {STYLE}",
    23: f"Tarot card Two of Cups, exactly two golden chalices side by side symmetrical, red ribbons between them, {STYLE}",
    24: f"Tarot card Three of Cups, exactly three golden chalices arranged in triangle, celebratory design, {STYLE}",
    25: f"Tarot card Four of Cups, exactly four golden chalices in square formation two top two bottom, {STYLE}",
    26: f"Tarot card Five of Cups, exactly five golden chalices four in corners one in center, {STYLE}",
    27: f"Tarot card Six of Cups, exactly six golden chalices in two columns of three, {STYLE}",
    28: f"Tarot card Seven of Cups, exactly seven golden chalices three top one center three bottom, {STYLE}",
    29: f"Tarot card Eight of Cups, exactly eight golden chalices in two columns of four, {STYLE}",
    30: f"Tarot card Nine of Cups, exactly nine golden chalices three rows of three, {STYLE}",
    31: f"Tarot card Ten of Cups, exactly ten golden chalaces three rows of three plus one at bottom center, {STYLE}",
    
    # ═══════════════ ESPADAS ═══════════════
    36: f"Tarot card Ace of Swords, single ornate sword pointing up with crown and olive branch, {STYLE}",
    37: f"Tarot card Two of Swords, exactly two swords crossed in X shape with moon, {STYLE}",
    38: f"Tarot card Three of Swords, exactly three swords pointing down through heart, {STYLE}",
    39: f"Tarot card Four of Swords, exactly four swords in two crossed pairs horizontal, {STYLE}",
    40: f"Tarot card Five of Swords, exactly five swords two crossed top three pointing down, {STYLE}",
    41: f"Tarot card Six of Swords, exactly six swords in two columns of three, {STYLE}",
    42: f"Tarot card Seven of Swords, exactly seven swords three top one center three bottom, {STYLE}",
    43: f"Tarot card Eight of Swords, exactly eight swords in two columns of four, {STYLE}",
    44: f"Tarot card Nine of Swords, exactly nine swords three rows of three pointing up, {STYLE}",
    45: f"Tarot card Ten of Swords, exactly ten swords three rows of three plus one at bottom, {STYLE}",
    
    # ═══════════════ BASTOS ═══════════════
    50: f"Tarot card Ace of Wands, single wooden wand with green leaves sprouting, {STYLE}",
    51: f"Tarot card Two of Wands, exactly two wooden wands crossed in X shape with flames, {STYLE}",
    52: f"Tarot card Three of Wands, exactly three wooden wands upright in triangle formation, {STYLE}",
    53: f"Tarot card Four of Wands, exactly four wooden wands in square with garlands, {STYLE}",
    54: f"Tarot card Five of Wands, exactly five wooden wands crossed and overlapping, {STYLE}",
    55: f"Tarot card Six of Wands, exactly six wooden wands in two columns of three, {STYLE}",
    56: f"Tarot card Seven of Wands, exactly seven wooden wands three top one center three bottom, {STYLE}",
    57: f"Tarot card Eight of Wands, exactly eight wooden wands in two columns of four, {STYLE}",
    58: f"Tarot card Nine of Wands, exactly nine wooden wands three rows of three, {STYLE}",
    59: f"Tarot card Ten of Wands, exactly ten wooden wands three rows of three plus one at bottom, {STYLE}",
    
    # ═══════════════ OROS ═══════════════
    64: f"Tarot card Ace of Pentacles, single golden coin with cross pattern in center, {STYLE}",
    65: f"Tarot card Two of Pentacles, exactly two golden coins side by side with infinity symbol, {STYLE}",
    66: f"Tarot card Three of Pentacles, exactly three golden coins in triangle formation, {STYLE}",
    67: f"Tarot card Four of Pentacles, exactly four golden coins in square two top two bottom, {STYLE}",
    68: f"Tarot card Five of Pentacles, exactly five golden coins four in corners one in center, {STYLE}",
    69: f"Tarot card Six of Pentacles, exactly six golden coins in two columns of three, {STYLE}",
    70: f"Tarot card Seven of Pentacles, exactly seven golden coins three top one center three bottom, {STYLE}",
    71: f"Tarot card Eight of Pentacles, exactly eight golden coins in two columns of four, {STYLE}",
    72: f"Tarot card Nine of Pentacles, exactly nine golden coins three rows of three, {STYLE}",
    73: f"Tarot card Ten of Pentacles, exactly ten golden coins three rows of three plus one at bottom, {STYLE}",
}

def generate(card_id, prompt):
    padded = str(card_id).zfill(2)
    output = os.path.join(OUTPUT_DIR, f"{padded}.jpg")
    
    print(f"🎨 {padded}...", end=" ", flush=True)
    
    try:
        resp = requests.get(
            "https://image.pollinations.ai/prompt/" + requests.utils.quote(prompt),
            params={"width": 512, "height": 768, "model": "flux", "nologo": "true", "seed": card_id * 7 + 13},
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

print("🔮 Generando cartas pip Marsella estilo naipe español...")
print("=" * 60)

ok = 0
total = len(PROMPTS)

for card_id, prompt in PROMPTS.items():
    if generate(card_id, prompt):
        ok += 1
    time.sleep(3)

print(f"\n{'='*60}")
print(f"✅ Completado: {ok}/{total}")
