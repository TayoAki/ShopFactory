import assert from 'node:assert/strict';
import { test } from 'node:test';
import { shippingFor, bundleDiscount } from './pricing';
import {getProduct} from './catalog';
import type Stripe from 'stripe';
import { assertPaymentTotals, validateBasket } from './payments';

test('shipping is $7 below $120 and free from $120 after discounts', () => {
 assert.equal(shippingFor(0),0);
 assert.equal(shippingFor(11999),700);
 assert.equal(shippingFor(12000),0);
 assert.equal(shippingFor(12001),0);
 const discounted = 14000 - bundleDiscount(14000,4);
 assert.equal(discounted,11900);
 assert.equal(shippingFor(discounted),700);
});
test('server basket captures shipping alongside authoritative product prices', () => {
 const one=validateBasket([{handle:'cream-rope-cap',color:'cream',qty:1}]);
 assert.equal(one.subtotal,3800);assert.equal(one.shipping,700);
 const four=validateBasket([{handle:'cream-rope-cap',color:'cream',qty:4}]);
 assert.equal(four.discount,2280);assert.equal(four.shipping,0);
});

test('paid shipping and tax reconcile with the checkout snapshot; tampered totals fail', () => {
 const session = {currency:'usd',amount_subtotal:3800,amount_total:4815,total_details:{amount_discount:0,amount_tax:315},shipping_cost:{amount_subtotal:700,amount_total:749},automatic_tax:{status:'complete'}} as Stripe.Checkout.Session;
 const basket={subtotal:3800,discount:0,shipping:700};
 assert.doesNotThrow(()=>assertPaymentTotals(session,basket));
 assert.throws(()=>assertPaymentTotals({...session,amount_total:4115},basket));
 assert.throws(()=>assertPaymentTotals({...session,shipping_cost:{...session.shipping_cost!,amount_subtotal:0}},basket));
 assert.doesNotThrow(()=>assertPaymentTotals({...session,amount_total:4115,shipping_cost:{...session.shipping_cost!,amount_subtotal:0}}, {subtotal:3800,discount:0}));
});

test('approved performance-hat prices reach server checkout and retain modeled bundle contribution',()=>{
 const costs:Record<string,number>={'back-nine-ponytail-cap':3254,'small-fit-performance-cap':2893,'19th-hole-bucket':3525};
 const approved:Record<string,number>={'back-nine-ponytail-cap':5400,'small-fit-performance-cap':4900,'19th-hole-bucket':5800};
 for(const [handle,price]of Object.entries(approved)){
  const product=getProduct(handle)!;assert.equal(product.price,price);
  for(let qty=1;qty<=4;qty++){
   const basket=validateBasket([{handle,color:product.colors[0].slug,qty}]);assert.equal(basket.subtotal,price*qty);assert.equal(basket.lines[0].unitAmount,price);
   const merchandise=basket.subtotal-basket.discount;const supplier=costs[handle]*qty;const shipping=499+219*(qty-1);const collected=merchandise+basket.shipping;
   const fees=Math.ceil(collected*.034)+30;const reserve=Math.ceil(merchandise*.05);const supplierTax=Math.ceil((supplier+shipping)*.1);
   assert.ok(collected-supplier-shipping-fees-reserve-supplierTax>=800,`${handle}, qty ${qty}: below modeled $8 floor`);
  }
 }
});
