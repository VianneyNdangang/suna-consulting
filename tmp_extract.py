from pypdf import PdfReader
from pathlib import Path
pdf_path = Path('public/SUNA_Backend_API_Design_Complet.pdf')
reader = PdfReader(str(pdf_path))
output = []
for i, page in enumerate(reader.pages):
    text = page.extract_text() or ''
    if text.strip():
        output.append(f'--- PAGE {i+1} ---\n')
        output.append(text[:20000])
        output.append('\n\n')
Path('tmp_extract_output.txt').write_text(''.join(output), encoding='utf-8')
print('wrote', len(reader.pages), 'pages')
