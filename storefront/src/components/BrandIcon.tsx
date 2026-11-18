import Image from 'next/image';
import { Icon } from './Icon';
const artwork: Record<string,string> = {ponytail:'ponytail',smallfit:'smallfit',sun:'sun',needle:'needle',truck:'truck',calendar:'returns'};
export function BrandIcon({name}:{name:string}) {
 const asset=artwork[name];
 return asset ? <Image className="brand-icon" src={`/brand/icons/${asset}.webp`} alt="" width={64} height={64} /> : <Icon name={name} />;
}
