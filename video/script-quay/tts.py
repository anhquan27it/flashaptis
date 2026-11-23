# Tạo giọng đọc: python tts.py lines.json outdir  (lines.json: [{"id":..., "text":...}])
import asyncio, json, sys, os, edge_tts
VOICE, RATE = "vi-VN-HoaiMyNeural", "+10%"
async def one(it, out):
    p = os.path.join(out, it["id"] + ".mp3")
    if os.path.exists(p) and os.path.getsize(p) > 0 and it.get("cached") is not False: return
    for k in range(8):
        try:
            await edge_tts.Communicate(it["text"], VOICE, rate=RATE).save(p); return
        except Exception as e:
            print("retry", it["id"], type(e).__name__); await asyncio.sleep(2 + k)
async def main():
    items = json.load(open(sys.argv[1], encoding="utf-8")); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
    for it in items:
        await one(it, out)
        p = os.path.join(out, it["id"] + ".mp3")
        if not os.path.exists(p) or os.path.getsize(p) == 0: print("FAIL", it["id"])
asyncio.run(main())
