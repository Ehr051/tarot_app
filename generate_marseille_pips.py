#!/usr/bin/env python3
"""
Generar cartas pip del Tarot de Marsella con estilo tradicional español.
La distribución de símbolos sigue el patrón clásico del Marsella histórico.
Cada carta tiene un significado específico según su disposición.
"""

import os

OUTPUT_DIR = "/Users/mac/Desktop/tarot_app/images/marsella"

# Colores tradicionales del Marsella
COLORS = {
    "copas": {"fill": "#C41E3A", "stroke": "#8B0000", "bg": "#F5F0E0"},
    "espadas": {"fill": "#4A6FA5", "stroke": "#2C3E50", "bg": "#F5F0E0"},
    "bastos": {"fill": "#D4A017", "stroke": "#8B6914", "bg": "#F5F0E0"},
    "oros": {"fill": "#FFD700", "stroke": "#B8860B", "bg": "#F5F0E0"}
}

# Números romanos
ROMAN = {1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
         6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X"}

def create_cup_svg(x, y, size=28, rotation=0):
    """Copa estilo Marsella tradicional"""
    return f'''
    <g transform="translate({x},{y}) rotate({rotation})">
      <path d="M0,{-size*0.5} C{-size*0.4},{-size*0.3} {-size*0.35},{size*0.2} 0,{size*0.35} C{size*0.35},{size*0.2} {size*0.4},{-size*0.3} 0,{-size*0.5}Z" 
            fill="inherit" stroke="inherit" stroke-width="1.5"/>
      <ellipse cx="0" cy="{size*0.35}" rx="{size*0.25}" ry="{size*0.08}" fill="inherit" stroke="inherit" stroke-width="1"/>
      <rect x="-{size*0.06}" y="{size*0.42}" width="{size*0.12}" height="{size*0.15}" fill="inherit" stroke="inherit" stroke-width="0.8"/>
      <ellipse cx="0" cy="{size*0.6}" rx="{size*0.18}" ry="{size*0.06}" fill="inherit" stroke="inherit" stroke-width="0.8"/>
      <circle cx="0" cy="{-size*0.3}" r="{size*0.08}" fill="none" stroke="inherit" stroke-width="0.8"/>
    </g>'''

def create_sword_svg(x, y, size=35, rotation=0):
    """Espada estilo Marsella - hoja ancha con cruz"""
    return f'''
    <g transform="translate({x},{y}) rotate({rotation})">
      <rect x="-{size*0.04}" y="-{size*0.45}" width="{size*0.08}" height="{size*0.75}" fill="inherit" stroke="inherit" stroke-width="1"/>
      <rect x="-{size*0.2}" y="{size*0.2}" width="{size*0.4}" height="{size*0.06}" fill="inherit" stroke="inherit" stroke-width="1"/>
      <polygon points="0,-{size*0.5} {-size*0.06},-{size*0.4} {size*0.06},-{size*0.4}" fill="inherit" stroke="inherit" stroke-width="0.8"/>
      <circle cx="0" cy="{size*0.23}" r="{size*0.04}" fill="inherit" stroke="inherit" stroke-width="0.5"/>
    </g>'''

def create_wand_svg(x, y, size=35, rotation=0):
    """Bastón/Basto estilo Marsella - tronco con ramas"""
    return f'''
    <g transform="translate({x},{y}) rotate({rotation})">
      <rect x="-{size*0.05}" y="-{size*0.45}" width="{size*0.1}" height="{size*0.9}" rx="{size*0.03}" fill="inherit" stroke="inherit" stroke-width="1"/>
      <ellipse cx="-{size*0.15}" cy="-{size*0.25}" rx="{size*0.12}" ry="{size*0.06}" fill="inherit" stroke="inherit" stroke-width="0.8" transform="rotate(-30, -{size*0.15}, -{size*0.25})"/>
      <ellipse cx="{size*0.15}" cy="-{size*0.05}" rx="{size*0.12}" ry="{size*0.06}" fill="inherit" stroke="inherit" stroke-width="0.8" transform="rotate(30, {size*0.15}, -{size*0.05})"/>
      <ellipse cx="-{size*0.12}" cy="{size*0.15}" rx="{size*0.1}" ry="{size*0.05}" fill="inherit" stroke="inherit" stroke-width="0.8" transform="rotate(-20, -{size*0.12}, {size*0.15})"/>
    </g>'''

def create_coin_svg(x, y, size=28, rotation=0):
    """Denier/Oro estilo Marsella - moneda con cruz"""
    return f'''
    <g transform="translate({x},{y}) rotate({rotation})">
      <circle cx="0" cy="0" r="{size*0.4}" fill="inherit" stroke="inherit" stroke-width="2"/>
      <circle cx="0" cy="0" r="{size*0.3}" fill="none" stroke="inherit" stroke-width="1"/>
      <line x1="-{size*0.2}" y1="0" x2="{size*0.2}" y2="0" stroke="inherit" stroke-width="1.5"/>
      <line x1="0" y1="-{size*0.2}" x2="0" y2="{size*0.2}" stroke="inherit" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="{size*0.08}" fill="inherit" stroke="inherit" stroke-width="0.5"/>
    </g>'''

def get_positions(count, width=400, height=560):
    """
    Posiciones tradicionales del Marsella.
    Basado en los patrones históricos del Tarot de Marseille.
    """
    cx, cy = width/2, height/2
    
    if count == 1:
        return [(cx, cy)]
    
    elif count == 2:
        # Dos filas simétricas
        return [(cx, height*0.3), (cx, height*0.7)]
    
    elif count == 3:
        # Triángulo apuntando arriba
        return [(cx, height*0.25), (cx, cy), (cx, height*0.75)]
    
    elif count == 4:
        # Cuatro esquinas
        return [(width*0.3, height*0.3), (width*0.7, height*0.3),
                (width*0.3, height*0.7), (width*0.7, height*0.7)]
    
    elif count == 5:
        # Quincunx (como el 5 en dados)
        return [(width*0.3, height*0.25), (width*0.7, height*0.25),
                (cx, cy),
                (width*0.3, height*0.75), (width*0.7, height*0.75)]
    
    elif count == 6:
        # Dos columnas de tres
        return [(width*0.3, height*0.22), (width*0.7, height*0.22),
                (width*0.3, height*0.5), (width*0.7, height*0.5),
                (width*0.3, height*0.78), (width*0.7, height*0.78)]
    
    elif count == 7:
        # Seis + uno central
        return [(width*0.3, height*0.2), (width*0.7, height*0.2),
                (width*0.3, height*0.45), (width*0.7, height*0.45),
                (cx, cy),
                (width*0.3, height*0.75), (width*0.7, height*0.75)]
    
    elif count == 8:
        # Dos columnas de cuatro
        return [(width*0.3, height*0.18), (width*0.7, height*0.18),
                (width*0.3, height*0.39), (width*0.7, height*0.39),
                (width*0.3, height*0.61), (width*0.7, height*0.61),
                (width*0.3, height*0.82), (width*0.7, height*0.82)]
    
    elif count == 9:
        # Tres filas de tres
        return [(width*0.25, height*0.22), (cx, height*0.22), (width*0.75, height*0.22),
                (width*0.25, height*0.5), (cx, height*0.5), (width*0.75, height*0.5),
                (width*0.25, height*0.78), (cx, height*0.78), (width*0.75, height*0.78)]
    
    elif count == 10:
        # Tres filas + uno central abajo
        return [(width*0.25, height*0.2), (cx, height*0.2), (width*0.75, height*0.2),
                (width*0.25, height*0.43), (cx, height*0.43), (width*0.75, height*0.43),
                (width*0.25, height*0.67), (cx, height*0.67), (width*0.75, height*0.67),
                (cx, height*0.88)]
    
    return []

def create_pip_card(card_id, number, suit):
    """Crea una carta pip estilo Marsella tradicional"""
    colors = COLORS[suit]
    width, height = 400, 560
    
    positions = get_positions(number, width, height)
    
    # Crear símbolos
    symbols_svg = ""
    for x, y in positions:
        if suit == "copas":
            symbols_svg += create_cup_svg(x, y)
        elif suit == "espadas":
            symbols_svg += create_sword_svg(x, y)
        elif suit == "bastos":
            symbols_svg += create_wand_svg(x, y)
        elif suit == "oros":
            symbols_svg += create_coin_svg(x, y)
    
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <rect width="{width}" height="{height}" fill="{colors['bg']}" rx="12"/>
  <rect x="8" y="8" width="{width-16}" height="{height-16}" fill="none" stroke="{colors['stroke']}" stroke-width="2.5" rx="10"/>
  <rect x="18" y="18" width="{width-36}" height="{height-36}" fill="none" stroke="{colors['stroke']}" stroke-width="0.8" rx="6"/>
  
  <text x="{width/2}" y="42" text-anchor="middle" font-family="serif" font-size="26" font-weight="bold" fill="{colors['fill']}">{ROMAN[number]}</text>
  
  <g fill="{colors['fill']}" stroke="{colors['stroke']}">
    {symbols_svg}
  </g>
  
  <g transform="translate({width/2},{height-28}) rotate(180)">
    <text x="0" y="0" text-anchor="middle" font-family="serif" font-size="26" font-weight="bold" fill="{colors['fill']}">{ROMAN[number]}</text>
  </g>
</svg>'''
    
    return svg

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    pip_cards = []
    for i in range(1, 11):
        pip_cards.append((21+i, i, "copas"))
        pip_cards.append((35+i, i, "espadas"))
        pip_cards.append((49+i, i, "bastos"))
        pip_cards.append((63+i, i, "oros"))
    
    print("🔮 Generando cartas pip estilo Marsella tradicional...")
    print("=" * 60)
    
    for card_id, number, suit in pip_cards:
        padded_id = str(card_id).zfill(2)
        svg = create_pip_card(card_id, number, suit)
        
        with open(os.path.join(OUTPUT_DIR, f"{padded_id}.svg"), 'w') as f:
            f.write(svg)
        
        suit_names = {"copas": "Copas", "espadas": "Espadas", "bastos": "Bastos", "oros": "Oros"}
        print(f"✅ {number} de {suit_names[suit]} (ID: {padded_id})")
    
    print(f"\n✅ Generadas {len(pip_cards)} cartas pip")

if __name__ == "__main__":
    main()
