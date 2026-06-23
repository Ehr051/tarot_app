#!/usr/bin/env python3
"""Convertir SVGs de Marsella a JPG usando cairosvg"""

import os
import subprocess
import sys

SVG_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"
JPG_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"

def convert_svg_to_jpg(svg_path, jpg_path):
    """Convert SVG to JPG using rsvg-convert or cairosvg"""
    try:
        # Try cairosvg first
        import cairosvg
        cairosvg.svg2png(url=svg_path, write_to=jpg_path.replace('.jpg', '.png'), 
                        output_width=400, output_height=560)
        # Then convert PNG to JPG
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '90', 
                       jpg_path.replace('.jpg', '.png'), '--out', jpg_path], 
                      capture_output=True)
        os.remove(jpg_path.replace('.jpg', '.png'))
        return True
    except ImportError:
        # Try using rsvg-convert
        try:
            subprocess.run(['rsvg-convert', '-w', '400', '-h', '560', 
                          '-o', jpg_path.replace('.jpg', '.png'), svg_path], 
                         capture_output=True)
            subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '90',
                          jpg_path.replace('.jpg', '.png'), '--out', jpg_path], 
                         capture_output=True)
            os.remove(jpg_path.replace('.jpg', '.png'))
            return True
        except:
            return False

if __name__ == "__main__":
    print("🔄 Convirtiendo SVGs a JPG...")
    
    # Check if cairosvg is available
    try:
        import cairosvg
        print("✅ Usando cairosvg")
    except ImportError:
        print("⚠️ cairosvg no disponible, instalando...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'cairosvg'], capture_output=True)
        import cairosvg
    
    count = 0
    for i in range(22, 74):  # Cards 22-73
        svg_file = os.path.join(SVG_DIR, f"{i:02d}.svg")
        jpg_file = os.path.join(JPG_DIR, f"{i:02d}.jpg")
        
        if os.path.exists(svg_file):
            try:
                cairosvg.svg2png(url=svg_file, write_to=jpg_file.replace('.jpg', '.png'),
                               output_width=400, output_height=560)
                subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '90',
                              jpg_file.replace('.jpg', '.png'), '--out', jpg_file], 
                             capture_output=True)
                if os.path.exists(jpg_file.replace('.jpg', '.png')):
                    os.remove(jpg_file.replace('.jpg', '.png'))
                count += 1
                print(f"✅ {i:02d}.svg → {i:02d}.jpg")
            except Exception as e:
                print(f"❌ Error en {i:02d}: {e}")
    
    print(f"\n✅ Convertidas {count} cartas a JPG")
