#!/usr/bin/env python3
"""
Generar cartas pip del Marsella con Pollinations.ai
Usando prompts estilo naipe español para obtener conteo correcto de símbolos.
"""

import requests
import time
import os
import json

API_KEY = "sk_nHprqgdn2XK6eaZg0DPyloAmxS2L9rbo"
OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"
LOG_FILE = "/Users/mac/Desktop/tarot_app/generate_log_marsella_pips.txt"

# Prompts estilo naipe español - el número de símbolos está explícito
PROMPTS = {
    # COPAS
    22: "Spanish playing card Ace of Cups style, single ornate golden chalice in center, red and gold decoration, cream background, tarot card design, detailed illustration, 4K",
    23: "Spanish playing card Two of Cups style, exactly two golden chalices facing each other, symmetrical design, cream background, tarot card, detailed illustration, 4K",
    24: "Spanish playing card Three of Cups style, exactly three golden chalices in triangle formation, celebration design, cream background, tarot card, detailed illustration, 4K",
    25: "Spanish playing card Four of Cups style, exactly four golden chalices in square formation, stable design, cream background, tarot card, detailed illustration, 4K",
    26: "Spanish playing card Five of Cups style, exactly five golden chalices, four on corners one in center, loss and disappointment theme, cream background, tarot card, detailed illustration, 4K",
    27: "Spanish playing card Six of Cups style, exactly six golden chalices in two columns of three, nostalgia theme, cream background, tarot card, detailed illustration, 4K",
    28: "Spanish playing card Seven of Cups style, exactly seven golden chalices, six in two columns plus one in center, fantasy and choices theme, cream background, tarot card, detailed illustration, 4K",
    29: "Spanish playing card Eight of Cups style, exactly eight golden chalices in two columns of four, abandonment theme, cream background, tarot card, detailed illustration, 4K",
    30: "Spanish playing card Nine of Cups style, exactly nine golden chalices in three rows of three, satisfaction theme, cream background, tarot card, detailed illustration, 4K",
    31: "Spanish playing card Ten of Cups style, exactly ten golden chalices, three rows of three plus one at bottom, family happiness theme, cream background, tarot card, detailed illustration, 4K",
    
    # ESPADAS
    36: "Spanish playing card Ace of Swords style, single ornate sword pointing up with crown, justice theme, cream background, tarot card design, detailed illustration, 4K",
    37: "Spanish playing card Two of Swords style, exactly two crossed swords, balance and decision theme, cream background, tarot card, detailed illustration, 4K",
    38: "Spanish playing card Three of Swords style, exactly three swords, heartbreak theme with heart pierced, cream background, tarot card, detailed illustration, 4K",
    39: "Spanish playing card Four of Swords style, exactly four swords in two crossed pairs, rest and recovery theme, cream background, tarot card, detailed illustration, 4K",
    40: "Spanish playing card Five of Swords style, exactly five swords, conflict and victory theme, cream background, tarot card, detailed illustration, 4K",
    41: "Spanish playing card Six of Swords style, exactly six swords in two columns of three, journey and transition theme, cream background, tarot card, detailed illustration, 4K",
    42: "Spanish playing card Seven of Swords style, exactly seven swords, strategy and deception theme, cream background, tarot card, detailed illustration, 4K",
    43: "Spanish playing card Eight of Swords style, exactly eight swords in two columns of four, restriction theme, cream background, tarot card, detailed illustration, 4K",
    44: "Spanish playing card Nine of Swords style, exactly nine swords in three rows of three, anxiety and nightmares theme, cream background, tarot card, detailed illustration, 4K",
    45: "Spanish playing card Ten of Swords style, exactly ten swords, three rows of three plus one at bottom, ending and betrayal theme, cream background, tarot card, detailed illustration, 4K",
    
    # BASTOS
    50: "Spanish playing card Ace of Wands style, single ornate wooden wand with leaves, inspiration theme, cream background, tarot card design, detailed illustration, 4K",
    51: "Spanish playing card Two of Wands style, exactly two wooden wands crossed, planning and future theme, cream background, tarot card, detailed illustration, 4K",
    52: "Spanish playing card Three of Wands style, exactly three wooden wands in triangle, exploration theme, cream background, tarot card, detailed illustration, 4K",
    53: "Spanish playing card Four of Wands style, exactly four wooden wands in square, celebration theme, cream background, tarot card, detailed illustration, 4K",
    54: "Spanish playing card Five of Wands style, exactly five wooden wands, conflict and competition theme, cream background, tarot card, detailed illustration, 4K",
    55: "Spanish playing card Six of Wands style, exactly six wooden wands in two columns of three, victory theme, cream background, tarot card, detailed illustration, 4K",
    56: "Spanish playing card Seven of Wands style, exactly seven wooden wands, six in two columns plus one in center, defense theme, cream background, tarot card, detailed illustration, 4K",
    57: "Spanish playing card Eight of Wands style, exactly eight wooden wands in two columns of four, speed and movement theme, cream background, tarot card, detailed illustration, 4K",
    58: "Spanish playing card Nine of Wands style, exactly nine wooden wands in three rows of three, resilience theme, cream background, tarot card, detailed illustration, 4K",
    59: "Spanish playing card Ten of Wands style, exactly ten wooden wands, three rows of three plus one at bottom, burden theme, cream background, tarot card, detailed illustration, 4K",
    
    # OROS
    64: "Spanish playing card Ace of Pentacles style, single ornate golden coin with cross, prosperity theme, cream background, tarot card design, detailed illustration, 4K",
    65: "Spanish playing card Two of Pentacles style, exactly two golden coins, balance and flexibility theme, cream background, tarot card, detailed illustration, 4K",
    66: "Spanish playing card Three of Pentacles style, exactly three golden coins in triangle, teamwork theme, cream background, tarot card, detailed illustration, 4K",
    67: "Spanish playing card Four of Pentacles style, exactly four golden coins in square, control and security theme, cream background, tarot card, detailed illustration, 4K",
    68: "Spanish playing card Five of Pentacles style, exactly five golden coins, four on corners one in center, hardship theme, cream background, tarot card, detailed illustration, 4K",
    69: "Spanish playing card Six of Pentacles style, exactly six golden coins in two columns of three, generosity theme, cream background, tarot card, detailed illustration, 4K",
    70: "Spanish playing card Seven of Pentacles style, exactly seven golden coins, six in two columns plus one in center, patience and investment theme, cream background, tarot card, detailed illustration, 4K",
    71: "Spanish playing card Eight of Pentacles style, exactly eight golden coins in two columns of four, dedication and craftsmanship theme, cream background, tarot card, detailed illustration, 4K",
    72: "Spanish playing card Nine of Pentacles style, exactly nine golden coins in three rows of three, independence and luxury theme, cream background, tarot card, detailed illustration, 4K",
    73: "Spanish playing card Ten of Pentacles style, exactly ten golden coins, three rows of three plus one at bottom, legacy and family theme, cream background, tarot card, detailed illustration, 4K",
}

