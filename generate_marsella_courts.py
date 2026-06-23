#!/usr/bin/env python3
"""Generar figuras de Marsella que faltan"""

import requests
import time
import os

OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"

FIGURAS_FALTANTES = {
    # Copas
    32: "Tarot Marseille Page of Cups, young servant holding golden cup, blue and red clothing, medieval style, cream background, detailed illustration, 4K",
    33: "Tarot Marseille Knight of Cups, knight on horseback holding golden cup, medieval armor, blue and red, cream background, detailed illustration, 4K",
    34: "Tarot Marseille Queen of Cups, queen seated on throne holding golden crown cup, blue robes, serene expression, cream background, detailed illustration, 4K",
    35: "Tarot Marseille King of Cups, king seated on throne holding golden cup, blue robes, wise expression, cream background, detailed illustration, 4K",
    
    # Espadas
    46: "Tarot Marseille Page of Swords, young servant holding sword upright, blue and red clothing, alert expression, cream background, detailed illustration, 4K",
    47: "Tarot Marseille Knight of Swords, knight on horseback charging with sword, medieval armor, dynamic pose, cream background, detailed illustration, 4K",
    48: "Tarot Marseille Queen of Swords, queen seated on throne holding sword, blue robes, stern expression, clouds in background, cream background, detailed illustration, 4K",
    49: "Tarot Marseille King of Swords, king seated on throne holding sword, blue robes, authoritative expression, cream background, detailed illustration, 4K",
    
    # Bastos
    60: "Tarot Marseille Page of Wands, young servant holding wooden wand with leaves, red and blue clothing, curious expression, cream background, detailed illustration, 4K",
    61: "Tarot Marseille Knight of Wands, knight on horseback holding wooden wand, medieval armor, red cape, dynamic pose, cream background, detailed illustration, 4K",
    62: "Tarot Marseille Queen of Wands, queen seated on throne holding wooden wand, red robes, confident expression, black cat at feet, cream background, detailed illustration, 4K",
    63: "Tarot Marseille King of Wands, king seated on throne holding wooden wand, red robes, commanding expression, cream background, detailed illustration, 4K",
}

def generate_card(card_id, prompt):
    padded_id = str(card_id).zfill(2)
    output_path = os.path.join(OUTPUT_DIR, f"{padded_id}.jpg")
    
    print(f"\n🎨 Generando {padded_id}...")
    
    try:
        response = requests.get(
            "https://image.pollinations.ai/prompt/" + requests.utils.quote(prompt),
            params={
                "width": 512,
                "height": 768,
                "model": "flux",
                "nologo": "true",
                "seed": card_id * 17 + 3
            },
            timeout=120
        )
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            size_kb = len(response.content) / 1024
            print(f"   ✅ {size_kb:.0f} KB")
            return True
        else:
            print(f"   ❌ HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🔮 Generando figuras de Marsella...")
    print("=" * 60)
    
    exito = 0
    for card_id, prompt in FIGURAS_FALTANTES.items():
        if generate_card(card_id, prompt):
            exito += 1
        time.sleep(3)
    
    print(f"\n✅ Completado: {exito}/{len(FIGURAS_FALTANTES)} figuras")
