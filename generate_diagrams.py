import os
import math
from PIL import Image, ImageDraw, ImageFont

def get_fonts():
    try:
        return {
            'title': ImageFont.truetype('C:\\Windows\\Fonts\\comicbd.ttf', 30),
            'subtitle': ImageFont.truetype('C:\\Windows\\Fonts\\comic.ttf', 16),
            'box_header': ImageFont.truetype('C:\\Windows\\Fonts\\comicbd.ttf', 18),
            'text': ImageFont.truetype('C:\\Windows\\Fonts\\comic.ttf', 14),
            'bold': ImageFont.truetype('C:\\Windows\\Fonts\\comicbd.ttf', 14),
            'code': ImageFont.truetype('C:\\Windows\\Fonts\\consola.ttf', 13),
            'code_bold': ImageFont.truetype('C:\\Windows\\Fonts\\consolab.ttf', 13),
            'label': ImageFont.truetype('C:\\Windows\\Fonts\\comicbd.ttf', 13),
        }
    except Exception:
        return {
            'title': ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 30),
            'subtitle': ImageFont.truetype('C:\\Windows\\Fonts\\arial.ttf', 16),
            'box_header': ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 18),
            'text': ImageFont.truetype('C:\\Windows\\Fonts\\arial.ttf', 14),
            'bold': ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 14),
            'code': ImageFont.truetype('C:\\Windows\\Fonts\\consola.ttf', 13),
            'code_bold': ImageFont.truetype('C:\\Windows\\Fonts\\consolab.ttf', 13),
            'label': ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 13),
        }

def draw_arrow(draw, start, end, width=2, color='#000000', arrow_size=10):
    x1, y1 = start
    x2, y2 = end
    draw.line([(x1, y1), (x2, y2)], fill=color, width=width)
    angle = math.atan2(y2 - y1, x2 - x1)
    p1 = (x2 - arrow_size * math.cos(angle - math.pi / 6),
          y2 - arrow_size * math.sin(angle - math.pi / 6))
    p2 = (x2 - arrow_size * math.cos(angle + math.pi / 6),
          y2 - arrow_size * math.sin(angle + math.pi / 6))
    draw.polygon([end, p1, p2], fill=color)

def draw_poly_arrow(draw, points, width=2, color='#000000', arrow_size=10):
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=color, width=width)
    x1, y1 = points[-2]
    x2, y2 = points[-1]
    angle = math.atan2(y2 - y1, x2 - x1)
    p1 = (x2 - arrow_size * math.cos(angle - math.pi / 6),
          y2 - arrow_size * math.sin(angle - math.pi / 6))
    p2 = (x2 - arrow_size * math.cos(angle + math.pi / 6),
          y2 - arrow_size * math.sin(angle + math.pi / 6))
    draw.polygon([points[-1], p1, p2], fill=color)