def generate_card(card_id, prompt):
    padded_id = str(card_id).zfill(2)
    output_path = os.path.join(OUTPUT_DIR, f"{padded_id}.jpg")
    
    print(f"\n🎨 Generando carta {padded_id}...")
    
    try:
        response = requests.get(
            "https://image.pollinations.ai/prompt/" + requests.utils.quote(prompt),
            params={
                "width": 512,
                "height": 768,
                "model": "flux",
                "nologo": "true",
                "seed": card_id * 13 + 7
            },
            timeout=120
        )
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            size_kb = len(response.content) / 1024
            print(f"   ✅ {size_kb:.0f} KB")
            with open(LOG_FILE, 'a') as log:
                log.write(f"  ✅ Card {padded_id} ({size_kb:.0f} KB)\n")
            return True
        else:
            print(f"   ❌ HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🔮 Generando cartas pip del Marsella estilo naipe español...")
    print("=" * 60)
    
    with open(LOG_FILE, 'w') as log:
        log.write("Generando cartas pip Marsella estilo naipe español\n")
    
    exito = 0
    total = len(PROMPTS)
    
    for card_id, prompt in PROMPTS.items():
        if generate_card(card_id, prompt):
            exito += 1
        time.sleep(3)
    
    print("\n" + "=" * 60)
    print(f"✅ Completado: {exito}/{total} cartas")
