#!/usr/bin/env python3
"""Regenerar cartas específicas del Rider-Waite con prompts más precisos"""

import requests
import time
import os
import json

API_KEY = "sk_nHprqgdn2XK6eaZg0DPyloAmxS2L9rbo"
OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/rider"

# Prompts mejorados para cartas problemáticas
CARTAS_PROBLEMATICAS = {
    23: {
        "name": "Two of Cups",
        "prompt": "TAROT CARD Two of Cups: A man and a woman facing each other, each holding a golden cup and exchanging them. Between them stands a staff with two lions facing opposite directions. Above them, the winged god Hermes blesses the couple. Background shows a landscape with two towers. Romantic partnership, mutual attraction, emotional connection. Detailed illustration, golden cups clearly visible, exactly TWO cups total. Art Nouveau style, mystical atmosphere"
    },
    25: {
        "name": "Four of Cups", 
        "prompt": "TAROT CARD Four of Cups: A young man sits with arms crossed under a tree, looking bored and contemplative. Before him on the ground sit EXACTLY THREE golden cups. From a cloud on the right, a mysterious hand extends offering a FOURTH cup. The man ignores the offered cup. Total cups visible: exactly FOUR (three on ground, one offered). Muted colors, apathy, meditation, reevaluation. Art Nouveau style, detailed illustration"
    },
    26: {
        "name": "Five of Cups",
        "prompt": "TAROT CARD Five of Cups: A figure in a BLACK CLOAK stands with head bowed in grief. Before the figure on the ground are EXACTLY THREE SPILLED CUPS with red liquid spilled. BEHIND the figure, TWO CUPS still stand upright and intact. In the background, a bridge crosses a river to a castle. Total cups visible: exactly FIVE (three spilled, two standing). Loss, grief, but hope remains. Art Nouveau style, detailed illustration"
    }
}

def regenerate_card(card_id, card_data):
    padded_id = str(card_id).zfill(2)
    output_path = os.path.join(OUTPUT_DIR, f"{padded_id}.jpg")
    
    print(f"\n🔄 Regenerando: {card_data['name']} (ID: {padded_id})")
    print(f"   Prompt: {card_data['prompt'][:80]}...")
    
    try:
        response = requests.get(
            "https://image.pollinations.ai/prompt/" + requests.utils.quote(card_data['prompt']),
            params={
                "width": 512,
                "height": 768,
                "model": "flux",
                "nologo": "true",
                "seed": card_id * 1000 + 42
            },
            timeout=120
        )
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            size_kb = len(response.content) / 1024
            print(f"   ✅ Guardado: {output_path} ({size_kb:.0f} KB)")
            return True
        else:
            print(f"   ❌ Error HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🔮 Regenerando cartas problemáticas del Rider-Waite...")
    print("=" * 60)
    
    exito = 0
    total = len(CARTAS_PROBLEMATICAS)
    
    for card_id, card_data in CARTAS_PROBLEMATICAS.items():
        if regenerate_card(card_id, card_data):
            exito += 1
        time.sleep(2)  # Pausa entre requests
    
    print("\n" + "=" * 60)
    print(f"✅ Completado: {exito}/{total} cartas regeneradas")
