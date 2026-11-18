"""Create the storefront's hats as products in the Bogey Baby Printify shop (idempotent: skips titles that exist).

Usage: python3 scripts/printify-create-products.py <catalog.json> <token-file> <out.json> [handle ...]
- catalog.json comes from `node scripts/export-catalog.cjs`.
- Uses the Golden-Tan Golfer artwork already uploaded to the Printify account.
- Embroidery blanks get the golfer stitched on the front; DTF blanks get it printed where the blank allows.
- Only the colours the site sells are enabled, at the site's prices.
"""
import json, subprocess, sys, time

SHOP = 29796342
ART = '6afcb9d62e2f6bfb455be351'  # "Golden-Tan Golfer with Green Striped Scarf.png", 1609x977, transparent
# blueprint/provider -> (placement, scale, decoration_method). Scales keep the 1.65:1 artwork inside each print area.
PLACE = {
    (6597, 99): ('front_embroidery', 0.8, None),
    (2667, 99): ('front_embroidery', 0.8, None),
    (2003, 99): ('front_embroidery', 0.8, None),
    (1447, 217): ('front', 0.85, 'embroidery'),
    (1691, 99): ('front', 0.55, 'embroidery'),
    (6963, 217): ('front_left_dtf', 0.95, None),
    (6962, 217): ('front_left_dtf', 0.95, None),
    (7650, 217): ('front_dtf', 0.5, None),
    (5836, 217): ('front_dtf', 0.52, None),
    (10920, 217): ('front_dtf', 0.7, None),
    (7033, 217): ('front_left_dtf', 0.95, None),
    (7036, 217): ('front_left_dtf', 0.95, None),
}
# The flagship has no Printify source in the catalog: make it on the Sunwashed Rope Cap blank in Ivory.
FLAGSHIP = {'cream-rope-cap': {'blueprintId': 6597, 'printProviderId': 99, 'variants': {'Cream': 288216}}}

catalog = json.load(open(sys.argv[1]))
token = open(sys.argv[2]).read().strip()
out_path = sys.argv[3]
only = set(sys.argv[4:])

def api(method, path, body=None):
    args = ['curl', '-sS', '-m', '120', '-X', method, f'https://api.printify.com/v1{path}',
            '-H', f'Authorization: Bearer {token}', '-H', 'User-Agent: bogey-baby-sync', '-H', 'Content-Type: application/json']
    if body is not None:
        args += ['--data-binary', json.dumps(body)]
    r = subprocess.run(args, capture_output=True, text=True)
    try:
        return json.loads(r.stdout)
    except Exception:
        return {'error': r.stdout[:500] or r.stderr[:500]}

existing = {p['title']: p['id'] for p in api('GET', f'/shops/{SHOP}/products.json?limit=50').get('data', [])}
try:
    results = json.load(open(out_path))
except Exception:
    results = {}

for p in catalog:
    if only and p['handle'] not in only:
        continue
    if p['source']['kind'] == 'printify':
        bp, pp = p['source']['blueprintId'], p['source']['printProviderId']
        variants = {c['name']: c['printify']['variantId'] for c in p['colors'] if c.get('printify')}
    else:
        f = FLAGSHIP[p['handle']]
        bp, pp, variants = f['blueprintId'], f['printProviderId'], f['variants']
    if p['title'] in existing:
        results[p['handle']] = {'productId': existing[p['title']], 'blueprintId': bp, 'printProviderId': pp, 'variants': variants, 'note': 'already existed'}
        print('skip (exists)', p['title'], existing[p['title']])
        continue
    position, scale, method = PLACE[(bp, pp)]
    placeholder = {'position': position, 'images': [{'id': ART, 'x': 0.5, 'y': 0.5, 'scale': scale, 'angle': 0}]}
    if method:
        placeholder['decoration_method'] = method
    body = {
        'title': p['title'],
        'description': f"<p>{p['description']}</p><p>{p['fit']}</p>",
        'tags': ['Bogey Baby', "women's golf", p['style'], 'embroidered' if p['decoration'] == 'embroidery' else 'printed'],
        'blueprint_id': bp,
        'print_provider_id': pp,
        'variants': [{'id': vid, 'price': p['price'], 'is_enabled': True} for vid in variants.values()],
        'print_areas': [{'variant_ids': list(variants.values()), 'placeholders': [placeholder]}],
    }
    res = api('POST', f'/shops/{SHOP}/products.json', body)
    if 'id' not in res:
        print('FAILED', p['title'], json.dumps(res)[:600])
        continue
    results[p['handle']] = {'productId': res['id'], 'blueprintId': bp, 'printProviderId': pp, 'variants': variants,
                            'placement': position, 'decoration': method or ('embroidery' if 'embroidery' in position else 'dtf')}
    json.dump(results, open(out_path, 'w'), indent=1)
    print('created', p['title'], res['id'])
    time.sleep(1.5)

json.dump(results, open(out_path, 'w'), indent=1)