# =========================================================================
# DIAGRAM 1: Valtio Proxy Architecture Flow
# =========================================================================
def create_diagram_1():
    W, H = 1400, 840
    img = Image.new('RGB', (W, H), '#ffffff')
    draw = ImageDraw.Draw(img)
    fonts = get_fonts()

    # Outer border
    draw.rectangle([(16, 16), (W - 16, H - 16)], fill=None, outline='#000000', width=3)

    # Title & Subtitle
    draw.text((W // 2, 45), 'Valtio: Proxy-Based State Management Flow', fill='#000000', font=fonts['title'], anchor='mm')
    draw.text((W // 2, 80), 'Direct Mutable State (No Reducers)  •  Immutable Snapshots (useSnapshot)  •  Fine-Grained Auto Tracking', fill='#444444', font=fonts['subtitle'], anchor='mm')
    draw.line([(40, 105), (W - 40, 105)], fill='#000000', width=2)

    # 1. Top Box: React Components (Pastel Green)
    cx1, cy1, cx2, cy2 = 470, 135, 930, 275
    draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=14, fill='#c8e6c9', outline='#000000', width=2)
    draw.text(((cx1 + cx2)//2, cy1 + 24), 'React Component (e.g., Counter)', fill='#000000', font=fonts['box_header'], anchor='mm')
    
    # Inside React Component
    draw.text((cx1 + 35, cy1 + 54), 'const snap = useSnapshot(state);', fill='#000000', font=fonts['code_bold'])
    draw.text((cx1 + 35, cy1 + 78), 'return <h1>{snap.count}</h1>;', fill='#000000', font=fonts['code'])
    draw.text((cx1 + 35, cy1 + 102), '<button onClick={() => state.count++}>', fill='#000000', font=fonts['code'])

    # 2. Middle Left Box: useSnapshot Hook (Pastel Orange)
    sx1, sy1, sx2, sy2 = 80, 390, 520, 550
    draw.rounded_rectangle([(sx1, sy1), (sx2, sy2)], radius=14, fill='#fed7aa', outline='#000000', width=2)
    draw.text(((sx1 + sx2)//2, sy1 + 25), 'useSnapshot(state) Hook', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((sx1 + 20, sy1 + 56), '• Generates a frozen, read-only immutable snapshot', fill='#000000', font=fonts['text'])
    draw.text((sx1 + 20, sy1 + 84), '• Property Access Tracking via JavaScript Proxy Getters', fill='#000000', font=fonts['text'])
    draw.text((sx1 + 20, sy1 + 112), '• Component subscribes ONLY to properties it read!', fill='#000000', font=fonts['bold'])

    # 3. Middle Right Box: Direct Mutation (Pastel Blue)
    mx1, my1, mx2, my2 = 880, 390, 1320, 550
    draw.rounded_rectangle([(mx1, my1), (mx2, my2)], radius=14, fill='#bae6fd', outline='#000000', width=2)
    draw.text(((mx1 + mx2)//2, my1 + 25), 'Direct Mutation (Vanilla JS)', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((mx1 + 25, my1 + 56), 'state.count++;', fill='#000000', font=fonts['code_bold'])
    draw.text((mx1 + 25, my1 + 84), 'state.user.name = "Kamal";', fill='#000000', font=fonts['code_bold'])
    draw.text((mx1 + 25, my1 + 112), '• No dispatch, no reducers, no action creators!', fill='#000000', font=fonts['bold'])

    # 4. Bottom Box: Valtio Mutable Proxy Store (Pastel Yellow)
    bx1, by1, bx2, by2 = 430, 640, 970, 785
    draw.rounded_rectangle([(bx1, by1), (bx2, by2)], radius=14, fill='#fef08a', outline='#000000', width=2)
    draw.text(((bx1 + bx2)//2, by1 + 25), 'Valtio Proxy Store: proxy({ count: 0, user: { ... } })', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((bx1 + 30, by1 + 55), '• Wraps JavaScript object inside native Proxy handler', fill='#000000', font=fonts['text'])
    draw.text((bx1 + 30, by1 + 80), '• Intercepts set / deleteProperty traps on mutations', fill='#000000', font=fonts['text'])
    draw.text((bx1 + 30, by1 + 105), '• Auto-generates next version snapshot upon mutation', fill='#000000', font=fonts['bold'])

    # ARROWS & LABELS:
    # Arrow 1: React Component -> useSnapshot (downwards on left)
    draw_poly_arrow(draw, [(cx1 + 30, cy2), (cx1 + 30, 330), (300, 330), (300, sy1)], width=2)
    draw.text((300, 315), '1. Calls useSnapshot(state)', fill='#000000', font=fonts['label'], anchor='mm')

    # Arrow 2: Notification & Re-render (useSnapshot back to React Component)
    draw_poly_arrow(draw, [(sx1 + 70, sy1), (sx1 + 70, 205), (cx1, 205)], width=2)
    # Background label box for clean readability
    draw.text((sx1 + 70, 165), 'Re-renders component ONLY', fill='#000000', font=fonts['label'], anchor='mm')
    draw.text((sx1 + 70, 185), 'if accessed property changed', fill='#000000', font=fonts['text'], anchor='mm')

    # Arrow 3: useSnapshot -> Proxy Store
    draw_poly_arrow(draw, [(240, sy2), (240, 712), (bx1, 712)], width=2)
    draw.text((230, 600), 'Tracks Proxy', fill='#000000', font=fonts['label'], anchor='rm')
    draw.text((230, 620), 'Version & Keys', fill='#000000', font=fonts['text'], anchor='rm')

    # Arrow 4: React Component -> Direct Mutation
    draw_poly_arrow(draw, [(cx2 - 30, cy2), (cx2 - 30, 330), (1100, 330), (1100, my1)], width=2)
    draw.text((1100, 315), '2. onClick triggers Direct Mutation', fill='#000000', font=fonts['label'], anchor='mm')

    # Arrow 5: Direct Mutation -> Proxy Store
    draw_poly_arrow(draw, [(1160, my2), (1160, 712), (bx2, 712)], width=2)
    draw.text((1175, 600), 'Proxy Trap', fill='#000000', font=fonts['label'], anchor='lm')
    draw.text((1175, 620), 'Intercepts Mutation', fill='#000000', font=fonts['text'], anchor='lm')

    # Self Loop on Proxy Store (Update state)
    loop_pts = [(bx2 - 20, by2), (bx2 - 20, by2 + 25), (bx2 + 40, by2 + 25), (bx2 + 40, by2 - 30), (bx2, by2 - 30)]
    draw_poly_arrow(draw, loop_pts, width=2)
    draw.text((bx2 + 85, by2 - 3), 'In-Place\nMutation', fill='#000000', font=fonts['label'], anchor='mm')

    # Save to public and root
    os.makedirs('public', exist_ok=True)
    img.save('public/valtio-proxy-architecture.png')
    img.save('valtio-proxy-architecture.png')
    print('Diagram 1 saved successfully.')

# =========================================================================
# DIAGRAM 2: Valtio Derived State & Persistence Lifecycle
# =========================================================================
def create_diagram_2():
    W, H = 1400, 840
    img = Image.new('RGB', (W, H), '#ffffff')
    draw = ImageDraw.Draw(img)
    fonts = get_fonts()

    # Outer border
    draw.rectangle([(16, 16), (W - 16, H - 16)], fill=None, outline='#000000', width=3)

    # Title & Subtitle
    draw.text((W // 2, 45), 'Valtio: Derived State & Persistence Lifecycle', fill='#000000', font=fonts['title'], anchor='mm')
    draw.text((W // 2, 80), 'Native Getters (Computed State)  •  subscribe() Outside React  •  Immutable snapshot()  •  LocalStorage Sync', fill='#444444', font=fonts['subtitle'], anchor='mm')
    draw.line([(40, 105), (W - 40, 105)], fill='#000000', width=2)

    # Column Split Line
    draw.line([(W // 2, 115), (W // 2, H - 25)], fill='#000000', width=2)

    # Column 1 Header: Derived State
    draw.text((W // 4, 135), 'Part 1: Derived State (Native JS Getters)', fill='#000000', font=fonts['box_header'], anchor='mm')

    # Box 1A: Proxy with Getters (Pastel Teal)
    d1x1, d1y1, d1x2, d1y2 = 70, 165, 630, 335
    draw.rounded_rectangle([(d1x1, d1y1), (d1x2, d1y2)], radius=14, fill='#a5d8d6', outline='#000000', width=2)
    draw.text(((d1x1+d1x2)//2, d1y1 + 22), 'Proxy Store with Getter Property', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((d1x1 + 25, d1y1 + 52), 'const state = proxy({', fill='#000000', font=fonts['code_bold'])
    draw.text((d1x1 + 45, d1y1 + 75), 'todos: [ { id: 1, completed: true }, ... ],', fill='#000000', font=fonts['code'])
    draw.text((d1x1 + 45, d1y1 + 98), 'get completedCount() {', fill='#000000', font=fonts['code_bold'])
    draw.text((d1x1 + 65, d1y1 + 120), 'return state.todos.filter(t => t.completed).length;', fill='#000000', font=fonts['code'])
    draw.text((d1x1 + 45, d1y1 + 140), '}', fill='#000000', font=fonts['code_bold'])

    # Arrow 1A -> 1B
    draw_arrow(draw, ((d1x1+d1x2)//2, d1y2), ((d1x1+d1x2)//2, 405), width=2)
    draw.text(((d1x1+d1x2)//2 + 12, (d1y2 + 405)//2), 'Native Getter (No () required)', fill='#000000', font=fonts['label'], anchor='lm')

    # Box 1B: Evaluated Computed Logic (Pastel Green)
    d2x1, d2y1, d2x2, d2y2 = 70, 405, 630, 535
    draw.rounded_rectangle([(d2x1, d2y1), (d2x2, d2y2)], radius=14, fill='#c8e6c9', outline='#000000', width=2)
    draw.text(((d2x1+d2x2)//2, d2y1 + 22), 'Reactive Computed Property', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((d2x1 + 25, d2y1 + 52), '• Evaluated automatically when accessed', fill='#000000', font=fonts['text'])
    draw.text((d2x1 + 25, d2y1 + 76), '• Automatically tracks `todos` array dependencies', fill='#000000', font=fonts['text'])
    draw.text((d2x1 + 25, d2y1 + 100), '• Zero reselect, zero createSelector boilerplate!', fill='#000000', font=fonts['bold'])

    # Arrow 1B -> 1C
    draw_arrow(draw, ((d2x1+d2x2)//2, d2y2), ((d2x1+d2x2)//2, 600), width=2)
    draw.text(((d2x1+d2x2)//2 + 12, (d2y2 + 600)//2), 'Read in React Component', fill='#000000', font=fonts['label'], anchor='lm')

    # Box 1C: React Component Output (Pastel Lilac)
    d3x1, d3y1, d3x2, d3y2 = 70, 600, 630, 770
    draw.rounded_rectangle([(d3x1, d3y1), (d3x2, d3y2)], radius=14, fill='#d1c4e9', outline='#000000', width=2)
    draw.text(((d3x1+d3x2)//2, d3y1 + 22), 'React Consumer Component', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((d3x1 + 25, d3y1 + 52), 'const snap = useSnapshot(state);', fill='#000000', font=fonts['code_bold'])
    draw.text((d3x1 + 25, d3y1 + 76), '<p>Completed: {snap.completedCount}</p>', fill='#000000', font=fonts['code_bold'])
    draw.text((d3x1 + 25, d3y1 + 104), '• Re-renders only when completedCount changes!', fill='#000000', font=fonts['bold'])
    draw.text((d3x1 + 25, d3y1 + 128), '• Pure, declarative, and effortless state derivation', fill='#000000', font=fonts['text'])

    # =========================================================================
    # Column 2: Persistence & External Subscriptions
    # =========================================================================
    draw.text((3 * W // 4, 135), 'Part 2: Persistence (subscribe & snapshot)', fill='#000000', font=fonts['box_header'], anchor='mm')

    # Box 2A: State Mutation Occurs (Pastel Peach)
    p1x1, p1y1, p1x2, p1y2 = 770, 165, 1330, 285
    draw.rounded_rectangle([(p1x1, p1y1), (p1x2, p1y2)], radius=14, fill='#ffd8a8', outline='#000000', width=2)
    draw.text(((p1x1+p1x2)//2, p1y1 + 22), '1. State Mutation Occurs', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((p1x1 + 25, p1y1 + 52), 'state.theme = "dark";', fill='#000000', font=fonts['code_bold'])
    draw.text((p1x1 + 25, p1y1 + 76), '• Mutated from anywhere (inside or outside React tree)', fill='#000000', font=fonts['text'])

    # Arrow 2A -> 2B
    draw_arrow(draw, ((p1x1+p1x2)//2, p1y2), ((p1x1+p1x2)//2, 345), width=2)
    draw.text(((p1x1+p1x2)//2 + 12, (p1y2 + 345)//2), 'Fires external listener', fill='#000000', font=fonts['label'], anchor='lm')

    # Box 2B: subscribe() Callback (Pastel Yellow)
    p2x1, p2y1, p2x2, p2y2 = 770, 345, 1330, 495
    draw.rounded_rectangle([(p2x1, p2y1), (p2x2, p2y2)], radius=14, fill='#fef08a', outline='#000000', width=2)
    draw.text(((p2x1+p2x2)//2, p2y1 + 22), '2. subscribe(state, callback)', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((p2x1 + 25, p2y1 + 52), 'subscribe(state, () => {', fill='#000000', font=fonts['code_bold'])
    draw.text((p2x1 + 45, p2y1 + 74), 'const snap = snapshot(state); // frozen object', fill='#000000', font=fonts['code_bold'])
    draw.text((p2x1 + 45, p2y1 + 96), 'localStorage.setItem("app", JSON.stringify(snap));', fill='#000000', font=fonts['code'])
    draw.text((p2x1 + 25, p2y1 + 116), '});', fill='#000000', font=fonts['code_bold'])

    # Arrow 2B -> 2C
    draw_arrow(draw, ((p2x1+p2x2)//2, p2y2), ((p2x1+p2x2)//2, 555), width=2)
    draw.text(((p2x1+p2x2)//2 + 12, (p2y2 + 555)//2), 'JSON-safe serialization', fill='#000000', font=fonts['label'], anchor='lm')

    # Box 2C: LocalStorage & Boot Hydration (Pastel Blue)
    p3x1, p3y1, p3x2, p3y2 = 770, 555, 1330, 770
    draw.rounded_rectangle([(p3x1, p3y1), (p3x2, p3y2)], radius=14, fill='#bae6fd', outline='#000000', width=2)
    draw.text(((p3x1+p3x2)//2, p3y1 + 22), '3. LocalStorage & Boot Hydration', fill='#000000', font=fonts['box_header'], anchor='mm')
    draw.text((p3x1 + 25, p3y1 + 52), '// On Application Boot:', fill='#000000', font=fonts['code'])
    draw.text((p3x1 + 25, p3y1 + 75), 'const saved = JSON.parse(localStorage.getItem("app"));', fill='#000000', font=fonts['code_bold'])
    draw.text((p3x1 + 25, p3y1 + 98), 'export const state = proxy(saved || initialState);', fill='#000000', font=fonts['code_bold'])
    draw.text((p3x1 + 25, p3y1 + 125), '• Hydrates state synchronously before first render', fill='#000000', font=fonts['text'])
    draw.text((p3x1 + 25, p3y1 + 148), '• No flicker, no async initialization flash!', fill='#000000', font=fonts['bold'])

    img.save('public/valtio-derived-persistence.png')
    img.save('valtio-derived-persistence.png')
    print('Diagram 2 saved successfully.')

if __name__ == '__main__':
    create_diagram_1()
    create_diagram_2()
