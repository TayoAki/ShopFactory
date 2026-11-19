import sharp from 'sharp';
import {create} from 'fontkit';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {CustomerError} from './customer-security';
export function customName(input:unknown){if(typeof input!=='string'||!/^[A-Za-z][A-Za-z .'-]{0,17}$/.test(input.trim()))throw new CustomerError('Use 1–18 letters, spaces, apostrophes, hyphens or periods for a name.');return input.trim();}
export async function nameArtwork(name:string,color:string){
 const text=customName(name);if(!['#082D22','#FFFFFF','#111111'].includes(color))throw new CustomerError('Choose a thread color.');
 const font=create(await readFile(path.join(process.cwd(),'src/fonts/dm-sans.woff2')));if(!('layout'in font))throw new Error('font_unavailable');
 const run=font.layout(text);let x=0;const glyphs=run.glyphs.map((g,i)=>{const p=run.positions[i];const svg=`<path transform="translate(${x+p.xOffset},${p.yOffset})" d="${g.path.toSVG()}"/>`;x+=p.xAdvance;return svg;}).join('');
 const scale=Math.min(1050/x,240/(font.ascent-font.descent));const width=x*scale;const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="480"><g fill="${color}" transform="translate(${(1200-width)/2},${240+(font.ascent+font.descent)*scale/2}) scale(${scale},${-scale})">${glyphs}</g></svg>`;
 return sharp(Buffer.from(svg)).png().toBuffer();
}
export async function logoArtwork(file:File){
 if(!['image/png','image/jpeg'].includes(file.type)||file.size>4*1024*1024||file.size<32)throw new CustomerError('Upload a PNG or JPG logo up to 4 MB.');
 try{const image=sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:16000000,animated:false,failOn:'warning'});const m=await image.metadata();if(!['png','jpeg'].includes(m.format||'')||(m.pages||1)>1||(m.width||0)<150||(m.height||0)<60)throw new Error();return await image.rotate().resize({width:1200,height:480,fit:'contain',background:{r:255,g:255,b:255,alpha:0},withoutEnlargement:false}).png().toBuffer();}catch{throw new CustomerError('Use a clear, single-image PNG or JPG logo. SVG, PDFs and animated images are not accepted.');}
}
