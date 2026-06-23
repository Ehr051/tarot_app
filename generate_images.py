#!/usr/bin/env python3
"""
TAROT — Batch Image Generator v2
Generates 312 card images (78 × 4 decks) via Pollinations.ai API
Uses improved prompts for better quality
"""

import json
import os
import time
import requests
import sys
import hashlib
from pathlib import Path

# ─── Config ────────────────────────────────────────────────────
PROMPTS_FILE = "prompts_v2.json"
OUTPUT_DIR = "images"
WIDTH = 512
HEIGHT = 768
MODEL = "flux"
DELAY_BETWEEN = 2  # seconds between requests
MAX_RETRIES = 3
RESUME = True  # skip existing files

# Deck display names
DECK_NAMES = {
    "rider": "Rider-Waite",
    "marsella": "Marsella",
    "thoth": "Thoth",
    "valle": "El Valle"
}


def load_prompts():
    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def generate_image(deck_style, card_prompt, width=WIDTH, height=HEIGHT):
    full_prompt = f"{deck_style}. {card_prompt}. High quality detailed illustration, professional artwork, 4K resolution, intricate details, beautiful composition"
    encoded = requests.utils.quote(full_prompt)
    seed = int(hashlib.md5(full_prompt.encode()).hexdigest()[:8], 16) % 100000
    url = f"https://image.pollinations.ai/prompt/{encoded}?width={width}&height={height}&model={MODEL}&nologo=true&seed={seed}"
    
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, timeout=120)
            if response.status_code == 200 and len(response.content) > 1000:
                return response.content
            else:
                print(f"  ⚠ Attempt {attempt+1}: Status {response.status_code}, size {len(response.content)}")
        except Exception as e:
            print(f"  ⚠ Attempt {attempt+1}: {e}")
        time.sleep(2)
    
    return None


def main():
    data = load_prompts()
    
    # Parse args
    deck_filter = None
    card_filter = None
    resume = RESUME
    
    args = sys.argv[1:]
    if "--deck" in args:
        idx = args.index("--deck")
        deck_filter = args[idx+1] if idx+1 < len(args) else None
    if "--card" in args:
        idx = args.index("--card")
        card_filter = args[idx+1] if idx+1 < len(args) else None
    if "--fresh" in args:
        resume = False
    if "--help" in args:
        print("""
TAROT Image Generator
Usage: python3 generate_images.py [options]

Options:
  --deck rider|marsella|thoth|valle   Generate only this deck
  --card 00|01|...|77                 Generate only this card
  --fresh                             Overwrite existing images
  --help                              Show this help
        """)
        return
    
    decks_to_process = [deck_filter] if deck_filter else list(data.keys())
    total_images = 0
    success_count = 0
    skip_count = 0
    fail_count = 0
    
    for deck in decks_to_process:
        if deck not in data:
            print(f"❌ Unknown deck: {deck}")
            continue
        
        deck_data = data[deck]
        deck_style = deck_data["style"]
        cards = deck_data["cards"]
        deck_dir = os.path.join(OUTPUT_DIR, deck)
        os.makedirs(deck_dir, exist_ok=True)
        
        cards_to_process = [card_filter] if card_filter else list(cards.keys())
        total_images += len(cards_to_process)
        
        print(f"\n{'='*50}")
        print(f"🎴 Deck: {DECK_NAMES.get(deck, deck)} ({len(cards_to_process)} cards)")
        print(f"{'='*50}")
        
        for card_id in cards_to_process:
            if card_id not in cards:
                print(f"  ⚠ Card {card_id} not found, skipping")
                continue
            
            card = cards[card_id]
            filename = f"{card_id}.jpg"
            filepath = os.path.join(deck_dir, filename)
            
            if resume and os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
                print(f"  ⏭ {card['name']} — exists, skipping")
                skip_count += 1
                continue
            
            print(f"  🎨 {card['name']}...", end=" ", flush=True)
            image_data = generate_image(deck_style, card["prompt"])
            
            if image_data:
                with open(filepath, "wb") as f:
                    f.write(image_data)
                size_kb = len(image_data) / 1024
                print(f"✅ ({size_kb:.0f} KB)")
                success_count += 1
            else:
                print("❌ FAILED")
                fail_count += 1
            
            time.sleep(DELAY_BETWEEN)
    
    print(f"\n{'='*50}")
    print(f"📊 Summary:")
    print(f"  Total: {total_images}")
    print(f"  ✅ Success: {success_count}")
    print(f"  ⏭ Skipped: {skip_count}")
    print(f"  ❌ Failed: {fail_count}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
